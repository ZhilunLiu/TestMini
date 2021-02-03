// miniprogram/pages/new/stuffInfo/stuffInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
    manager:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      manager:getApp().globalData.manager,
    })

    const db = wx.cloud.database();
    db.collection('users').where({
    }).get({
      success: res => {
        console.log('[user] [查询记录] 成功: ', res);
        this.setData({
          users:res.data
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

  stuffDetail:function(event){
    var index = event.currentTarget.dataset.id;
    console.log('123123123123123',this.data.users[index]);
    //wx.navigateTo({
    //  url: '../stuffSum/stuffSum?openId='+this.data.users[index]._openId+'&name='+this.data.users[index].name,
    //})
  },

  nameInput: function (e) {
    var index = e.currentTarget.dataset.id;
    var users = this.data.users;
    users[index].name = e.detail.value;
    this.setData({
      users: users
    })
  },

  phoneInput: function (e) {
    var index = e.currentTarget.dataset.id;
    var users = this.data.users;
    users[index].phone = e.detail.value;
    this.setData({
      users: users
    })
  },

  addressInput: function (e) {
    var index = e.currentTarget.dataset.id;
    var users = this.data.users;
    users[index].address = e.detail.value;
    this.setData({
      users: users
    })
  },

  save:function(){
    wx.showToast({
      title: '正在更改中',
      duration:5000,
      icon:'loading'
    })
    var users = this.data.users;
    for(var index in users){
      const db = wx.cloud.database();
      console.log('正在更新',users[index]);
      // 查询当前家具的details对应name
      db.collection('detail').doc(users[index]._id).update({
        data:{
          name:users[index].name,
          phone:users[index].phone,
          address:users[index].address,
        },
        success: res => {
          console.log('[user] [更新记录] 成功: ', res);
        },
  
      })
    }
    wx.hideToast();


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