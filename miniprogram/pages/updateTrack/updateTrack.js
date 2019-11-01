// miniprogram/pages/updateTrack/updateTrack.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    status:'',
    trackCom:'',
    trackNum:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.orderId;
    if(id==''||id ===undefined){
      console.log('id is invalid');
    }
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('orders').where({
      _id: id
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          order: res.data[0],
          status: res.data[0].status,
          trackCom: res.data[0].trackCompany,
          trackNum: res.data[0].trackNum,
        })
        console.log('[数据库] [查询记录] 成功: ', res);
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

  save:function(e){
    const db = wx.cloud.database();
    db.collection('orders').doc(this.data.order._id).update({
      data: {
        status: this.data.status,
        trackCompany: this.data.trackCom,
        trackNum: this.data.trackNum
      },
      success: res => {
        console.error('[数据库] [更新记录] 成功', res);
        this.back();
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })

  },

  back:function(e){
    wx:wx.navigateBack({
      delta: 1,
    })
  },

  statusInput:function(e){
    this.setData({
      status: e.detail.value
    })
  },

  companyInput: function (e) {
    this.setData({
      trackCom: e.detail.value
    })
  },

  trackNumInput: function (e) {
    this.setData({
      trackNum: e.detail.value
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