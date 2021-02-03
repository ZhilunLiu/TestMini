// miniprogram/pages/new/caigoudan/caigoudan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    orderId:'',
    buyInPrice:0,
    totalPrice:0,
    supplierList:[],
    supplier:'',
    newSupplier:'',
    supplierId:'',
    showingCart:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
    })
    this.getCart();
    this.getSuppliers();
  },

  supplierChange:function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      supplier: this.data.supplierList[e.detail.value],
    })
    this.refreshCart();
  }, 

  itemSupplierChange:function (e) {
    var carts = this.data.carts;
    var showingCart = this.data.showingCart;
    var index = e.currentTarget.dataset.id;
    console.log('picker发送选择改变，携带值为', e.detail.value,'id为',index)
    showingCart[index].supplier = this.data.supplierList[e.detail.value];

    //refresh data in cart
    for(let i = 0;i<carts.length;i++){
      if(carts[i].id==showingCart[index].id){
        carts[i].supplier = showingCart[index].supplier;
      }
    }
    this.setData({
      showingCart:showingCart,
      carts:carts,
    })
  }, 

  addSupplier:function(){
    
    var list = this.data.supplierList;
    console.log('adding supplier，list is ',list);
    list.push(this.data.newSupplier);
    const db = wx.cloud.database();

    db.collection('supplier').doc(this.data.supplierId).update({
      data:{
        supplierList:list,
      },
      success: res => {
        wx.showToast({
          title: '添加成功',
        })
        this.setData({
          supplierList:list,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  supplierInput: function (e) {
    this.setData({
      newSupplier: e.detail.value
    })
  },

  getSuppliers:function(){
    const db = wx.cloud.database();
    console.log('gettting supplierList');
    db.collection('supplier').where({
    }).get({
      success: res => {
        console.log('get supply success',res.data[0].supplierList)
        this.setData({
          supplierList:res.data[0].supplierList,
          supplierId:res.data[0]._id,
        })
      },
      fail: err => {
        console.log('getting supplier failed!!! ');
      },
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
  buyInPriceInput: function (e) {
    var index = parseInt(e.currentTarget.dataset.id);
    var carts = this.data.carts;
    let showingCart = this.data.showingCart;
    showingCart[index].buyInPrice = e.detail.value;
    //change data in cart
    for(let i = 0;i<carts.length;i++){
      if(carts[i].id==showingCart[index].id){
        carts[i].buyInPrice = showingCart[index].buyInPrice;
      }
    }
    this.setData({
      showingCart:showingCart,
      carts:carts,
    })
    console.log(this.data.carts);
  },

  getCart:function(){
    const db = wx.cloud.database();
    var orderId = getApp().globalData.selectedOrderId;
    console.log('gettting cartttttttttttttttttttttt order Id is '+orderId);
    wx.showToast({
      title: '正在加载中',
      duration:3000,
      icon:'loading'
    })
    db.collection('orders').where({
      _id:orderId
    }).get({
      success: res => {
        console.log('cart ========== is ',res.data[0].carts);
        this.setData({
          carts:res.data[0].carts,
          showingCart:res.data[0].carts,
        })
        
        this.getTotalPrice();
        wx.hideToast();
      },
      fail: err => {
        console.log('getting cart failed!!! ');
      },
    })
  },
  
  refreshCart:function(){
    var carts = this.data.carts;
    var newCart = [];
    for(let i = 0;i<carts.length;i++){
      if(carts[i].supplier==this.data.supplier){
        newCart.push(carts[i]);
      }
    }
    this.setData({
      showingCart:newCart,
    })
  },

  save:function(e){
    this.getTotalPrice();
    //save the cart to the database
    var orderId = getApp().globalData.selectedOrderId;
    const db = wx.cloud.database();
    console.log('try to save the caigoudan, the orderId is----------------'+orderId);
    db.collection('orders').doc(orderId).update({
      data: {
        carts: this.data.carts,
        caigouTotal:this.data.totalPrice,
      },
      success: res => {
        wx.showToast({ title: '更新成功', icon: 'success', duration: 1000 });
        console.log('[数据库] [更新记录] 成功', res);
        wx:wx.navigateBack({
          delta: 0,
        })
        /*/wx:wx.navigateTo({
          url: '../newOrders/orders/orders',
        })*/
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
   
    
  },

  getTotalPrice:function() {
    let carts = this.data.showingCart;                  // 获取购物车列表
    console.log('carts is ',carts);
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
          total += carts[i].num * carts[i].buyInPrice;
    }
    console.log('totalprice is '+total);
    this.setData({                                // 最后赋值到data中渲染到页面
      totalPrice: total.toFixed(2)
    });
  },








    //页数相关代码
    getTotalPage:function(len,itemInPage){
      var totalPage =1;
      if(len%itemInPage==0){
        totalPage = len/itemInPage;
      }else{
        totalPage = Math.floor(len/itemInPage)+1;
      }
      return totalPage;
    },
  
    group:function(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      let len = array.length;
      newArray.push(array.slice(index, Math.min(index += subGroupLength,len)));
      while(index < len) {
          newArray.push(array.slice(index, Math.min(index += subGroupLength,len)));
      }
      console.log('returing newArray===========',newArray);
      return newArray;
    },
  
    prevPage:function(){
      console.log('跳转到上一页');
      if(this.data.pageNumber>1){
        this.setData({
          carts:this.data.groupOrder[this.data.pageNumber-2],
          pageNumber:this.data.pageNumber-1,
        })
      }
  
    },
  
    nextPage:function(){
      console.log('跳转到下一页');
      if(this.data.pageNumber<this.data.totalPage){
        this.setData({
          carts:this.data.groupOrder[this.data.pageNumber],
          pageNumber:this.data.pageNumber+1,
        })
      }
    },
})