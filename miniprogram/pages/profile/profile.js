// miniprogram/pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      logged:false,
      openId:'',
      avatarUrl:'',
      name:'',
  },



  getInfo:function(e){
    var app = getApp();
    console.log(e.detail.userInfo);
    this.login();
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      logged:true,
      avatarUrl: e.detail.userInfo.avatarUrl,
      name: e.detail.userInfo.nickName
    })
  },

  goMyorders:function(e){
    var openid = e.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../myorders/myorders',
    })
  },

  goMyaddress:function(e){
    var openid = e.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },

  goCart:function(e){
    var openid = e.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../cart/cart?openid',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  login: function (e) {
    var app = getApp();
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        var openid = res.result.openid;
        app.globalData.openId = openid;
        console.log('云函数获取到的openid: ', res.result.openid)
      }
    })
  }
})