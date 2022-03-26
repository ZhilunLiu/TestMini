// miniprogram/pages/new/addProduct/addProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    avatarUrl:'',
    nickname:'',
    manager:false,
    productName:'',
    phone:'',
    orderNumber:'',
    series:'',
    price:'',
    size:'',
    desc:'',
    width:'',
    depth:'',
    height:'',
    type:'',
    typeList:['班台','职员桌','文件柜','班椅','沙发','茶几','茶水柜','会议桌','会议椅','主席台','会议条桌','演讲台','接待台','洽谈桌','其他'],
    hasntSelect:true,
    hasntSelect2:true,
    seriesList:[],
    imgUrls:[],
    newSeries:'',
    disPrice:'',
    company:'',
    comment:'',
    model:'',
    fileId:'',

    //van-cell props
    value:'',

    //van-actionsheet props
    showChooseSeries: false,
    showChooseType: false,
    seriesList:[],
    typeListInAction:[
      {name:'班台'},{name:'职员桌'},{name:'文件柜'},{name:'班椅'},{name:'沙发'},{name:'茶几'},{name:'茶水柜'},{name:'会议桌'},{name:'会议椅'},{name:'主席台'},{name:'会议条桌'},{name:'演讲台'},{name:'接待台'},{name:'洽谈桌'},{name:'其他'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSeries()
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

  uploadImgbutton:function(){
    var data = this.data
    if (data.series == '' || data.name == '' || data.type == '' || data.price == '' || data.company=='' ||data.desc == '', data.width == '', data.height == '') {
      wx.showToast({
        icon: 'none',
        title: '请填写完整家具信息, 包括厂家，名称，价格，描述，系列，种类 以及尺寸（长与高）',
        duration: 2500
      })
      return;
    }

    this.isDublicate();
  },

  isDublicate:function(){
    console.log('name is ' + this.data.name + ' series is ' + this.data.series);
    const db = wx.cloud.database();
    // 查询当前家具的details对应name
    db.collection('detail').where({
      name: this.data.productName,
      company: this.data.company
    }).get({
      success: res => {
        
        if(res.data.length ==0){

          this.doUpload()

        }else{
          wx.showToast({
            icon: 'none',
            title: '在该系列中已有重复家具',
            duration: 2500,
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

  
  // 上传图片
  doUpload: function () {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        // 上传图片
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          var newDateTime = (new Date()).valueOf();
          var name = that.data.name;
          var series = that.data.series;
          const filePath = res.tempFilePaths[i];
          const cloudPath = series + '/' + name + newDateTime + filePath.match(/\.[^.]+?$/)[0]
          that.upload(cloudPath, filePath);
        }

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  upload: function (cloudPath, filePath) {
    var that = this;
    console.log('uploading:');
    console.log(filePath);
    console.log(cloudPath);
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {

        console.log('[上传文件] 成功：', res);
        
        var fileId = [res.fileID];
        console.log('//////////////////////////：fileId 是', fileId[0]);
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            // get temp file URL

            var temp = this.data.imgUrls;
            temp.push(res.fileList[0].tempFileURL);
            that.setData({
              imgUrls:temp,
              fileId:fileId[0],
            })
            console.log(this.data.fileId);
            this.addTodb();
            //}
            console.log(imgUrls)
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

  
  addTodb:function(){
    console.log('add new item to the db the fileId is '+this.data.fileId);
    var dim = [[this.data.width,this.data.depth,this.data.height]];
    var price =[this.data.price];
    var size = [this.data.size];
    const db = wx.cloud.database();
    db.collection('detail').add({
      data: {
        name: this.data.productName,
        price: price,
        size: size,
        series: this.data.series,
        describtion: this.data.desc,
        type: this.data.type,
        url: this.data.imgUrls,
        dimension: dim,
        company:this.data.company,
        comment:this.data.comment,
        model:this.data.model,
        fileId:this.data.fileId,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
        })
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateBack({
          delta: 0,
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

  phoneInput: function (e) {
    this.setData({
      phone: e.detail
    })
  },

  orderNumInput: function (e) {
    this.setData({
      orderNumber: e
    })
  },

  seriesInput: function (event) {
    this.setData({
      newSeries: event.detail
    })
  },

  nameInput: function (event) {
    this.setData({
      productName: event.detail
    })
  },

  priceInput: function (e) {
    this.setData({
      price: e.detail
    })
  },

  descInput: function (e) {
    this.setData({
      desc: e.detail
    })
  },

  sizeInput: function (e) {
    this.setData({
      size: e.detail
    })
  },

  widthInput: function (e) {
    this.setData({
      width: e.detail
    })
  },

  depthInput: function (e) {
    this.setData({
      depth: e.detail
    })
  },

  heightInput: function (e) {
    this.setData({
      height: e.detail
    })
  },

  companyInput: function (e) {
    this.setData({
      company: e.detail
    })
  },

  modelInput: function (e) {
    this.setData({
      model: e.detail
    })
  },

  commentInput: function (e) {
    this.setData({
      comment: e.detail
    })
  },

  chooseSeries:function(){
    this.setData({
      showChooseSeries:true
    })
  },

  chooseType:function(){
    this.setData({
      showChooseType:true
    })
  },

  onChooseSeriesClose() {
    this.setData({ showChooseSeries: false });
  },

  onSeriesSelect(e) {
    console.log(e.detail);
    this.setData({
      series:e.detail.name
    })
  },

  onChooseTypeClose() {
    this.setData({ showChooseType: false });
  },

  onTypeSelect(e) {
    console.log(e.detail);
    this.setData({
      type:e.detail.name
    })
  },

  loadSeries:function(){
    var tempList = this.data.seriesList;
    const db = wx.cloud.database();
    db.collection('gomeSeries').where({
    }).get({
      success: res => {
        for(let i =0 ;i<res.data.length;i++){
          var item = {
            name: res.data[i].name
          }
          console.log(item);

          tempList.push(item);
        }
        console.log(tempList);
        this.setData({
          seriesList: tempList,
        })
        console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
      }
    })
  },


  addNewSeries:function(e){
    if(this.data.newSeries == ''){
      //please enter series
      wx.showToast({
        icon: 'none',
        title: '请填写新系列'
      })
    }else{
      const db = wx.cloud.database();
      db.collection('gomeSeries').add({
        data: {
          name: this.data.newSeries,
          url: '',
          index: 100,
          imgs: [],
        },
        success: res => {
          var itemList = this.data.seriesList;
          itemList.push(this.data.newSeries);
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            seriesList:itemList,
          })
          wx.showToast({
            title: '添加系列成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }


  },

})