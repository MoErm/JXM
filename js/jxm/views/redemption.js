define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/redemption.tpl");
    var tool = require('jxm/utils/Tool')
    var toRedeem = new Model.toRedeem();
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var message = '网络错误，请稍后重试';
    var totalAmount=0
    var todaySurplusTimes=0
    var todaySurplusAmount=0
    //接口
    module.exports = App.Page.extend({
        events: {
            'input #redeemValue': 'autoInput',
            'click .redemption_btn': 'payRedeem'
        },
        initialize: function () {


        },
        beforeIn:  function () {
            self = this;
            self.$el.html("");

        },

        onShow: function () {

            handle.share();
            this.setHeader();
            this.showUser()


        },
        autoInput:function(){
            var showImput=""
            var reg=/^\d+(\.\d{2})?$/
            var redeemValue = handle.deleteAllBlank(self.$('#redeemValue').val());

//                showImput= parseInt(redeemValue)
                //先把非数字的都替换掉，除了数字和.
                self.$('#redeemValue').val(self.$('#redeemValue').val().replace(/[^\d.]/g, "").
                    //只允许一个小数点
                    replace(/^\./g, "").replace(/\.{2,}/g, ".").
                    //只能输入小数点后两位
                    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));

            if(redeemValue>totalAmount){
                self.$('#redeemValue').val(totalAmount)
            }
//
        },
        showUser:function(){
            App.showLoading()
            toRedeem.exec({
                type: 'get',
                success: function(data){

                    App.hideLoading();
                    if(data.ret == 0){
                        totalAmount=data.data.totalAmount
                        todaySurplusTimes=data.data.todaySurplusTimes
                        todaySurplusAmount=data.data.todaySurplusAmount

                        data.data.todaySurplusAmount=handle.dealMoney2(data.data.todaySurplusAmount)
                        data.data.totalAmount=handle.dealMoney2(data.data.totalAmount)

                        self.$el.html(_.template(Template)(data.data));
                        self.$('#redeemValue').val("")
                        self.$('#totalAmount').html(data.data.totalAmount)
                    }else if(data.ret == 999001) {
                        handle.goLogin();
                    }


                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        payRedeem:function(){
//            if(self.data.totalAmount==0){
//                App.showToast("您可赎回金额为零，请先投资")
//                return
//            }
            if(todaySurplusTimes==0){
                self.promptAlert = handle.alert("今日赎回次数已用完，请明日再来");
                self.promptAlert.show();
                return
            }
            if(todaySurplusAmount==0){
                self.promptAlert = handle.alert("今日赎回限额已用完，请明日再来");
                self.promptAlert.show();
                return
            }
            var redeemValue = handle.deleteAllBlank(self.$('#redeemValue').val());
            if(redeemValue==""){
                App.showToast("请输入赎回金额")
                return
            }
            if(todaySurplusAmount<redeemValue){
                self.promptAlert = handle.alert("赎回金额大于今日可赎回限额");
                self.promptAlert.show();
                return
            }
            if(todaySurplusAmount<100){
                self.promptAlert = handle.alert("赎回金额必须大于100元");
                self.promptAlert.show();
                return
            }
            if(totalAmount-redeemValue<100&&totalAmount-redeemValue!=0){
                self.promptAlert = handle.alert("当前赎回金额将导致剩余总资产小于100元， 请务必一次性全部赎回");
                self.promptAlert.show();
                return
            }

            payLayer.payRedeem(redeemValue)
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("ttl_introduce")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['赎回']
                },
                right:null
            });
        },

        onHide: function () {
            self.$el.html("")
        }
    })
})