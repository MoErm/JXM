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
            'click #recharge_btn':'goToRecharge',
             'input #recharge_money': 'checkChangeAmount' // 修改充值参数
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
                        if(handle.mobileType()=="android"){
                            window.app.goBack()
                        }else{
                            window.history.back();
                        }                         
                    }
                },
                right: null
            });
            App.hideLoading();
        },
        checkChangeAmount: function(){
            checkTip();
            // 检查提示
            function checkTip(){
                var amtNum = $('#recharge_money').val();
                var transactLimitNum= Number(self.pageData.chargeData.transactLimit);
                if(isNaN(amtNum)){
                    App.showToast("请输入合法数字金额");
                    $("#recharge_money").val("");
                }                    
                if(amtNum > transactLimitNum){
                    App.showToast("充值金额不能大于银行卡单笔限额");
                    $("#recharge_money").val(transactLimitNum);
                    return;            
                }             
            }
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
                        if(handle.mobileType()=="android"){
                            window.app.outTime()
                        }else  if(handle.mobileType()!="html") {
                            handle.setupWebViewJavascriptBridge(function(bridge) {
                                bridge.callHandler('timeout', null, function(response) {
                                })
                            })
                        }else{
                            handle.goLogin();
                        }

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
                        <input type="hidden" id="amt" name="amt" />\
                        <input type="hidden" id="back_notify_url"  name="back_notify_url" />\
                        <input type="hidden" id="login_id"  name="login_id" />\
                        <input type="hidden" id="mchnt_cd"  name="mchnt_cd" />\
                        <input type="hidden" id="page_notify_url"  name="page_notify_url" />\
                        <input type="hidden" id="mchnt_txn_ssn"  name="mchnt_txn_ssn" />\
                        <input type="hidden" id="signature"  name="signature" />\
                    </form>';                    
                $('body').append(tem);
                // 赋值
                $("#amt").val(postData.amount); // 充值金额（以分为单位）
                $("#back_notify_url").val(postData.bgCallback); // 后台回调地址
                $("#login_id").val(postData.loginId); // 个人用户登录名
                $("#mchnt_cd").val(postData.merCode); // 商户号
                $("#page_notify_url").val(postData.pgCallback); // 前台回调地址
                $("#mchnt_txn_ssn").val(postData.serialNo); // 流水号码
                $("#signature").val(postData.signature); // 签名值
                $("#recharge_form").attr('action',postData.chargeUrl); // 充值地址
                // 提交
                $("#recharge_form").submit();
            }
        }
    });

})  