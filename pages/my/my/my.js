const damand = require('../../../utils/nrequest.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:true,
    teamSize:0, //团队人数
    lastmonth:0,//上月收益
    today:0, //今日收益
    currentmonth:0,//当月收益
    balance:0,//余额
    shareid:"",
    mobile:{
      num:"",
      code:""
    },
    phonelock:false,
    user:{
      img:"",
      name:""
    },
    isvip:false
  },
  damand: damand,
  topowerPg(){
    wx.reLaunch({
      url: '../../powerPage/powerPage/powerPage',
    })
  },
  toindex() {
    wx.reLaunch({
      url: '../../index/index/index',
    })
  },
  toprofit(){
    wx.navigateTo({
      url: '../profit/profit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
   
    wx.getUserInfo({
      success:(res)=>{
        this.data.user.img = res.userInfo.avatarUrl
        this.data.user.name = res.userInfo.nickName
        this.setData({
          user:this.data.user
        })
      }
    })
  },
  init(){   //入口函数
    var promise = new Promise(function (resolve) {
      resolve(42);
    });
    promise.then(this.sellertype()).then(this.phones()).then(this.usersSeller()).then(this.today()).then(this.currentmonth()).then(this.lastmonth()).then(this.balance())
  }, 
  balance(){  //余额
    this.damand("/sellers/balance", "GET", "", (res) => {
      this.setData({
        balance: res.data.data
      })
    })
  },
  today(){  //今日收益
    this.damand("/sellers/bonus/today", "GET", "", (res) => {
      this.setData({
        today: res.data.data
      })
    })
  },
  currentmonth(){
    this.damand("/sellers/bonus/currentmonth", "GET", "", (res) => {
      this.setData({
        currentmonth: res.data.data
      })
    })
  },
  lastmonth(){
    this.damand("/sellers/bonus/lastmonth", "GET", "", (res) => {
      this.setData({
        lastmonth: res.data.data
      })
    })
  },
  usersSeller(){  //活得团队人数
    this.damand("/users/seller", "GET", "", (res) => {
      this.setData({
        teamSize: res.data.data.teamSize
      })
    })
  },
  phones(){  //判断是否有手机号码
    this.damand("/users/phone/exists", "GET", "", (res) => {
      this.setData({
        phone: res.data.data
      })
    })
  },
  sellertype() {   //是否vip
    this.damand("/users/seller", "GET", "", (res) => {
      if (res.data.data) {
        console.log(res.data.data)
        this.data.isvip = res.data.data.sellerType > 1 ? true : false
        if (res.data.data.sellerType > 1) {
          this.setData({
            isvip: this.data.isvip,
            shareid: res.data.data.id,
            viplock: true
          })
        } else {
          this.setData({
            isvip: this.data.isvip,
            shareid: "",
            viplock: true
          })
        }

      }
    })
  },
  torule(){
    wx.navigateTo({
      url: '../../powerPage/rule/rule',
    })
  },
  tobill(){
    wx.navigateTo({
      url: '../bill/bill',
    })
  },
  getPhoneNumber: function (e) {

    if (e.detail.iv) {
      wx.login({
        success: (res) => {
          console.log("code:" + res.code, "en:" + e.detail.encryptedData, e.detail.iv)
          this.damand("/users/phone?code=" + res.code + "&encryptedData=" + encodeURIComponent(e.detail.encryptedData) + "&iv=" + encodeURIComponent(e.detail.iv), "POST", "", (res) => {
            // if(res.data.data.code === 0){

            // }
            console.log(res.data.data)
          })
        }
      })
    } else {
      console.log("拒绝")
    }

  },
  yanzheng(res){     //验证手机结构
    var num = res.detail.value;
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/  //必须为11位的手机数字结构
    if (reg.test(num)) {
      this.data.mobile.num = num
        this.setData({
          mobile: this.data.mobile,
          phonelock: true
        })
    }else{
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
        duration: 2000
      })
      this.data.mobile.num = ""
      this.setData({
        mobile: this.data.mobile,
        phonelock: false
      })
    }
  },
  code(res){
    var num = res.detail.value;
    this.data.mobile.code = num
    this.setData({
      mobile: this.data.mobile
    })
  },
  sendcode(){
    if (this.data.phonelock){
      this.damand("/verifycode?mobile=" + this.data.mobile.num, "POST", "", (res) => {
        if (res.data.code === 304) {
          wx.showToast({
            title: '不要频繁操作哦',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '验证码已发送',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  
  },
  signIn(){
    this.damand("/users/verifyphone?mobile=" + this.data.mobile.num + "&code=" + this.data.mobile.code,"POST","",(res)=>{
     console.log(res)
     if(res.data.code === 0){
       wx.showToast({
         title: '登陆成功',
         icon: 'success',
         duration: 2000
       })
         this.setData({
        phone:true
      })
  
     }
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
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareObj.title,
      imageUrl: app.globalData.shareObj.imgUrl,
      path: app.globalData.shareObj.path + "?id=" + this.data.shareid
    }
  }
})