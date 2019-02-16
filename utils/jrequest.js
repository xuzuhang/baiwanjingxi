var http = 'https://lotteryapi.dkdcm.cn'
export function req(url,method,data,fn){
  wx.request({
    url: http+url,
    data: data,
    method: method,
    success:(info)=>{
      var status = Math.floor(info.statusCode / 100)
      if (status == 5) {
        wx.reLaunch({
          url: '../../error/error/error?type=500'
        })
      }
      fn(info)
    },
    fail:()=>{

    }
  })
}