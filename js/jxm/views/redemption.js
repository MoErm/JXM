define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Chart = require("jxm/utils/Chart");
    var Template = require("jxm/tpl/redemption.tpl");
    var tool = require('jxm/utils/Tool')
    var toRedeem = new Model.toRedeem();
    var handle = new tool();
    var payLayer = require("jxm/common/common");
    var message = '网络错误，请稍后重试';
    //接口
    module.exports = App.Page.extend({
        events: {
            'input #redeemValue': 'autoInput',//获取开户行信息
            'click .redemption_btn': 'payRedeem'
        },
        initialize: function () {
            self = this;
        },
        goTop:function(){
            $(window).scrollTop(0)
        },

        onShow: function () {
            handle.share();
            this.setHeader();
            self.showUser()


        },
        autoInput:function(){
            var redeemValue = handle.deleteAllBlank(self.$('#redeemValue').val());
            if(redeemValue>self.data.totalAmount){
                self.$('#redeemValue').val(self.data.totalAmount)
            }
        },
        showUser:function(){
            toRedeem.exec({
                type: 'get',
                success: function(data){
                    console.log(data)
                    if(data.ret == 0){
                        self.data=data.data
                        self.$el.html(_.template(Template)(data.data));

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
            if(self.data.todaySurplusTimes==0){
                App.showToast("今日赎回次数已用完，请明日再来")
                return
            }
            if(self.data.todaySurplusAmount==0){
                App.showToast("今日赎回限额已用完，请明日再来")
                return
            }
            var redeemValue = handle.deleteAllBlank(self.$('#redeemValue').val());
            if(redeemValue==""){
                App.showToast("请输入赎回金额")
                return
            }
            if(self.data.totalAmount-redeemValue<100&&self.data.totalAmount-redeemValue!=0){
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
                        App.goTo("my_invest")
                    }
                },
                center: {
                    'tagname': 'title', 'value': ['赎回']
                },
                right:null
            });
        },

        onHide: function () {
        }
    })
})