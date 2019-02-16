const damand = require('../../utils/nrequest.js')
import { req } from '../../utils/jrequest.js'
const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  
  data:{
    twinkle:true,  //闪光
    btntrform:" translateX(-50%) scale(1)",   //按钮动画
    timesId:"",
    angle: [0,-45,-90,-135,-180,-225,-270,-315],
    prizeArray:[],
    animationData: {}
  },
  created(){
          this.damand("/awards/1", "GET", "", (res) => {
            // this.triggerEvent('changeSkin', res.data.data.templateId - 1);  
            this.setData({
              prizeArray: res.data.data.awards,
              timesId:res.data.data.times
            })
            this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
              // this.triggerEvent('Tickets', res.data.data);  
            })
        })
          
     
      this.timer1 = setInterval(()=>{
        var twinkles = this.data.twinkle?false:true
        this.setData({
          twinkle: twinkles
        })
      },1000)
  },
  detached(){
    clearInterval(this.timer1)
  },
  methods:{
    damand: damand,
    pay(){
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
              this.damand("/awards/1", "GET", "", (res) => {
                this.setData({
                  prizeArray: res.data.data.awards,
                  timesId: res.data.data.times
                })
                this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
                  this.triggerEvent('Tickets', res.data.data);
                })
              })
            },
            fail(res) { }
          })
        })
      })
    },
    gos() {
      this.setData({
        btntrform: " translateX(-50%)  scale(0.9)"
      })
      setTimeout(()=>{
        this.setData({
          btntrform: " translateX(-50%)  scale(1)"
        })
      },300)
      
      wx.getUserInfo({
        success:(res)=>{
          this.damand("/draw/1?times="+this.data.timesId,"GET","",(res)=>{
            if(res.data.code === 601){
              this.pay()
            }else{
                console.log(res.data.data)
                setTimeout(() => {
                var runDegs = 1440 + this.data.angle[res.data.data.slot-1]
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
                this.damand("/awards/1", "GET", "", (res) => {
                  this.triggerEvent('changeSkin', res.data.data.templateId - 1);
                  this.setData({
                    prizeArray: res.data.data.awards,
                    timesId: res.data.data.times
                  })
                  this.damand("/orders/1/tickets?times=" + res.data.data.times, "GET", "", (res) => {
                    this.triggerEvent('Tickets', res.data.data);
                  })
                })
                this.triggerEvent('showlayer', res.data.data);
              }, 3400)
            }
           
          })
          
        },
        fail:()=>{
          console.log(555)
          wx.navigateTo({
            url: '../../access/access/access',
          })
        }
      })
      
    },
    reset(){
      var animation = wx.createAnimation({
        duration: 1,
        timingFunction: "linear"
      });
      this.animation = animation;
      animation.rotate(0).step()
      this.setData({
        animationData: animation
      })
    }
  },
  
  properties: {
    myProperty: {    // 属性名        myProperty2: String, 简化的定义方式
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '',    // 属性默认 初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },

    turntable: {
      type: Object
    },

    

    
    }
})