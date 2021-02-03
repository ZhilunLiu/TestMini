// miniprogram/pages/new/newClaims/newClaims.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    project:'',
    claims:[],
    money:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
    })
    const db = wx.cloud.database();
    db.collection('orders').where(
      {
        _id:this.data.orderId
      }
    ).get({
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          claims: res.data[0].claims,
        })
      },
      fail: err => {
        console.error('[数据库] 失败：', err)
      }
    })
  },

  save:function(){
    var data = this.data
    if (data.project==''&&data.money=='') {
      wx.showToast({
        icon: 'none',
        title: '请填写完整报销信息',
        duration: 2000
      })
      return;
    }
    var newClaims = {
      project:this.data.project,
      money:this.data.money,
    }
   
    var claims = this.data.claims;
    console.log(this.data.claims);
    if(claims==undefined||claims==''){
      claims = [];
    }
    
    claims.push(newClaims);
    const db = wx.cloud.database();
    db.collection('orders').doc(this.data.orderId).update({
      data: {
        claims:claims,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          orderId: res._id,
        })
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateBack({
          delta: 2,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
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

  projectInput: function (e) {
    this.setData({
      project: e.detail.value
    })
  },

  moneyInput: function (e) {
    this.setData({
      money: e.detail.value
    })
  },

})