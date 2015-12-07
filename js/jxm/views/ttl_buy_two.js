//天添利 购买页
define(function(require, exports, module) {
    var buyStepTwo = require('jxm/tpl/ttl_buy_two.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var payTest = require('jxm/tpl/ttl_pay_test.tpl');
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #disagree': 'goDisAgreePage',
            'click #agree': 'goAgreePage'
        },
        onShow: function() {
            //隐藏header
            var header = document.querySelector("#header");
            $(header).hide();
            
            self = this.initialize();
            //添加内容
            self.$el.html(buyStepTwo);
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
        goDisAgreePage: function(e){
            e.preventDefault(e);
            App.goTo("ttl_buy_one");
        },
        goAgreePage: function(e){
            e.preventDefault(e);
            App.goTo("ttl_buy_one");
            App.showAlert(payTest);
            var payBtn= $('#gopay');
            var cancelBtn= $('#payClose');
            payBtn.on("click",function(){
                self.goPayPage();
            });
            cancelBtn.on("click",function(){
                self.cancelPay();
            });
        }, 
        goPayPage: function(){

            App.hideAlert(payTest);
            App.goTo("ttl_pay_success");
        },
        cancelPay: function(){

            App.hideAlert(payTest);
        }
    });
});