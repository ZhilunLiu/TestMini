// miniprogram/pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:'',
      phone:'',
      region:'',
      city:'',
      address:'',
      index:0,
    hasNoRegion:true,
  },

  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      hasNoRegion:false,
    })
  },

  phoneInput:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  save:function(e){
    
  },

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

  }
})