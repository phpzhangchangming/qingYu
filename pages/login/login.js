const App = getApp();
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        login: true,
        show: true,
        phone:'',
        time:60,
        showTime:false
    },
    onLoad: function() {
        var that = this;
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            wx.switchTab({
                                url: '/pages/index/index'
                            })
                        }
                    });
                } else {
                    that.setData({
                        login: false
                    });
                }
            }
        })
    },
    phoneData:function(e){
        this.setData({phone:e.detail.value})
    },
    getVerifyCode:function(){
        this.countDown();

        this.setData({showTime:true});

        let phone = this.data.phone;
        let that = this;
        wx.request({
            url: getApp().globalData.url + 'user/getVerifyCode',
            data: {
                phone:phone
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if(res.data.result == 0){
                    wx.showModal({
                        title: '通知',
                        content: '登录失败，请核实信息',
                        showCancel: false,
                        confirmText: '确定',
                    })
                }else{
                    that.setTime();
                }
            }
        })
    },
    countDown:function(){
        if(this.data.time == 0){
            this.setData({
                time:60,
                showTime:false
            })
        }else{
            let that = this;
            setTimeout(function(){
                that.setData({time:that.data.time - 1})
                that.countDown();
            },1000);
        }
    },
    phoneLogin: function(e) {
        var that = this;
        let phone = e.detail.value.phone;
        let verifyCode = e.detail.value.verifyCode;
        wx.request({
            url: getApp().globalData.url + 'user/login',
            data: {
                phone:phone,
                verifyCode:verifyCode
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if(res.data.result == 0){
                    wx.showModal({
                        title: '通知',
                        content: '登录失败，请核实信息',
                        showCancel: false,
                        confirmText: '确定',
                    })
                }else{
                    wx.login({
                        success: res => {
                            wx.request({
                                url: that.globalData.url_openid,
                                data: {
                                    code: res.code,
                                    id: res.data.data.id,
                                    token: res.data.data.token
                                },
                                success: res => {}
                            })
                        }
                    });
                    wx.setStorage({
                        key:'userInfo',
                        data: {
                            id: res.data.data.id,
                            token: res.data.data.token,
                            customerName: res.data.data.customerName,
                            phone: res.data.data.phone,
                            name: res.data.data.name,
                        }
                    })
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
            }
        })
    },
    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            this.setData({
                show: false
            });
        } else {
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    }
})