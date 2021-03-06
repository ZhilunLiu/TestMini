//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData =  {
      userInfo: null,
      openId:'',
      sysWidth: wx.getSystemInfoSync().windowWidth,
      sysHeight: wx.getSystemInfoSync().windowHeight, //图片宽度
      cartList:[],
      paying:false,
      choosenAdd:'',
      choosePho:'',
      chooseName:'',
      totalPrice:'',
      billPaied:false,
      logged:false,
      manager:false,
      fileID:'',
      cloudPath:'',
      imagePath:'',
      selectedOrderId:'',
      companyList:['国景','鑫诺','凯美','美效','云时代','华滕','亿尚'],
      statusList:['不限状态','未下单','未安装','未付款','未开票','已取消','已完成'],
  }
  }
})
