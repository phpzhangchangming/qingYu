// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        customerName: '',
        userName: '',
        phone: '',
        money: '',
        version:getApp().globalData.version
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                console.log(res);
                that.setData({
                    customerName: res.data.customerName,
                    userName: res.data.name,
                    phone: res.data.phone
                });
                wx.request({
                    url: getApp().globalData.url + '/customer/account/balance',
                    data: {
                        userId: res.data.id,
                        token: res.data.token
                    },
                    success: function (res) {
                        that.setData({
                            money:res.data.data
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
    },
    onReady: function () {
        console.log('onReady');
    },
})