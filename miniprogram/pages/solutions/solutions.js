// miniprogram/pages/solutions/solutions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    names: [],
    index:0

  },

  back: function () {
    console.log('-----------back');
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      names: ['中国平安', '规划设计院','湖南中烟','国家电网','五菱电力']
    })
    this.names = ['中国平安', '规划设计院', '湖南中烟', '国家电网', '五菱电力'];
    var urls = [];
    const db = wx.cloud.database()
    for(let i=0;i<this.names.length;i++){
      var itemName = this.names[i];
      
      // 查询当前solution对应name
      db.collection('solutions').where({
        name: itemName
      }).get({
        success: res => {
          urls.push(res.data[0].url[0]);
          if(i==this.names.length-1){
            this.setData({
              imgUrls:urls
            })
            
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
    this.imgUrls = urls;
    //console.log(this.names);
    console.log(this.imgUrls);
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