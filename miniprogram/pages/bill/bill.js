// miniprogram/pages/bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    name:'',
    phone:'',
    address:'',
    totalprice:'',
    orderNumer:'',
  },

  pay:function(e){
    var items = '';
    for(let i =0;i<this.data.cart.length;i++){
      items.concat('，');
      items.concat(this.data.cart[i]);
    }
    var id = getApp().globalData.openId;
    //调用微信支付
    wx.cloud.callFunction({
      name: 'getPay',
      data: {
        total_fee: this.data.totalprice*100,
        attach:'test1',
        body:'test2',
        appId:'wx036b87531457c042',
        openId:id,
        //attach: this.data.name,
        //body: items
      }
    }).then(res => {
      var order = "otn" + res.result.nonce_str + res.result.timeStamp;
      this.setData({
        orderNumer: order,
      })
      console.log(res);
        wx.requestPayment({
          //传入变量
          appId: res.result.appid,
          timeStamp: res.result.timeStamp,
          nonceStr: res.result.nonce_str,
          package: 'prepay_id=' + res.result.prepay_id,
          signType: 'MD5',
          paySign: res.result.paySign,
          success: res => {
            console.log(res);
            this.saveOrder();
            wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '支付失败，请重试'
            })
            console.error('微信支付失败：', err)
          }
        })
      })

  },

  saveOrder:function(){
    var date = new Date();
    console.log('new date is '+date);
    const db = wx.cloud.database();
    db.collection('orders').add({
      data: {
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.address,
        totalPrice:this.data.totalprice,
        items:this.data.cart,
        orderNumber:this.data.orderNumer,
        date:date,
        status:'待确认',
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '支付成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        //隐藏加载中
        wx.hideToast();
        getApp().globalData.billPaied = true;
        console.log('billPaied is ' + getApp().globalData.billPaied);
        //去订单详情
        wx.redirectTo({
          url: '../myorders/myorders'
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      cart: app.globalData.cartList,
      totalprice: app.globalData.totalPrice,
      name: app.globalData.chooseName,
      phone: app.globalData.choosePho,
      address: app.globalData.chooseAdd
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