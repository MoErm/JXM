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
            'click #get_allmoney ':'getAllmoneyFn', // 全额提现
            'click #recharge_btn':'goToRechargeOut',
            'input #recharge_out_money': 'checkChangeAmount' // 修改提现参数
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
        getAllmoneyFn: function(){ //全额提现

            $("#recharge_out_money").val(self.pageData.chargeData.amount)
        }, 
        checkChangeAmount: function(){
            checkTip();
            // 检查提示
            function checkTip(){
                var amtNum = self.$('#recharge_out_money').val();
                var allAmountNum= Number(self.pageData.chargeData.amount);
                
                if(isNaN(amtNum)){
                    App.showToast("请输入合法数字金额");
                    $("#recharge_out_money").val("");
                } 
                // 精确小数点后两位
                var indexPoint= amtNum.indexOf('.');
                if(indexPoint!=-1 ){
                   if(amtNum.slice(indexPoint).length>=3){
                        App.showToast("充值金额最小单位为分");
                        $("#recharge_out_money").val(amtNum.slice(0,indexPoint+3) );
                   }
                }               
                if(amtNum > allAmountNum){
                    App.showToast("提现金额不能大于现金余额");
                    $("#recharge_out_money").val(allAmountNum);                  
                }             
            }
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
                        self.pageData.chargeData.allAmount= handle.dealMoney3(self.pageData.chargeData.amount);

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
                     $("#recharge_out_money").val(self.pageData.chargeData.transactLimit); 
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
                $("#recharge_out_form").attr('action',postData.withdrawUrl); // 提现地址
                // 提交
                $("#recharge_out_form").submit();
            } 
        }
    });

})  