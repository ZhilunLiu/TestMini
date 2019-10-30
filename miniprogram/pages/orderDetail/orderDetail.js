// miniprogram/pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    date:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //解码，转换对象
    var orderr = JSON.parse(decodeURIComponent(options.order));

    var time = options.date;
    console.log('date is ' + time);
    //时差解决办法
    /*
    var list = date.split(" ");
    console.log(list);
    var year = list[4];
    var month = this.convertToNumber(list[2]);
    var date = list[3]
    var time = year+'年'+month+'月'+date+'日';
    console.log('time is '+time);
    */

    this.setData({
      order:orderr,
      date:time
    })
  },

  track:function(e){
    wx.navigateTo({
      url: '../track/track',
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



})