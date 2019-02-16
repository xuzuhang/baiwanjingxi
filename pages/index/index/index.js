const damand = require('../../../utils/nrequest.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friassistId:"",
    ipones:'ios',
    zhuanZ:0,
    twinkle1: true,  //闪光
    btntrform: " translateX(-50%) scale(1)",   //按钮动画
    timesId: "",  //第几次id
    angle: [0, -45, -90, -135, -180, -225, -270, -315],  //角度
    award: {},  //奖品
    animationData: {}, //动画
    prizeArray: [], //奖品数组
    helpRed:"", //助力红包
    layers:"none",  //奖品图层
    assistId:"",   //推荐人 id
    helpLayer:"none",   //助力页面
    helpmoney:{    //得到多少助力金
      me:1,
      friend:0.33
    },
    tickets:0,      
    total:1980,  //有多少人在参与活动
    ruleLayer:"none",  //规则页
    twinkles:true,  //闪光
    r:30,
    prizeLIst:[],  //奖品列表
    cashs:{   //有多少钱和礼券
      cash:0,
      coupons:0
    },
    pig:{  //金猪
      bottom:"2000rpx",
      right:"760rpx"
    },
    skin: {
      background: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/background.jpg",
      outbackground: "#3c0046",
      banner: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/banner.jpg",
      btn_rule_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_rule_01.png",
      turntable: {
        pan_side: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_side.png",
        pan_bg: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_bg.png",
        btn_start_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_start_01.png",
        Ring: ['https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_light01.png', 'https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_light02.png']
      },
      btn_getmore: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/09.png",
      prize: {
        bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/box_txt_01.png",
        btn_charge_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_charge_01.png",
        btn_more_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_more_01.png",
        color: "#ffffff",
        textcolor: "#a7815f"
      },
      user: {
        bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/box_txt_02.png",
        color: "#fff"
      }
    },
    skinArray: [{
      background: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/background1.jpg",
      outbackground: "#040037",
      banner: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/banner1.jpg",
      btn_rule_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/btn_rule_011.png",
      turntable: {
        pan_side: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/pan_side1.png",
        pan_bg: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/pan_bg1.png",
        btn_start_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/btn_start_011.png",
        Ring: ['https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/pan_light011.png', 'https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/pan_light021.png']
      },
      btn_getmore: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/09.png",
      prize: {
        bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/box_txt_011.png",
        btn_charge_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/btn_charge_011.png",
        btn_more_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/btn_more_011.png",
        color: "#660000",
        textcolor: "#cc3300"
      },
      user: {
        bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/1/box_txt_021.png",
        color: "#660000"
      }
    },
      {
        background: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/background.jpg",
        outbackground: "#3c0046",
        banner: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/banner.jpg",
        btn_rule_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_rule_01.png",
        turntable: {
          pan_side: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_side.png",
          pan_bg: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_bg.png",
          btn_start_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_start_01.png",
          Ring: ['https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_light01.png', 'https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/pan_light02.png']
        },
        btn_getmore: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/09.png",
        prize: {
          bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/box_txt_01.png",
          btn_charge_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_charge_01.png",
          btn_more_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/btn_more_01.png",
          color: "#ffffff",
          textcolor: "#a7815f"
        },
        user: {
          bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/2/box_txt_02.png",
          color: "#fff"
        }
      },
      {
        background: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/background.jpg",
        outbackground:"#1954b2",
        banner: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/banner.jpg",
        btn_rule_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/btn_rule_01.png",
        turntable: {
          pan_side: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/pan_side.png",
          pan_bg: "	https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/pan_bg.png",
          btn_start_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/btn_start_01.png",
          Ring: ['https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/pan_light01.png', 'https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/pan_light02.png']
        },
        btn_getmore: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/6/09.png",
        prize: {
          bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/box_txt_01.png",
          btn_charge_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/btn_charge_01.png",
          btn_more_01: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/btn_more_01.png",
          color: "#ffffff",
          textcolor: "#ffcc66"
        },
        user: {
          bg: "https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/templates/3/box_txt_02.png",
          color: "#fff"
        }
      }]

  },
  showrulayer(){
    this.setData({
      ruleLayer: "block"
    })
  },
  hideruLayer(){
    this.setData({
      ruleLayer: "none"
    })
  },
  damand: damand,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.phoness()
    if (options.id) {
      app.globalData.referrerId = options.id
    }else{
      app.globalData.referrerId = ''
    }
 
    if (options.assistId){  //助力红包代码
      this.setData({
        friassistId: options.assistId
      })
      this.damand("/assists/1?assistId=" + options.assistId,"POST","",(res)=>{
        if(res.data.data){
          this.data.helpmoney.me = res.data.data.bonus
          this.data.helpmoney.friend = res.data.data.amount
          this.setData({
            helpLayer: "block",
            helpmoney: this.data.helpmoney
          })
          this.times1 = setInterval(() => {
            this.data.twinkles = this.data.twinkles ? false : true
            this.setData({
              twinkles: this.data.twinkles
            })
          }, 600)
        }
      })
    }else{
      this.setData({
        friassistId: ""
      })
    }
    this.timer4 = setInterval(() => {
      var twinkles = this.data.twinkle1 ? false : true
      this.setData({
        twinkle1: twinkles
      })
    }, 1000)
    this.pigMotion()
    this.toass()  //是否需要授权
    this.setData({
      skin: this.data.skinArray[1]
    })
    this.prizeArray()
  },
  phoness(){
    wx.getSystemInfo({
      success:  (res)=> {
        var ipones = (res.model).indexOf("iPhone")
        console.log(ipones)
        console.log(res.model)
        if (ipones==-1){
            this.setData({
              ipones:"and"
            })
        }else{
          this.setData({
            ipones: "ios"
          })
        }
        console.log(this.data.ipones)
        
      }
      })
  },
  hidehelp(){ //关闭主力页面
      clearInterval(this.times1)
      this.setData({
        helpLayer:"none"
      })
  },
  toass(){
    wx.getUserInfo({
      success:()=>{
        this.damand("/users/phone/exists", "GET", "", (res) => {
          if (!res.data.data){
            wx.reLaunch({
              url: '../../access/access/access',
            })
          }
        })
      },
      fail(){
        wx.reLaunch({
          url: '../../access/access/access',
        })
      }
    })
  },
  Tickets(e){  //有多少次机会
      this.setData({
        tickets:e
      })
  },
  init(){
    var promise = new Promise(function (resolve) {
      resolve(42);
    });
    promise.then(this.newest()).then(this.stat()).then(this.total()).then(this.gethelprpackets())
  },
  prizeArray(){  //求转盘里面的奖品数据
    this.damand("/awards/1", "GET", "", (res) => {
      app.globalData.templateId = res.data.data.templateId
      app.globalData.prizeArray = res.data.data.awards
      this.changeSkin(res.data.data.templateId - 1) //换肤
      this.setData({
        prizeArray: res.data.data.awards,  //奖品列表
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
  newest(){  //获得中奖的人
    this.damand("/bonuses/1/newest", "GET", "", (res) => {
      var res = res.data.data
      console.log(res)
      this.setData({
        prizeList: res
      })
    })
  },
  total(){  //获得多少人在参与
    this.damand("/orders/1/total", "GET", "", (res) => {
      this.setData({
        total:res.data.data+1980
      })
    })
  },
  stat(){  //活得奖品栏
    this.damand("/bonuses/1/stat", "GET", "", (res) => {
      this.data.cashs.cash = res.data.data.cash
      this.data.cashs.coupon = res.data.data.coupon
      this.setData({
        cashs: this.data.cashs
      })
    })
  },
  topowerPage(){  //去助力页面
      wx.reLaunch({
        url: '../../powerPage/powerPage/powerPage',
      })
  },
  getvoucher(){  //获得礼券逻辑
        wx.showToast({
          title: '您当前没有礼券哦',
          icon:"none",
          duration:2000
        })
  },
  getredenvelopes(){  //获得红包逻辑
    if (this.data.cashs.cash){
      this.damand("/bonuses/1/pick", "POST", "", (res) => {
        var urls = encodeURIComponent(res.data.data)
        wx.navigateTo({
          url: '../../powerPage/web/web?url=' + urls,
        })
      })
    }else{
      wx.showToast({
        title: '当前没有钱哦',
        icon: "none",
        duration: 2000
      })
    }
  },
  changeSkin(e){  //换肤
    this.setData({
      skin: this.data.skinArray[e]
    })
  },
  pigMotion(){
    this.setData({
      pig: {
        bottom: 0,
        right: 0
      }
    })
  },
  stopTouchMove(){
    return false
  },
  showlayer(e){
    console.log(e)
     this.setData({
       layers:"block",
       award:e
     })
     this.times1 = setInterval(()=>{
       this.data.twinkles = this.data.twinkles?false:true
       this.setData({
         twinkles: this.data.twinkles
       })
     },600)
  },
  hidelayer(){  //换肤或者跳页
    this.damand("/awards/1", "GET", "", (res) => {
      if (res.data.data.templateId > 3){
        app.globalData.templateId = res.data.data.templateId
        app.globalData.prizeArray = res.data.data.awards
        wx.reLaunch({
          url: '../../paomd/paomd/paomd',
        })
      }else{
        this.changeSkin(res.data.data.templateId - 1)
        this.setData({
          prizeArray: res.data.data.awards,  //奖品列表
          timesId: res.data.data.times  //id请求
        })
      }
    })
    clearInterval(this.times1)
    this.setData({
      layers: "none"
    })
  },
  payment(){  //付钱逻辑
    if (!this.data.tickets){
      this.damand("/draw/1?times=" + this.data.timesId, "GET", "", (res) => {
        if (res.data.code === 601) {
          this.pay()
        }
      })
    }else{
      wx.showToast({
        title: '点击可以抽奖了哦',
        icon:"none",
        duration:2000
      })
    }
  },
  payagain() {  //再次付钱加换肤逻辑

    this.damand("/awards/1", "GET", "", (res) => {
      app.globalData.templateId = res.data.data.templateId
      app.globalData.prizeArray = res.data.data.awards
      if (res.data.data.templateId > 3) {
        wx.reLaunch({
          url: '../../paomd/paomd/paomd',
        })
      }else{
            this.changeSkin(res.data.data.templateId - 1)
            this.setData({
              prizeArray: res.data.data.awards,  //奖品列表
              timesId: res.data.data.times  //id请求
            })
          
          this.pay()
      }
    })
  },
  toshowshare(){
    wx.showModal({
      content: '分享朋友邀请朋友助力领助力红包哦',
      showCancel:false
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
          } else if (res.data.code === 602){

            this.damand("/awards/1", "GET", "", (res) => {
              app.globalData.templateId = res.data.data.templateId
              app.globalData.prizeArray = res.data.data.awards
              this.changeSkin(res.data.data.templateId - 1) //换肤
              this.setData({
                prizeArray: res.data.data.awards,  //奖品列表
                timesId: res.data.data.times  //id请求
              })
              this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
                //有多少次机会
                this.Tickets(res.data.data)
              })
            })


            }else{
            if (this.data.ipones == "ios"){
              var runDegs = 2160 + this.data.angle[res.data.data.slot - 1]
              var speed = 150
              this.speedsss = setInterval(() => {
                speed -= parseInt(Math.random() * 3)
                if (speed <= 100) {
                  speed -= parseInt(Math.random() * 2)
                }
                // console.log(this.data.zhuanZ)
                this.data.zhuanZ = this.data.zhuanZ + speed
                if (this.data.zhuanZ >= runDegs) {
                  clearInterval(this.speedsss)
                  this.data.zhuanZ = runDegs
                  setTimeout(() => {
                    this.resets()
                    this.stat()
                    this.damand("/orders/1/tickets?times=" + this.data.timesId, "GET", "", (res) => {
                      this.Tickets(res.data.data)
                    })
                    this.showlayer(res.data.data)
                  }, 500)
                }
                this.setData({
                  zhuanZ: this.data.zhuanZ
                })
              }, 60)  
            }else{
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
                  this.stat()
                  this.damand("/orders/1/tickets?times=" + this.data.timesId, "GET", "", (res) => {
                    this.Tickets(res.data.data)
                  })
                  this.showlayer(res.data.data)
                }, 3400)
            }
          


            
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
  resets(){
      this.setData({
        zhuanZ: 0
      })
  },
  reset() {   //重置转盘

    var animation = wx.createAnimation({
      duration: 1,
      timingFunction: "linear"
    });
    this.animation = animation;
    animation.rotate(0).step()
    this.setData({
      animationData: animation,
      
    })
    
  },
  pay() {  //付钱
    this.damand("/orders/1?referrerId=" + app.globalData.referrerId + "&assistId=" + this.data.friassistId, "POST", "", (res) => {
      this.damand("/orders/" + res.data.data.id + "/pay", "POST", "", (res) => {
 
        var res = res.data.data
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success: (res) => {
            setTimeout(()=>{
                this.damand("/orders/1/tickets?times=" + this.data.timesId, "GET", "", (res) => {
                  this.Tickets(res.data.data)
                })
              
            },500)
           
            clearInterval(this.times1)
            this.setData({
              layers: "none"
            })
          },
          fail:(res)=> {
            setTimeout(() => {
              this.damand("/orders/1/tickets?times=" + this.data.timesId, "GET", "", (res) => {
                this.Tickets(res.data.data)
              })

            }, 500)

            clearInterval(this.times1)
            this.setData({
              layers: "none"
            })
           }
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
    var promise = new Promise(function (resolve) {
      resolve(42);
    });
    promise.then(this.newest()).then(this.stat()).then(this.total()).then(this.gethelprpackets())
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
    clearInterval(this.times1)
    clearInterval(this.timer4)
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
      path: app.globalData.shareObj.path +  '?assistId=' + this.data.assistId
    }
    // return {
    //   title: app.globalData.shareObj.title,
    //   imageUrl: app.globalData.shareObj.imgUrl,
    //   path: app.globalData.shareObj.path
    // }
  }
})