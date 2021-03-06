// miniprogram/pages/newOrders/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer:'',
    address:'',
    dealdate:'',
    duedate:'',
    orderTotal:0,
    company:'',
    dealer:'',
    phone:'',
    orderNumber:0,
    orderId:'',
    status:'',
    carts:[],
    fileUrl:'',
    contact:'',
    orderStuff:'',
    orderStuffList:[],
    orderManager:'',
    orderManagerList: [],
    commision:0,
    manager:false,
    paid:0,
    hasnotSelectKaipiao:true,
    companyList:[],
    status:'',
    statusList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = getApp().globalData.statusList;
    for(var index in list){
      if(list[index]=='不限状态'){
        list.splice(index,1);
      }
    }
    this.setData({
      statusList:list,
    })
    const db = wx.cloud.database();
    //get all users
    db.collection('users').get({
      success: res => {
        var userLen = res.data.length;
        var batchTimes = Math.ceil(userLen / 20);
        var batchNum = 0;
        for(let i = 0; i < batchTimes; i++){
          for(let j = 0; j < Math.min(userLen, 20); j++){
            this.setData({
              orderManagerList:this.data.orderManagerList.concat(res.data[batchNum + j].name),
              })
            this.setData({
              orderStuffList:this.data.orderStuffList.concat(res.data[batchNum + j].name),
            })
          }
          batchNum += 20;
        }
        console.log('[数据库] [查询记录] 成功: ', res);
        console.log(this.data.orderStuffList[0]);
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
    this.verifyManager();
    var app =getApp();
    this.setData({
      orderId:options.orderId,
      customer:options.customer,
      stuff:options.stuff,
      companyList:app.globalData.companyList,
    }),
    console.log("业务员是"+this.data.stuff)
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    if(this.data.orderId!=undefined){
      this.findByOrderId();
    }
    if(this.data.customer!=undefined){
      this.findByName();
    }
  },

  verifyManager:function(e){
    var app = getApp();
    var openId = app.globalData.openId;
    console.log('verifing, openid is '+openId);
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('managers').where({
      openid: openId
    }).get({
      success: res => {
        if(res.data[0].openid==openId){
          app.globalData.manager = true;
          this.setData({
            manager:true,
          })
        }
        console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: com =>{
        wx.hideToast();
      }
    })
    
  },


  findByOrderId:function(){
    console.log("find by orderNumber the number is "+this.data.orderId);
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        _id: this.data.orderId
      }).get({
        success: res => {
          console.log(res);
          this.setData({
            customer :res.data[0].customer,
            address: res.data[0].address,
            status:res.data[0].status,
            phone:res.data[0].phone,
            dealdate: res.data[0].dealdate,
            duedate:res.data[0].duedate,
            orderTotal:res.data[0].orderTotal,
            company:res.data[0].company,
            dealer:res.data[0].dealer,
            contact:res.data[0].contact,
            orderNumber:res.data[0].orderNumber,
            orderManager:res.data[0].orderManager,
            orderStuff:res.data[0].orderStuff,
            commision:res.data[0].commision,
            paid:res.data[0].paid,
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
    console.log("find by name the name is "+this.data.customer)
    const db = wx.cloud.database();
      // 查询当前家具的details对应name
      db.collection('orders').where({
        customer: this.data.customer
      }).get({
        success: res => {
          console.log(res);
          this.setData({
            customer :res.data[0].customer,
            address: res.data[0].address,
            status:res.data[0].status,
            phone:res.data[0].phone,
            dealdate: res.data[0].dealdate,
            duedate:res.data[0].duedate,
            orderTotal:res.data[0].orderTotal,
            company:res.data[0].company,
            dealer:res.data[0].dealer,
            orderId:res.data[0]._id,
            contact:res.data[0].contact,
            orderNumber:res.data[0].orderNumber,
            orderManager:res.data[0].orderManager,
            orderStuff:res.data[0].orderStuff,
            commision:res.data[0].commision,
            paid:res.data[0].paid,
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

  nameInput: function (e) {
    this.setData({
      customer: e.detail.value
    })
  },

  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  dealDateInput: function (e) {
    this.setData({
      dealdate: e.detail.value
    })
  },

  duedateInput: function (e) {
    this.setData({
      duedate: e.detail.value
    })
  },

  orderTotalInput: function (e) {
    this.setData({
      orderTotal: e.detail.value
    })
  },

  companyInput: function (e) {
    this.setData({
      company: e.detail.value
    })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  contactInput:function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  orderManagerInput:function (e) {
    this.setData({
      orderManager: e.detail.value
    })
  },

  commisionInput:function (e) {
    this.setData({
      commision: parseInt(e.detail.value)
    })
  },

  
  orderStuffInput:function (e) {
    this.setData({
      orderStuff: e.detail.value
    })
  },

  paidInput:function (e) {
    this.setData({
      paid: e.detail.value
    })
  },

  update:function(){
    console.log('updating the order, the ID is ============================'+this.data.orderId);
    console.log('updating the order, the dealdate is ============================',this.data);

    if(this.data.paid>this.data.orderTotal){
      wx.showToast({
        icon: 'none',
        title: '已付金额不得大于总金额',
        duration: 2000
      })
      return;
    }
  const db = wx.cloud.database();
    db.collection('orders').doc(this.data.orderId).update({
      data: {
        customer:this.data.customer,
        address:this.data.company,
        dealer:this.data.nickname,
        dealdate:this.data.dealdate,
        duedate:this.data.duedate,
        orderTotal:this.data.orderTotal,
        company:this.data.company,
        phone:this.data.phone,
        contact:this.data.contact,  
        orderStuff:this.data.orderStuff,
        orderManager:this.data.orderManager,
        commision:this.data.commision,
        paid:this.data.paid,
        status:this.data.status,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          orderId:res._id,
        })
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateBack({
          delta: 2,
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

  gonghuodan:function(){
    var app = getApp();
    app.globalData.selectedOrderId = this.data.orderId;
    console.log('正在前往供貨单，选择了订单---------------------'+this.data.orderId);
    wx.navigateTo({
      url: '../../gonghuodan/gonghuodan?orderId='+this.data.orderId,
    })
  },

  caigoudan:function(){
    var app = getApp();
    app.globalData.selectedOrderId = this.data.orderId;
    console.log('正在前往采购单，选择了订单---------------------'+this.data.orderId);
    wx.navigateTo({
      url: '../../caigoudan/caigoudan?orderId='+this.data.orderId,
    })
  },

  generateFrom:function(){
    console.log('正在生成表格，选择了订单---------------------'+getApp().globalData.selectedOrderId);
    wx.navigateTo({
      url: '../../generateForm/generateForm'
    })
  },

  downloadExcel:function(){
    //1,定义excel表格名
    let dataCVS = 'test.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['名字', '单价', '规格']; //表属性
    alldata.push(row);
    var carts = this.data.carts;
    for (let key in carts) {
      let arr = [];
      arr.push(carts[key].name);
      arr.push(carts[key].price[0]);
      arr.push(carts[key].dimension[0]);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer =  xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    wx.cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
      success: res => {

        console.log('[上传文件] 成功：', res)
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            var temp = this.data.imgUrls;
            temp.push(res.fileList[0].tempFileURL);
            that.setData({
              fileUrl:temp
            })
            console.log(this.data.fileUrl);
          }
        })

      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        wx.hideLoading()
      }


    })
  },

  getCart:function(){
    const xlsx = require('node-xlsx');
    const db = wx.cloud.database();
    console.log('正在查询信息，表格ID为------------'+this.data.orderId);
      // 查询
      db.collection('orders').where({
        _id: this.data.orderId
      }).get({
        success: res => {
          console.log('the res is ===================',res.data);
          this.setData({
            carts:res.data[0].carts,
          })
          wx.showLoading({
            title: '下载中',
          })
          this.downloadExcel();
          console.log('[数据库] [查询记录] 成功: ', res);
          console.log('the orders are =============',this.data.carts);
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

  companyChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasnotSelectKaipiao: false,
      company: this.data.companyList[e.detail.value],
    })
  }, 

  statusChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasnotSelectKaipiao: false,
      status: this.data.statusList[e.detail.value],
    })
  }, 

  dealdateChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dealdate: e.detail.value
    })
  },

  duedateChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      duedate: e.detail.value
    })
  },

  orderManagerChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      orderManager: this.data.orderManagerList[e.detail.value]
    })
  },

  orderStuffChange: function (e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      orderStuff: this.data.orderStuffList[e.detail.value]
    })
  },

  goClaims: function(e){
    var app = getApp();
    app.globalData.selectedOrderId = this.data.orderId;
    console.log('正在前往报销，选择了订单---------------------' + this.data.orderId);
    wx.navigateTo({
      url: '../../claims/claims?orderId=' + this.data.orderId,
    })
  }
})