// miniprogram/pages/new/addCaigoudan/addCaigoudan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    typeList:['班台','职员桌','文件柜','班椅','沙发','茶几','茶水柜','会议桌','会议椅','主席台','会议条桌','演讲台','接待台','洽谈桌','其他'],
    hasntSelect:true,
    hasntSelect2:true,
    series:'',
    carts:[],
    orderId:'',
    seriesList:[],
    groupOrder:[],
    pageNumber:1,
    totalPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId;
    this.setData({
      orderId: orderId
    })
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
    this.searchFurniture();
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
    if(!this.data.hasntSelect&& this.data.hasntSelect2){
      console.log('searching furniture with series!!!  seriess is '+this.data.series);
      db.collection('detail').where({
        series:this.data.series
      }).get({
        success: res => {
          var itemInPage =10 ;
          var groupOrder = this.group(res.data,itemInPage);
          var totalPage = this.getTotalPage(res.data.length,itemInPage);
          this.setData({
            carts:groupOrder[0],
            groupOrder:groupOrder,
            totalPage:totalPage
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
    else if(!this.data.hasntSelect2 && this.data.hasntSelect){
      console.log('searching furniture with type!!!  type is '+this.data.type);
    db.collection('detail').where({
      type:this.data.type
    }).get({
      success: res => {
        var itemInPage =10 ;
        var groupOrder = this.group(res.data,itemInPage);
        var totalPage = this.getTotalPage(res.data.length,itemInPage);
        this.setData({
          carts:groupOrder[0],
          groupOrder:groupOrder,
          totalPage:totalPage
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
          var itemInPage =10 ;
          var groupOrder = this.group(res.data,itemInPage);
          var totalPage = this.getTotalPage(res.data.length,itemInPage);

          this.setData({
            carts:groupOrder[0],
            groupOrder:groupOrder,
            totalPage:totalPage
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
    let page = getCurrentPages();
    let prevPage = page[page.length-2];
    prevPage.setData({
      itemId:itemId
    })
    console.log('try to save the item----------------------- id is '+prevPage.data.itemId);
    wx.navigateBack({
      delta: 0,
    })
    //wx.navigateTo({
      //url: '../caigoudan/caigoudan?itemId='+itemId,
    //})
  },

  goDetails:function(event){
    var itemId = event.currentTarget.dataset.id;
    console.log('try to go to the detail of the item----------------------- id is '+itemId);
    wx.navigateTo({
      url: '../../details/details?itemId='+itemId+'&orderId='+this.data.orderId+'&addingItem='+true,
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
          carts:this.data.groupOrder[this.data.pageNumber-2],
          pageNumber:this.data.pageNumber-1,
        })
      }
  
    },
  
    nextPage:function(){
      console.log('跳转到下一页');
      if(this.data.pageNumber<this.data.totalPage){
        this.setData({
          carts:this.data.groupOrder[this.data.pageNumber],
          pageNumber:this.data.pageNumber+1,
        })
      }
    },

})