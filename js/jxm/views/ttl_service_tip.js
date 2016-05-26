//天添利 推荐页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var ttlServiceTip = require('jxm/agreement/ttl_service_tip.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var store = require('jxm/model/store');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            this.header = document.querySelector("#header");
            return this;
        },
        events: {
            
        },
        onShow: function() {
            setTimeout(function(){
                App.hideLoading();
            },500)
            self = this.initialize();

            handle.share();
            handle.orientationTips();
            self.setHeader();
            //添加内容
            self.initTemple();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '协议条款',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('ttl_buy_one');
                    }
                },
                right: null
            });
        },
        initTemple: function(){
            App.hideLoading();
            self.$el.html(ttlServiceTip);
        }
    })
})