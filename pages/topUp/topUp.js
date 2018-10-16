const App = getApp();
Page({
    data: {
        id: 0,
        money: ''
    },
    topUP: function() {
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
                    success: function(res) {
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
                            success: function (e) {},
                            fail: function (e) {}
                        })
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