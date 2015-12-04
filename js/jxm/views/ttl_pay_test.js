//天添利 购买页
define(function(require, exports, module) {
    var payTest= require('jxm/tpl/ttl_pay_test.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #gopay': 'goPayPage',
        },
        onShow: function() {
            //隐藏header
            var header = document.querySelector("#header");
            $(header).hide();
            
            self = this.initialize();
            //添加内容
            self.$el.html(payTest);
            self.initChart();
            self.setHeader();
        },        
        initChart: function(){
            // var chartLine= Snap("#chart_line");
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '天添利',
                back: {
                    'tagname': '',
                    callback: function () {}
                },
                right: null
            });
        },
        goPayPage: function(e){
            e.preventDefault(e);
            App.goTo("ttl_pay_success");
        }
    })
})