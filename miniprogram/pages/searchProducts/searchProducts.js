// searchProducts/searchProducts.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    filtedItems:[]
  },



  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
      var searValue = options.searchValue
      console.log('searValue is ------------',searValue)
      if(searValue!= undefined && searValue !=''){
        this.setData({
          searchValue:options.searchValue
        })
        this.loadBySearchValue();
      }
    },

    searchProduct:function(e){
      this.setData({
        searchValue:e.detail
      })
      this.loadBySearchValue()
    },
  
    loadBySearchValue(){
      const db = wx.cloud.database();
      db.collection('detail').where({
        name:db.RegExp({
          regexp: '.*' + this.data.searchValue,
          options: 'i',
        })
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

  }
})
