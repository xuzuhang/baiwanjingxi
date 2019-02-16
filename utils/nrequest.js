var http = 'https://lotteryapi.dkdcm.cn'
function damand(url, method, data, callback, tit) {  //暴露出去的函数
  var that = this
  master(url, method, data, callback, tit, that)
}
function whether500(url, method, data, callback, that, status, info){  //判断是否500
      if(status == 5){
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
       
      }else{
        continues(url, method, data, callback, that,info)   //继续请求
      }
}
function signIn(url, method, data, callback, that) {     //401登录请求
  wx.login({
    success: (res) => {
      var fcode = res.code
      wx.getUserInfo({
        withCredentials: true,
        success: (res) => {
          wx.request({
            url: 'https://lotteryapi.dkdcm.cn/login?code=' + fcode + '&encryptedData=' + encodeURIComponent(res.encryptedData) + '&iv=' + encodeURIComponent(res.iv),
            success: (res) => {
              var scode = res.data.data.token
              wx.setStorage({
                key: "retime",
                data: {
                  damand: scode
                }
              })
              that.damand(http + url, method, data, callback)
            },
            fail: (res) => {
              console.log(res)
            }
          })

        }
      })

    }
  })
}
function continues(url, method, data, callback, that,info){  //继续请求
    var code = info.data.code
    if(code == 401){
      signIn(url, method, data, callback, that)   //401登录请求
    }else{
        var infos = info.data
        if (infos.code === -1) {
          setTimeout(() => {
            wx.showToast({
              title: infos.message,
              icon: 'none',
              duration: 2000
            })
          }, 400)
        } else{
          callback(info)
        }
    }
}
function master(url, method, data, callback, tit, that) {   //开始请求
  if (tit) {
    wx.showLoading({
      title: tit,
    })
  } else {
    wx.showNavigationBarLoading()
  }
  url = url.indexOf('https://lotteryapi.dkdcm.cn') !== -1 ? url.replace('https://lotteryapi.dkdcm.cn', ""):url
  wx.getStorage({
    key: 'retime',
    success: (res) => {
      var lock = res.data.damand
      var header = lock == "" ? { 'content-type': 'application/json' } : {'content-type': 'application/json', 'authorization': lock }  //苹果适应
      wx.request({
        url: http + url,
        header,
        data: data,
        method: method,
        success: (info) => {
          var status = Math.floor(info.statusCode / 100)
          whether500(url, method, data, callback, that, status,info)  //判断是否500
        },
        fail: (res) => {
          wx.showToast({
            title: '网络不给力',
            icon: 'none',
            duration: 2000
          })
        },
        complete: () => {  //请求结束以后
          wx.hideNavigationBarLoading()
          if (tit) {
            wx.hideLoading()
          }
        }
      })

    },
    fail:(res)=>{   //没有得到token
      console.log("fail")
      signIn(url, method, data, callback, that)
    }
  })
}
module.exports = damand