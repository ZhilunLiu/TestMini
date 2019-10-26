// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E9%AB%98%E7%AE%A1%E7%B3%BB%E5%88%97/%E5%9B%BD%E6%99%AF%E6%B2%B9%E6%BC%86%E5%9C%BA%E6%99%AFc7-min.jpg?sign=86c2f091c49cb19838ef807ac71b9904&t=1571777751',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E6%9F%8F%E6%8B%89%E5%9B%BE/%E6%9F%8F%E6%8B%89%E5%9B%BEc12-min.jpg?sign=61101834c91cad963d92e3e02722dbc9&t=1571777780',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E9%AB%98%E7%AE%A1%E7%B3%BB%E5%88%97/%E6%B2%B9%E6%BC%86%E5%9C%BA%E6%99%AFc1-min.jpg?sign=3054e319366cdbc2b3de8c2be7c8221f&t=1571777998'
    ],
    seriesUrls:[
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E4%B8%BB%E9%A1%B5/%E9%AB%98%E7%AE%A1%E7%B3%BB%E5%88%97.PNG?sign=2616f37efde9be9d9ef6cb061541327f&t=1572025488',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E4%B8%BB%E9%A1%B5/%E6%9F%8F%E6%8B%89%E5%9B%BE.PNG?sign=7985752d20d6ec9fa9038a931f5cb511&t=1572025499',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E4%B8%BB%E9%A1%B5/%E5%BC%80%E6%99%AE%E5%8B%92.PNG?sign=ac462ad0301f8ebcd18bfd0269cfb313&t=1572025516'
    ],
    seriesName:['高管系列','柏拉图','开普勒'],
    index:0,
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 1800
  },

  goProducts: function (event) {
    console.log('clicked');
    wx.navigateTo({
      url: '../productList/productList',
    })
  },

  goSolutions: function (event) {
    console.log('clicked');
    wx.navigateTo({
      url: '../solutions/solutions',
    })
  },
  goCoop: function (event) {
    console.log('clicked');
    wx.navigateTo({
      url: '../Coop/Coop',
    })
  },

  tapSeries:function(event){
    var curUrl = event.currentTarget.dataset.url;
    var index = event.currentTarget.dataset.index;
    var name = this.data.seriesName[index];
    wx.navigateTo({
      url: '../series/series?name=' + name,
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