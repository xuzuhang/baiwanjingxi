const damand = require('../../../utils/nrequest.js')
import { acreq } from '../../../utils/accountreq.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: {
      num: "",
      code: ""
    },
    phone:false,
    phonelocks:true,
    phonelock: false,
    refusingAuthorization:false
  },
  damand: damand ,
  authorization(e){
    if (e.detail.rawData){
      wx.getUserInfo({
        success:(res)=>{
          acreq("/users", "PUT", {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          },(res)=>{
            this.setData({
              phonelocks: true
            })
        
              this.damand("/users/phone/exists", "GET", "", (res) => {
                if(res.data.data){
                  wx.reLaunch({
                    url: '../../index/index/index',
                  })
                }
              })
              
            
          })
          
        }
      })
     
    }
  },
  getPhoneNumber: function (e) {
    
      console.log(e)
      if (e.detail.errMsg == 'getPhoneNumber:ok') {
        wx.login({
          success: (res) => {
            console.log("code:" + res.code, "en:" + e.detail.encryptedData, e.detail.iv)
            this.damand("/users/phone?code=" + res.code + "&encryptedData=" + encodeURIComponent(e.detail.encryptedData) + "&iv=" + encodeURIComponent(e.detail.iv), "POST", "", (res) => {
              // if(res.data.data.code === 0){
              //     console.log(res.data.data)
              // }
              console.log(res.data.data)
            })
          }
        })
      }else{
        this.setData({
          refusingAuthorization: true
        })
        wx.showModal({
          title: '操作提示',
          content: '无法获取您的手机号码，请使用短信验证码方式登录',
          showCancel: false
        })
      }
    
   

  },
  yanzheng(res) {     //验证手机结构
    var num = res.detail.value;
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/  //必须为11位的手机数字结构
    if (reg.test(num)) {
      this.data.mobile.num = num
      this.setData({
        mobile: this.data.mobile,
        phonelock: true
      })
    } else {
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
  code(res) {
    var num = res.detail.value;
    this.data.mobile.code = num
    this.setData({
      mobile: this.data.mobile
    })
  },
  sendcode() {
    if (this.data.phonelock) {
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
  signIn() {
    this.damand("/users/verifyphone?mobile=" + this.data.mobile.num + "&code=" + this.data.mobile.code, "POST", "", (res) => {
      console.log(res)
      if (res.data.code === 0) {
        wx.reLaunch({
          url: '../../index/index/index',
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.getUserInfo({
        success:()=>{
          this.setData({
            phonelocks: true
          })
        },
        fail:()=>{
          this.setData({
            phonelocks: false
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