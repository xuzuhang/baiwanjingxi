// pages/flop/flop/flop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:-180,
    animationData:0,
    flop:[{
      angle:-180,
      image:"../../my/myImg/01.png"
    },
      {
        angle: -180,
        image: "../../my/myImg/02.png"
      },
      {
        angle: -180,
        image: "../../my/myImg/03.png"
      },
      {
        angle: -180,
        image: "../../my/myImg/04.png"
      },
      {
        angle: -180,
        image: "../../my/myImg/05.png"
      },
      {
        angle: -180,
        image: "../../my/myImg/06.png"
      },
      {
        angle: -180,
        image: "../../my/myImg/07.png"
      },
      {
        angle: -180,
        image: "../../my/myImg/08.png"
      },
      {
        angle: -180,
        image: "../../my/myImg/09.png"
      }
    ],
    priceArray:[
      "../../my/myImg/01.png",
      "../../my/myImg/02.png",
      "../../my/myImg/03.png",
      "../../my/myImg/04.png",
      "../../my/myImg/05.png",
      "../../my/myImg/06.png",
      "../../my/myImg/07.png",
      "../../my/myImg/08.png",
      "../../my/myImg/09.png",
    ],
    layers: "none"
  },
  
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  reverseSide(index){  //翻反面

    var count = 0
    this.index = setInterval(() => {
      this.data.flop[index].angle += count
      count--
      if (this.data.flop[index].angle <= -180) {
        clearInterval(this.index)
      }
      this.setData({
        flop: this.data.flop
      })
    }, 50)
  }, 
  frontSide(index){  //翻正面
 
    var count = 0
    this.data.flop[index].timer = setInterval(() => {
      this.data.flop[index].angle += count
      count++
      if (this.data.flop[index].angle >= 0) {
        clearInterval(this.data.flop[index].timer)
      }
      this.setData({
        flop: this.data.flop
      })
    }, 50)
  }, 
  fan(e){  //翻一张牌的逻辑
    var index = e.currentTarget.dataset.index
    var zhongIndex = 3
    this.data.flop[index].image = this.data.priceArray[zhongIndex]
    this.data.priceArray.splice(zhongIndex,1)  //先删除那张图片
    this.data.priceArray.splice(index,0,1)   //在数组中加一个保持位置相等
    for (var i = 0; i < this.data.flop.length;i++){
      if(i===index){
        break
      }else{
        this.data.flop[i].image = this.data.priceArray[i]
      }
    }
    console.log(this.data.flop)
    this.setData({
      flop: this.data.flop
    }, ()=>{
      this.frontSide(index)
      setTimeout(() => {
        this.fullTurn(index)
      }, 2000)
    })
    
    
    
  },
  fullTurn(index){    //全部反正面的逻辑
    for(let i=0;i<this.data.flop.length;i++){
      if (!(i === index)) {
        this.frontSide(i)
      } 
    }
   
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