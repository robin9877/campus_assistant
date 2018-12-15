var server = getApp().globalData.server
// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    term: [['2016-2017', '2017-2018'], ['1', '2']],
    multiIndex: [0, 1],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.get_score();
    this.setData({
      scores:[
        { lesson_name: '数学', score: '99'},
        { lesson_name: '语文', score: '99' },
        { lesson_name: '英语', score: '99' },
        { lesson_name: '数学', score: '99' },
        { lesson_name: '语文', score: '992' },
        { lesson_name: '英语', score: '99' },
        { lesson_name: '数学', score: '99' },
        { lesson_name: '语文', score: '993' },
        { lesson_name: '英语', score: '99' },
        { lesson_name: '数学', score: '99' },
        { lesson_name: '语文', score: '992' },
        { lesson_name: '英语', score: '993' },
        { lesson_name: '数学', score: '99' },
        { lesson_name: '语文', score: '993' },
        { lesson_name: '英语', score: '9a9' },
      ]
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
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变3，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  query: function() {
    let term = this.data.term;
    let index = this.data.multiIndex;
    console.log(term[0][index[0]] + ' ' + term[1][index[1]]);
    this.get_score(term[0][index[0]], term[1][index[1]]);
  },
  get_score: function (year,term) {
    var that = this;
    wx.request({
      url: server + '/score',
      method: 'POST',
      data: {
        a: '2016283414',
        p: '166236',
        year: year,
        term: term
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            scores: res.data.result
          })
        }
        else if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }

      },
      fail() {
        console.log('查询成绩失败')
        wx.showToast({
          title: '查询成绩失败',
          icon: 'none'
        })
      }
    })
  }
})