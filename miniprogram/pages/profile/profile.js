// miniprogram/pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      logged:false,
      openId:'',
      avatarUrl:'',
      nickname:'',
      manager:false,
      name:'',
      phone:'',
      orderNumber:'',
      series:'',
  },



  getInfo:function(e){
    var app = getApp();
    app.globalData.userInfo = e.detail.userInfo;
    console.log(app.globalData.userInfo);
    this.login();
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
  },



  goMyorders:function(e){
    console.log('go to my orders');
    wx.navigateTo({
      url: '../myorders/myorders',
    })
  },

  goMyaddress:function(e){
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },

  goCart:function(e){
    wx.navigateTo({
      url: '../cart/cart',
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
    var app = getApp();
    console.log('onShow!!!!!!')
    if (app.globalData.userInfo!== undefined&&app.globalData.userInfo!=null){
      console.log('logged in alredy')
      console.log(app.globalData.manager);
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName,
        manager: app.globalData.manager,
        logged:app.globalData.logged,
      })
    }


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
  login: function (e) {
    var app = getApp();
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        var openid = res.result.openid;
        app.globalData.userInfo.openId = openid;
        app.globalData.openId = openid;
        app.globalData.logged = true;
        console.log('云函数获取到的openid: ', res.result.openid)
        this.searchUser();
        this.verifyManager();
        this.setData({
          logged: app.globalData.logged,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickname: app.globalData.userInfo.nickName
        })
        //wx.hideToast();
      }
    })
  },

  addUser:function(e){
    const db = wx.cloud.database();
    console.log('no user in db, creating');
    db.collection('users').add({
      data: {
        name: [],
        phone: [],
        address: [],
        orders: [],
      },
      success: res => {
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id);
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

  searchUser:function(e){
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('users').where({
      _openid: getApp().globalData.openId
    }).get({
      success: res => {
        if (res.data.length==0) {
          this.addUser();
        }
        console.log('[user] [查询记录] 成功: ', res);
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

  verifyManager:function(e){
    var app = getApp();
    var openId = app.globalData.openId;
    console.log('verifing, openid is '+openId);
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('managers').where({
      openid: openId
    }).get({
      success: res => {
        if(res.data[0].openid==openId){
          app.globalData.manager = true;
          this.setData({
            manager:true,
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
      },
      complete: com =>{
        wx.hideToast();
      }
    })
    
  },


  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  orderNumInput: function (e) {
    this.setData({
      orderNumber: e.detail.value
    })
  },

  seriesInput: function (e) {
    this.setData({
      series: e.detail.value
    })
  },

  search:function(e){
    wx:wx.navigateTo({
      url: '../searchOrder/searchOrder?name='+this.data.name+'&phone='+this.data.phone+'&orderNumber='+this.data.orderNumber,
    })
  },


  // 上传图片
  doUpload: function () {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 2,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })
        // 上传图片
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          var timestamp = (new Date()).valueOf();
          const filePath = res.tempFilePaths[i];
          console.log('in for loop now')
          const cloudPath = 'test/' + timestamp + filePath.match(/\.[^.]+?$/)[0]
          that.upload(cloudPath, filePath);
        }

      },
      fail: e => {
        console.error(e)
      }
    })
  },


  upload: function (cloudPath, filePath) {
    console.log('uploading:');
    console.log(filePath);
    console.log(cloudPath);
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)

        app.globalData.fileID = res.fileID
        app.globalData.cloudPath = cloudPath
        app.globalData.imagePath = filePath
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            // get temp file URL
            console.log(res.fileList)
          }
        })
        wx.navigateTo({
          url: '../storageConsole/storageConsole'
        })
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

})
