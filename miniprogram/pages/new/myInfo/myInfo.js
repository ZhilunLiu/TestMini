// miniprogram/pages/new/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    name:'',
    phone:'',
    address:[],
    openId:'',
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var userInfo = app.globalData.userInfo;
    this.setData({
      nickname:userInfo.nickname,
      openId:userInfo.openId,
    })
    this.searchUser();
  },

  searchUser:function(e){
    const db = wx.cloud.database();
    db.collection('users').where({
      _openid: getApp().globalData.openId
    }).get({
      success: res => {
        console.log('[user] [查询记录] 成功: ', res);
        this.setData({
          phone:res.data[0].phone,
          name:res.data[0].name,
          address:res.data[0].address,
          id:res.data[0]._id,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: com => {
        wx.hideToast();
      }
    })
  },

  nameInput:function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  phoneInput:function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  addressInput:function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  save:function(){
    const db = wx.cloud.database();
    db.collection('users').doc(this.data.id).update({
      data: {
        name:this.data.name,
        phone:this.data.phone,
        address:this.data.address,
      },  
      success: res => {
        console.log('[user] [更新记录] 成功: ', res);
        wx.navigateBack({
          delta: 0,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: com => {
        wx.hideToast();
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

  }
})