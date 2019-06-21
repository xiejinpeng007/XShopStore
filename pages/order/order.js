// pages/order/order.js

var app = getApp()
var constans = require('../../utils/constants.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartGoods: null,
    totalPrice: 0,
    paySuccess: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartGoods: app.globalData.cartGoods.filter(it => it.checked == true),
      totalPrice: app.globalData.cartGoods.filter(it => it.checked == true)
        .reduce((pre, cur, curIndex, arr) => pre + cur.price * cur.quantity, 0)
        .toFixed(1)
      ,
      numList: [{
        name: '下单'
      }, {
        name: '支付'
      }, {
        name: '成功'
      },],
      steps: 1
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

  clickPay() {
    //debug
    // this.setData({
    //   cartGoods: app.globalData.cartGoods.filter(it => !it.checked),
    //   paySuccess: true,
    //   steps : 2
    // })
    // app.globalData.cartGoods = app.globalData.cartGoods.filter(it => !it.checked);
    wx.showLoading()
    var param = this.data.cartGoods.map(it => it.barCode + ',' + it.quantity).join(";").toString()
    console.log(param)
    wx.request({
      url: constants.baseUrl + '/api_payManyGoods',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        cart: param
      },
      success: (res) => {
        if (res.data.status == "OK") {
          this.setData({
            cartGoods: app.globalData.cartGoods.filter(it => !it.checked),
            paySuccess: true,
            steps: 2
          })
          app.globalData.cartGoods = app.globalData.cartGoods.filter(it => !it.checked);
        } else {
          wx.showModal({
            content: '请求错误',
          })
        }
      },
      fail: (res) => {
        wx.showModal({
          title: '请求错误'
        })
      },
      complete: (res) => {
        console.log(res)
        wx.hideLoading()
      },
    })
  },

  clickSuccess() {
    wx.navigateBack()
  },
})