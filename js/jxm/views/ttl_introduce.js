//天添利 介绍页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var introduce = require('jxm/tpl/ttl_introduce.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var getTtlProperty = new Model.getTtlProperty();    //获取灵活宝资产信息接口
    var getTtlRate = new Model.getTtlRate();    //获取收益率接口
    var goTtlBuyPage = new Model.goTtlBuyPage();  //购买页面跳转

    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #action_buy': 'goBuyPage',
            'click #action_redem': 'goRedemPage'            
        },
        onShow: function() {
            self = this.initialize();
            self.pageData= {};
            self.setHeader();
            self.initProperty();
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
        initProperty: function(){
            getTtlProperty.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.pageData.getTtlProperty = data.data; 
                         self.initRate();                  
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || message);
                    }
                },
                error: function(){
                    App.hideLoading();
                }
            });
        },
        initRate: function(){
            getTtlRate.exec({
                type: 'get',
                success: function(data){                    
                    if(data.ret == 0){
                        self.pageData.getTtlRate = data.data; 
                        self.initTemple();

                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || message);
                    }
                },
                error: function(){
                    App.hideLoading();
                }
            });
        },        
        initTemple: function(){
            self.$el.html(_.template(introduce)(self.pageData));
            self.initChart();
        },
        goBuyPage: function(e){
            e.preventDefault(e);
            var goBuyTest= {
                testCard: function(){
                    goTtlBuyPage.exec({
                        type: 'get',
                        success: function(data){                    
                            if(data.ret == 0){

                            }else if(data.ret == 999001){
                                handle.goLogin();
                            }else if(data.ret == 110001){

                            }else if(data.ret == 110009){

                            }else if(data.ret == 110203){

                            }else{
                                App.showToast(data.msg  || message);
                            }
                        },
                        error: function(){
                            App.hideLoading();
                        }
                    });
                },
                doBuyFirst: function(){

                }
            }

            // App.goTo("ttl_buy_one");
        },
        goRedemPage: function(){
            var redemBtn= $("#action_redem");
            if(!redemBtn.hasClass('lock')){
                App.goTo("redemption");
            }
            else{
                // App.showAlert("不可赎回");
                return;
            }
        },        
    })
})