Page({
    data: {
        list: [],
        page:1,
        limit:20,
        goOnLoad:true
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中...'
        });
        this.getData();
    },
    onReachBottom: function () {
        if (!this.data.goOnLoad){
            return;
        }
        let that = this;
        wx.showLoading({
            title: '加载中...',
        });
        this.setData({page:that.data.page+1});
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'flyRecord/getFlyRecordList',
                    data: {
                        userId: userId,
                        token:token,
                        page: that.data.page,
                        limit: that.data.limit
                    },
                    header: { 'content-type': 'application/json' },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.result == 0) {
                            wx.showModal({
                                title: '通知',
                                content: '正在维护中，请稍后',
                                showCancel: false,
                                confirmText: '确定',
                                success: function (res) { }
                            })
                            return;
                        }
                        if (that.data.page >= res.data.data.pages) {
                            that.setData({ goOnLoad: false })
                        }
                        let moment_list = that.data.list;
                        let lists = res.data.data.list;
                        for (var index in lists) {
                            moment_list.push({
                                id: lists[index].id,
                                name: lists[index].pilotName,
                                num: lists[index].uavHardwareSn,
                                fTime: lists[index].flyDuration + '秒',
                                distance: lists[index].flyTotalDistance,
                                time: lists[index].flyStartTime,
                            });
                        }
                        that.setData({
                            list: moment_list
                        });
                    }
                })
            }
        });
    },
    getData:function() {
        var that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'flyRecord/getFlyRecordList',
                    data: {
                        userId: userId,
                        token: token,
                        page: that.data.page,
                        limit: that.data.limit
                    },
                    header: { 'content-type': 'application/json' },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.data.result == 0) {
                            wx.showModal({
                                title: '通知',
                                content: '正在维护中，请稍后',
                                showCancel: false,
                                confirmText: '确定',
                                success: function (res) { }
                            })
                            return;
                        }
                        if (that.data.page >= res.data.data.pages) {
                            that.setData({ goOnLoad: false })
                        }
                        let lists = res.data.data.list;
                        let list = [];
                        for (var index in lists) {
                            list.push({
                                id: lists[index].id,
                                name: lists[index].pilotName,
                                num: lists[index].uavHardwareSn,
                                fTime: lists[index].flyDuration + '秒',
                                distance: lists[index].flyTotalDistance,
                                time: lists[index].flyStartTime,
                            });
                        }
                        that.setData({ list: list })
                    }
                });
            }
        });
    }
})