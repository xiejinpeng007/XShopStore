// pages/chargeHistory/chargeHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historys: null,
    sumCharge: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadChargeHistory()
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
  loadChargeHistory() {
    // var startDate = new Date()
    // var endDate = new Date()
    // startDate.setDate(new Date().getDay() - 365)
    // var start = this.date2String(startDate, "yyyy-MM-dd hh:mm")
    // var end = this.date2String(endDate, "yyyy-MM-dd hh:mm")

    // wx.showLoading();
    wx.request({
      url: constans.baseUrl + '/api_getChargeHistory',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        start: "",
        end: "",
        offset: 0,
        limit: 0,
      },
      success: (res) => {
        console.log(res.data)
        // wx.hideLoading()
        if (res.data != null) {
          this.setData({
            historys: res.data.chargeHistory,
            sumCharge: res.data.chargeHistory
              .map(it => it.charge)
              .reduce(function (pre, cur) {
                return pre + cur
              })
          })
        } else {
          wx.showModal({
            content: '请求错误',
          })
        }
      }
    });
  },
})