const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.downloadFile({
      url: 'https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/lotteries/1/bg/sharemain.png', //仅为示例，并非真实的资源
      success:(res)=> {
          console.log(res.tempFilePath)
          var imgs = res.tempFilePath


            wx.getSystemInfo({
              success: (res) => {
                this.width = res.windowWidth
                var w = this.width / 750
                var that = this;
                const ctx = wx.createCanvasContext('myCanvas');
                var imgPath = imgs
                ctx.drawImage(imgPath, 0, 0, 750*w, 1334*w);
                ctx.draw(false, () => {
                  wx.canvasToTempFilePath({
                    canvasId: 'myCanvas',
                    success: function (res) {
                      console.log(res.tempFilePath);
                      that.setData({
                        shareImgSrc: res.tempFilePath
                      })
                    },
                    fail: function (res) {
                      console.log(res)
                    }
                  })
                })
              },
            })


      }
    })
    
    
  },
  saves(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImgSrc,
      success(res) {
        wx.showModal({
          title: '存图成功',
          content: '图片成功保存到相册了，去发圈噻~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      }})
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