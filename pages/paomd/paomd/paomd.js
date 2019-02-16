const damand = require('../../../utils/nrequest.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    twinkle1: true,  //闪光
    btntrform: " translateX(-50%) scale(1)",   //按钮动画
    timesId: "",  //第几次id
    angle: [0, -45, -90, -135, -180, -225, -270, -315],  //角度
    award: {},  //奖品
    animationData: {}, //动画
    prizeArray: [], //奖品数组

    helpRed: "", //助力红包
    layers: "none",  //奖品图层
    assistId: "",   //推荐人 id
    helpLayer: "none",   //助力页面
    helpmoney: {    //得到多少助力金
      me: 1,
      friend: 0.33
    },
    tickets: 0,
    total: 1980,  //有多少人在参与活动
    ruleLayer: "none",  //规则页
    twinkles: true,  //闪光
    r: 30,
    prizeLIst: [],  //奖品列表
    cashs: {   //有多少钱和礼券
      cash: 0,
      coupons: 0
    },
    pig: {  //金猪
      bottom: "2000rpx",
      right: "760rpx"
    },


    dengsrc: '../../images/paomd_06.png',
    Arrays: [false, false, false, false, false, false, false, false, false, false, false, false],
   
    skin: {
      background: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/background.jpg",
      banner: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/banner.jpg",
      btn_rule_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_rule_01.png",
      turntable: {
        pan_side: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_side.png",
        pan_bg: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_bg.png",
        btn_start_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_start_01.png",
        Ring: ['https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_light01.png', 'https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_light02.png']
      },
      btn_getmore: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/09.png",
      prize: {
        bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/07.png",
        btn_charge_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_charge_01.png",
        btn_more_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_more_01.png",
        color: "#ffffff",
        textcolor: "#ffcc66"
      },
      user: {
        bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/08.png",
        color: "#fff"
      }
    }
    
  },
  showrulayer() {
    this.setData({
      ruleLayer: "block"
    })
  },
  hideruLayer() {
    this.setData({
      ruleLayer: "none"
    })
  },
  damand: damand,

  startcj(){  //跑马灯逻辑
    var i = 0;  //此处定义一个i执行效果类似于for循环，不过for循环执行太快，所以不能用
    var t = 60;  //标记转动速度，也就是每过60毫秒标记重新改变一次
    var round = 4; //表示标记转动的圈数
    var rNum = round * 12;   //表示标记转动的次数
    var num = 2
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.setData({
        Arrays: [false, false, false, false, false, false, false, false, false, false, false, false]
      })
      this.data.Arrays[i % 12] = "true"
      this.setData({
        Arrays: this.data.Arrays
      })
      i++;  //i自增
      if (i >= rNum - 12 && i < rNum + num) {                //否则让t每次增加li标签位置序列乘以5，此时计时器运行速度会降低，同时标签刷新速度也会降低
        t += (i - rNum + 8) * 5;
      }
      if (i == rNum + num) {　　　　　　　　　 //当i大于转rNum加随机出来的数字次计时器结束，出现信息提示框提示中奖信息
       
        clearInterval(this.timer)
        setTimeout(() => {
          console.log(111)
          
        }, 1500)

      }
    }, t);  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.twinkle11 = setInterval(()=>{
        this.data.twinkle1 = this.data.twinkle1?false:true
        this.setData({
          twinkle1: this.data.twinkle1
        })
    },1000)

    // this.pigMotion()
    this.init()
    
   
  },
  hidehelp() { //关闭主力页面
    clearInterval(this.times1)
    this.setData({
      helpLayer: "none"
    })
  },
  Tickets(e) {  //有多少次机会
    this.setData({
      tickets: e
    })
  },
  init() {
    var promise = new Promise(function (resolve) {
      resolve(42);
    });
    promise.then(this.prizeArray()).then(this.newest()).then(this.stat()).then(this.total()).then(this.gethelprpackets())
  },
  prizeArray() {  //求转盘里面的奖品数据

    // app.globalData.templateId = res.data.data.templateId
    // app.globalData.prizeArray = res.data.data.awards
    // app.globalData.times = res.data.data.awards
    // app.globalData.times = res.data.data.times
    this.damand("/awards/1", "GET", "", (res) => {
      // this.changeSkin(res.data.data.templateId - 1)   //换肤
      this.setData({
        prizeArray: app.globalData.prizeArray,  //奖品列表
        timesId: res.data.data.times  //id请求
      })
      this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
     //有多少次机会
        this.Tickets(res.data.data)
      })
    })
  },
  gethelprpackets() {  //助力红包求
    this.damand("/bonuses/1/assist", "GET", "", (res) => {
      console.log(res)
      if (res.data.data) {
        this.setData({
          helpRed: res.data.data.amount
        })
        this.damand("/users", "GET", "", (res) => {
          this.setData({
            assistId: res.data.data.id
          })
        })
      }
    })
  },
  newest() {  //获得中奖的人
    this.damand("/bonuses/1/newest", "GET", "", (res) => {
      var res = res.data.data
      console.log(res)
      this.setData({
        prizeList: res
      })
    })
  },
  total() {  //获得多少人在参与
    this.damand("/orders/1/total", "GET", "", (res) => {
      this.setData({
        total: res.data.data + 1980
      })
    })
  },
  stat() {  //获得奖品栏
    this.damand("/bonuses/1/stat", "GET", "", (res) => {
      this.data.cashs.cash = res.data.data.cash
      this.data.cashs.coupon = res.data.data.coupon
      this.setData({
        cashs: this.data.cashs
      })
    })
  },
  topowerPage() {  //去助力页面
    wx.reLaunch({
      url: '../../powerPage/powerPage/powerPage',
    })
  },
  getvoucher() {  //获得礼券逻辑
    wx.showToast({
      title: '您当前没有礼券哦',
      icon: "none",
      duration: 2000
    })
  },
  getredenvelopes() {  //获得红包逻辑
    if (this.data.cashs.cash) {
      this.damand("/bonuses/1/pick", "POST", "", (res) => {
        var urls = encodeURIComponent(res.data.data)
        wx.navigateTo({
          url: '../powerPage/web/web?url=' + urls,
        })
      })
    } else {
      wx.showToast({
        title: '当前没有钱哦',
        icon: "none",
        duration: 2000
      })
    }
  },
  pigMotion() {
    this.setData({
      pig: {
        bottom: 0,
        right: 0
      }
    })
  },
  stopTouchMove() {
    return false
  },
  showlayer(e) {
    console.log(e)
    this.setData({
      layers: "block",
      award: e
    })
    this.times1 = setInterval(() => {
      this.data.twinkles = this.data.twinkles ? false : true
      this.setData({
        twinkles: this.data.twinkles
      })
    }, 600)
  },
  hidelayer() {  //换肤或者跳页
    this.damand("/awards/1", "GET", "", (res) => {
      if (res.data.data.templateId > 3) {
        wx.reLaunch({
          url: '../../paomd/paomd/paomd',
        })
      } else {
        this.changeSkin(res.data.data.templateId - 1)
      }

    })
    clearInterval(this.times1)
    this.setData({
      layers: "none"
    })
  },
  payment() {  //付钱逻辑
    if (!this.data.tickets) {
      this.damand("/draw/1?times=" + this.data.timesId, "GET", "", (res) => {
        if (res.data.code === 601) {
          this.pay()
        }
      })
    } else {
      wx.showToast({
        title: '点击可以抽奖了哦',
        icon: "none",
        duration: 2000
      })
    }
  },
  payagain() {  //再次付钱加换肤逻辑

    this.damand("/awards/1", "GET", "", (res) => {
      console.log(res)
      if (res.data.data.templateId > 3) {
        wx.reLaunch({
          url: '../../paomd/paomd/paomd',
        })
      } else {
        this.damand("/awards/1", "GET", "", (res) => {
          this.changeSkin(res.data.data.templateId - 1)
        })
        this.pay()
      }
    })
  },

  topowerPg() {
    wx.reLaunch({
      url: '../../powerPage/powerPage/powerPage',
    })
  },
  tomys() {
    wx.reLaunch({
      url: '../../my/my/my',
    })
  },
  gos() {  //按中间按钮旋转
    this.setData({
      btntrform: " translateX(-50%)  scale(0.9)"
    })
    setTimeout(() => {
      this.setData({
        btntrform: " translateX(-50%)  scale(1)"
      })
    }, 300)

    wx.getUserInfo({
      success: (res) => {
        this.damand("/draw/1?times=" + this.data.timesId, "GET", "", (res) => {
          if (res.data.code === 601) {
            this.pay()
          } else {
            console.log(res.data.data)
            setTimeout(() => {
              var runDegs = 1440 + this.data.angle[res.data.data.slot - 1]
              var animation = wx.createAnimation({
                duration: 2400,
                timingFunction: "ease"
              });
              this.animation = animation;
              animation.rotate(runDegs).step()
              this.setData({
                animationData: animation.export()
              })
            }, 100);
            setTimeout(() => {
              this.reset()
              this.damand("/awards/1", "GET", "", (res) => {  //换肤逻辑要重写
                if (res.data.data.templateId > 3) {
                  this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
                    this.Tickets(res.data.data)
                  })
                } else {
                  this.setData({
                    prizeArray: res.data.data.awards,
                    timesId: res.data.data.times
                  })
                  this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
                    this.Tickets(res.data.data)
                  })
                }

              })
              this.showlayer(res.data.data)
            }, 3400)
          }

        })

      },
      fail: () => {
        console.log(555)
        wx.navigateTo({
          url: '../../access/access/access',
        })
      }
    })

  },

  pay() {  //付钱
    this.damand("/orders/1?referrerId=", "POST", "", (res) => {
      console.log(res)
      this.damand("/orders/" + res.data.data.id + "/pay", "POST", "", (res) => {
        console.log(res)
        var res = res.data.data
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success: (res) => {
            setTimeout(() => {
              this.damand("/awards/1", "GET", "", (res) => {
                this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
                  this.Tickets(res.data.data)
                })
              })
            }, 500)

            clearInterval(this.times1)
            this.setData({
              layers: "none"
            })
          },
          fail(res) { }
        })
      })
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
    clearInterval(this.twinkle11)
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