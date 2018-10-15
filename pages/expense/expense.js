Page({

    data: {
        list: [],
    },

    onLoad: function (options) {
        this.getData();
    },
    getData: function () {
        var that = this;
        wx.request({
            url: getApp().globalData.url + '/customer/account/record/list',
            data: {
                uavId: 1,
                userId: 1
            },
            header: {'content-type': 'application/json'},
            success: function (res) {   //从数据库获取用户信息
                console.log(res);

                let lists = res.data.data.list;
                let list = [];
                for (var index in lists) {
                    // res.data.infos[index].info_file = res.data.infos[index].info_file.split(',');
                    list.push({
                        'id': lists[index].id,
                        'typeDesc': lists[index].typeDesc,
                        'amount': lists[index].amount,
                        'time': lists[index].createTime
                    });
                }
                that.setData({list: list})
            }
        });
    },
    onReady: function () {
        // 页面渲染完成
    },

    onShow: function () {
        // 页面显示
    },

    onHide: function () {
        // 页面隐藏
    },

    onUnload: function () {
        // 页面关闭
    },
})