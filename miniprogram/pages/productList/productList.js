Page({
  data: {
    seriesList: [
      { text: '全部系列', value: '全部系列' },
    ],
    typeList: [
      { text: '全部类型', value: '全部类型' },
      { text: '班台', value: '班台' },
      { text: '职员桌', value: '职员桌' },
      { text: '文件柜', value: '文件柜' },
      { text: '班椅', value: '班椅' },
      { text: '沙发', value: '沙发' },
      { text: '茶几', value: '茶几' },
      { text: '茶水柜', value: '茶水柜' },
      { text: '会议桌', value: '会议桌' },
      { text: '会议椅', value: '会议椅' },
      { text: '主席台', value: '主席台' },
      { text: '会议条桌', value: '会议条桌' },
      { text: '演讲台', value: '演讲台' },
      { text: '接待台', value: '接待台' },
      { text: '洽谈桌', value: '洽谈桌' },
      { text: '其他', value: '其他' },
    ],

    curSeries: '全部系列',
    curType: '全部类型',
    curNav: 1,
    curIndex: 0,

    filtedItems: [],

    storedItems:[],

    //van-search props
    searchValue:'',
  },

  onSeriesChange:function({detail}) {
    this.setData({
      curSeries:detail
    })
    
    this.reLoadItems()
  },

  onTypeChange:function({detail}) {
    this.setData({
      curType:detail
    })
    
    this.reLoadItems()
  },

  reLoadItems:function(){
    console.log('reloading-----------------------------')
    this.loadBySeriesAndType()
    // if (this.data.curSeries != '全部系列' && this.data.curType != '全部类型'){
    //   this.loadBySeriesAndType()
    // }
    // if (this.data.curSeries != '全部系列'){
    //   this.loadBySeries()
    // }
    // if (this.data.curType != '全部类型'){
    //   this.loadByType()
    // }
  },

  async onLoad(){
    wx.showToast({ title: '加载中', icon: 'loading', duration: 5000 });
    this.loadNav();
    const db = wx.cloud.database()

    let count = await db.collection('detail').count()
    count = count.total

    let all = []
    for(let i=0;i<count;i+=20){
      if(i<count-20){
        let list = await db.collection('detail').skip(i).get()
        all=all.concat(list.data) 
      }else{
        await db.collection('detail').skip(i).get({
          success: res => {
            console.log('await==================res================== ', res);
            all=all.concat(res.data) 
            console.log('now the all is ------------------',all)
            this.setData({
              filtedItems: all,
              storedItems:all
            })
            wx.hideToast();
    
            console.log('[数据库] [查询记录] 成功: ', res);
          }
        })
      }

    }
    console.log(all)
  },

  loadNav:function(){
    var tempList = this.data.seriesList;
    const db = wx.cloud.database();
    db.collection('gomeSeries').where({
    }).get({
      success: res => {
        for(let i =0 ;i<res.data.length;i++){
          var item = {
            text: res.data[i].name,
            value: res.data[i].name
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

  onShow: function () {
    this.reLoadItems();
  },

  loadByType: function() {
    const db = wx.cloud.database();

    db.collection('detail').where({
      type:this.data.curType,
    }).field({
      _id: true,
      name: true,
      url: true,
      comment: true,
      price: true,
      type: true,
    }).get({
      success: res => {
        this.setData({
          filtedItems: res.data
        })
        wx.hideToast();

        console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
      }
    })
  },

  loadBySeries: function() {
    const db = wx.cloud.database();

    db.collection('detail').where({
      series:this.data.curSeries,
    }).field({
      _id: true,
      name: true,
      url: true,
      comment: true,
      price: true,
      type: true,
    }).get({
      success: res => {
        this.setData({
          filtedItems: res.data
        })
        wx.hideToast();

        console.log('[数据库] [查询记录] 成功: ', res);
      },
      fail: err => {
      }
    })
  },

  loadBySeriesAndType: function() {
    let tempList = []
    for(let i=0;i<this.data.storedItems.length;i++){
      var item = this.data.storedItems[i]
      if(this.data.curSeries!='全部系列' && item.series != this.data.curSeries){
        continue
      }
      if(this.data.curType!='全部类型' && item.type != this.data.curType){
        continue
      }
      tempList.push(item)
    }
    this.setData({filtedItems:tempList})
  },

})  