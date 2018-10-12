const App = getApp();
Page({
    data: {
        delBtnWidth: 160,//删除按钮宽度单位（rpx）
        editBtnWidth: 180,//删除按钮宽度单位（rpx）
        hidden: true,
        list: [],
    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.initEleWidth();
        this.getData();
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
    touchS: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置
                startX: e.touches[0].clientX
            });
        }
    },
    addPilot: function () {
        console.log('addPilot');

    },
    touchM: function (e) {
        if (e.touches.length == 1) {
            //手指移动时水平方向位置
            var moveX = e.touches[0].clientX;
            //手指起始点位置与移动期间的差值
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var editBtnWidth = this.data.editBtnWidth;

            var txtStyle = "";
            if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
                txtStyle = "left:0px";
            } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
                txtStyle = "left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度
                    txtStyle = "left:-" + (delBtnWidth + editBtnWidth) + "px";
                }
            }

            //获取手指触摸的是哪一项
            var index = e.target.dataset.index;

            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                list: list
            });
        }
    },
    touchE: function (e) {
        if (e.changedTouches.length == 1) {
            //手指移动结束后水平位置
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离
            var disX = this.data.startX - endX;
            var btnWidth = this.data.delBtnWidth + this.data.editBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮

            var txtStyle = "left:0";
            if (disX > 70) {
                txtStyle = "left:-" + btnWidth + "px"
            } else {
                this.setData({hidden: true});
            }

            //获取手指触摸的是哪一项
            var index = e.target.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({list: list});
        }
    },
    //获取元素自适应后的实际宽度
    getEleWidth: function (w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
            //
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
            //Do something when catch error
        }
    },
    initEleWidth: function () {
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        var editBtnWidth = this.getEleWidth(this.data.editBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth,
            editBtnWidth: editBtnWidth
        });
    },
    editItem: function (e) {
        console.log(e.currentTarget);
        return;
        let id = '';
        wx.redirectTo({
            url: "../pilotAdd/pilotAdd?asdf=12"
        })
        console.log('editItem');
    },
    delItemVerify: function () {//删除确认。
        this.setData({hidden: false});
    },
    //ming调用接口
    delItemConfirm: function (e) {//删除
        let _this = this;
        wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 1000,
            complete: function () {
                setTimeout(function () {
                    //获取列表中要删除项的下标
                    var index = e.target.dataset.index;
                    var list = _this.data.list;
                    //移除列表中下标为index的项
                    list.splice(index, 1);
                    //更新列表的状态
                    _this.setData({
                        list: list
                    });
                    _this.setData({hidden: true});
                }, 1000);
            }
        });
    },
    //测试临时数据
    getData: function () {
        var that = this;
        wx.request({
            url: getApp().globalData.url+'/user/getPilotList',
            data: {
                userId:1
            },
            header: {'content-type': 'application/json'},
            success: function (res) {                    //从数据库获取用户信息
                console.log(res);
                if(res.data.result != 1){
                    wx.showModal({
                        title: '通知',
                        content: '正在维护中，请稍后',
                        showCancel: false,
                        confirmText: '确定',
                        success: function (res) {}
                    })
                }else{
                    that.setData({ list: res.data.data });
                }

                // that.queryUsreInfo();
                // that.setData({showMap: true})
            }
        });
    }
})