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
      fname:'',
      price:'',
      size:'',
      desc:'',
      width:'',
      depth:'',
      height:'',
      type:'',
      typeList:['会议桌','班台','茶几/小桌','文件柜','沙发','员工工作站','其他'],
      hasntSelect:true,
      hasntSelect2:true,
      seriesList:[],
      imgUrls:[],
      newSeries:'',
      disPrice:'',
      customer:'',
      stuff:'',
      year:'',
      status:'',
      hasSelectStatus:false,
      statusList:'',
  },


  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasntSelect: false,
      type: this.data.typeList[e.detail.value],
    })
  }, 

  bindPicker2Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasntSelect2: false,
      series: this.data.seriesList[e.detail.value],
    })
  }, 

  statusChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.statusList[e.detail.value])
    this.setData({
      hasSelectStatus:true,
      status: this.data.statusList[e.detail.value],
    })
    console.log('改变成功，携带值为', this.data.status)
  }, 

  addNewSeries:function(e){
    if(this.data.newSeries == ''){
      //please enter series
      wx.showToast({
        icon: 'none',
        title: '请填写新系列'
      })
    }else{
      const db = wx.cloud.database();
      db.collection('gomeSeries').add({
        data: {
          name: this.data.newSeries,
          url: '',
          index: 100,
          imgs: [],
        },
        success: res => {
          var itemList = this.data.seriesList;
          itemList.push(this.data.newSeries);
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            seriesList:itemList,
          })
          wx.showToast({
            title: '添加系列成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }


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
    var statusList = getApp().globalData.statusList;
    this.setData({
      statusList:statusList
    })
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('gomeSeries').where({
    }).get({
      success: res => {
        var tempList = [];
        for(let i =0;i <res.data.length;i++){
          tempList.push(res.data[i].name);
        }
        this.setData({
          seriesList:tempList,
        })

        console.log('[数据库] [查询记录] 成功: ', res);
        wx.hideToast();
      },
      fail: err => {
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
    var app = getApp();
    console.log('onShow!!!!!!',this)
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
    console.log('no user in db, creating, the name is +');
    db.collection('users').add({
      data: {
        name: getApp().globalData.userInfo.nickName,
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

  myInfo:function(){
    wx.navigateTo({
      url: '../new/myInfo/myInfo',
    })
  },

  stuffInfo:function(){
    wx.navigateTo({
      url: '../new/stuffInfo/stuffInfo',
    })
  },

  searchUser:function(e){
    const db = wx.cloud.database();
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

  customerInput: function (e) {
    this.setData({
      customer: e.detail.value
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
      newSeries: e.detail.value
    })
  },

  fnameInput: function (e) {
    this.setData({
      fname: e.detail.value
    })
  },

  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  disPriceInput: function (e) {
    this.setData({
      disPrice: e.detail.value
    })
  },

  descInput: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },

  sizeInput: function (e) {
    this.setData({
      size: e.detail.value
    })
  },

  widthInput: function (e) {
    this.setData({
      width: e.detail.value
    })
  },

  depthInput: function (e) {
    this.setData({
      depth: e.detail.value
    })
  },

  heightInput: function (e) {
    this.setData({
      height: e.detail.value
    })
  },

  stuffInput:function (e) {
    this.setData({
      stuff: e.detail.value
    })
  },
  yearInput:function (e) {
    this.setData({
      year: e.detail.value
    })
  },
/*
  search:function(e){
    wx:wx.navigateTo({
      url: '../searchOrder/searchOrder?name='+this.data.name+'&phone='+this.data.phone+'&orderNumber='+this.data.orderNumber,
    })
  },
*/
  searchOrder:function(e){
    console.log('正在跳转订单页面 订单号为'+this.data.orderNumber+' 姓名为'+this.data.customer+'业务员姓名为'+this.data.stuff+'状态为'+this.data.status);
    var status = this.data.status;
    if(status=='不限状态'){
      status = '';
    }
    wx:wx.navigateTo({
      url: '../new/searchOrderResult/searchOrderResult?customer='+this.data.customer+'&orderId='+this.data.orderNumber+'&stuff='+this.data.stuff+'&year='+this.data.year+'&status='+status,
    })
  },

  create:function(e){
    wx:wx.navigateTo({
      url: '../new/createOrder/createOrder?nickname='+this.data.nickName,
    })
  },

  addFurniture:function(e){
    wx:wx.navigateTo({
      url: '../new/addProduct/addProduct'
    })
  },


  uploadImgbutton:function(){
    var data = this.data
    if (data.series == '' || data.fname == '' || data.type == '' || data.price == '' || data.desc == '', data.width == '', data.height == '') {
      wx.showToast({
        icon: 'none',
        title: '请填写完整家具信息',
        duration: 2000
      })
      return;
    }

    this.isDublicate();
  },

  isDublicate:function(){
    console.log('name is ' + this.data.fname + ' series is ' + this.data.series);
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('detail').where({
      name: this.data.fname,
      series: this.data.series
    }).get({
      success: res => {
        
        if(res.data.length ==0){
          this.doUpload()
        }else{
          wx.showToast({
            icon: 'none',
            title: '已有重复家具',
            duration: 1500,
          })
        }

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


  // 上传图片
  doUpload: function () {
  
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })
        // 上传图片
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          var newDateTime = (new Date()).valueOf();
          var name = that.data.fname;
          var series = that.data.series;
          const filePath = res.tempFilePaths[i];
          console.log('in for loop now')
          const cloudPath = series + '/' + name + newDateTime + filePath.match(/\.[^.]+?$/)[0]
          that.upload(cloudPath, filePath);
        }

      },
      fail: e => {
        console.error(e)
      }
    })
  },


  upload: function (cloudPath, filePath) {
    var that = this;
    var app = getApp();
    console.log('uploading:');
    console.log(filePath);
    console.log(cloudPath);
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {

        console.log('[上传文件] 成功：', res)
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            // get temp file URL
            //for (let i = 0; i < res.fileList.length;i++){
              //console.log('url is ' + res.fileList[i].tempFileURL)
            var temp = this.data.imgUrls;
            temp.push(res.fileList[0].tempFileURL);
            that.setData({
              imgUrls:temp
            })
            console.log(this.data.imgUrls);
            this.addTodb();
            //}
            console.log(imgUrls)
          }
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

  addTodb:function(){
    var dim = [[this.data.width,this.data.depth,this.data.height]];
    var price =[this.data.price];
    var size = [this.data.size];
    var disPrice = [this.data.disPrice];
    const db = wx.cloud.database();
    db.collection('detail').add({
      data: {
        name: this.data.fname,
        price: price,
        size: size,
        series: this.data.series,
        describtion: this.data.desc,
        type: this.data.type,
        url: this.data.imgUrls,
        dimension: dim,
        disPrice: disPrice,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
        })
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateTo({
          url: '',
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

  searchFurniture:function(){
    wx.navigateTo({
      url: '../new/searchProduct/searchProduct',
    })
  },

  myOrders:function(){
    wx.navigateTo({
      url: '../new/myOrders/myOrders',
    })
  },

})
