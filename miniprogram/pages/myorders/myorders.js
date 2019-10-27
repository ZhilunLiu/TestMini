// miniprogram/pages/myorders/myorders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //弹窗
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
    this.back();
  },
  //上一级
  back: function (e) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.popup = this.selectComponent("#popup");
    var app = getApp();
    var openId = app.globalData.openId;
    console.log('openId is ' + openId);
    if (openId === undefined || openId == '') {
      this.popup.showPopup();
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

  }
})