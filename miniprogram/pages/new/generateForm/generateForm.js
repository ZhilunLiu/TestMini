// miniprogram/pages/new/generateFrom/generateForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    orderId:'',
    order:[],
    capitalReg:'',
    capitalTotal:'',
    shareUrl: "",
  },

  getInfo:function(){
    const db = wx.cloud.database();
    console.log('正在查询信息，表格ID为------------'+this.data.orderId);
      // 查询
      db.collection('orders').where({
        _id: this.data.orderId
      }).get({
        success: res => {
          console.log('the res is ===================',res.data);
          var reg = res.data[0].orderReg;
          var total = res.data[0].orderTotal;
          console.log('正在准备转换 total is ===============',total);
          var capReg = this.convertCurrency(reg);
          var capTotal = this.convertCurrency(total);
          console.log('正在准备转换 total is ===============',capTotal);
          this.setData({
            order:res.data[0],
            carts:res.data[0].carts,
            capitalReg: capReg,
            capitalTotal: capTotal,
          })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = getApp().globalData.selectedOrderId;
    this.setData({
      orderId:orderId
    })
    console.log('onloading 正在载入生成表格，ID为==================='+this.data.orderId);
    this.getInfo();
    this.drawShareImage();
  },

  
  convertCurrency:function(money) {
    console.log('正在转换大写 money is ==============='+money);
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;

    
    if (money === '') { //不能用==
        return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        //超出最大处理数字
        return '';
    }
    if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawShareImage();
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

  drawShareImage() {
    const scale = wx.getSystemInfoSync().windowWidth / 750;
         //绘制canvas图片
         //创建一个canvas对象
         const ctx = wx.createCanvasContext('shareBox', this);
         // this.drawNormalText(ctx, "canvas生成的图片", 0, 0, 30, '#ffffff', 'left', 'middle')
         //商品主图
         var bgSize1 = 750 / 500
         this.drawImage(ctx, "/imgs/demo.jpg", 20, 20, 710, 710 / bgSize1);
         //绘制商品标题部分
         var bgSize2 = 750 / 246
         this.drawImage(ctx, "/imgs/detail-name-bg.jpg", 20, 490, 710, 710 / bgSize2);
         //绘制分享标题
         this.drawNormalText(ctx, "canvas生成的图片", 50, 548, 30, '#ffffff', 'left', 'middle')
         this.drawNormalText(ctx, "230.00元", 50, 660, 30, 'red', 'left', 'middle')
         this.drawNormalText(ctx, "230.00元", 50 + 1, 660, 30, 'red', 'left', 'middle')
         this.drawNormalText(ctx, "230.00元", 50, 660 + 1, 30, 'red', 'left', 'middle')
         this.drawNormalText(ctx, "230.00元", 50 + 1, 660 + 1, 30, 'red', 'left', 'middle')
         //绘制canvas标记(绘制圆形并加阴影)
         ctx.arc(120 * scale, 120 * scale, 80 * scale, 0, 5 * scale * Math.PI)
         ctx.setFillStyle('#22aaff')
         ctx.setShadow(0, 0, 20 * scale, "#aaaaaa")
         ctx.fill()
         this.drawNormalText(ctx, "Canvas", 118, 100, 30, 'white', 'center', 'middle')
         this.drawNormalText(ctx, "合成", 118, 140, 30, 'white', 'center', 'middle')
     
         //绘制画布，并在回调中获取画布文件的临时路径  
         var self = this
         ctx.draw(true, function() {
           wx.canvasToTempFilePath({
             canvasId: 'shareBox',
             success(res) {
               console.log('分享截图 res 是',res)
               if (res.tempFilePath) {
                 self.setData({
                   shareUrl: res.tempFilePath
                 })
                 wx.setStorageSync("shareUrl", res.tempFilePath)
               }
             }
           })
         });
       },

       //绘制图片封装
   drawImage(ctx, url, x, y, w, h) {
    const scale = wx.getSystemInfoSync().windowWidth / 750;
       ctx.drawImage(url, x * scale, y * scale, w * scale, h * scale);
     },
     // 绘制只有一行的文字
     drawNormalText(ctx, str, x, y, font, style, align, baseLine) {
      const scale = wx.getSystemInfoSync().windowWidth / 750;
       ctx.setFontSize(font * scale);
       ctx.setFillStyle(style);
       ctx.setTextAlign(align);
       ctx.setTextBaseline(baseLine);
       ctx.fillText(str, x * scale, y * scale);
     },
})