const App = getApp();
Page({
    data: {
        latitude: 0,
        longitude: 0,
        scale: '10', //缩放级别
        markers: [],
        mapHeight: App.globalData.height - App.globalData.navHeight - 46,
        navHeight: App.globalData.navHeight,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showMap:false
    },
    onLoad: function () {
        this.getData();
    },
    getData:function () {
        var that = this;
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
                        if (res.data.result == 0) {
                            wx.showModal({
                                title: '通知',
                                content: '正在维护中，请稍后',
                                showCancel: false,
                                confirmText: '确定',
                                success: function (res) { }
                            })
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