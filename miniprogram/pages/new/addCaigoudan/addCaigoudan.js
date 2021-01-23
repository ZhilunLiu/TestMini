// miniprogram/pages/new/addCaigoudan/addCaigoudan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    typeList:['会议桌','班台','茶几/小桌','文件柜','沙发','员工工作站','其他'],
    hasntSelect:true,
    hasntSelect2:true,
    series:'',
    carts:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('gomeSeries').where({
    }).get({
      success: res => {
        var tempList = [];
        for(let i =0;i <res.data.length;i++){
          tempList.push(res.data[i].name);
        }
        this.setData({
          seriesList:tempList,
        })
        console.log('seriesList is !!!! ', res);
        console.log('[数据库] [查询记录] 成功: ', res);
        wx.hideToast();
      },
      fail: err => {
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
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasntSelect: false,
      series: this.data.seriesList[e.detail.value],
    })

  }, 

  bindPicker2Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hasntSelect2: false,
      type: this.data.typeList[e.detail.value],
    })
    this.searchFurniture();
  }, 

  searchFurniture:function(){
    const db = wx.cloud.database();
    if(!this.data.hasntSelect){
      console.log('searching furniture with series!!! ');
    db.collection('detail').where({
      series:this.data.series
    }).get({
      success: res => {
        this.setData({
          cart:tempList,
        })
        console.log('seriesList is !!!! ', res);
        console.log('[数据库] [查询记录] 成功: ', res);
        wx.hideToast();
      },
      fail: err => {
        console.log('search failed!!! ');
      }
    })
    }
    else if(!this.data.hasntSelect2){
      console.log('searching furniture with type!!!  type is '+this.data.type);
    db.collection('detail').where({
      type:this.data.type
    }).get({
      success: res => {
        this.setData({
          carts:res.data
        })
        console.log('cart is !!!! ', this.data.carts);
        console.log('[数据库] [查询记录] 成功: ', res);
        wx.hideToast();
      },
      fail: err => {
        console.log('search failed!!! ');
      }
    })
    }
    else{
      console.log('searching furniture with series and type!!! ');
      db.collection('detail').where({
        type:this.data.type,
        series:this.data.series
      }).get({
        success: res => {
          this.setData({
            cart:tempList,
          })
          console.log('seriesList is !!!! ', res);
          console.log('[数据库] [查询记录] 成功: ', res);
          wx.hideToast();
        },
        fail: err => {
          console.log('search failed!!! ');
        }
      })
    }
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

  save:function(event){
    var $this = this;
    var itemId = event.currentTarget.dataset.id
    console.log('try to save the item----------------------- id is '+itemId);
    wx.navigateTo({
      url: '../caigoudan/caigoudan?itemId='+itemId,
    })
  }

})