const App = getApp();
Page({
    data: {
        butText: '添 加',
        title:'添加飞手',
        name: '',
        phone: '',
        id:0,
        type:'add'
    },
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userInfo');
        if (!userinfo) {
            wx.reLaunch({
                url: '/pages/login/login'
            })
        }
        if (options.type == 'change') {
            this.setData({
                butText: '修 改',
                title:'修改飞手',
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
                let data = {
                    userId :userId,
                    token:token,
                    id:that.data.id,
                    name:name,
                    phone:phone
                };
                if (that.data.type == 'add') {
                    delete (data.id);
                }
                wx.request({
                    url: getApp().globalData.url + 'user/savePilot',
                    data: data,
                    success: function (res) {
                        wx.hideLoading();
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                        }else if(res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
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