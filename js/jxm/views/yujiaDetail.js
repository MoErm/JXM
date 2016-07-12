define(function (require, exports, module) {
    var yujiaDetail = require('jxm/tpl/yujiaDetail.tpl');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var model = require('jxm/model/model');
    var common = require("jxm/common/common")
    var yujiaOrderDeatil = new model.yujiaOrderDeatil();
    var yujiaOrderReturnInfo = new model.yujiaOrderReturnInfo();
    var yujiaSendPayMsgCode = new model.yujiaSendPayMsgCode();
    var self;
    var message = '网络错误，请稍后重试';
    module.exports = App.Page.extend({
        afterMount: function () {
            self=this;
            App.hideLoading()
        },
        onShow: function () {
            this.showDetail()
        },
        events: {
            'click .huikuan': 'huikuan',
            'click .zhifu': 'zhifu',
            'click .chanpin': 'chanpin'
        },
        zhifu:function(){
            yujiaSendPayMsgCode.exec({
                type: 'get',
                success: function(data) {
                    App.hideLoading();
                    if (data.ret == 0) {
                        common.buyYujia(self.payData)
                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg)
                    }
                },
                error: function() {
                    App.hideLoading();
                    App.showToast(message);
                }
            })

        },
        chanpin:function(){
            App.goTo("yujia")
        },
        huikuan:function(){
            var query = this.request.query;
            yujiaOrderReturnInfo.exec({
                type: 'get',
                data:{
                    orderNo:query.orderNo
                },
                success: function(data){
                    if(data.ret == 0){
                        common.showyujiaList(data.data.returnedList)
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg );
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        showDetail:function(){
            var query = this.request.query;
            if(_.isUndefined(query) || _.isUndefined(query.orderNo)){
                App.goTo('my_invest');
                return;
            }
            yujiaOrderDeatil.exec({
                type: 'get',
                data:{
                    orderNo:query.orderNo
                },
                success: function(data){
                    if(data.ret == 0){
                        self.$el.html(_.template(yujiaDetail)(data.data));
                        if(data.data.orderStatus=="01"){
                            self.payData=data.data.payInfo
                            self.payData.productName=data.data.productName
                            self.payData.investPeriod=data.data.investPeriod
                            self.payData.orderNo=data.data.orderNo
                            self.showPageCD(data.data.payInfo.surplusPayTime)
                        }

                        if(data.data.orderStatus=="05"||data.data.orderStatus=="11"||data.data.orderStatus=="12"||data.data.orderStatus=="14"){
                            self.setHeader(true)
                        }
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg );
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        showPageCD:function(time){
            if(time==-1){
                return
            }
            self.payData.surplusPayTime = time;
            self.investDetail_CD =setInterval(function() {
                var minute = Math.floor(self.payData.surplusPayTime / 60);
                var second = self.payData.surplusPayTime  - minute * 60;
                $("#investDetail_CD").html(minute + '分' + second + '秒');
                self.payData.surplusPayTime  -= 1;
                if (self.payData.surplusPayTime  <-1) {
                    $("#investDetail_CD").html('-分-秒');
                    clearInterval(self.investDetail_CD);
                    $(".investDetail_fixed_2").css("display","none");
                    App.showToast('订单已关闭，请重新购买。');
                }
            }, 1000);
        },
        setHeader: function (showContract) {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '御驾系列',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goBack();
                    }
                },
                right: showContract?[{
                    'tagname': 'custom', 'value': '协议',
                    itemFn: function () {
                        return '<span class="cm-header-btn fr js_custom" style="margin-right:10px">协议</span>';
                    },
                    callback: function () {
                        var query = self.request.query;
                        App.goTo("yujiaxieyi?orderNo="+query.orderNo)
                    }
                }]:null
            });
        }
    })
})
