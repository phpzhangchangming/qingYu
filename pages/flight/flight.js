// pages/flight/flight.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        page:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中...'
        });
        this.getData();
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
        let that = this;
        // 显示加载图标
        wx.showLoading({
            title: '玩命加载中',
        });
        this.setData({page:that.data.page+1});

        wx.request({
            url: getApp().globalData.url+'/flyRecord/getFlyRecordList',
            data: {
                uavId:1,
                userId:1,
                page:that.data.page,
                limit:20
            },
            header: {'content-type': 'application/json'},
            success: function (res){
                wx.hideLoading();

                // 回调函数
                let moment_list = that.data.list;
                let lists = res.data.data.list;
                for (var index in lists) {
                    moment_list.push({
                        id: lists[index].id,
                        name: lists[index].pilotName,
                        num: lists[index].uavHardwareSn,
                        fTime: lists[index].flyDuration+'秒',
                        distance: lists[index].flyTotalDistance,
                        time: lists[index].flyStartTime,
                    });
                }
                that.setData({
                    list: moment_list
                });
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    getData:function() {
        var that = this;
        wx.request({
            url: getApp().globalData.url+'/flyRecord/getFlyRecordList',
            data: {
                uavId:1,
                userId:1,
                page:1,
                limit:20
            },
            header: {'content-type': 'application/json'},
            success: function (res) {   //从数据库获取用户信息
                wx.hideLoading();
                let lists = res.data.data.list;
                let list = [];
                for (var index in lists) {
                    list.push({
                        id: lists[index].id,
                        name: lists[index].pilotName,
                        num: lists[index].uavHardwareSn,
                        fTime: lists[index].flyDuration+'秒',
                        distance: lists[index].flyTotalDistance,
                        time: lists[index].flyStartTime,
                    });
                }
                that.setData({list:list})
            }
        });
    }
})