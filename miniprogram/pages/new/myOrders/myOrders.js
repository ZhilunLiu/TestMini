
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    orderId:0,
    customer:'',
    stuff:'',
    manager:false,
    groupOrder:[],
    pageNumber:1,
    totalPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      manager:getApp().globalData.manager,
    }),
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    console.log('业务员名字是---'+this.data.stuff);
    this.setStuff();
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

  setStuff:function(){
    var openId = getApp().globalData.openId;
    console.log('正在设置权限，openId为@@@@@@@@@@@@@',openId);
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('users').where({
        _openid:openId
      }).get({
        success: res => {
          console.log('查询结果@@@@@@@@@@@@@',res);
          this.setData({
            stuff:res.data[0].name,
          })
          this.findByStuff();
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

  findByStuff:function(){
    console.log('正在通过业务员查询，名字是---',this.data.stuff);
    const db = wx.cloud.database();
      // 通过业务经理来筛选
         //get count first
         db.collection('orders').where(
          {
            orderManager: this.data.stuff
          }
        ).count({
          success: res => {
            console.log('总共有',res.total,'条')
            var index = 0;
            while(index<res.total){
              db.collection('orders').where(
                {
                  orderManager: this.data.stuff
                }
              ).skip(index).get({
                success: res => {
                  console.log('concating-----------');
                  var orders = this.data.orders;
                  orders = orders.concat(res.data);
                  this.setData({
                    orders:orders
                  })
                  console.log('[数据库] [查询记录] 成功: ', res);
                  console.log('the orders are =============',this.data.orders);
                  this.getTotal();
                  wx.hideToast();
                }
              })
              index +=20;  
            }
          }
        })  
  },

  select:function(event){
    var itemId = event.currentTarget.dataset.id;
    var app = getApp();
    app.globalData.selectedOrderId = itemId;
    wx.navigateTo({
      url: '../newOrders/orders/orders?orderId='+itemId,
    })
  },
})