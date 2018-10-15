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
        console.log(getApp().globalData.url + '/uav/getUAVList')
        return;
        var that = this;
        wx.request({
            url: getApp().globalData.url+'/uav/getUAVList',
            data: {
                userId:1
            },
            header: {'content-type': 'application/json'},
            success: function (res) {                    //从数据库获取用户信息
                if(res.data.result != 1){
                    wx.showModal({
                        title: '通知',
                        content: '正在维护中，请稍后',
                        showCancel: false,
                        confirmText: '确定',
                        success: function (res) {}
                    })
                }else{
                    let lists = [];
                    for (var index in res.data.data) {
                        // res.data.infos[index].info_file = res.data.infos[index].info_file.split(',');
                        lists.push({
                            'id':res.data.data[index].id,
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
                        latitude:res.data.data[0].lat,
                        longitude:res.data.data[0].lng,
                        showMap:true
                    });
                }
            }
        });
    }
});