const App = getApp();
Component({
    properties: {
        titleMsg: {
            type: String,
            value: ''
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
        },
        refreshUrl:{
            type:String,
            value:''
        }
    },
    data: {
        someData: {},
        navH: App.globalData.navHeight,
    },
    methods: {
        _callBack: function() {
            this.triggerEvent("_callBack");
        }
    }
})