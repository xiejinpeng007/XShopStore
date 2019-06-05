// pages/buyHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historys: null,
    sumSpend: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGoods()
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

  date2String: function (date, fmt) { //author: meizz 
    var o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  ,
  loadGoods: function () {
    var startDate = new Date()
    var endDate = new Date()
    startDate.setDate(new Date().getDay() - 30)
    var start = this.date2String(startDate, "yyyy-MM-dd hh:mm")
    var end = this.date2String(endDate, "yyyy-MM-dd hh:mm")

    // wx.showLoading();
    wx.request({
      url: constans.baseUrl + '/api_getPayHistory',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        start: start,
        end: end,
        offset: 0,
        limit: 0,
      },
      success: (res) => {
        console.log(res.data)
        // wx.hideLoading()
        if (res.data != null) {
          this.setData({
            historys: res.data.history.sort(function (pre, next) { return pre.payTime > next.payTime ? -1 : 1 }),
            sumSpend: res.data.sumSpend
          })
        } else {
          wx.showModal({
            content: '请求错误',
          })
        }
      }
    });
  },
  formatPrice: function (price) {
    return price.toFixed(2)
  }
  ,
})