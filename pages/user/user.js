const App = getApp();
Page({
    data: {
        customerName: '',
        userName: '',
        phone: '',
        money: '正在统计',
        version:getApp().globalData.version
    },
    onLoad: function() {
        let userinfo = wx.getStorageSync('userInfo');
        if (!userinfo) {
            wx.reLaunch({
                url: '/pages/login/login'
            })
        }
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
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        }else{
                            that.setData({
                                money: res.data.data
                            })
                        }
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