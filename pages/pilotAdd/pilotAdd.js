const App = getApp();
Page({
    data: {
        butText: '添 加',
        name: '',
        phone: '',
        id:0,
        type:'add'
    },
    onLoad: function (options) {
        if (options.type == 'change') {
            this.setData({
                butText: '修 改',
                name:options.name,
                phone:options.phone,
                id:options.id,
                type:'change'
            });
        }
    },
    formSubmit: function (e) {
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        var that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                let name = e.detail.value.name;
                let phone = e.detail.value.phone;
                if (that.data.type == 'add') {
                    delete (data.id);
                }
                wx.request({
                    url: getApp().globalData.url + 'user/savePilot',
                    data: {
                        userId: userId,
                        token: token,
                        id: that.data.id,
                        name: name,
                        phone: phone
                    },
                    success: function (res) {                    //从数据库获取用户信息
                        wx.hideLoading();
                        if (res.data.result != 1) {
                            wx.showModal({
                                title: '通知',
                                content: '操作失败，请联系管理员',
                                showCancel: false,
                                confirmText: '确定',
                                success: function (res) { }
                            })
                        } else {
                            wx.reLaunch({
                                url: "/pages/pilot/pilotList"
                            })
                        }
                    }
                });
            }
        })
    }
});