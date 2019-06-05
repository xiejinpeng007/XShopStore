// pages/tab3/tab3.js

var app = getApp()
var constans = require('../../utils/constans.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    token: null,
    money: null,
    wxUserInfo: null,
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
    if (wx.getStorageSync('token')) {
      this.setData({
        token: wx.getStorageSync('token')
      })
      this.getUserInfo()
    };

    if (app.globalData.toastLogin) {
      wx.showToast({
        title: "请先登录",
        icon: "none",
      })
      app.globalData.toastLogin = false;
    }
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

  clickLogin(e) {
    wx.showLoading();
    wx.request({
      url: constans.baseUrl+'/api_login',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        name: this.data.username,
        password: this.data.password
      },
      success: (res) => {
        console.log(res.data)
        wx.hideLoading();
        if (res.data != null) {
          this.setData({
            money: res.data.money,
            token: res.data.token
          })
          wx.setStorageSync('token', res.data.token)
        } else {
          wx.showModal({
            content: '请求错误',
          })
        }
      }
    });
  },

  clickLogout() {
    wx.clearStorageSync();;
    this.setData({
      token: null,
      money: null
    });
  },

  getUserInfo() {
    // wx.showLoading();
    wx.request({
      url: constans.baseUrl+'/api_userinfo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: this.data.token
      },
      success: (res) => {
        console.log(res.data)
        // wx.hideLoading()
        if (res.data != null) {
          this.setData({
            money: res.data.money,
          })
        } else {
          wx.showModal({
            content: '请求错误',
          })
        }
      }
    });
  },

  onUsernameChanged(e) {
    console.log(e);
    this.setData({
      username: e.detail.detail.value
    })
  },

  onPasswordChanged(e) {
    console.log(e);
    this.setData({
      password: e.detail.detail.value
    })
  }

})