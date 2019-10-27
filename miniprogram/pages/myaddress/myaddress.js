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
      dataId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.popup = this.selectComponent("#popup");
    var app = getApp();
    var openId = app.globalData.openId;
    console.log('openId is ' + openId);
    if (openId === undefined || openId == '') {
      this.popup.showPopup();
    }
    this.search();
  },

  //选择地址
  chooseAdd:function(e){
    var app = getApp();
    if (app.globalData.paying){
      var idx = e.currentTarget.dataset.index;
      var add = this.data.address[idx];
      var pho = this.data.phone[idx];
      var name = this.data.name[idx];
      app.globalData.chooseAdd = add;
      app.globalData.choosePho = pho;
      app.globalData.chooseName = name;
      wx:wx.navigateTo({
        url: '../bill/bill',
      })
    }
  },

  //弹窗
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
    this.back();
  },
  //上一级
  back: function (e) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  search:function(e){
    var app = getApp();
    var nowopenId = app.globalData.openId;
    const db = wx.cloud.database();
    db.collection('users').where({
      _openid: nowopenId
    }).get({
      success: res => {
        if (res.data[0].address[0] !== undefined) {
          this.setData({
            name: res.data[0].name,
            phone: res.data[0].phone,
            address: res.data[0].address,
            hasAddress: true,
            dataId: res.data[0]._id,
          })
        }
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

  deleteAddress: function(e) {
    var idx = e.currentTarget.dataset.index;
    var newname = this.data.name.splice(idx,idx+1);
    var newphone = this.data.phone.splice(idx, idx + 1);
    var newaddress = this.data.address.splice(idx, idx + 1);
    console.log(this.data.name);
    console.log(this.data.phone);
    console.log(this.data.address);
    const db = wx.cloud.database();
    var app = getApp();
    var id = app.globalData.openId;
    console.log(id);

    db.collection('users').doc(this.data.dataId).update({
      data: {
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.address
      },
      success: res => {
        this.setData({
          name :this.data.name,
          phone: this.data.phone,
          address: this.data.address,
        })
        console.error('[数据库] [更新记录] 成功', res);
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
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
    this.search();
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