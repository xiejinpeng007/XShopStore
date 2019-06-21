// pages/tab1/tab1.js
// const Toast = require('components/toast/toast');
var app = getApp()
var constans = require('../../utils/constants.js'); 

Page({

  /**
   * 页面的初始数
   * 据
   */
  data: {
    goodsList: null,
    filteredGoodsList: null,
    icons: ["food-pecan", "food-avocado", "food-bread", "food-cake", "food-cashew",
      "food-chips", "food-cookie", "food-doughnut", "food-eggyolkcake", "food-hotdog",
      "food-macaron", "food-mochi", "food-pistachio", "food-pizza", "food-popcorn", "food-popsicle",
      "food-pudding", "food-strawberry", "food-sushi", "food-taco"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGoods();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

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
    if (this.data.goodsList != null) {
      this.setData({
        filteredGoodsList: null
      })
    } else {
      this.loadGoods();
    }
    wx.stopPullDownRefresh()
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

  loadGoods: function () {
    var that = this;
    wx.showLoading();
    wx.request({
      url: constans.baseUrl + '/api_getAllGoods',
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        wx.hideLoading();
        if (res.data != null) {
          // that.setData({goodsList:res.data})
          that.setData({
            goodsList: res.data.filter(it => it.count > 0).reverse()
          })
        } else {
          wx.showModal({
            content: '请求错误',
          })
        }
      }
    });
  },

  addToCart: function (e) {
    var index = app.globalData.cartGoods ?
      app.globalData.cartGoods
        .map(it => it.name == (this.data.filteredGoodsList ?
          this.data.filteredGoodsList[e.currentTarget.dataset.index].name :
          this.data.goodsList[e.currentTarget.dataset.index].name))
        .findIndex(it => it == true) : -1;
    if (index != -1) {
      app.globalData.cartGoods[index].quantity++
    } else {
      app.globalData.cartGoods.push(this.goodsToCartGoods(this.data.filteredGoodsList ? this.data.filteredGoodsList[e.currentTarget.dataset.index] : this.data.goodsList[e.currentTarget.dataset.index]));
    }

    wx.showToast({
      title: '已添加到购物车',
      icon: 'none'
    });
    console.log(app.globalData);
  },

  searchGoodsList: function (e) {
    this.setData({
      filteredGoodsList: this.data.goodsList.filter(it => it.name.includes(e.detail.value))
    })
    // if(!this.data.filteredGoodsList){
    //   Toast({
    //     message: 'toast me'
    //     // selector: '#zan-toast-test'
    //   });
    // }
  },

  clearSearch: function (e) {
    if (e.detail.value) {
      this.setData({
        filteredGoodsList: null
      })
    }
  },

  goodsToCartGoods(goods) {
    return {
      name: goods.name,
      barCode: goods.barCode,
      quantity: 1,
      note: goods.note,
      unit: goods.unit,
      price: goods.salePrice,
      checked: true
    }
  },

  onClickQrScan(e) {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          filteredGoodsList: this.data.goodsList.filter(it => it.barCode.includes(res.result))
        })
      }
    })


  }
})