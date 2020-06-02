//app.js
App({
  onLaunch: function() {
    // let isLogin = wx.getStorageSync('token')
    // console.log('isLogin:',isLogin)
    // if (isLogin != null && isLogin.length > 0) {
    //   wx.switchTab({
    //     url: '/pages/home/home',
    //   })
    // } else {
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // }
  },

  /**
   * fetch token
   */
  fetchToken: function() {
    let token = this.globalData.token;
    if (!token) {
      const _token = wx.getStorageSync('token');
      this.globalData.token = _token;
      token = _token;
    }
    return token;
  },
  
  globalData: {
    userInfo: null,
    pageSize: 20,
    token: ''
  }
})