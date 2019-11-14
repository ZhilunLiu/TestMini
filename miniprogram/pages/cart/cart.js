// miniprogram/pages/cart/cart.js
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    hasDisPrice:false,
  },

  pay:function(e){
    var app = getApp();
    if (app.globalData.cartList === undefined || app.globalData.cartList.length == 0){
      this.noItem.showPopup();
    }else{
      app.globalData.paying = true;
      app.globalData.totalPrice = this.data.totalPrice;
      wx:wx.navigateTo({
        url: '../chooseAdd/chooseAdd',
      })
    }
  },

  onShow:function() {
    console.log(this.data.carts);
    this.getTotalPrice();
  },

  getTotalPrice:function() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        if(carts[i].disPrice!=null){
          total += carts[i].num * carts[i].disPrice;     // 所有价格加起来
          carts[i].hasDisPrice = true;
          console.log(carts);
          this.setData({
            carts:carts
          })
        }else{
          total += carts[i].num * carts[i].price;
        }

      }
    }
    console.log('totalprice is '+total);
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

  selectList :function(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
      carts: carts
    });
    this.getTotalPrice();                           // 重新获取总价
  },

  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },

  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);              // 删除购物车列表里这个商品
    this.setData({
      carts: carts
    });
    if (!carts.length) {                  // 如果购物车为空
      this.setData({
        hasList: false, 
        totalPrice:0             // 修改标识为false，显示购物车为空页面
      });
    } else {                              // 如果不为空
      this.getTotalPrice();           // 重新计算总价格
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.popup = this.selectComponent("#popup");
    this.noItem = this.selectComponent("#noItem");
    var app = getApp();
    var openId = app.globalData.openId;
    console.log('openId is '+openId);
    if(openId===undefined||openId==''){
      this.popup.showPopup();
    }
    
    var boolean = false;
    var list = app.globalData.cartList;
    if (list.length != 0) {
      boolean = true;
    }

    this.setData({
        carts:list,
        hasList:boolean
      })

  },

  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
    this.back();
  },

  _noItemsuccess(){
    console.log('你点击了确定');
    this.noItem.hidePopup();
  },

  back: function (e) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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