define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/redemption.tpl");
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    //接口
    module.exports = App.Page.extend({
        events: {
            'click .redemption_btn': 'payRedeem'
        },
        initialize: function () {
            self = this;
        },
        goTop:function(){
            $(window).scrollTop(0)
        },

        onShow: function () {
            handle.share();
            this.setHeader();
            self.$el.html(Template);

        },
        payRedeem:function(){
            payLayer.payRedeem()
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("my_invest")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['赎回']
                },
                right:null
            });
        },

        onHide: function () {
        }
    })
})