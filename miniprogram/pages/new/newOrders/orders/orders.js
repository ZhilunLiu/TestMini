// miniprogram/pages/newOrders/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer:'',
    address:'',
    dealdate:'',
    duedate:'',
    orderTotal:0,
    company:'',
    dealer:'',
    phone:'',
    orderNumber:0,
    orderId:0,
    status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
    }),

    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    console.log(this.data.data);
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('orders').where({
      _id: this.data.orderId
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          customer :res.data[0].customer,
          address: res.data[0].address,
          status:res.data[0].status,
          phone:res.data[0].phone,
          dealdate: res.data[0].dealdate,
          duedate:res.data[0].duedate,
          orderTotal:res.data[0].orderTotal,
          company:res.data[0].company,
          dealer:res.data[0].dealer,
        })
        console.log('[数据库] [查询记录] 成功: ', res);

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

  dealdateInput: function (e) {
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

  caigoudan:function(){
    const db = wx.cloud.database();
    db.collection('orders').where({
      _id:this.data.orderId
      }).update({
      data: {
        orderNumber:0,
        customer:this.data.customer,
        address:this.data.company,
        dealer:this.data.nickname,
        dealdate:this.data.dealdate,
        duedate:this.data.duedate,
        orderTotal:this.data.orderTotal,
        company:this.data.company,
        phone:this.data.phone,
        status:'',

      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          orderId:res._id,
        })
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateTo({
          url: '../newOrders/orders/orders?orderId='+this.data.orderId,
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
})