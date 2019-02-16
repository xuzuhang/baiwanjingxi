const damand = require('../../../utils/nrequest.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamSize:0,//直邀人数
    bonusTotal:0,  //总收益
    teamsCount:0, //团队人数
    helpRed:0,   //助力红包
    cash:0,     //自己余额
    assistId:"",  //助力id
    shares:"none",   //分享图层
    num:'0',  //有多少钱
    shareid:"",  //vip分享的id
    total:1980,  //有多少人在参与
    prizeArray:[],   //获奖名单
    partition:{   //瓜分金额以及瓜分逻辑
      amount:0,
      balance:0,
      createNew:false
    },
    isvip:false,  //是不是vip
    viplock:false,  //是否vip加载好了才true
    viplay:"none",  //vip图层是否显示
    numpo: ['../pImg/num__01.png', '../pImg/num__02.png', '../pImg/num__03.png', '../pImg/num__04.png', '../pImg/num__05.png', '../pImg/num__06.png', '../pImg/num__07.png', '../pImg/num__08.png', '../pImg/num__09.png', '../pImg/num__10.png'], //数字图片
    effect1:"scale(1)",  
    effect2:0,
    effect3: "scale(1)",
    effect4: "scale(1)",
    friend:true,
    twinkles: true,  //红包后面的光闪烁
    users:[]  //助力者名单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },
  animationTime(){  //所有动画
    this.times11 = setInterval(() => {
      var count = parseInt(Math.random() * 50000)
      this.data.num = parseInt(this.data.num)
      this.data.num = (this.data.num + count).toString()
      if (this.data.num >= 1000000) {
        clearInterval(this.times11)
        this.data.num = "1000000"
      }
      this.setData({
        num: this.data.num
      })
      // var times = parseInt(Math.random() * 4 + 6)
      // this.data.num = this.data.effect1 == 'scale(0.85)' ? this.data.num : (parseInt(this.data.num) - times).toString()
      // this.data.effect1 = this.data.effect1 == 'scale(0.85)' ? 'scale(1)' : 'scale(0.85)'
      // this.setData({
      //   effect1: this.data.effect1,
      //   num: this.data.num
      // })

    }, 10)
    this.times2 = setInterval(() => {
      this.data.effect2 += 40
      this.setData({
        effect2: this.data.effect2
      })
    }, 100)
    // setInterval(() => {
    //   this.data.effect3 = this.data.effect3 == 'scale(0.9)' ? 'scale(1)' : 'scale(0.9)'
    //   this.setData({
    //     effect3: this.data.effect3
    //   })
    // }, 900)
    this.times3 = setInterval(() => {
      this.data.effect4 = this.data.effect4 == 'scale(1)' ? 'scale(1.05)' : 'scale(1)'
      this.setData({
        effect4: this.data.effect4
      })
    }, 1000)
    this.times4 = setInterval(() => {
      this.data.effect5 = this.data.effect5 == "rotateZ(-5deg)" ? "rotateZ(5deg)" : "rotateZ(-5deg)"
      this.setData({
        effect5: this.data.effect5
      })
    }, 300)
  },
  showshares(){
    this.setData({
      shares: "block"
    })
  },
  hideshares(){
    this.setData({
      shares: "none"
    })
  },
  catchtap(){

  },
  showViplay(){  //点击vip按钮的时候
    if (this.data.viplock){
        this.damand("/quotas", "POST", "", (res) => {
          var res = res.data.data
          if (res.createNew == true){
            this.data.partition.amount = res.amount
            this.setData({
              partition: this.data.partition
            })
            this.setData({
              viplay: "block"
            })
            this.times1 = setInterval(() => {
              this.data.twinkles = this.data.twinkles ? false : true
              this.setData({
                twinkles: this.data.twinkles
              })
            }, 600)
            setTimeout(()=>{
              this.setData({
                viplay: "none"
              })
            this.viptimes = setInterval(()=>{   //加上vip数字
                var count = parseInt(Math.random() * 9)
              this.data.partition.balance = this.data.partition.balance + count
              if (this.data.partition.balance>=res.amount){
                clearInterval(this.viptimes)
                this.data.partition.balance = res.amount
              }
              this.setData({
                partition: this.data.partition
              })
              },10)
              
            },3000)
          }else{
            if (this.data.isvip){
              this.showshares()
            }else{
              this.torule()
            }
            
          }
        })
    }
  },
  hideVipay(){
    clearInterval(this.times1)
    this.setData({
      viplay: "none"
    })
  },
  init(){
    var promise = new Promise(function (resolve) {
      resolve(42);
    });
    promise.then(this.listBooster()).then(this.gethelprpackets()).then(this.newest()).then(this.total()).then(this.quotas()).then(this.sellertype()).then(this.stat()).then(this.sellersCount()).then(this.bonusTotal()).then(this.usersSeller)
  },
  usersSeller() {  //活得团队人数
    this.damand("/users/seller", "GET", "", (res) => {
      this.setData({
        teamSize: res.data.data.teamSize
      })
    })
  },
  bonusTotal(){  //总收益
    this.damand("/sellers/bonus/total", "GET", "", (res) => {
      
      this.setData({
        bonusTotal: res.data.data
      })
    })
  },
  sellersCount(){ //团队人数
    this.damand("/sellers/teams/count", "GET", "", (res) => {

      this.setData({
        teamsCount: res.data.data
      })
    })
  },
  sellertype(){   //是否vip
    this.damand("/users/seller", "GET", "", (res) => {
      if (res.data.data){
        console.log(res.data.data)
        this.data.isvip = res.data.data.sellerType > 1?true:false
        if (res.data.data.sellerType > 1){
          this.setData({
            isvip: this.data.isvip,
            shareid: res.data.data.id,
            viplock: true
          })
        }else{
          this.setData({
            isvip: this.data.isvip,
            shareid: "",
            viplock: true
          })
        }
          
      }
      
    })
  },
  quotas(){  //瓜分状态逻辑
    this.damand("/quotas", "GET", "", (res) => {
      console.log(res.data.data)
      this.setData({
        partition: res.data.data
      })
      
    })

  },
  total() {  //获得多少人在参与
    this.damand("/orders/1/total", "GET", "", (res) => {
      console.log(res.data.data)
      this.setData({
        total: res.data.data + 1980
      })
    })
  },
  newest() {  //获得中奖的人
    this.damand("/bonuses/1/newest", "GET", "", (res) => {
      var res = res.data.data
      console.log(res)
      this.setData({
        prizeArray: res
      })
    })
  },
  listBooster(){  //助力者列表
    this.damand("https://lotteryapi.dkdcm.cn/assists/1", "GET", "", (res) => {
      this.setData({
        users:res.data.data
      })
      console.log(this.data.users)
    })
  },
  stat() {  //活得奖品栏
    this.damand("/bonuses/1/stat", "GET", "", (res) => {
      this.data.cash = res.data.data.cash
   
      this.setData({
        cash: res.data.data.cash
      })
    })
  },
  gethelprpackets(){  //助力红包求
    this.damand("/bonuses/1/assist","GET","",(res)=>{
      console.log(res)
      if(res.data.data){
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
  torule(){
    wx.navigateTo({
      url: '../rule/rule',
    })
  },
  damand: damand,
  tomys(){
    wx.reLaunch({
      url: '../../my/my/my',
    })
  },
  toindex(){
    wx.reLaunch({
      url: '../../index/index/index',
    })
  },
  toweb(){  //去提现
    this.damand("/bonuses/1/pick","POST","",(res)=>{
      var urls = encodeURIComponent(res.data.data)
      wx.navigateTo({
        url: '../web/web?url='+urls,
      })
    })
  },
  // sharesfriend(){
  //   this.onShareAppMessage()
  // },
  // sharesassistId(e){

    
   
  // },
  tocanvans(){
    wx.navigateTo({
      url: '../canvans/canvans',
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
   
    this.init()
    this.animationTime()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.times11)
    clearInterval(this.times2)
    clearInterval(this.times3)
    clearInterval(this.times4)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.times11)
    clearInterval(this.times2)
    clearInterval(this.times3)
    clearInterval(this.times4)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      helpRed: 0,   //助力红包
      cash: 0,     //自己余额
      assistId: "",  //助力id
    })
    this.init()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 800)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: app.globalData.shareObj.title,
      imageUrl: app.globalData.shareObj.imgUrl,
      path: app.globalData.shareObj.path + "?id="+this.data.shareid + '&assistId=' + this.data.assistId
    }
    
  }
})