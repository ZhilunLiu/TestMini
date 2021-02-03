// miniprogram/pages/new/claims/claims.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    claims:[],
    manager:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
      manager:getApp().globalData.manager,
    })
    const db = wx.cloud.database();
    console.log('正在加载报销信息，订单号为'+this.data.orderId);
    // 加载报销信息
    db.collection('orders').where({
      _id: this.data.orderId
    }).get({
      success: res => {
        this.setData({
          claims: res.data[0].claims,
        })
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

  newClaims:function(){
    console.log('正在新增报销,claims 是',this.data.claims);
    wx.navigateTo({
      url: '../newClaims/newClaims?orderId='+this.data.orderId,
    })
  },

  moneyInput:function (e) {
    var index = e.currentTarget.dataset.id;
    var claims = this.data.claims;
    claims[index].money = e.detail.value;
    this.setData({
      claims: claims
    })
  },

  save:function(){
    wx.showToast({
      title: '正在更改中',
      duration:5000,
      icon:'loading'
    })
      const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').doc(this.data.orderId).update({
        data:{
          claims:this.data.claims
        },
        success: res => {
          console.log('[user] [更新记录] 成功: ', res);
          wx.hideToast();

        },
      })
  },

  deleteClaim:function(e){
    var claims = this.data.claims;
    var index = e.currentTarget.dataset.index;
    claims.splice(index,1)
    this.setData({
      claims:claims
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

  },
})