//天添利 介绍页
define(function(require, exports, module) {
    var introduce = require('jxm/tpl/ttl_introduce.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #action_buy': 'goBuyPage',
        },
        onShow: function() {
            self = this.initialize();
            //添加内容
            self.$el.html(introduce);
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
        goBuyPage: function(e){
            e.preventDefault(e);
            App.goTo("ttl_buy_one");
        }
    })
})