// pages/flight/flight.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    //测试临时数据
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
                console.log(list);
                that.setData({list:list})
            }
        });


        var list = [
            {
                name: "张庆",
                num: "21796",
                fTime:'1分25秒',
                distance:"194.1",
                time: "2018-08-27 19:56:06",
            },{
                name: "张三",
                num: "132546",
                fTime:'1分25秒',
                distance:"194",
                time: "13241111111",
            },{
                name: "李四",
                num: "132546",
                fTime:'1分25秒',
                distance:"194",
                time: "13241111111",
            },{
                name: "14",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            },{
                name: "51",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            },{
                name: "71",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            },{
                name: "61",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            },{
                name: "81",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            },{
                name: "1",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            },{
                name: "1",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            },{
                name: "1",
                num: "132546",
                fTime:'0',
                distance:"0",
                time: "13241111111",
            }
        ];
        this.setData({
            list:list
        });
    }
})