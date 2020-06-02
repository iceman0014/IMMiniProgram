import {
  baseURL,
  timeout
} from "./config.js"

var util = require("../utils/util.js");

export default function(options) {
  return new Promise((resolve, reject) => {
    //获取token
    var app = getApp();
    const token = app.getToken();

    //loading
    if (options.showLoading) {
      wx.showNavigationBarLoading();
      util.showLoading("加载中");
    }

    var url = baseURL + options.url;

    wx.request({
      url: url,
      method: options.method || 'get',
      header: {
        "content-type": "application/json",
        "token": token,
        "version": "1.0.0"
      },
      data: options.data || {},
      success: function (res) {
        //隐藏loading
        if (options.showLoading) {
          wx.hideNavigationBarLoading()();
          util.hideLoading();
        }

        const result = res.data;
        const code = result.code;
        const msg = result.msg;

        if (code == 200) {
          //成功
          resolve(result.data)
        }else if (code == 401) {
          //需要重新登录
          wx.removeStorageSync("token");
        }else {
          // let message = msg==null ? code + ' 网络错误' : msg;
          // util.showToast(message);
          if (reject) {
            setTimeout(function(){
              reject(msg);
            }, 10)
          }
        }
        console.log('--------------------request start--------------------\n' +
          '\n**url: ' +
          url +
          '\n**params: ',
          options.data,
          '\n**response: ',
          result,
          '\n\n--------------------request end--------------------\n'); 
      },
      fail: function (error) {
        console.log('--------------------request error start--------------------\n' +
          '\n**异步执行失败，输出执行结果：',
          url +
          '\n**params: ',
          options.data,
          '\n**response: ',
          error.errMsg,
          '\n\n--------------------request error end--------------------\n');

        util.hideLoading();
      },
      complete: res => {

      }
    })
  })
}