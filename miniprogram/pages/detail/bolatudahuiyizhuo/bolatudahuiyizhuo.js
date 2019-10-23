// miniprogram/pages/detail/bolatudahuiyizhuo/bolatudahuiyizhuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E6%9F%8F%E6%8B%89%E5%9B%BE/c2%20%E5%A4%A7%E4%BC%9A%E8%AE%AE%E6%A1%8C-2-7000.jpg?sign=f706d6371928a625f15be9c4298c9470&t=1571852933'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 1800,
    imageWidth:0,
    imageHeight:213
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInstance = getApp();
    console.log(appInstance.globalData.sysWidth);
    this.setData({
      imageWidth: appInstance.globalData.sysWidth
    });
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