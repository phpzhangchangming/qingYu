const App = getApp();
Page({
    data: { //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        login: true,
        show: true,
        phone:'',
        time:60,
        showTime:false
    },
    onLoad: function() {
        var that = this; // 查看是否授权
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) { //从数据库获取用户信息
                            that.queryUsreInfo(); //用户已经授权过
                            wx.switchTab({
                                url: '/pages/index/index'
                            })
                        }
                    });
                } else {
                    that.setData({
                        login: false
                    });
                }
            }
        })
    },
    phoneData:function(e){
        this.setData({phone:e.detail.value})
    },
    getVerifyCode:function(){
        this.countDown();

        this.setData({showTime:true});

        // let phone = this.data.phone;
        // let that = this;
        // wx.request({
        //     url: getApp().globalData.url + '/user/getVerifyCode',
        //     data: {
        //         phone:phone
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function(res) { //从数据库获取用户信息
        //         if(res.data.result == 0){
        //             wx.showModal({
        //                 title: '通知',
        //                 content: '登录失败，请核实信息',
        //                 showCancel: false,
        //                 confirmText: '确定',
        //             })
        //         }else{
        //             that.setTime();
        //         }
        //     }
        // })
    },
    countDown:function(){
        if(this.data.time == 0){
            this.setData({
                time:60,
                showTime:false
            })
        }else{
            let that = this;
            setTimeout(function(){
                that.setData({time:that.data.time - 1})
                that.countDown();
            },1000);
        }
    },
    phoneLogin: function(e) {
        var that = this; //插入登录的用户的相关信息到数据库
        let phone = e.detail.value.phone;
        let verifyCode = e.detail.value.verifyCode;

        wx.request({
            url: getApp().globalData.url + '/user/login',
            data: {
                phone:phone,
                verifyCode:verifyCode
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) { //从数据库获取用户信息
                
                if(res.data.result == 0){
                    wx.showModal({
                        title: '通知',
                        content: '登录失败，请核实信息',
                        showCancel: false,
                        confirmText: '确定',
                    })
                }else{
                    wx.setStorage({
                        key:'userInfo',
                        data: {
                            id: res.data.data.id,
                            token: res.data.data.token,
                            customerName: res.data.data.customerName,
                            phone: res.data.data.phone,
                            name: res.data.data.name,
                        }
                    })
                    // console.log(res.data.data);
                    // createTime:"2018-06-27 16:51:49"
                    // customer:null
                    // customerId:2
                    // customerName:"优路创科"
                    // id:1
                    // name:"123ss"
                    // phone:"15311574613"
                    // status:3
                    // token:"94fde42a-3f6c-48df-9e56-7d9941ba0ec6"
                    // userType:1
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
            }
        })
    },
    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            this.setData({
                show: false
            });
        } else {
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    },
    queryUsreInfo: function () { //获取用户信息接口
        return '';
        // wx.request({
        //     url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
        //     data: {
        //         openid: getApp().globalData.openid
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function(res) {
        //         console.log(res.data);
        //         getApp().globalData.userInfo = res.data;
        //     }
        // })
    },
})