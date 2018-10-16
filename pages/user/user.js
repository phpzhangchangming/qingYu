Page({
    data: {
        customerName: '',
        userName: '',
        phone: '',
        money: '',
        version:getApp().globalData.version
    },
    onLoad: function() {
    },
    onShow:function(){
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                that.setData({
                    customerName: res.data.customerName,
                    userName: res.data.name,
                    phone: res.data.phone
                });
                wx.request({
                    url: getApp().globalData.url + 'customer/account/balance',
                    data: {
                        userId: res.data.id,
                        token: res.data.token
                    },
                    success: function (res) {
                        that.setData({
                            money: res.data.data
                        })
                    }
                })
            }
        })
    },
    checkList: function() {
        wx.navigateTo({
            url: '/pages/expense/expense'
        })
    },
    topUp: function() {
        wx.navigateTo({
            url: '/pages/topUp/topUp',
        })
    }
})