define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Template = require("jxm/tpl/redemption_investDetail.tpl");
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var getOrderDetails = new Model.getOrderDetails();
    //接口getOrderDetails
    module.exports = App.Page.extend({
        events: {
            'click .redemption_btn': 'payRedeem',
            'click .ico_coin': 'test'
        },
        initialize: function () {
            self = this;
        },
        onShow: function () {

            handle.share();


            this.setHeader();

            this.showPage();
            this.test()
//            self.$el.html(Template);
        },
        test:function(){
            App.showLoading();
//            window.setTimeout(function(){
//                App.hideLoading();
//            },20000)
        },
        format:function(num){
            var temp_num=num*100
            return temp_num.toFixed(3)+"%"
        },
        showPage:function(){

            var query = this.request.query;
            var orderNo=query&&query.orderNo||"";
            if(orderNo==""){
                App.showToast("订单编号错误")
                window.setTimeout(function(){
                    App.goTo("my_invest")
                },2000)
                return
            }
            getOrderDetails.set({orderNo:orderNo});
             getOrderDetails.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.data=data.data
                        self.data.format=self.format
                        self.$el.html(_.template(Template)(self.data));

                    }else if(data.ret == 999001) {
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg);
                    }
                    App.hideLoading();

                }
            })
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
                    'tagname': 'title', 'value': ['交易详情']
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