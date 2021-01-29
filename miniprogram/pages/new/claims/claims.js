// miniprogram/pages/new/claims/claims.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    groupOrder: [],
    pageNumber: 1,
    totalPage: 1,
    claims:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId
    })
    const db = wx.cloud.database();
    console.log('正在加载报销信息，订单号为'+this.data.orderId);
    // 加载报销信息
    db.collection('orders').where({
      _id: this.data.orderId
    }).get({
      success: res => {
        this.setData({
          claims: res.data[0].claims,
        })
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

  newClaims:function(){
    console.log('正在新增报销');
    wx.navigateTo({
      url: '../newClaims/newClaims?orderId='+this.data.orderId+'&claims='+this.data.claims,
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

  //页数相关代码
  getTotalPage: function (len, itemInPage) {
    var totalPage = 1;
    if (len % itemInPage == 0) {
      totalPage = len / itemInPage;
    } else {
      totalPage = Math.floor(len / itemInPage) + 1;
    }
    return totalPage;
  },

  group: function (array, subGroupLength) {
    let index = 0;
    let newArray = [];
    let len = array.length;
    newArray.push(array.slice(index, Math.min(index += subGroupLength, len)));
    while (index < len) {
      newArray.push(array.slice(index, Math.min(index += subGroupLength, len)));
    }
    console.log('returing newArray===========', newArray);
    return newArray;
  },

  prevPage: function () {
    console.log('跳转到上一页');
    if (this.data.pageNumber > 1) {
      this.setData({
        orders: this.data.groupOrder[this.data.pageNumber - 2],
        pageNumber: this.data.pageNumber - 1,
      })
    }

  },

  nextPage: function () {
    console.log('跳转到下一页');
    if (this.data.pageNumber < this.data.totalPage) {
      this.setData({
        orders: this.data.groupOrder[this.data.pageNumber],
        pageNumber: this.data.pageNumber + 1,
      })
    }
  },
})