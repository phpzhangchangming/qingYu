// pages/ground/groundedit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        name: '',
        area: '',
        crop: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
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
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})