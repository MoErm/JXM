define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/fuyou.tpl");
    var orderList = new Model.orderList();
    var historyOrder = new Model.historyOrder();

    var Store = require("jxm/model/store");
    var loginStore = new Store.loginStore();
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var self;
    //接口
    module.exports = App.Page.extend({
        events: {
            'click .js_history': 'goHistory',
            'click .my_change': 'goWallet',
            'click .js_float': 'goFloat',
            'click .js_regular': 'goRegular',
            'click .js_setting': 'setting',
            'click .js_product_list': 'list',
            'click .js_close': 'goClose',
            'click .invest_invite': 'goInvite',
            'click .js_situation':'goHeroList'
        },
        initialize: function () {
            self = this;
        },
        goWallet:function(){
            App.goTo("my_wallet")
        },
        goInvite:function(){
            App.goTo("my_invite")
        },
        onShow: function () {
            handle.share();
            this.setHeader();
            self.$el.html(_.template(Template));
            App.hideLoading()
            return
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