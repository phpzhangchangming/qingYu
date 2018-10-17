App({
    onLaunch: function() {
        var that = this;
        wx.getSystemInfo({
            success: res => {
                that.globalData.navHeight = res.statusBarHeight + 46;
                that.globalData.height = res.windowHeight;
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    globalData: {
        userInfo: [],
        height: 0,
        share: false,
        openid: 0,
        // url: 'http://test.api.tsingyutech.com:8088/uav/api/',
        url:'https://api.tsingyutech.com/uav/api/',
        // url:'http://192.168.8.100:8080/api/',
        verifyCode:'',
        version:'1.0'
    }
});