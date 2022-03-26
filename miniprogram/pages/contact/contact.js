//contact.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/map-marker-48.png",
      id: 0,
      latitude: 28.147820,
      longitude: 112.995530,
      width: 35,
      height: 35,
      callout: {
        content:"湖南鑫诺家具有限公司",
        fontSize:14,
        color: "#000",
        padding: 8,
        display: 'ALWAYS',
      }
    }],

  },


  phoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '13507484078',
    })
  },
  
  navigateClick: function (e){
    wx.openLocation({
      latitude: 28.147820,
      longitude: 112.995530,
      scale:14,
      name: "湖南鑫诺家具有限公司",
      address: "雨花区桔园小区城开大厦综合楼803、804室",
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
    
  }
})