// miniprogram/pages/new/generateFrom/generateForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    orderId:'',
  },

  getInfo:function(){
    const db = wx.cloud.database();
    console.log('正在查询信息，表格ID为------------'+this.data.orderId);
      // 查询
      db.collection('orders').where({
        _id: this.data.orderId
      }).get({
        success: res => {
          console.log('the res is ===================',res.data);
          this.setData({
            carts:res.data[0].carts,
          })
          console.log('[数据库] [查询记录] 成功: ', res);
          console.log('the orders are =============',this.data.carts);
          wx.hideToast();
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = getApp().globalData.selectedOrderId;
    this.setData({
      orderId:orderId
    })
    console.log('onloading 正在载入生成表格，ID为==================='+this.data.orderId);
    this.getInfo();
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