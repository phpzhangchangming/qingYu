// pages/pilotAdd/pilotAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      butText:'添加',
      name:'',
      phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.type == 'change'){
          this.setData({butText:'修改'});
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

    formSubmit:function(e){
        console.log(e.detail.value);
        let name = e.detail.value.name;
        let phone = e.detail.value.phone;
        console.log(formSubmit);
    }
})