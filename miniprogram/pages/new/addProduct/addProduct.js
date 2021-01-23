// miniprogram/pages/new/addProduct/addProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log('seriesList is !!!! ', res);
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

})