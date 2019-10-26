var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures: ['https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-1_optimized.png?sign=faaf3d38a5697b7e4db18a00fc965617&t=1572061284','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-2_optimized.png?sign=17c4e8ad7b1a7ce847370201ef28aee1&t=1572061298','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-3_optimized.png?sign=d15cc521572307f033fa764e009f33e4&t=1572061309','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-4_optimized.png?sign=77e6ff950f20145ab464306b914de1dd&t=1572061319','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-5_optimized.png?sign=4dfa8fb80fff3c278d882bf3622b9ebe&t=1572061328','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-6_optimized.png?sign=62aa6f391ba403bf65f1d441755f7fa9&t=1572061337','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-7_optimized.png?sign=6f8b1e485ef453ee9822fdd4a69b5480&t=1572061348','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-8_optimized.png?sign=49ebd544f04c14a0b965733c311a37f5&t=1572061357','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-9_optimized.png?sign=0e1147f4f00cb3572c7894f135a09248&t=1572061365','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-10_optimized.png?sign=af3b3a5931778e0638d2a42782e52ea3&t=1572061374','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-11_optimized.png?sign=81a583f75c2a50779ee16601305a43fd&t=1572061383','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-12_optimized.png?sign=8e1cae3a8f92d02bd095b38ea57d85f4&t=1572061393','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-13_optimized.png?sign=b6984103074ed23fa3c06c8865939e40&t=1572061402','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-14_optimized.png?sign=99d16b974f352be6460eff460cfa8206&t=1572061412','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-15_optimized.png?sign=269b828d1a61ef2b956acf327668dbf7&t=1572061421','https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%85%AC%E5%85%B1/%E5%85%AC%E5%8F%B8%E7%AE%80%E4%BB%8B%E4%BC%98%E5%8C%96/about-16_optimized.png?sign=7178f87513e702dbf20837fbb16ece2f&t=1572061430']
    
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