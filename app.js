//app.js
App({
    onLaunch: function() {
        var that = this;
        // 登录
        wx.login({
            success: res => {
                wx.request({                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
                    success:res=> {
                        that.globalData.openid = res.data.openid;
                    }
                })
            }
        });

        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || [];
        // logs.unshift(Date.now());
        // wx.setStorageSync('logs', logs);
        
        wx.getSystemInfo({
            success: res => {
                this.globalData.navHeight = res.statusBarHeight + 46;
                this.globalData.height = res.windowHeight;
            },
            fail(err) {
                console.log(err);
            }
        });

        // 获取用户信息
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo
        //
        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res)
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    globalData: {
        userInfo: [],
        apiPrefix: "http://localhost:8080/api",
        height: 0,
        share: false,
        openid: 0,
        wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdc4a9ab4c9365676&secret=4f520844fbbc3d132a80fa5ea4ffe79b&js_code=',
        wx_url_2: '&grant_type=authorization_code',
        url: 'http://test.api.tsingyutech.com:8088/uav/api',
        verifyCode:''
    }
});