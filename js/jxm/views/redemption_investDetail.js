define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Template = require("jxm/tpl/redemption_investDetail.tpl");
    var tool = require('jxm/utils/Tool')
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var getOrderDetails = new Model.getOrderDetails();
    var surplus=0;
    //接口getOrderDetails
    module.exports = App.Page.extend({
        events: {
            'click .js_pay': 'pay',
            'click .ico_coin': 'test'
        },
        initialize: function () {

        },
        onShow: function () {
            App.showLoading();
            handle.share();
            self = this;

            this.setHeader();

            this.showPage();
//            self.$el.html(Template);
        },
        pay:function(){
            var query = this.request.query;
            var orderNo=query&&query.orderNo||"";

            var data={
                postData:{
                    surplusPayTime:self.surplus,
                    orderNo:orderNo
                }
            }
            payLayer.ttlPayWin(data)
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
                        console.log(data.data)
                        self.data.format=self.format
                        self.$el.html(_.template(Template)(self.data));
                        if(data.data.orderStatus == "01") {
                            self.surplus = data.data.surplusPayTime;
                            self.timer = setInterval(function () {
                                var minute = Math.floor(self.surplus / 60);
                                var second = self.surplus - minute * 60;
                                $('.js_time').html(minute + '分' + second + '秒');
                                self.surplus -= 1;
                                self.data.surplusPayTime = self.surplus - 1;
                                if (self.surplussurplus == -1) {
                                    clearInterval(self.timer);
                                    self.hide()
                                    self.getOrderInfoAlert = handle.alert('订单已关闭，请重新购买', function () {

                                        App.goTo("my_invest")
                                    }).show();
                                }
                            }, 1000);
                        }
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
                        App.goTo("redeem")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['交易详情']
                },
                right:
                    [{
                    'tagname': '', 'value': '协议&ensp;',
                    callback: function () {

                    }
                }]
            });
        },

        onHide: function () {
            self.$el.html("")
        }
    })
})