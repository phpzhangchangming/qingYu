const App = getApp();
Page({
    data: {
        list: [],
        page: 1,
        limit: 20,
        goOnLoad: true
    },
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userInfo');
        if (!userinfo) {
            wx.reLaunch({
                url: '/pages/login/login'
            })
        }
    },
    onShow: function () {
        this.getData();
    },
    getData: function () {
        var that = this;
        wx.showLoading({
            title: '加载中...',
        });
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'customer/account/record/list',
                    data: {
                        userId: userId,
                        token: token,
                        page: that.data.page,
                        limit: that.data.limit
                    },
                    header: { 'content-type': 'application/json' },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        } else {
                            if (that.data.page >= res.data.data.pages) {
                                that.setData({ goOnLoad: false })
                            }
                            let lists = res.data.data.list;
                            let list = [];
                            for (var index in lists) {
                                list.push({
                                    'id': lists[index].id,
                                    'typeDesc': lists[index].typeDesc,
                                    'amount': lists[index].amount,
                                    'time': lists[index].createTime,
                                    'inOrOut': lists[index].inOrOut
                                });
                            }
                            that.setData({ list: list })
                        }
                    }
                })
            }
        });
    },
    onReachBottom: function () {
        if (!this.data.goOnLoad) {
            return;
        }
        let that = this;
        wx.showLoading({
            title: '加载中...',
        });
        this.setData({ page: that.data.page + 1 });
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'customer/account/record/list',
                    data: {
                        userId: userId,
                        token: token,
                        page: that.data.page,
                        limit: that.data.limit
                    },
                    header: { 'content-type': 'application/json' },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        }else{
                            if (that.data.page >= res.data.data.pages) {
                                that.setData({ goOnLoad: false })
                            }
                            let lists = res.data.data.list;
                            let list = that.data.list;
                            for (var index in lists) {
                                list.push({
                                    'id': lists[index].id,
                                    'typeDesc': lists[index].typeDesc,
                                    'amount': lists[index].amount,
                                    'time': lists[index].createTime
                                });
                            }
                            that.setData({ list: list });
                        }
                    }
                })
            }
        });
    }
})