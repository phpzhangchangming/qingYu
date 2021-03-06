const App = getApp();
Page({
    data: {
        latitude: 0,
        longitude: 0,
        scale: '14',
        markers: [],
        mapHeight: App.globalData.height - App.globalData.navHeight - 46,
        navHeight: App.globalData.navHeight,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showMap:false
    },
    onLoad: function () {
        let userinfo = wx.getStorageSync('userInfo');
        if (!userinfo) {
            wx.reLaunch({
                url: '/pages/login/login'
            })
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        this.getData();
    },
    getData:function () {
        let that = this;
        let userinfo =  wx.getStorageSync('userInfo');
        if (!userinfo){
            wx.reLaunch({
                url: '/pages/login/login'
            })
        }
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'uav/getUAVList',
                    data: {
                        userId: userId,
                        token:token
                    },
                    header: { 'content-type': 'application/json' },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.statusCode == 506) {
                            App.errShow(res.statusCode);
                        } else if (res.data.result != 1) {
                            App.errShow(res.statusCode, res.data.errors);
                        } else {
                            let lists = [];
                            for (var index in res.data.data) {
                                lists.push({
                                    'id': res.data.data[index].id,
                                    'latitude': res.data.data[index].lat,
                                    'longitude': res.data.data[index].lng,
                                    'title': res.data.data[index].customerName,
                                    'iconPath': '/images/feiji-on.png',
                                    'width': 35,
                                    'height': 35,
                                    'callout': {
                                        'content': res.data.data[index].remark,
                                        'color': '#fff',
                                        'fontSize': 20,
                                        'borderRadius': 6,
                                        'borderColor': '#ccc',
                                        'display': 'ALWAYS',
                                        'padding': 5,
                                        'bgColor': '#ccc'
                                    }
                                });
                            }
                            that.setData({
                                markers: lists,
                                latitude: res.data.data[0].lat,
                                longitude: res.data.data[0].lng,
                                showMap: true
                            });
                        }
                    }
                });
            }
        })
    }
});