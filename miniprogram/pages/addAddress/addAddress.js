// miniprogram/pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:'',
      phone:'',
      region:'',
      address:'',
      index:0,
      hasNoRegion:true,
      hasOpenId:false,
      sysName:[],
      sysPhone:[],
      sysAddress:[],
      dataId:'',
      updated:false,
      created:false,
  },

  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },

  addressInput:function(e){
    this.setData({
      address: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      hasNoRegion:false,
    })
  },

  phoneInput:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  save:function(e){
    if (this.data.name == '') {
      this.popup.showPopup();
    } else if (this.data.phone == '') {
      this.popup.showPopup();
    } else if (this.data.address == '') {
      this.popup.showPopup();
    } else if (this.data.region == '') {
      this.popup.showPopup();
    }else{
      var result = this.data.hasOpenId;
      console.log(result);
      if(result == true){
        this.update();
      }else{
        this.add();
      }

    }
  },

  back:function(e){
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  //查找有无数据
  search:function(e){
    const db = wx.cloud.database();
    var app = getApp();
    var id = app.globalData.openId;
    db.collection('users').where({
      _openid: id
    }).get({
      success: res => {
        console.log(res);
        if(res.data[0].length ==0){
          this.setData({
            hasOpenId:false,
          })
        }else{
          this.setData({
            hasOpenId: true,
            sysName:res.data[0].name,
            sysAddress:res.data[0].address,
            sysPhone:res.data[0].phone,
            dataId:res.data[0]._id,
          })
        }
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

  update:function(e){
    const db = wx.cloud.database();
    var app = getApp();
    var id = app.globalData.openId;
    this.data.sysName.push(this.data.name);
    this.data.sysPhone.push(this.data.phone);
    var addDetail = this.data.region.concat(this.data.address);
    this.data.sysAddress.push(addDetail);
    db.collection('users').doc(this.data.dataId).update({
      data: {
        name: this.data.sysName,
        phone: this.data.sysPhone,
        address: this.data.sysAddress
      },
      success: res => {
        console.error('[数据库] [更新记录] 成功', res);
        this.back();
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })

  },

  add:function(e){

    this.data.sysName.push(this.data.name);
    this.data.sysPhone.push(this.data.phone);
    this.data.sysAddress.push(this.data.address);
    var addDetail = this.data.region.concat(this.data.address);
    var id = getApp().globalData.openId;
    const db = wx.cloud.database();
    db.collection('users').add({
      data: {
        name: this.data.sysName,
        phone: this.data.sysPhone,
        address: addDetail,
        orders:[],
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        this.back();
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


  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  },

  onLoad: function (options) {
    this.search();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");
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