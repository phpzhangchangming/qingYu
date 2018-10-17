Page({
    data: {
        list: [],
        page:1,
        limit:20,
        goOnLoad:true
    },
    onLoad: function () {},
    onShow: function () {
        wx.showLoading({
            title: '加载中...'
        });
        this.getData();
    },
    onHide:function(){
        this.setData({page:1,goOnLoad:true});
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
                                fTime: that.timeChange(lists[index].flyDuration),
                                sprayAreaMu: lists[index].sprayAreaMu,
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
                        let time = 0;
                        for (var index in lists) {
                            list.push({
                                id: lists[index].id,
                                name: lists[index].pilotName,
                                num: lists[index].uavHardwareSn,
                                fTime: that.timeChange(lists[index].flyDuration),
                                sprayAreaMu: lists[index].sprayAreaMu,
                                time: lists[index].flyStartTime,
                            });
                        }
                        that.setData({ list: list })
                    }
                });
            }
        });
    },
    timeChange:function(time){
        let f = String(parseInt(time / 60));
        let m = parseInt(time % 60) + '秒';
        if(f.length == 1){
            f = '0' + f + '分';
        }else{
            f = f + '分';
        }

        return f + m;
    }
})