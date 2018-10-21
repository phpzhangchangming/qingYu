const App = getApp();
Page({
    data: {
        id: 0,
        money: ''
    },
    topUP: function() {
        wx.showLoading({
            title: '充值中...',
            mask: true
        });
        let amount = this.data.money;
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                wx.request({
                    url: App.globalData.url + 'wechat/miniProgramUnifiedOrder',
                    data: {
                        userId: res.data.id,
                        token: res.data.token,
                        amount: amount
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                            return;
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        }else{
                            let timeStamp = res.data.data.timeStamp;
                            let nonceStr = res.data.data.nonceStr;
                            let packageStr = res.data.data.package;
                            let signType = res.data.data.signType;
                            let paySign = res.data.data.paySign;
                            wx.requestPayment({
                                timeStamp: timeStamp,
                                nonceStr: nonceStr,
                                package: packageStr,
                                signType: signType,
                                paySign: paySign,
                                success: function (e) {
                                    wx.reLaunch({
                                        url: "/pages/user/user"
                                    })
                                },
                                fail: function (e) {
                                    wx.showModal({
                                        title: '通知',
                                        content: '充值失败，请重试',
                                        showCancel: false,
                                        confirmText: '确定',
                                        success: function (res) { }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        });
    },
    bindMoney: function(e) {
        this.setData({
            money: e.detail.value
        })
    },
    rndNum: function(n) {
        let rnd = "";
        for (let i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    }
})