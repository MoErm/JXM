define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/fuyou.tpl");
    var fuyouTradeRecords = new Model.fuyouTradeRecords();
    var fuyouBalance = new Model.fuyouBalance();

    var Store = require("jxm/model/store");
    var loginStore = new Store.loginStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    //接口
    module.exports = App.Page.extend({
        events: {
            'click #fuyouList_1': 'goDetail',
            'click .currentIncome': 'rechargeOut',
            'click .historyIncome': 'recharge'
        },
        initialize: function () {
            self = this;
        },
        goDetail:function(){
            App.goTo("fuyouDetail")
        },
        recharge:function(){
            App.goTo("recharge")
        },
        rechargeOut:function(){
            App.goTo("recharge_out")
        },
        onShow: function () {
            handle.share();
            this.setHeader();

            App.hideLoading()
            this.initData()
            return
        },
        initData:function(){
            fuyouTradeRecords.exec({
                type: "get",
                success: function (data){
                    //console.log(data)
                    App.hideLoading();
                    if(data.ret == 0){
                        self.initYuE()
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }
                },
                error:function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        initYuE:function(){
            fuyouBalance.exec({
                type: 'get',
                success: function(data){
                    console.log(data.data.amount)
                    if(data.ret == 0){
                        self.data=data.data
                        self.$el.html(_.template(Template)(self.data));
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || self.message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(self.message);
                }
            });
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();

            header.set({
                view: this,
                events: {
                    'click .js_setting': 'setting'
                },
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("my_invest")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['现金余额']
                },
                setting: function () {
                    App.goTo('setting');
                },
                right: null
            });
        },

        list: function () {
            App.goTo('list');
        },
        onHide: function () {

        }
    })
})