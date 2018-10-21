const App = getApp();
Page({
    data: {
        delBtnWidth: 160,
        editBtnWidth: 180,
        hidden: true,
        list: []
    },
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userInfo');
        if (!userinfo) {
            wx.reLaunch({
                url: '/pages/login/login'
            })
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        this.initEleWidth();
        this.getData();
    },
    addPilot: function () {
    },
    touchS: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    touchM: function (e) {
        if (e.touches.length == 1) {
            var moveX = e.touches[0].clientX;
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var editBtnWidth = this.data.editBtnWidth;
            var txtStyle = "";
            if (disX == 0 || disX < 0) {
                txtStyle = "left:0px";
            } else if (disX > 0) {
                txtStyle = "left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    txtStyle = "left:-" + (delBtnWidth + editBtnWidth) + "px";
                }
            }
            var index = e.target.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            this.setData({
                list: list
            });
        }
    },
    touchE: function (e) {
        if (e.changedTouches.length == 1) {
            var endX = e.changedTouches[0].clientX;
            var disX = this.data.startX - endX;
            var btnWidth = this.data.delBtnWidth + this.data.editBtnWidth;
            var txtStyle = "left:0";
            var index = e.target.dataset.index;
            var list = this.data.list;
            if (disX > 70) {
                txtStyle = "left:-" + btnWidth + "px"
                for (let i in list) {
                    list[i].txtStyle = "left:0px"
                }
            } else {
                this.setData({hidden: true});
            }
            list[index].txtStyle = txtStyle;
            this.setData({list: list});
        }
    },
    getEleWidth: function (w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = (750 / 2) / (w / 2);
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
        }
    },
    initEleWidth: function () {
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        var editBtnWidth = this.getEleWidth(this.data.editBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth,
            editBtnWidth: editBtnWidth
        });
    },
    delItemVerify: function () {
        this.setData({hidden: false});
    },
    delItemConfirm: function (e) {
        wx.showLoading({
            title: '删除中...',
            mask: true
        });
        let taht = this;
        let pilotId = e.currentTarget.dataset.pointId;
        var that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'user/deletePilot',
                    data: {
                        userId: userId,
                        token:token,
                        pilotId: pilotId
                    },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                            return;
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        }else{
                            wx.showToast({
                                title: '已删除',
                                icon: 'success',
                                duration: 1000,
                                complete: function () {
                                    setTimeout(function () {
                                        var index = e.target.dataset.index;
                                        var list = taht.data.list;
                                        list.splice(index, 1);
                                        taht.setData({
                                            list: list
                                        });
                                        taht.setData({ hidden: true });
                                    }, 1000);
                                }
                            });
                        }
                    }
                });
            }
        })
    },
    getData: function () {
        var that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'user/getPilotList',
                    data: {
                        userId: userId,
                        token:token
                    },
                    header: { 'content-type': 'application/json' },
                    success: function (res) {
                        wx.hideLoading();
                        if(res.statusCode == 506){
                            App.errShow(res.statusCode);
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        } else {
                            that.setData({ list: res.data.data });
                        }
                    }
                });
            }
        })
    }
})