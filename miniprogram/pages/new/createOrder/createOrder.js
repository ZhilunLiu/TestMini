// miniprogram/pages/createOrder/createOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer:'',
    address:'',
    dealdate:'请选择下单日期',
    duedate:'请选择交货日期',
    orderTotal:0,
    company:'选择开票单位',
    nickname:'',
    phone:'',
    orderNumber:0,
    orderId:'',
    contact:'',
    dataId:'',
    orderManager:'请选择业务主管',
    orderManagerList: [],
    orderStuff:'请选择经办人',
    orderStuffList:[],
    paid:0,
    hasnotSelectKaipiao:true,
    companyList:[],
    test:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app =getApp();
    this.setData({
      companyList:app.globalData.companyList,
    });
    const db = wx.cloud.database();
    //get all users
    db.collection('users').get({
      success: res => {
        var userLen = res.data.length;
        var batchTimes = Math.ceil(userLen / 20);
        var batchNum = 0;
        for(let i = 0; i < batchTimes; i++){
          for(let j = 0; j < Math.min(userLen, 20); j++){
            this.setData({
              orderManagerList:this.data.orderManagerList.concat(res.data[batchNum + j].name),
              })
            this.setData({
              orderStuffList:this.data.orderStuffList.concat(res.data[batchNum + j].name),
            })
          }
          batchNum += 20;
        }
        console.log('[数据库] [查询记录] 成功: ', res);
        console.log(this.data.orderStuffList[0]);
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
    //
    db.collection('orders').get({
      success: res => {
        var len = res.data.length;
        console.log('长度是',len)
        this.setData({
          orderNumber:res.data[len-1].orderNumber+1,
        })
        console.log('[数据库] [查询记录] 成功: ', res);
        console.log('updating the orderNumber the orderNumberId is  (((((((((((((((((((((((((((((((((((((',this.data.orderNumber);
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
    this.setData({
      nickname:options.nickname
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



  
  nameInput: function (e) {
    this.setData({
      customer: e.detail.value
    })
  },

  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  dealDateInput: function (e) {
    this.setData({
      dealdate: e.detail.value
    })
  },

  duedateInput: function (e) {
    this.setData({
      duedate: e.detail.value
    })
  },

  orderTotalInput: function (e) {
    this.setData({
      orderTotal: e.detail.value
    })
  },

  companyInput: function (e) {
    this.setData({
      company: e.detail.value
    })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  contactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  orderManagerInput:function (e) {
    this.setData({
      orderManager: e.detail.value
    })
  },

  orderStuffInput:function (e) {
    this.setData({
      orderStuff: e.detail.value
    })
  },

  create:function(){
    var data = this.data
    if (data.customer == '' || data.address == '' || data.dealer == '' || data.dealdate == '请选择下单日期' || data.duedate=='请选择交货日期' ||data.orderTotal == ''||data.company == '选择开票单位'|| data.phone == ''||
    data.contact == ''||data.orderManager == '请选择业务主管'||data.orderStuff == '请选择经办人') {
      wx.showToast({
        icon: 'none',
        title: '请填写完整订单信息',
        duration: 2000
      })
      return;
    }
    var year = this.data.dealdate.slice(0,4);
    const db = wx.cloud.database();
    db.collection('orders').add({
      data: {
        orderNumber:this.data.orderNumber,
        customer:this.data.customer,
        address:this.data.company,
        dealer:this.data.nickname,
        dealdate:this.data.dealdate,
        duedate:this.data.duedate,
        orderTotal:this.data.orderTotal,
        company:this.data.company,
        phone:this.data.phone,
        status:'未下单',
        contact:this.data.contact,
        orderManager:this.data.orderManager,
        orderStuff:this.data.orderStuff,
        year:year,
        carts:[],
        claims:[],
        caigouTotal:'0.00',
        commision:'',
        paid:'',
        orderReg:'',
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          orderId:res._id,
        })
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateBack({
          delta: 0,
        })
        //wx.navigateTo({
          //url: '../newOrders/orders/orders?orderId='+this.data.orderId,
        //})
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

  companyChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasnotSelectKaipiao: false,
      company: this.data.companyList[e.detail.value],
    })
  }, 

  dealdateChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dealdate: e.detail.value
    })
  },

  duedateChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      duedate: e.detail.value
    })
  },

  orderManagerChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      orderManager: this.data.orderManagerList[e.detail.value]
    })
  },

  orderStuffChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      orderStuff: this.data.orderStuffList[e.detail.value]
    })
  },
})