// miniprogram/pages/cart/cart.js
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    hasDisPrice:false,
    itemId:0,
    orderId:0,
    newItem:[],
  },

  save:function(e){
    //save the cart to the database
    var orderId = getApp().globalData.selectedOrderId;
    const db = wx.cloud.database();
    console.log('try to save the caigoudan, the orderId is----------------'+orderId);
    db.collection('orders').doc(orderId).update({
      data: {
        carts: this.data.carts,
        orderReg:this.data.totalPrice,
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

  onShow:function(options) {
    console.log('reshowing page, the orderId is '+this.data.orderId);
    this.refreshCart();
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('caigoudan Onloading-----------------------------');
    var theitemId = options.itemId;
    this.setData({
      itemId:theitemId
    })
    //get the cart detail of this order
    this.getCart();
    //refreshCart by push new Item it to it
    this.refreshCart();
  },

  refreshCart:function(){
    var newItem = [];
    const db = wx.cloud.database();
    console.log('option id is !!!!!!!!!!!!------ '+this.data.itemId);
    if(this.data.itemId != undefined){
      console.log('try to add item the item id is !!!!!!!!!!!!------ '+this.data.itemId,'the cart is ',this.data.carts);
      //check duplicate first
      var carts = this.data.carts;
      var hasItem = false;
      for(var index in carts){
        console.log(index);
        if(carts[index].id==this.data.itemId){
          carts[index].num++;
          hasItem = true;
          this.setData({
            carts:carts,
          })
        }
      }    
      //if there is no item in the carts, push new item.
      if(!hasItem){
        //get new item detail from db
      db.collection('detail').where({
        _id:this.data.itemId
      }).get({
        success: res => {
          this.setData({
            newItem:res.data[0],
          })
          console.log('found the Item !!!!!!!!!!!!------ ',this.data.newItem);
          //push new item 
          if(this.data.newItem.name != undefined){
            console.log('cin the if statement!!!!!!!!!!!!!!111111------- ',this.data.newItem.name);
            newItem = {
              id:this.data.newItem._id,
              name: this.data.newItem.name,
              price: this.data.newItem.price,
              image: this.data.newItem.url,
              dimension: this.data.newItem.dimension,
              selected: true,
              comment:this.data.newItem.comment,
              describtion:this.data.newItem.describtion,
              company:this.data.newItem.company,
              series:this.data.newItem.series,
              model:this.data.newItem.model,
              num: 1,
              buyInPrice:0,
              supplier:'',
            };
            console.log('create new Item and try to push!!!!!!!!!!!!------ ',newItem);
             //console.log('[数据库] [查询记录] 成功: ', res);
          console.log('新的家具是----- ', newItem);
            var templist = this.data.carts;
            console.log('旧的家具是清单----- ',templist);
            if(templist==undefined){
              templist = [];
            }
            templist.push(newItem);
            console.log('新的家具是清单----- ',templist);

            this.setData({
              carts:templist,
            })
            
          }
          wx.hideToast();
          },
                  fail: err => {
                    console.log('search failed!!! ');
                  },
          })
        }
                  //refresh price
                  this.getTotalPrice();
      

    }
  },

  getCart:function(){
    wx.showToast({
      title: '载入中',
      duration:3000,
      icon:'loading'
    })
    const db = wx.cloud.database();
    var orderId = getApp().globalData.selectedOrderId;
    console.log('gettting cartttttttttttttttttttttt order Id is '+orderId);
    db.collection('orders').where({
      _id:orderId
    }).get({
      success: res => {
        console.log('cart ========== is ',res.data[0].carts);

        this.setData({
          carts:res.data[0].carts,
        })
        wx.hideToast();
        this.getTotalPrice();
        
      },
      fail: err => {
        console.log('getting cart failed!!! ');
      },
    })
  },

  getTotalPrice:function() {
    let carts = this.data.carts;                  // 获取购物车列表
    console.log('carts is ',carts);
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
          total += carts[i].num * carts[i].price[0];
    }
    console.log('totalprice is '+total);
    this.setData({                                // 最后赋值到data中渲染到页面
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
    console.log('正在删除第'+index+'个产品，名字为'+carts[index].name);
    carts.splice(index, 1);              // 删除购物车列表里这个商品
    console.log('删除后的carts为',carts);

    this.setData({
      carts: carts,
    })
    if (!carts.length) {                  // 如果购物车为空
      this.setData({
        hasList: false, 
        totalPrice:0             // 修改标识为false，显示购物车为空页面
      });
    } else {                              // 如果不为空
      this.getTotalPrice();           // 重新计算总价格
    }
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

  add:function(e){
    wx.navigateTo({
      url: '../addCaigoudan/addCaigoudan?orderId = '+this.data.orderId,
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
    console.log('Caigoudan is unloading!!!!!!!!!!!!!!_________________+++++++++++++++++++++++++');
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


})