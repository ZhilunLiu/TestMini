// miniprogram/pages/myorders/myorders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    name:'',
    phone:'',
    orderNum:'',
  },

  //弹窗
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
    this.back();
  },
  //上一级
  back: function (e) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ title: '搜索中', icon: 'loading', duration: 10000 });
    this.popup = this.selectComponent("#popup");
    this.setData({
      name:options.name,
      phone:options.phone,
      orderNum:options.orderNumber
    })

    console.log('name = ' + this.data.name);
    console.log(this.data.phone);
    console.log('orderNum = ' + this.data.orderNum);
/*
    console.log('openId is ' + openId);
    if (openId === undefined || openId == '') {
      this.popup.showPopup();
    }*/
    if(this.data.orderNum!=''){
      this.searchOrderNum();
    } else if (this.data.name != '' && this.data.phone != ''){
      this.searchNameandPhone();
    }else if(this.data.name!=''){
      console.log('searching name = '+this.data.name);
      this.searchName();
    }else if(this.data.phone!=''){
      this.searchPhone();
    }else{
      console.log('输入 错误')
    }


  },


  searchOrderNum: function () {

    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('orders').where({
      orderNumber: this.data.orderNum
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          orders: res.data
        })
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

  searchNameandPhone: function () {

    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('orders').where({
      name: this.data.name,
      phone:this.data.phone,
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          orders: res.data
        })
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

  searchName: function () {

    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('orders').where({
      name: this.data.name
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          orders: res.data
        })
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

  searchPhone: function () {

    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('orders').where({
      phone: this.data.phone
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          orders: res.data
        })
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



  goOrderDetail: function (e) {
    var current = this.data.orders[e.currentTarget.dataset.index];
    var originalDate = this.data.orders[e.currentTarget.dataset.index].date;
    var date = this.formatTime(originalDate);
    //解决时差问题：
    /*
    var offset_GMT = new Date().getTimezoneOffset();
    var time = date.getTime();
    console.log('time is '+time)
    var targetDate = new Date(time + offset_GMT*60*1000 + 8*60*60*1000);
    console.log('targerDate is '+targetDate);
    */
    //页面传参（对象），编码
    var order = encodeURIComponent(JSON.stringify(current));

    wx.navigateTo({
      url: '../orderDetail/orderDetail?order=' + order + '&date= ' + date,
    })
  },

  formatTime: function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return year.toString() + '年' + month.toString() + '月' + day.toString() + '日';
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
    console.log('onunload');

    if (getApp().globalData.billPaied = true) {
      console.log('billPaied is ' + getApp().globalData.billPaied);
      getApp().globalData.billPaied = false;
      console.log('billPaied is ' + getApp().globalData.billPaied);
      wx.reLaunch({
        url: '/pages/profile/profile',
      })
    }
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