var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures: ['https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-1.png?sign=0f2c7bd2a1f32864be093933e2d112a0&t=1571975540', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-2.png?sign=6f666ef3bfc6877444e02c4ca9392cfc&t=1571975555', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-3.png?sign=011254d8bb7edc93a368064e893891d6&t=1571975565', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-4.png?sign=2a2a9e8b317f56e55663702217a3341a&t=1571975573', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-5.png?sign=12487ceacfe4c935f75d2739deabaa36&t=1571975582', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-6.png?sign=ee8cc76323440cf67eb66b8166de7fca&t=1571975590', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-7.png?sign=af31606a793f2c493fd42d52415881a9&t=1571975598', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-8.png?sign=708322d4ff829ecfc3f518101082c3e9&t=1571975606', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-9.png?sign=8b0f2a9d9e6c3444bf6f4b4ba65aeb4b&t=1571975615', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-10.png?sign=cb8304759a42f2e04eb25ab93a99131e&t=1571975625', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-11.png?sign=f4485b66ec16fe4e478157afa4ba62ce&t=1571975634', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-12.png?sign=044390e09b985a149eb52faffa9d5882&t=1571975642', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-13.png?sign=2144c0237d823d904003550585345180&t=1571975651', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-14.png?sign=ed29d51cb1d5d847b7e3c71c9d8e800e&t=1571975660', 'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-15.png?sign=7bf3786996ed65a3f8f76a5fd52d6d7c&t=1571975669','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B/about-16.png?sign=0155bf70adfdcb71ec8666ab4220add8&t=1571975678']
    
  },

  previewImage: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = this.data.pictures;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
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