// pages/goldEggs/goldEggs/goldEggs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    effect1:1.1,
    hammer:{
      deg:0
    },
    position:[{
      top:"-148rpx",
      left:"129rpx"
    },
      {
        top: "-148rpx",
        left: "363rpx"
      },
      {
        top: "-148rpx",
        left: "597rpx"
      },
      {
        top: "87rpx",
        left: "129rpx"
      },
      {
        top: "87rpx",
        left: "363rpx"
      },
      {
        top: "87rpx",
        left: "597rpx"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.times1 = setInterval(() => {
      this.data.effect1 = this.data.effect1===0.8?1.1:0.8
      this.setData({
        effect1: this.data.effect1
      })
    }, 2000)
    
    // this.za()
  },
  za(){
    this.time2 = setInterval(()=>{
        this.data.hammer.deg--
        if(this.data.hammer.deg<-50){
          this.setData({
            hammer: this.data.hammer
          })
          clearInterval(this.time2)
        }
    },10)
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