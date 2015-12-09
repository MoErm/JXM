//天添利 购买页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var buyStepTwo = require('jxm/tpl/ttl_buy_two.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var tool = require('jxm/utils/Tool');
    var agreeTtlContract= new Model.agreeTtlContract();
    var handle = new tool();
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
            self.setHeader();
            self.$el.html(buyStepTwo);
            App.hideLoading();
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
            self.goPayPage();
        },
        goAgreePage: function(e){
            e.preventDefault(e);
            App.showLoading();
            agreeTtlContract.exec({
                type: 'post',
            }).then(function (data) {
                if(data.ret == 0){
                    sessionStorage.setItem("isagreed",1);
                    sessionStorage.setItem("isagreedAction",1);
                    self.goPayPage();
                }else if(data.ret == 999001){
                    //未登录
                    handle.goLogin();
                }else{

                    App.showToast(data.msg  || message);
                }
                App.hideLoading();
            }).catch(function (error) {
                App.hideLoading();
                App.showToast(error.msg || '网络错误');
            });

           
        }, 
        goPayPage: function(){
            App.goTo("ttl_buy_one");
        }
    });
});