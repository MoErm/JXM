define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/redemption_finish.tpl");
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
            this.showPage();
            App.hideLoading();
        },
        showPage:function(){
            var query = this.request.query;
            var ransomId=query&&query.ransomId||"-1";
            if(ransomId==-1){
                var data={
                    'ransomId':ransomId,
                    'redeemAmount':query.redeemAmount,
                    'redeemTime':query.redeemTime
                }
                self.$el.html(_.template(Template)(data));
            }
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
                    'tagname': 'title', 'value': ['赎回成功']
                },
                right: [{
                    'tagname': '', 'value': '完成&ensp;',
                    callback: function () {
                        App.goTo("my_invest")
                    }
                }]
            });
        },

        onHide: function () {
        }
    })
})