//天添利 购买页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var paySuccess= require('jxm/tpl/ttl_title_tip.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var tool = require("jxm/utils/Tool");
    var handle = new tool();
    var goTtlPayResult = new Model.goTtlPayResult(); 
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        onShow: function() {
            //隐藏header
            var header = document.querySelector("#header");
            $(header).hide();            
            self = this.initialize();
            
            handle.share();
            self.pageData= {}
            //添加内容
            self.initTemple();
            self.setHeader();            
        },  
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '天添利',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('ttl_introduce');
                    }
                }
            });
        },
        initTemple: function(){
            self.$el.html(_.template(paySuccess)(self.pageData));
            App.hideLoading();
        },
    })
})