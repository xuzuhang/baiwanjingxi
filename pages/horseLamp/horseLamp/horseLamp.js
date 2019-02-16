// pages/horseLamp/horseLamp/horseLamp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa: 'scale(1)',
    bb: 'scale(1)',
    num:10000000,
    cc:"rotateZ(20deg)"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
      setInterval(()=>{
        this.data.num = this.data.aa == 'scale(0.85)' ?this.data.num:this.data.num-5
        this.data.aa = this.data.aa == 'scale(0.85)' ? 'scale(1)' : 'scale(0.85)'
        this.setData({
          aa: this.data.aa,
          num:this.data.num
        })
      },500)
      setInterval(()=>{
        this.data.bb = this.data.bb == 'scale(0.9)' ? 'scale(1)' : 'scale(0.9)'
        this.setData({
          bb: this.data.bb
        })
      },900)
      setInterval(()=>{
        this.data.cc = this.data.cc == "rotateZ(-20deg)" ? "rotateZ(20deg)" : "rotateZ(-20deg)"
        this.setData({
          cc: this.data.cc
        })
      },300)
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

  }
})