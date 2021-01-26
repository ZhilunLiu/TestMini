// miniprogram/pages/new/searchOrderResult/searchOrderResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    orderId:0,
    customer:'',
    stuff:'',
    manager:false,
    groupOrder:[],
    pageNumber:1,
    totalPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
      customer:options.customer,
      stuff:options.stuff,
      manager:getApp().globalData.manager,
    }),
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    console.log('业务员名字是---'+this.data.stuff);
    if(this.data.manager){
      if(this.data.orderId!=0){
        this.findByOrderId();
      }
      else if(this.data.customer!=''&&this.data.stuff!=''){
        this.findByNameAndStuff();
      }
      else if(this.data.stuff!=''){
        this.findByStuff();
      }
      else if(this.data.customer!=''){
        this.findByName();
      }
    }else{
      this.setStuff();
    }

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

  setStuff:function(){
    var openId = getApp().globalData.openId;
    console.log('正在设置权限，openId为@@@@@@@@@@@@@',openId);
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('users').where({
        _openid:openId
      }).get({
        success: res => {
          console.log('查询结果@@@@@@@@@@@@@',res);
          this.setData({
            stuff:res.data[0].name,
          })
          if(this.data.orderId!=0){
            this.findByOrderId();
          }
          else if(this.data.customer!=''){
            this.findByNameAndStuff();
          }
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

  findByOrderId:function(){
    console.log('正在通过订单号查询，订单号为@@@@@@@@@@@@@',this.data.orderId);
    var orderId = parseInt(this.data.orderId);
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        orderNumber:orderId
      }).get({
        success: res => {
          console.log('查询结果@@@@@@@@@@@@@',res);
          //分页
          var itemInPage =10 ;
          var groupOrder = this.group(res.data,itemInPage);
          var totalPage = this.getTotalPage(res.data.length,itemInPage);

          this.setData({
            orders:groupOrder[0],
            groupOrder:groupOrder,
            //get the total order numbers to calculate page number
            totalPage:totalPage,
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

  findByName:function(){
    console.log('正在通过名字查询，名字是---',this.data.customer);
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        customer: this.data.customer
      }).get({
        success: res => {
          console.log('the res is ===================',res.data);
          //分页
          var itemInPage =10 ;
          var groupOrder = this.group(res.data,itemInPage);
          var totalPage = this.getTotalPage(res.data.length,itemInPage);
          this.setData({
            orders:groupOrder[0],
            groupOrder:groupOrder,
            //get the total order numbers to calculate page number
            totalPage:totalPage,
          })
          console.log('[数据库] [查询记录] 成功: ', res);
          console.log('the orders are =============',this.data.orders);
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

  findByStuff:function(){
    console.log('正在通过业务员查询，名字是---',this.data.stuff);
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        orderManager: this.data.stuff
      }).get({
        success: res => {
          console.log('the res is ===================',res.data);
          //分页
          var itemInPage =10 ;
          var groupOrder = this.group(res.data,itemInPage);
          var totalPage = this.getTotalPage(res.data.length,itemInPage);
          this.setData({
            orders:groupOrder[0],
            groupOrder:groupOrder,
            //get the total order numbers to calculate page number
            totalPage:totalPage,
          })
          console.log('[数据库] [查询记录] 成功: ', res);
          console.log('the orders are =============',this.data.orders);
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

  select:function(event){
    var itemId = event.currentTarget.dataset.id;
    var app = getApp();
    app.globalData.selectedOrderId = itemId;
    wx.navigateTo({
      url: '../newOrders/orders/orders?orderId='+itemId,
    })
  },

  findByNameAndStuff:function(){
    console.log("find by name and stuff the stuff is "+this.data.stuff)
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        customer: this.data.customer,
        orderManager: this.data.stuff
      }).get({
        success: res => {
          //分页
          var itemInPage =10 ;
          var groupOrder = this.group(res.data,itemInPage);
          var totalPage = this.getTotalPage(res.data.length,itemInPage);
          console.log('groupOrder 是',groupOrder[0]),
          this.setData({
            orders:groupOrder[0],
            groupOrder:groupOrder,
            //get the total order numbers to calculate page number
            totalPage:totalPage,
          })
          console.log('orders 是',this.data.orders),
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

  findByIdAndStuff:function(){
    console.log("find by Id and stuff the stuff is "+this.data.stuff)
    var orderId = parseInt(this.data.orderId);
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        orderNumber: orderId,
        orderManager: this.data.stuff
      }).get({
        success: res => {
          //分页
          var itemInPage =10 ;
          var groupOrder = this.group(res.data,itemInPage);
          var totalPage = this.getTotalPage(res.data.length,itemInPage);
          this.setData({
            orders:groupOrder[0],
            groupOrder:groupOrder,
            //get the total order numbers to calculate page number
            totalPage:totalPage,
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
        orders:this.data.groupOrder[this.data.pageNumber-2],
        pageNumber:this.data.pageNumber-1,
      })
    }

  },

  nextPage:function(){
    console.log('跳转到下一页');
    if(this.data.pageNumber<this.data.totalPage){
      this.setData({
        orders:this.data.groupOrder[this.data.pageNumber],
        pageNumber:this.data.pageNumber+1,
      })
    }
  },
})