Page({
    data: {
        id: 0,
        name: '',
        area: '',
        crop: ''
    },
    onLoad: function (options) {
        this.setData({
            id: options.id,
            name: options.name,
            area: options.area,
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
                        wx.hideLoading();
                        if(res.data.result == 1){
                            wx.reLaunch({
                                url: '/pages/ground/ground'
                            })
                        }else{
                            wx.showModal({
                                title: '通知',
                                content: '正在维护中，请稍后',
                                showCancel: false,
                                confirmText: '确定'
                            })
                        }
                    }
                })
            }
        })
    }
})