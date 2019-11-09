Page({
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "会议桌",
        ishaveChild: true,
        children:[]
      },
      {
        cate_id: 2,
        cate_name: "班台",
        ishaveChild: true,
        children:[]
      },
      {
        cate_id: 3,
        cate_name: "茶几/小桌",
        ishaveChild: true,
        children:[]
      },
      {
        cate_id: 4,
        cate_name: "文件柜",
        ishaveChild: true,
        children:[]
      },
      {
        cate_id: 5,
        cate_name: "沙发",
        ishaveChild: true,
        children:[]
      },
      {
        cate_id: 6,
        cate_name: "员工工作站",
        ishaveChild: true,
        children:[]
      },
      {
        cate_id: 7,
        cate_name: "其他",
        ishaveChild: true,
        children:
          []
      },
      /*
      {
        cate_id: 8,
        cate_name: "高管系列",
        ishaveChild: true,
        children:
          []
      },
      {
        cate_id: 9,
        cate_name: "柏拉图",
        ishaveChild: true,
        children:
          []
      },
      {
        cate_id: 10,
        cate_name: "开普勒",
        ishaveChild: true,
        children:
          []
      },*/



    ],
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  

    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });

    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index

    var item = {
      cate_id: id,
      cate_name: this.data.cateItems[index].cate_name,
      ishaveChild: true,
      children: []
    }

    var ItemList = this.data.cateItems

    const db = wx.cloud.database();

    if(index < 7){

      this.loadtypeDetail(item, id, index, ItemList);

    } else{
      console.log("Series now:")
      this.loadFullDetail(item, id, index, ItemList);
    }
    
    


    //this.setData({
    //  curNav: id,
    //  curIndex: index
    //})
  },

  loadFullDetail: function (item, id, index, ItemList) {
    var that = this;
    var name = item.cate_name;
    wx.cloud.callFunction({
      name: 'getMoreDetail',
      data: {
        series: name,
      },
      success(res){
        ItemList[index].children = res.result.data;
        console.log('云函数获取到的result: ', res.result)
        that.setData({
          cateItems: ItemList,
          curNav: id,
          curIndex: index
        })
        wx.hideToast();
      },
      fail:console.error
    })
  },

  loadtypeDetail: function (item, id, index, ItemList) {
    var that = this;
    console.log(item)
    wx.cloud.callFunction({
      name: 'getTypeDetail',
      data: {
        type: item.cate_name,
      },
      success(res) {
        ItemList[index].children = res.result.data;
        console.log('云函数获取到的result: ', res.result)
        that.setData({
          cateItems: ItemList,
          curNav: id,
          curIndex: index
        })
        wx.hideToast();
      },
      fail: console.error
    })
  },

  onLoad: function (options) {

    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });

    this.loadLeftBar();


  },



  loadCurType:function(){
    var Item = {
      cate_id: 1,
      cate_name: "会议桌",
      ishaveChild: true,
      children: []
    }

    var ItemList = this.data.cateItems

    console.log(this.data.cateItems[0].children)

    const db = wx.cloud.database();

    db.collection('detail').where({
      type: "会议桌"
    }).field({
      _id: false,
      name: true,
      url: true,
    }).get({
      success: res => {
        ItemList[0].children = res.data
        this.setData({
          cateItems: ItemList
        })
        wx.hideToast();

        console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
      }
    })
  },

  loadLeftBar:function(){

    var tempList = this.data.cateItems;
    var length = this.data.cateItems.length;
    const db = wx.cloud.database();
    db.collection('gomeSeries').where({
    }).get({
      success: res => {

        for(let i =0 ;i<res.data.length;i++){
          console.log('inthe loop');
          var item = {
            cate_id: length+i+1,
            cate_name: res.data[i].name,
            ishaveChild: true,
            children: []
          }
          console.log(item);

          tempList.push(item);
        }
        console.log(tempList);
        this.setData({
          cateItems: tempList,
        })

        this.loadCurType();

        console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
      }
    })
  },

  onShow: function () {
    this.loadCurType();
  },
})  