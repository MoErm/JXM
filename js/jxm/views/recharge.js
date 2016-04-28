//天添利 购买页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");    
    var footer = require('jxm/tpl/footer.tpl');
    var tool = require('jxm/utils/Tool');
    var common = require("jxm/common/common");
    var recharge = require('jxm/tpl/recharge.tpl');
    var fuyouToCharge = new Model.fuyouToCharge();  // 获取页面初始数据
    var fuyouSignForCharge = new Model.fuyouSignForCharge();  // 充值签名
    var handle = new tool();
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #recharge_btn':'goToRecharge'
        },        
        onShow: function() {
            self = this.initialize();
            self.message = '网络错误，请稍后重试';           
            self.pageData= {};   
            // 定义初始化方法 
            self.setHeader();            
            self.getInitTemData();   
        }, 
        initTemple: function(){
            //添加内容        
            self.$el.html(_.template(recharge)(self.pageData));
        },       
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '充值',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        window.history.back();
                    }
                },
                right: null
            });
            App.hideLoading();
        },
        getInitTemData: function(){ // 获取可用余额
            fuyouToCharge.exec({
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
        goToRecharge: function(){
            var rechargeData={
                'amount':$("#recharge_money").val()
            }
            // 充值金额校验
            function checkAmount(){
                 if(rechargeData.amount==''){ // 空验证
                    App.showToast('充值金额不能为空');
                    return;
                }
                if(parseInt(rechargeData.amount)<100){
                    App.showToast('充值金额不能小于100');
                    return;
                }
                if(parseInt(rechargeData.amount) > parseInt(self.pageData.chargeData.transactLimit)){
                    App.showToast('充值金额不能大于银行卡单笔限额');
                    return;
                }
                return true;
            }    

            if(checkAmount(rechargeData)){
                self.goSignForCharge(rechargeData);
            }
        }, 
        goSignForCharge: function(rechargeData){ // 充值签名
            fuyouSignForCharge.set({
                'amount': rechargeData.amount
            });
            fuyouSignForCharge.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){  
                        creatForm(data.data);
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
                var tem='<form method="post" id="recharge_form" accept-charset="utf-8">\
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
                $("#recharge_form").attr('action',postData.chargeUrl);
                // 提交
                $("#recharge_form").submit();
            }
        }
    });

})  