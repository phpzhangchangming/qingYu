Page({
    data: {
        editBtnWidth: 180,
        hidden:true,
        limit: 30,
        list: []
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中...',
        });
        this.initEleWidth();
        this.getData();
    },
    getData:function(){
        var that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                let userId = res.data.id;
                let token = res.data.token;
                wx.request({
                    url: getApp().globalData.url + 'farmland/list',
                    data: {
                        userId: userId,
                        token:token,
                        limit:that.data.limit
                    },
                    header: { 'content-type': 'application/json' },
                    success: function (res) {
                        wx.hideLoading();
                        if (res.result == 0) {
                            wx.showModal({
                                title: '通知',
                                content: '正在维护中，请稍后',
                                showCancel: false,
                                confirmText: '确定'
                            })
                            return;
                        }
                        let lists = res.data.data.list;
                        let list = [];
                        for (var index in lists) {
                            list.push({
                                'id': lists[index].id,
                                'name': lists[index].name,
                                'crop': lists[index].plantingStructure,
                                'area': lists[index].area
                            });
                        }
                        that.setData({ list: list })
                    }
                });
            }
        });
    },
    touchS:function(e){
        if(e.touches.length==1){
            this.setData({
                startX:e.touches[0].clientX
            });
        }
    },
    touchM:function(e){
        if(e.touches.length==1){
            //手指移动时水平方向位置
            var moveX = e.touches[0].clientX;
            //手指起始点位置与移动期间的差值
            var disX = this.data.startX - moveX;
            var editBtnWidth = this.data.editBtnWidth;

            var txtStyle = "";
            if(disX == 0 || disX < 0){//如果移动距离小于等于0，文本层位置不变
                txtStyle = "left:0px";
            }else if(disX > 0 ){//移动距离大于0，文本层left值等于手指移动距离
                txtStyle = "left:-"+disX+"px";
                if(disX>=editBtnWidth){
                    //控制手指移动距离最大值为删除按钮的宽度
                    txtStyle = "left:-"+ editBtnWidth +"px";
                }
            }

            //获取手指触摸的是哪一项
            var index = e.target.dataset.index;

            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                list:list
            });
        }
    },
    touchE:function(e){
        if(e.changedTouches.length==1){
            //手指移动结束后水平位置
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离
            var disX = this.data.startX - endX;
            var btnWidth = this.data.editBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮

            var txtStyle = "left:0";
            if(disX > 70){
                txtStyle = "left:-"+btnWidth+"px"
            }else{
                this.setData({ hidden:true });
            }

            //获取手指触摸的是哪一项
            var index = e.target.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({ list:list });
        }
    },
    //获取元素自适应后的实际宽度
    getEleWidth:function(w){
        var real = 0;
        try{
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = (750/2)/(w/2);//以宽度750px设计稿做宽度的自适应
            real = Math.floor(res/scale);
            return real;
        } catch(e){
            return false;
        }
    },
    initEleWidth:function(){
        var editBtnWidth = this.getEleWidth(this.data.editBtnWidth);
        this.setData({
            editBtnWidth:editBtnWidth
        });
    },
    editItem:function(e){
        let index = e.currentTarget.dataset.index;
        let id = this.data.list[index].id;
        let name = this.data.list[index].name;
        let area = this.data.list[index].area;
        let crop = this.data.list[index].crop;
        wx.navigateTo({
            url: `/pages/ground/groundedit?id=${id}&name=${name}&area=${area}&crop=${crop}`,
        });
    },

})