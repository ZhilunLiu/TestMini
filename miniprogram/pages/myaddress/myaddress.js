// miniprogram/pages/myaddress/myaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:[],
      phone:[],
      hasAddress:false,
      address:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app =getApp();
    var nowopenId = app.globalData.openId;
    console.log('open Id is' + nowopenId);
    const db = wx.cloud.database();
    db.collection('users').where({
      openid: nowopenId
    }).get({
      success: res => {
        console.log(res);
        if (res.data[0].address[0] !== undefined) {
          this.setData({
            name:res.data[0].name,
            phone:res.data[0].phone,
            address: res.data[0].address,
            hasAddress: true
          })
        }
        //console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  addAddress:function(e){
    wx.navigateTo({
      url: '../addAddress/addAddress',
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