//天添利 推荐页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var ttlServiceOrderTip = require('jxm/agreement/ttl_service_ordertip.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var store = require('jxm/model/store');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var getTtlServiceData = new Model.getTtlServiceData(); //获取收益率接口

    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            this.header = document.querySelector("#header");
            return this;
        },
        onShow: function() {
            setTimeout(function(){
                App.hideLoading();
            },500)
            self = this.initialize();
            self.pageData= {};
            handle.share();
            handle.orientationTips();
            self.setHeader();
            self.initServiceData();           
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '协议条款',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('redemption_investDetail?orderNo='+self.orderNo+'&type=1');
                    }
                },
                right: null
            });
        },
        initServiceData: function(){
            self.query = this.request.query;
            self.orderNo=self.query&&self.query.orderNo||"";
            if(self.orderNo==""){
                App.showToast("订单编号错误")
                window.setTimeout(function(){
                    App.goTo("my_invest")
                },2000)
                return;
            }
            getTtlServiceData.set({
                "orderNo":  self.orderNo
            });
            getTtlServiceData.exec({
                type: 'get',
            }).then(function (data) {
                self.pageData.serviceData= data.data;
                
                if(data.ret == 0){ 
                    //添加内容
                    self.initTemple();
                    // App.goTo('redeem');
                }else if(data.ret == 999001){
                    //未登录
                    handle.goLogin();
                }else{
                    App.showToast(data.msg  || self.message);
                }
                App.hideLoading();
            });            
        },
        initTemple: function(){
            self.$el.html(_.template(ttlServiceOrderTip)(self.pageData));
            App.hideLoading();
        }
    })
})