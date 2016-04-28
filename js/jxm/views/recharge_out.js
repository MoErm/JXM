//天添利 购买页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");    
    var footer = require('jxm/tpl/footer.tpl');
    var tool = require('jxm/utils/Tool');
    var common = require("jxm/common/common");
    var recharge = require('jxm/tpl/recharge_out.tpl');
    var fuyouToWithdraw = new Model.fuyouToWithdraw();  // 获取提现初始数据
    var fuyouSignForWithdraw = new Model.fuyouSignForWithdraw();  // 提现签名

    var handle = new tool();
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #get_allmoney ':'getAllmoneyFn',
            'click #recharge_btn':'goToRechargeOut'
        },     
        onShow: function() {
            self = this.initialize();
            self.message = '网络错误，请稍后重试';           
            self.pageData= {};   
            // 定义初始化方法 
            self.setHeader();            
            self.getInitTemData();            
            // self.getSignForChargeOut();            
        }, 
        initTemple: function(){
            //添加内容
            self.$el.html(_.template(recharge)(self.pageData));
        },       
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '提现',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('ttl_introduce');
                    }
                },
                right: null
            });
            App.hideLoading();
        },         
        getAllmoneyFn: function(){
            $("#recharge_out_money").val(self.pageData.chargeData.amount)
        }, 
        getInitTemData: function(){
            fuyouToWithdraw.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){     
                        self.pageData.chargeData= data.data;
                         // 处理限额信息
                        self.pageData.chargeData.dailyLimit= self.pageData.chargeData.dailyLimit?self.pageData.chargeData.dailyLimit:'无限额';
                        self.pageData.chargeData.transactLimit= self.pageData.chargeData.transactLimit?self.pageData.chargeData.transactLimit:'无限额';                        
                        self.initTemple();
                    }
                    else if(data.ret == 999001){ // 登录超时
                         App.goTo('login');
                    }
                    else if(data.ret == 110001){ // 未完成实名绑卡 跳转到实名绑卡流程
                        App.hideLoading();
                        self.promptAlert = handle.prompt('未完成实名绑卡,是否立即去绑卡？','放弃', '确定', function(){                          
                            App.goBack();
                        },function(){                          
                            App.goTo('bind_card_new');
                        });
                        self.promptAlert.show();
                    }
                    else if(data.ret == 110210){ // 当前银行卡未签约，请先签约 
                        App.hideLoading();                       
                        self.promptAlert = handle.prompt('当前银行卡未签约，是否去签约？','放弃', '确定', function(){                          
                            App.goBack();
                        },function(){                          
                            App.goTo('fuyou_sign');
                        });                  
                        self.promptAlert.show();
                    }
                    else if(data.ret == 100032){ // 余额查询失败，请稍后重试    
                        App.hideLoading();
                        self.promptAlert = handle.alert('余额查询失败，请稍后重试',function(){
                           App.goBack();
                        });                  
                        self.promptAlert.show();
                    }
                    else{
                        App.showToast(data.msg  || self.message);
                    }
                    App.hideLoading();
                },
                error: function(){
                    App.hideLoading();
                }
            });
        },
        goToRechargeOut: function(){
            var rechargeOutData={
                'amount':$("#recharge_out_money").val()
            }
            // 充值金额校验
            function checkAmount(){
                 if(rechargeOutData.amount==''){ // 空验证
                    App.showToast('提现金额不能为空');
                    return;
                }
                if(parseInt(rechargeOutData.amount)<100 && parseInt(rechargeOutData.amount)!=parseInt(self.pageData.chargeData.amount)){
                    App.showToast('提现余额小余100元，需一次性全额提现');
                    return;
                }
                if(parseInt(rechargeOutData.amount) > parseInt(self.pageData.chargeData.transactLimit)){
                    App.showToast('提现金额不能大于银行卡单笔限额');
                    return;
                }
                return true;
            }    

            if(checkAmount(rechargeOutData)){
                self.getSignForChargeOut(rechargeOutData);
            }
        }, 
        getSignForChargeOut: function(rechargeOutData){ // 充值签名
            fuyouSignForWithdraw.set({
                'amount': rechargeOutData.amount
            });
            fuyouSignForWithdraw.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){    
                        creatForm(data.data)
                    }
                    else if(data.ret == 999001){ // 登录超时
                         App.goTo('login');
                    }
                    else if(data.ret == 110001){ // 未完成实名绑卡 跳转到实名绑卡流程
                        App.hideLoading();
                        self.promptAlert = handle.prompt('未完成实名绑卡,是否立即去绑卡？','放弃', '确定', function(){                          
                            App.goBack();
                        },function(){                          
                            App.goTo('bind_card_new');
                        });
                        self.promptAlert.show();
                    }
                    else if(data.ret == 110210){ // 当前银行卡未签约，请先签约 
                        App.hideLoading();                       
                        self.promptAlert = handle.prompt('当前银行卡未签约，是否去签约？','放弃', '确定', function(){                          
                            App.goBack();
                        },function(){                          
                            App.goTo('fuyou_sign');
                        });                  
                        self.promptAlert.show();
                    }                   
                    else{
                        App.showToast(data.msg  || self.message);
                    }
                    App.hideLoading();
                },
                error: function(){
                    App.hideLoading();
                }
            }); 
            function creatForm(postData){
                // 创建
                var tem='<form method="post" id="recharge_out_form" accept-charset="utf-8">\
                        <input type="hidden" id="amount" name="amount" />\
                        <input type="hidden" id="bgCallback"  name="bgCallback" />\
                        <input type="hidden" id="loginId"  name="loginId" />\
                        <input type="hidden" id="merCode"  name="merCode" />\
                        <input type="hidden" id="pgCallback"  name="pgCallback" />\
                        <input type="hidden" id="serialNo"  name="serialNo" />\
                        <input type="hidden" id="signature"  name="signature" />\
                    </form>';                     
                $('body').append(tem);
                // 赋值
                $("#amount").val(postData.amount);
                $("#bgCallback").val(postData.bgCallback);
                $("#loginId").val(postData.loginId);
                $("#merCode").val(postData.merCode);
                $("#pgCallback").val(postData.pgCallback);
                $("#serialNo").val(postData.serialNo);
                $("#signature").val(postData.signature);
                $("#recharge_out_form").attr('action',postData.withdrawUrl);
                // 提交
                $("#recharge_out_form").submit();
            } 
        }
    });

})  