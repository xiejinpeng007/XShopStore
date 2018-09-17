// pages/tab2/tab2.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartGoods: null,
    totalPrice: 0,
    selectedAll: false,
    actions: [{
      name: '不买了',
      color: '#fff',
      fontsize: '20',
      width: 100,
      icon: 'trash',
      background: '#ed3f14'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      cartGoods: app.globalData.cartGoods
    })
    this.calculateTotalPrice()
    this.checkSelectedAll()
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
  onCartNumChanged: function (e) {
    //此用法用于对某个属性进行修改
    var quan = "cartGoods[" + e.currentTarget.dataset.index + "].quantity"
    this.setData({
      [quan]: e.detail
    })
    this.calculateTotalPrice()
  },

  onClickOrder() {
    if (!wx.getStorageSync("token")) {
      app.globalData.toastLogin = true;
      wx.switchTab({
        url: '/pages/tab3/tab3',
      })
      return
    }

    if (this.data.cartGoods.filter(it => it.checked).length == 0) {
      wx.showToast({
        title: '没有选中的商品',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
  },

  onCheckChanged(e) {
    //e.detail.value 为空那么是未选中状态
    console.log(e)
    var checked = "cartGoods[" + e.currentTarget.dataset.index + "].checked";

    this.setData({
      [checked]: e.detail.value == '' ? false : true
    })
    app.globalData.cartGoods[e.currentTarget.dataset.index].checked = e.detail.value == '' ? false : true;
    this.calculateTotalPrice();
    this.checkSelectedAll();
  },

  onClickSelectAll(e) {
    app.globalData.cartGoods = app.globalData.cartGoods
      .map(it => {
        it.checked = e.detail.value == '' ? false : true
        return it
      });
    this.setData({
      cartGoods: app.globalData.cartGoods
    })
    this.calculateTotalPrice();

  },

  calculateTotalPrice() {
    this.setData({
      totalPrice: app.globalData.cartGoods
        .filter(it => it.checked == true)
        .reduce((pre, cur, curIndex, arr) => pre + cur.price * cur.quantity, 0)
        .toFixed(1)
    })
  },

  checkSelectedAll() {
    this.setData({
      selectedAll: app.globalData.cartGoods.length > 0 ? app.globalData.cartGoods.every(it => it.checked == true) : false
    })
  },

  onItemDelete(e) {
    console.log(e);
    this.setData({
      cartGoods: app.globalData.cartGoods
        .filter((value, num, arr) => num != e.currentTarget.dataset.index)
    })
    app.globalData.cartGoods = this.data.cartGoods;
    this.checkSelectedAll();
    this.calculateTotalPrice();
  }

})