// miniprogram/pages/new/searchOrderResult/searchOrderResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    orderId:'',
    customer:'',
    stuff:'',
    manager:false,
    groupOrder:[],
    pageNumber:1,
    totalPage:1,
    year:'',
    status:'',
    total:0,
    claimsTotal:0,
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
      year:options.year,
      status:options.status,
    }),
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    console.log('业务员名字是---'+this.data.stuff);
    console.log('年份名字是---'+this.data.year);
    console.log('订单号是---'+this.data.orderId);
    console.log('状态是---'+this.data.status);
    var hasCustomer = this.data.customer!='';
    var hasStuff = this.data.stuff!='';
    var hasYear = this.data.year!='';
    var hasStatus = this.data.status!='';
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!hasStatus 是'+hasStatus)
    var twoInput = (hasCustomer&&hasStuff)||(hasCustomer&&hasYear)||(hasCustomer&&hasStatus)
                  ||(hasStuff&&hasYear)||(hasStuff&&hasStatus)
                  ||(hasStatus&&hasYear);
    var threeInput = (hasCustomer&&hasStatus&&hasStuff)||(hasCustomer&&hasStatus&&hasYear)||(hasCustomer&&hasYear&&hasStuff)
    if(this.data.manager){
      if(this.data.orderId!=''){
        this.findByOrderId();
      }else if(this.data.customer!=''&&this.data.stuff!=''&&this.data.year!=''&&this.data.status!=''){
        this.findByYearAndNameAndStuffAndStatus();
      }else if(threeInput){
        this.findByThreeInput();
      }
      else if(twoInput){
        this.findByTwoInput();
      }else{
        this.findByOneInput();
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
          this.setData({
            stuff:res.data[0].name,
          })
          console.log('查询结果@@@@@@@@@@@@@',res);
          console.log('页面为@@@@@@@@@@@@@',this.data);
          var hasCustomer = this.data.customer!='';
          var hasStuff = this.data.stuff!='';
          var hasYear = this.data.year!='';
          var hasStatus = this.data.status!='';
          var twoInput = (hasCustomer&&hasStuff)||(hasCustomer&&hasYear)||(hasCustomer&&hasStatus)
                        ||(hasStuff&&hasYear)||(hasStuff&&hasStatus)
                        ||(hasStatus&&hasYear);
          var threeInput = (hasCustomer&&hasStatus&&hasStuff)||(hasCustomer&&hasStatus&&hasYear)||(hasCustomer&&hasYear&&hasStuff)
          if(this.data.orderId!=''){
            this.findByIdAndStuff();
          }else if(this.data.year!=''&&this.data.customer!=''&&this.data.status!=''){
            this.findByYearAndNameAndStuffAndStatus();
          }else if(threeInput){
            this.findByThreeInput();
          }else if(twoInput){
            this.findByTwoInput();
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
          this.setData({
            orders:res.data,
          })
          console.log('现在的订单为',this.data.orders)
          console.log('[数据库] [查询记录] 成功: ', res);
          this.getTotal();
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

  findByIdAndStuff:function(){
    const db = wx.cloud.database();
    const _ = db.command;
    console.log("find by Id and stuff the stuff is "+this.data.stuff)
    var orderId = parseInt(this.data.orderId);

      // 查询当前家具的details对应name
      db.collection('orders').where(
        _.or([
          {
            orderNumber: orderId,
            orderManager: this.data.stuff
          },
          {
            orderNumber: orderId,
            orderStuff: this.data.stuff
          }
        ])
      ).get({
        success: res => {
          this.setData({
            orders:res.data[0],
          })
          console.log('[数据库] [查询记录] 成功: ', res);
          this.getTotal();
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

  findByThreeInput:function(){
    const db = wx.cloud.database();
    const _ = db.command;
    console.log("find by threeInput",this.data.stuff,this.data.year,this.data.customer,this.data.status)
    //get count first
    db.collection('orders').where(
      _.or([
        {
          orderManager: this.data.stuff,
          customer:this.data.customer,
          year:this.data.year,
        },
        {
          orderManager: this.data.stuff,
          customer:this.data.customer,
          status:this.data.status
        },
        {
          orderManager: this.data.stuff,
          year:this.data.year,
          status:this.data.status
        },
        {
          orderStuff: this.data.stuff,
          customer:this.data.customer,
          year:this.data.year,
        },
        {
          orderStuff: this.data.stuff,
          customer:this.data.customer,
          status:this.data.status
        },
        {
          orderStuff: this.data.stuff,
          year:this.data.year,
          status:this.data.status
        },
        {
          customer: this.data.customer,
          year:this.data.year,
          status:this.data.status
        },
      ])
    ).count({
      success: res => {
        console.log('总共有',res.total,'条')
        var index = 0;
        while(index<res.total){
          db.collection('orders').where(
            _.or([
              {
                orderManager: this.data.stuff,
                customer:this.data.customer,
                year:this.data.year,
              },
              {
                orderManager: this.data.stuff,
                customer:this.data.customer,
                status:this.data.status
              },
              {
                orderManager: this.data.stuff,
                year:this.data.year,
                status:this.data.status
              },
              {
                orderStuff: this.data.stuff,
                customer:this.data.customer,
                year:this.data.year,
              },
              {
                orderStuff: this.data.stuff,
                customer:this.data.customer,
                status:this.data.status
              },
              {
                orderStuff: this.data.stuff,
                year:this.data.year,
                status:this.data.status
              },
              {
                customer: this.data.customer,
                year:this.data.year,
                status:this.data.status
              },
            ])
          ).skip(index).get({
            success: res => {
              console.log('concating-----------');
              var orders = this.data.orders;
              orders = orders.concat(res.data);
              this.setData({
                orders:orders
              })
              console.log('[数据库] [查询记录] 成功: ', res);
              console.log('the orders are =============',this.data.orders);
              this.getTotal();
              wx.hideToast();
            }
          })
          index +=20;  
        }
      }
    })
  },

  findByTwoInput:function(){
    console.log("find by twoInput is ",this.data)
    const db = wx.cloud.database();
    const _ = db.command;
     //get count first
     db.collection('orders').where(
      _.or([
        {
          orderManager: this.data.stuff,
          year:this.data.year,
        },
        {
          orderManager: this.data.stuff,
          status:this.data.status,
        },
        {
          orderManager: this.data.stuff,
          customer:this.data.customer,
        },
        {
          orderStuff: this.data.stuff,
          customer:this.data.customer,
        },
        {
          orderStuff: this.data.stuff,
          year:this.data.year,
        },
        {
          orderStuff: this.data.stuff,
          status:this.data.status,
        },
        {
          customer:this.data.customer,
          year:this.data.year,
        },
        {
          customer:this.data.customer,
          status:this.data.status,
        }
        ,
        {
          year:this.data.year,
          status:this.data.status,
        }
      ])
    ).count({
      success: res => {
        console.log('总共有',res.total,'条')
        var index = 0;
        while(index<res.total){
          db.collection('orders').where(
            _.or([
              {
                orderManager: this.data.stuff,
                year:this.data.year,
              },
              {
                orderManager: this.data.stuff,
                status:this.data.status,
              },
              {
                orderManager: this.data.stuff,
                customer:this.data.customer,
              },
              {
                orderStuff: this.data.stuff,
                customer:this.data.customer,
              },
              {
                orderStuff: this.data.stuff,
                year:this.data.year,
              },
              {
                orderStuff: this.data.stuff,
                status:this.data.status,
              },
              {
                customer:this.data.customer,
                year:this.data.year,
              },
              {
                customer:this.data.customer,
                status:this.data.status,
              }
              ,
              {
                year:this.data.year,
                status:this.data.status,
              }
            ])
          ).skip(index).get({
            success: res => {
              console.log('concating-----------');
              var orders = this.data.orders;
              orders = orders.concat(res.data);
              this.setData({
                orders:orders
              })
              console.log('[数据库] [查询记录] 成功: ', res);
              console.log('the orders are =============',this.data.orders);
              this.getTotal();
              wx.hideToast();
            }
          })
          index +=20;  
        }
      }
    })  
  },

  findByOneInput:function(){
    console.log('findByOneInput!!!!!!!!!!!!!!!!!!!!!!')
    const db = wx.cloud.database();
    const _ = db.command;
         //get count first
         db.collection('orders').where(
          _.or([
            {
              orderManager: this.data.stuff,
            },
            {
              customer:this.data.customer,
            },
            {
              year:this.data.year,
            },
            {
              orderStuff:this.data.stuff,
            },
            {
              status:this.data.status,
            },
          ])
        ).count({
          success: res => {
            console.log('总共有',res.total,'条')
            var index = 0;
            while(index<res.total){
              db.collection('orders').where(
                _.or([
                  {
                    orderManager: this.data.stuff,
                  },
                  {
                    customer:this.data.customer,
                  },
                  {
                    year:this.data.year,
                  },
                  {
                    orderStuff:this.data.stuff,
                  },
                  {
                    status:this.data.status,
                  },
                ])
              ).skip(index).get({
                success: res => {
                  console.log('concating-----------');
                  var orders = this.data.orders;
                  orders = orders.concat(res.data);
                  this.setData({
                    orders:orders
                  })
                  console.log('[数据库] [查询记录] 成功: ', res);
                  console.log('the orders are =============',this.data.orders);
                  this.getTotal();
                  wx.hideToast();
                }
              })
              index +=20;  
            }
          }
        })  
  },

  findByYearAndNameAndStuffAndStatus:function(){
    console.log('findByAllInput!!!!!!!!!!!!!!!!!!!!!!')
    const db = wx.cloud.database();
    const _ = db.command;
         //get count first
         db.collection('orders').where(
          _.or([
            {
              status:this.data.status,
              orderStuff:this.data.stuff,
              year:this.data.year,
              customer:this.data.customer,
            },
            {
              status:this.data.status,
              orderManager:this.data.stuff,
              year:this.data.year,
              customer:this.data.customer,
            }
          ])
        ).count({
          success: res => {
            console.log('总共有',res.total,'条')
            var index = 0;
            while(index<res.total){
              db.collection('orders').where(
                _.or([
                  {
                    status:this.data.status,
                    orderStuff:this.data.stuff,
                    year:this.data.year,
                    customer:this.data.customer,
                  },
                  {
                    status:this.data.status,
                    orderManager:this.data.stuff,
                    year:this.data.year,
                    customer:this.data.customer,
                  }
                ])
              ).skip(index).get({
                success: res => {
                  console.log('concating-----------');
                  var orders = this.data.orders;
                  orders = orders.concat(res.data);
                  this.setData({
                    orders:orders
                  })
                  console.log('[数据库] [查询记录] 成功: ', res);
                  console.log('the orders are =============',this.data.orders);
                  this.getTotal();
                  wx.hideToast();
                }
              })
              index +=20;  
            }
          }
        })  
  },

  getTotal:function(){
    console.log('正在计算总金额',this.data.orders);
    let total = 0;
    let claimTotal =0;
    for(var index in this.data.orders){
      total = total+ parseInt(this.data.orders[index].orderTotal);
      for(var index2 in this.data.orders[index].claims){
        claimTotal = claimTotal +parseInt(this.data.orders[index].claims[index2].money);
      }
    }
    console.log('计算完毕，金额为',total);
    this.setData({
      total:total,
      claimsTotal:claimTotal
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