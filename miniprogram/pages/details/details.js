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
    disPrice:[],
    name:'',
    describtion:'',
    size:[],
    dimension:[[]],
    index:0,
    dimensionFlag:true,
    addingDim:false,
    manager:false,
    updating:false,
    addingItem:false,
    width:0,
    depth:0,
    height:0,
    hasDisc:false,
    comment:'',
    fileId:'',
    series:'',
    type:'',
    typeList:['班台','职员桌','文件柜','班椅','沙发','茶几','茶水柜','会议桌','会议椅','主席台','会议条桌','演讲台','接待台','洽谈桌','其他'],
    hasnotSelectSeries:true,
    hasnotSelectType:true,
    model:'',
    hasModel:false,
    hasSize:false,
    manager:false,

    // van-action props
    show: false,
    actions: [],

    //van-cell props
    dimValue:'',

    //van-field props
    priceValue: '',
  },



  dimChange(){
    this.setData({
      show:true
    })
  },

  onClose() {
    this.setData({ show: false});
  },

  onSelect(event) {
    console.log(event.detail);
    this.setData({
      index:event.detail.index
    })
  },

  seriesChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasnotSelectSeries:false,
      series: this.data.seriesList[e.detail.value],
    })
  }, 

  typeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasnotSelectType:false,
      type: this.data.typeList[e.detail.value],
    })
  }, 

  modelInput: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      model: e.detail.value,
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
      console.log("调用swiper,imgUrl is ",this.data.imgUrls);

  },

  buy:function(e){
    var app = getApp();
    if(app.globalData.openid === undefined){
      
    }
    var curCartList = app.globalData.cartList;
    var itName = e.currentTarget.dataset.name;
    var dim = this.data.dimension[this.data.index];
    var found = false;
    if (curCartList.length != 0){
      console.log('not empty!');
      for (let i = 0; i < curCartList.length; i++) {
        if (curCartList[i].title == itName && curCartList[i].dimension == dim) {
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
      disPrice:this.data.disPrice[this.data.index],
      image: this.data.imgUrls[0],
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
    var app = getApp();
    console.log('option is -------------------',options)
    this.setData({
      manager:app.globalData.manager
    })

    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    var itemName = options.name;
    var itemId = options.itemId;
    var addingItem = options.addingItem;
    if(addingItem==true){
      this.setData({
        addingItem:addingItem,
      })
    }

    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('detail').where({
      _id: itemId
    }).get({
      success: res => {
        console.log('正在载入细节',res);
        this.setData({
          imgUrls :res.data[0].url,
          price: res.data[0].price,
          name: res.data[0].name,
          describtion:res.data[0].describtion,
          size:res.data[0].size,
          dimension:res.data[0].dimension,
          dataId:res.data[0]._id,
          width:res.data[0].dimension[0][0],
          depth: res.data[0].dimension[0][1],
          height: res.data[0].dimension[0][2],
          comment:res.data[0].comment,
          fileId:res.data[0].fileId,
          series:res.data[0].series,
          type:res.data[0].type,
          model:res.data[0].model,
        })
        console.log('设置完成'+this.data.dimension);
        if(this.data.size != ''){
          this.setData({
            hasSize:true
          })
        }

        if(this.data.model != ''){
          this.setData({
            hasModel:true
          })
        }

        // 设置规格弹框
        if(this.data.dimension != []){
          console.log('dimension is', this.data.dimension.length);
          var tempAction = [];
          for(let i=0;i<this.data.dimension.length;i++){
            var dimToString = '';
            for(let j=0;j<this.data.dimension[i].length;j++){
              dimToString += this.data.dimension[i][j]+"x"
            }
            dimToString= dimToString.slice(0,dimToString.length-1)
            var dim = {
              name:dimToString,
              index:i
            }
            tempAction.push(dim);
          }
          this.setData({
            actions : tempAction
          })
        }


        if (res.data[0].dimension[0][0]==0){
          this.setData({dimensionFlag:false})
        }
        this.getSeriesList();
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

  getSeriesList:function(){
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('gomeSeries').where({
    }).get({
      success: res => {
        var tempList = [];
        for(let i =0;i <res.data.length;i++){
          tempList.push(res.data[i].name);
        }
        this.setData({
          seriesList:tempList,
        })
        console.log('seriesList is !!!! ', res);
        console.log('[数据库] [查询记录] 成功: ', res);
        wx.hideToast();
      },
      fail: err => {
      }
    })
  },

  changeData:function(e){
    this.setData({
      updating:true,
      width:this.data.dimension[this.data.index][0],
      depth:this.data.dimension[this.data.index][1],
      height:this.data.dimension[this.data.index][2],
    })
  },

  deleteData:function(e){
    const db = wx.cloud.database()
    db.collection('detail').doc(this.data.dataId).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.deleteImg();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },

  deleteImg:function(){
    console.log('deleting img');
    wx.cloud.deleteFile({
      fileList:[this.data.fileId],
      success: res =>{
        console.log('删除图片成功',res)
        wx.navigateBack({
          delta: 2,
        })
      },
      fail: console.error
    })
  },

  back:function(e){
    wx.navigateBack({
      delta:1,
    })
  },

  //更新
  save:function(e){
    var dim = this.data.dimension;
    dim[this.data.index][0] = parseInt(this.data.width);
    dim[this.data.index][1] = parseInt(this.data.depth);
    dim[this.data.index][2] = parseInt(this.data.height);
    console.log(dim);
    //call db update

    console.log(this.data.price );
    console.log(dim);
    console.log(this.data.size);
    console.log(this.data.describtion);

    const db = wx.cloud.database();
    db.collection('detail').doc(this.data.dataId).update({
      data: {
        name:this.data.name,
        price: this.data.price,
        disPrice:this.data.disPrice,
        dimension: dim,
        size: this.data.size,
        describtion: this.data.describtion,
        comment:this.data.comment,
        type:this.data.type,
        series:this.data.series,
        model:this.data.model,
      },
      success: res => {
        wx.showToast({ title: '更新成功', icon: 'success', duration: 1000 });

        this.setData({
          updating:false,
          price:this.data.price,
          disPrice:this.data.disPrice,
          size:this.data.size,
          dimension:dim,
          describtion:this.data.describtion,
        })
        console.error('[数据库] [更新记录] 成功', res);
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  addNewDim:function(){

    var dim = this.data.dimension;
    var index= this.data.index;
    var newDim = [parseInt(this.data.width), parseInt(this.data.depth), parseInt(this.data.height)]
    dim.push(newDim);
    console.log('after push new DIm is ')
    console.log(dim);
    //call db update

    const db = wx.cloud.database();
    db.collection('detail').doc(this.data.dataId).update({
      data: {
        price: this.data.price,
        disPrice:this.data.disPrice,
        dimension: dim,
        size: this.data.size,
      },
      success: res => {
        wx.showToast({ title: '更新成功', icon: 'success', duration: 1000 });

        this.setData({
          addingDim: false,
          price:this.data.price,
          disPrice:this.data.disPrice,
          dimension:dim,
          size:this.data.size,
        })
        console.error('[数据库] [更新记录] 成功', res);
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },


  addDim:function(e){
    this.setData({
      index: parseInt(this.data.index) + 1,
      addingDim:true
    })
    console.log('now index is ')
    console.log(this.data.index)
  },



  priceInput: function (e) {
    console.log('price changed')
    var temp = this.data.price;
    temp[this.data.index] = e.detail.value;
    console.log(temp)
    this.setData({
      price: temp
    })
  },


  disPriceInput: function (e) {
    console.log('disPriceInput changed')
    var temp = this.data.disPrice;
    temp[this.data.index] = e.detail.value;
    console.log(temp)
    this.setData({
      disPrice: temp
    })
  },

  nameInput:function(e){
    console.log('disPriceInput changed')
    var temp = e.detail.value;
    console.log(temp)
    this.setData({
      name: temp
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
    console.log(temp)
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

  commentInput:function (e) {
    console.log('dh changed')
    this.setData({
      comment: e.detail.value
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

  },

  add:function(){
    console.log('try to save the item----------------------- id is '+this.data.dataId);
    wx.navigateTo({
      url: '../new/caigoudan/caigoudan?itemId='+this.data.dataId,
    })
  }
})