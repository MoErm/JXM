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
            'click #get_allmoney ':'getAllmoneyFn'
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
            console.log(self.pageData)           
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
            $("#recharge_out_money").val('88')
        }, 
        getInitTemData: function(){
            fuyouToWithdraw.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){     
                        self.pageData.chargeData= data.data;
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
        getSignForChargeOut: function(){ // 充值签名
            fuyouSignForWithdraw.set({
                'amount': 0
            });
            fuyouSignForWithdraw.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){     
                        console.log('提现成功')
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
        }
    });

})  