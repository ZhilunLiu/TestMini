// miniprogram/pages/solutions/solutions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%90%88%E4%BD%9C%E6%A1%88%E4%BE%8B/%E4%B8%AD%E5%9B%BD%E5%B9%B3%E5%AE%89/%E5%B9%B3%E5%AE%89title.jpg?sign=f33fd6fb761629852b86277946e86b9c&t=1571975282',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%90%88%E4%BD%9C%E6%A1%88%E4%BE%8B/%E8%A7%84%E5%88%92%E8%AE%BE%E8%AE%A1%E9%99%A2/%E8%A7%84%E5%88%92%E8%AE%BE%E8%AE%A1%E9%99%A25.png?sign=bbb6867041082b37dc3fda2a32a318bb&t=1571963240',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%90%88%E4%BD%9C%E6%A1%88%E4%BE%8B/%E6%B9%96%E5%8D%97%E4%B8%AD%E7%83%9F/%E4%B8%AD%E7%83%9F1.jpg?sign=0bf7ee66c3f070e1d47b28058ce6edf2&t=1571977653',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%90%88%E4%BD%9C%E6%A1%88%E4%BE%8B/%E5%9B%BD%E5%AE%B6%E7%94%B5%E7%BD%91/%E7%94%B5%E7%BD%91title.jpg?sign=dada478ba54d79f9765e56391200ec8e&t=1571978541',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%90%88%E4%BD%9C%E6%A1%88%E4%BE%8B/%E4%BA%94%E8%8F%B1%E7%94%B5%E5%8A%9B/%E7%94%B5%E5%8A%9Btitle.png?sign=c105271a4e9eb9caf9aca499bd408bde&t=1571978713',
      'https://636c-cloudtest-s30u3-1300472119.tcb.qcloud.la/%E5%90%88%E4%BD%9C%E6%A1%88%E4%BE%8B/%E5%B7%A5%E5%95%86%E9%93%B6%E8%A1%8C/title.jpg?sign=4ae3d00b7d981ec0a3b6932b816a5cac&t=1571985237'

    ],
    names: ['中国平安', '规划设计院', '湖南中烟', '国家电网', '五菱电力','工商银行'],
    index:0,
    urls:[]
  },

  back: function () {
    console.log('-----------back');
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  goSolutionDetail:function(e){
    var name = e.currentTarget.dataset.name;
    console.log(e.currentTarget);
    wx.navigateTo({
      url: '../solutionDetail/solutionDetail?name=' + name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
/*
  search:function(item){
    var url = '';

    const db = wx.cloud.database()
    // 查询当前solution对应name
    db.collection('solutions').where({
      name: item,
    }).get({
      success: res => {
        url=res.data[0].url[0];
        this.data.urls.push(url);
        this.setData({
          imgUrls:this.data.urls
        })
        console.log(this.data.urls);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },*/
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