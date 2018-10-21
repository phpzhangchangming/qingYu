const App = getApp();
Page({
    data: {
        id: 0,
        name: '',
        areaMu: '',
        crop: ''
    },
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userInfo');
        if (!userinfo) {
            wx.reLaunch({
                url: '/pages/login/login'
            })
        }
        this.setData({
            id: options.id,
            name: options.name,
            areaMu: options.areaMu,
            crop: options.crop
        });
    },
    changePlaceholder:function(e){
        this.setData({
            crop: e.detail.value
        })
    },
    changeName:function(e){
        this.setData({
            name: e.detail.value
        })
    },
    submitEdit:function(){
        wx.showLoading({
            title: '修改中...',
        });
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                let plantingStructure = that.data.crop;
                let name = that.data.name;
                let farmlandId = that.data.id;
                wx.request({
                    url: getApp().globalData.url + 'farmland/add',
                    data: {
                        userId: userId,
                        token: token,
                        farmlandId: farmlandId,
                        name: name,
                        plantingStructure: plantingStructure
                    },
                    success: function (res) {
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        }else{
                            wx.hideLoading();
                            wx.reLaunch({
                                url: '/pages/ground/ground'
                            })
                        }
                    }
                })
            }
        })
    }
})