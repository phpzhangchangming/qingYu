const App = getApp();
Page({
    data: {
        latitude: 0,
        longitude: 0,
        scale: '18',
        markers: [],
        mapHeight: App.globalData.height,
        navHeight: App.globalData.navHeight,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showMap: false,
        polygons: [],
        polyline:[]
    },
    onLoad: function(options) {
        let userinfo = wx.getStorageSync('userInfo');
        if (!userinfo) {
            wx.reLaunch({
                url: '/pages/login/login'
            })
            return;
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        if (options.isFly == 1) {
            this.getDataOne(options.id);
        } else {
            this.getDataTwo(options.id);
        }
    },
    getDataTwo: function (id) {
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'farmland/get',
                    data: {
                        id: id,
                        userId: userId,
                        token: token
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        wx.hideLoading();
                        if (res.data.result == 0) {
                            wx.showModal({
                                title: '通知',
                                content: '正在维护中，请稍后',
                                showCancel: false,
                                confirmText: '确定',
                                success: function(res) {}
                            })
                        } else {
                            let data = res.data.data.boundary;
                            data = data.split(";");
                            let points = [];
                            let l = [];
                            for (let k in data) {
                                l = data[k].split("-");
                                if (l[0]) {
                                    for (let key in l) {
                                        points.push({
                                            latitude: l[key].split(',')[0],
                                            longitude: l[key].split(',')[1]
                                        });
                                    }
                                }
                            }
                            let polygons = [];
                            polygons.push({
                                points: points
                            });
                            that.setData({
                                polygons: polygons,
                                latitude: polygons[0]['points'][0]['latitude'],
                                longitude: polygons[0]['points'][0]['longitude'],
                                showMap: true
                            });
                        }
                    }
                });
            }
        })
    },
    getDataOne: function (id) {
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'flyRecord/getFlyRecordDetail',
                    data: {
                        flyRecordId: id,
                        userId: userId,
                        token: token
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        wx.hideLoading();
                        if (res.data.result == 0) {
                            wx.showModal({
                                title: '通知',
                                content: '正在维护中，请稍后',
                                showCancel: false,
                                confirmText: '确定',
                                success: function(res) {}
                            })
                            return;
                        }
                        let polygons = [];
                        let points = [];
                        let data = [];
                        if (res.data.data.farmland){
                            let data = res.data.data.farmland.boundary;
                            data = data.split(";");
                            let l = [];
                            for (let k in data) {
                                l = data[k].split("-");
                                if (l[0]) {
                                    for (let key in l) {
                                        points.push({
                                            latitude: l[key].split(',')[0],
                                            longitude: l[key].split(',')[1]
                                        });
                                    }
                                }
                            }
                            polygons.push({
                                points: points
                            });
                        }
                        let polyline = [];
                        points = [];
                        data = res.data.data.dataList;
                        let lat = '';
                        let lng = '';
                        for(let i in data){
                            if (lat == data[i].lat && lng == data[i].lng){
                                continue;
                            }
                            lat = data[i].lat
                            lng = data[i].lng
                            points.push({ longitude: lng, latitude:lat})
                        }
                        polyline.push({
                            points:points,
                            color: "#FF0000DD",
                            width: 2,
                            dottedLine: true
                        })
                        that.setData({
                            polygons: polygons,
                            latitude: polyline[0]['points'][0]['latitude'],
                            longitude: polyline[0]['points'][0]['longitude'],
                            polyline: polyline,
                            showMap: true
                        });
                    }
                });
            }
        })
    }
});