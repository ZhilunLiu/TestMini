// miniprogram/pages/new/searchOrderResult/searchOrderResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    orderId:'',
    customer:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
      customer:options.customer
    }),
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    if(this.data.orderId!=undefined){
      this.findByOrderId();
    }
    if(this.data.customer!=undefined){
      this.findByName();
    }
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

  findByOrderId:function(){
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        _id: this.data.orderId
      }).get({
        success: res => {
          console.log(res);
          var orders = this.data.orders;
          var theOrder = {
            customer :res.data[0].customer,
            address: res.data[0].address,
            status:res.data[0].status,
            phone:res.data[0].phone,
            dealdate: res.data[0].dealdate,
            duedate:res.data[0].duedate,
            orderTotal:res.data[0].orderTotal,
            company:res.data[0].company,
            dealer:res.data[0].dealer, 
          }
          orders.push(theOrder);
          this.setData({
            orders:orders
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

  findByName:function(){
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        customer: this.data.customer
      }).get({
        success: res => {
          console.log('the res is ===================',res.data);
          this.setData({
            orders:res.data,
          })
          console.log('[数据库] [查询记录] 成功: ', res);
          console.log('the orders are =============',this.data.orders);
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

  select:function(event){
    var itemId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../newOrders/orders/orders?orderId='+itemId,
    })
  },
})