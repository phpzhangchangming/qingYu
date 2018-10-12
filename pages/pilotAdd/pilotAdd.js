const App = getApp();
// pages/pilotAdd/pilotAdd.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        butText: '添 加',
        name: '',
        phone: '',
        id:0,
        type:'add'
    },

    /**
     * 生命周期函数--监听页面加载
     */
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

    },

    formSubmit: function (e){
        wx.showLoading({
            title: '加载中...',
            mask: true
        });

        let name = e.detail.value.name;
        let phone = e.detail.value.phone;
        let url = getApp().globalData.url+'/user/savePilot';
        let that = this;
        let data = {
            userId:1,// App.globalData.userInfo.userId,
            id:that.data.id,
            name:name,
            phone:phone
        };
        if(this.data.type == 'add'){
            delete(data.id);
        }
        wx.request({
            url: url,
            data: data,
            success: function (res) {                    //从数据库获取用户信息
                wx.hideLoading();
                if(res.data.result != 1){
                    wx.showModal({
                        title: '通知',
                        content: '操作失败，请联系管理员',
                        showCancel: false,
                        confirmText: '确定',
                        success: function (res) {}
                    })
                }else{
                    wx.reLaunch({
                        url: "/pages/pilot/pilotList"
                    })
                }
            }
        });
    }
});