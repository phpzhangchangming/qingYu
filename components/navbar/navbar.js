const App = getApp();

Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        titleMsg: {
            type: String,
            value: 'default value'
        },
        showNavigator: {
            type: String,
            value: 'add'
        },
        url: {
            type: String,
            value: ''
        },
        show: {
            type: String,
            value: 'show'
        }
    },
    data: {
        // 这里是一些组件内部数据
        someData: {},
        navH: App.globalData.navHeight,
        // show:false
    },
    methods: {
        // 这里是一个自定义方法
        _callBack: function() {
            this.triggerEvent("_callBack");
        }
    }
})