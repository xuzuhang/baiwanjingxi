const damand = require('../../../utils/nrequest.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  pay(){
    this.damand("/vip/orders?referrerId=" + app.globalData.referrerId, "POST", "", (res) => {
      var res = res.data.data
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
        success: (res) => { 
        wx.navigateBack({
          delta:1,
          success(){
            wx.showToast({
              title: '恭喜你成为vip',
              icon: 'success',
              duration: 2000
            })
          }
        })
          
        },
        fail(res) {

        }
      })
      
    })
  },
  damand: damand,
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
    return {
      title: app.globalData.shareObj.title,
      imageUrl: app.globalData.shareObj.imgUrl,
      path: app.globalData.shareObj.path
    }
  }
})