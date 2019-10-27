// miniprogram/pages/detail/bolatudahuiyizhuo/bolatudahuiyizhuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 1800,
    price:[],
    name:'',
    describtion:'',
    size:[],
    dimension:[],
    index:0,
    dimensionFlag:true
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },  

  bindchangeTag:function(e){
      console.log("调用swiper");
  },

  buy:function(e){
    var app = getApp();
    if(app.globalData.openid === undefined){
      
    }
    var curCartList = app.globalData.cartList;
    var itName = e.currentTarget.dataset.name;
    var found = false;
    if (curCartList.length != 0){
      console.log('not empty!');
      for (let i = 0; i < curCartList.length; i++) {
        if (curCartList[i].title == itName) {
          console.log('same item found');
          curCartList[i].num = curCartList[i].num + 1;
          found = true;
          break;
        }
      }
      if(found==false){
        this.pushNewItem();
      }
    }else{
      this.pushNewItem();
    }


    console.log(app.globalData.cartList);
    /*wx.navigateTo({
      url: '../cart/cart?name=' + name,
    })*/
  },


  pushNewItem: function () {
    var app = getApp();
    var curCartList = app.globalData.cartList;
    var newItem = {
      title: this.data.name,
      price: this.data.price[this.data.index],
      image: this.data.imgUrls[this.data.index],
      dimension: this.data.dimension[this.data.index],
      selected: true,
      num: 1
    };

    curCartList.push(newItem);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemName = options.name;
    console.log(itemName);
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('detail').where({
      name: itemName
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          imgUrls :res.data[0].url,
          price: res.data[0].price,
          name: res.data[0].name,
          describtion:res.data[0].describtion,
          size:res.data[0].size,
          dimension:res.data[0].dimension
        })
        if (res.data[0].dimension[0][0]==0){
          this.setData({dimensionFlag:false})
        }
        console.log('flag is ' + this.dimensionFlag);
        console.log('[数据库] [查询记录] 成功: ', res);
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

  }
})