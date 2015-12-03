//天添利 购买页
define(function(require, exports, module) {
    var buyStepOne = require('jxm/tpl/ttl_buy_two.tpl');
    var footer = require('jxm/tpl/footer.tpl');
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
            //添加内容
            self.$el.html(buyStepOne);
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
    })
})