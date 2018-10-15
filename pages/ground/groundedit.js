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
    submitEdit:function(){
        let that = this;
        let plantingStructure = this.data.crop;
        let name = this.data.name;
        let farmlandId = this.data.id;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                wx.request({
                    url: getApp().globalData.url + '/farmland/add',
                    data: {
                        userId: res.data.id,
                        farmlandId: farmlandId,
                        name:name,
                        plantingStructure: plantingStructure
                    },
                    success: function (res) {
                        if(res.result == 1){
                            wx.switchTab({
                                url: '/pages/ground/ground'
                            })
                        }else{

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