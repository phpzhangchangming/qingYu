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
        wx.hideLoading();
        let that = this;
        wx.getSetting({
            success: function(res) {
                let userinfo = wx.getStorageSync('userInfo');
                if (res.authSetting['scope.userInfo'] && !userinfo) {
                    that.setData({
                        show: false
                    });
                } else if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            wx.switchTab({
                                url: '/pages/index/index'
                            })
                        }
                    });
                }else{
                    that.setData({
                        login: false
                    });
                }
            }
        })
    },
    clearPhone:function(){
        this.setData({ phone: '' })
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
                        content: '获取验证码失败',
                        showCancel: false,
                        confirmText: '确定',
                    })
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
        if (!verifyCode){
            wx.showModal({
                title: '通知',
                content: '请填写验证码',
                showCancel: false,
                confirmText: '确定',
            })
            return;
        }
        wx.showLoading({
            title: '登录中...',
            mask: true
        });
        wx.request({
            url: getApp().globalData.url + 'user/adminLogin',
            data: {
                phone:phone,
                verifyCode:verifyCode
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if (res.data.result == 0) {
                    wx.hideLoading();
                    wx.showModal({
                        title: '通知',
                        content: res.data.errors,
                        showCancel: false,
                        confirmText: '确定',
                    })
                }else{
                    wx.login({
                        success: resLogin => {
                            wx.request({
                                url: getApp().globalData.url + 'wechat/getMiniProgramOpenid',
                                data: {
                                    code: resLogin.code,
                                    userId: res.data.data.id,
                                    token: res.data.data.token
                                },
                                success: resUrl => {
                                    wx.hideLoading();
                                    if (res.statusCode == 506) {
                                        App.errShow(res.statusCode);
                                    } else if (res.data.result != 1) {
                                        App.errShow(res.statusCode, res.data.errors);
                                    }else{
                                        wx.setStorageSync('userInfo', {
                                            id: res.data.data.id,
                                            token: res.data.data.token,
                                            customerName: res.data.data.customerName,
                                            phone: res.data.data.phone,
                                            name: res.data.data.name,
                                        })
                                        wx.switchTab({
                                            url: '/pages/index/index'
                                        })
                                    }
                                }
                            })
                        }
                    });
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