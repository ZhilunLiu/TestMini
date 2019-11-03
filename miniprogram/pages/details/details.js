// miniprogram/pages/detail/bolatudahuiyizhuo/bolatudahuiyizhuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataId:'',
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
    dimensionFlag:true,
    manager:false,
    updating:false,
    width:0,
    depth:0,
    height:0,
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },  

  previewImage: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = this.data.imgUrls;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
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
    wx.showToast({ title: '添加成功', icon: 'success', duration: 1000 });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
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
          dimension:res.data[0].dimension,
          dataId:res.data[0]._id,
        })
        if (res.data[0].dimension[0][0]==0){
          this.setData({dimensionFlag:false})
        }

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

  changeData:function(e){
    this.setData({
      updating:true,
    })
  },

  //更新
  save:function(e){
    var dim = this.data.dimension;
    dim[this.data.index][0] = parseInt(this.data.width);
    dim[this.data.index][1] = parseInt(this.data.depth);
    dim[this.data.index][2] = parseInt(this.data.height);
    //console.log(dim);
    //call db update

    console.log(this.data.price );
    console.log(dim);
    console.log(this.data.size);
    console.log(this.data.describtion);

    const db = wx.cloud.database();
    db.collection('detail').doc(this.data.dataId).update({
      data: {
        price: this.data.price,
        dimension: dim,
        size: this.data.size,
        describtion: this.data.describtion,
      },
      success: res => {
        wx.showToast({ title: '更新成功', icon: 'success', duration: 1000 });

        this.setData({
          updating:false
        })
        console.error('[数据库] [更新记录] 成功', res);
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },


  priceInput: function (e) {
    console.log('price changed')
    var temp = this.data.price;
    temp[this.data.index] = e.detail.value;
    this.setData({
      price: temp
    })
  },

  descInput: function (e) {
    console.log('describtion changed')
    this.setData({
      describtion: e.detail.value
    })
  },

  sizeInput: function (e) {
    console.log('size changed')
    var temp = this.data.size;
    temp[this.data.index] = e.detail.value;
    this.setData({
      size: temp
    })
  },

  widthInput: function (e) {
    console.log('dw changed')
    this.setData({
      width: e.detail.value
    })
  },

  depthInput: function (e) {
    console.log('dp changed')
    this.setData({
      depth: e.detail.value
    })
  },

  heightInput: function (e) {
    console.log('dh changed')
    this.setData({
      height: e.detail.value
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
    var app = getApp();
    this.setData({
      manager:app.globalData.manager
    })
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