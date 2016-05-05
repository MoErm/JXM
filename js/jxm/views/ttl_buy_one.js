//天添利 购买页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");    
    var buyStepOne = require('jxm/tpl/ttl_buy_one.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var payTest = require('jxm/tpl/ttl_pay_test.tpl');
    var tool = require('jxm/utils/Tool');
    var common = require("jxm/common/common");
    var abortChange = new Model.abortChange();
    // var initTtlBuyPage = new Model.fuyouInitTtlBuyPage();  //初始化购买页面
    var initTtlBuyPage = new Model.initTtlBuyPage();  //初始化购买页面
    var goTtlBuyPageCheck = new Model.fuyouTtlBuyPageCheck();  //购买页面跳转

    var handle = new tool();
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        events: {
            'click #action_buy': 'goBuyCheckTip',
            'click .js_tips': 'goContractTip',//《风险提示书》
            'click .js_transfer': 'goContractTransfer', //《产品收益权转让及服务协议》
            'click #cash_addbtn': 'goRechargePage'// 去充值页面
        },
        onShow: function() {
            self = this.initialize();
            self.message = '网络错误，请稍后重试';
            handle.share();
            self.pageData= {};
            self.isAgreeAction= sessionStorage.getItem("isagreedAction");
            self.isagreedData= JSON.parse(sessionStorage.getItem("isagreedData"));
            self.setHeader();
            self.initBuyPage();

            if(self.isAgreeAction==1 && self.isagreedData!=null){
                //进行数据传递
                self.goBuyPagePost(self.isagreedData);
                sessionStorage.removeItem('isagreedAction');
                sessionStorage.removeItem("isagreedData");
            }
        },        
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '天添利',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo('ttl_introduce');
                    }
                },
                right: null
            });
        },
        initBuyPage: function(){
            // 初始化购买页面
            App.showLoading();
            initTtlBuyPage.exec({
                type: 'get',
                success: function(data){
                    self.pageData.cardData= data.data;
                    if(data.ret == 0){     
                        self.initTemple();
                    }else if(data.ret == 999001){
                        //未登录
                        handle.goLogin();
                    }else if(data.ret == 110001){
                        //未绑定银行卡                        
                        self.promptAlert = handle.prompt('未绑定银行卡，是否现在去设置','放弃', '去设置', function(){
                            self.goIntroducePage();
                        }, function(){
                            App.goTo('bind_card_new');
                        });                    
                        self.promptAlert.show();
                    }else if(data.ret == 110009){
                        //未设置交易密码                        
                        self.passAlert = handle.prompt('未设置交易密码，是否现在去设置','放弃', '去设置', null, function(){
                            App.goTo('reset_password?soure=0');
                        });                        
                        self.passAlert.show();
                    }else if(data.ret == 110203){
                        self.promptAlert = handle.prompt('您的银行卡处于换卡中，无法进行投资，请继续完成换成或终止换卡','放弃', '去更换',function(){
                            //解除锁定
                            self.giveUp()
                        }, function(){
                            //继续更换
                            App.goTo("rebind_card")
                        });
                        self.promptAlert.show();
                    }else{
                        App.showToast(data.msg  || self.message);
                    }
                    App.hideLoading();
                },
                error: function(){
                    App.hideLoading();
                }
            });
        },
        initTemple: function(){
            self.pageData.cardData.maxInvestAmount= handle.dealMoney1(self.pageData.cardData.surplusAmount,2);
            self.pageData.cardData.miNRate= self.pageData.cardData.initialRate*100;
            self.pageData.cardData.maXRate= self.pageData.cardData.maxRate*10000/100;
            //添加内容
            self.$el.html(_.template(buyStepOne)(self.pageData));
            self.initSession();
        },
        initSession: function(){
            var queryData = self.pageData.cardData;
            var isagreed= queryData.isContractAgreed||"";

            if(isagreed!=""){
                sessionStorage.setItem("isagreed",isagreed);
            }
        },
        goIntroducePage: function(){

            App.goTo('ttl_introduce');
        },
        goBuyPagePost: function(goBuyData){            
            // 支付信息：金额，红包，时间
            // var initData= {
            //     'amountVal': '30000',
            //     'crAmount': '50',
            //     'surplusPayTime':300
            // }
            //  common.ttlPayWin(initData);
            //购买post数据并检测银行卡，交易密码
            App.showLoading();            
            goTtlBuyPageCheck.set({
                "amount": goBuyData.amountVal
            });
            goTtlBuyPageCheck.exec({
                type: 'post'
            }).then(function (data) {
                self.pageData.postData= data.data;
                if(data.ret == 0){
                    //渲染投资金额
                    $("#imoney_num").val(goBuyData.amountVal);
                    self.pageData.amountVal= goBuyData.amountVal;
                    common.ttlPayWin(self.pageData);
                }else if(data.ret == 999001){
                    //未登录
                    handle.goLogin();
                }else if(data.ret == 110001){
                    //未绑定银行卡                        
                    self.promptAlert = handle.prompt('未绑定银行卡，是否现在去设置','放弃', '去设置', function(){
                        self.goIntroducePage();
                    }, function(){
                        App.goTo('bind_card_new');
                    });                    
                    self.promptAlert.show();
                }else if(data.ret == 110009){
                    //未设置交易密码                        
                    self.passAlert = handle.prompt('未设置交易密码，是否现在去设置','放弃', '去设置', null, function(){
                        App.goTo('ttl_buy_one');
                    });                        
                    self.passAlert.show();
                }else if(data.ret == 110203){
                    self.promptAlert = handle.prompt('您的银行卡处于换卡中，无法进行投资，请继续完成换成或终止换卡','放弃', '去更换',function(){
                        //解除锁定
                        self.giveUp()
                    }, function(){
                        //继续更换
                        App.goTo("rebind_card")
                    });
                    self.promptAlert.show();
                }else if(data.ret == 999901){
                    //由于银行服务器客户信息更新
                    self.passAlert = handle.alert("由于银行服务器客户信息更新，为了维护您的权益，请您在继续投资前先和加薪猫客服取得联系，客服电话：4008-339-869");
                    self.passAlert.show();                        
                }else if(data.ret == 110109){
                    //此卡已锁定，无法支付
                    self.passAlert = handle.alert("此卡已锁定，无法支付");
                    self.passAlert.show();                        
                }else if(data.ret == 110112){
                    //由于您未满18周岁，无法在加薪猫平台进行投资，如有疑问请联系客服
                    self.passAlert = handle.alert("由于您未满18周岁，无法在加薪猫平台进行投资，如有疑问请联系客服");
                    self.passAlert.show();                        
                }else if(data.ret == 300008){
                    //由于支付渠道调整，暂不支持该银行支付，如有疑问请联系客服
                    self.passAlert = handle.alert("由于支付渠道调整，暂不支持该银行支付，如有疑问请联系客服");
                    self.passAlert.show(); 
                }else{

                    self.passAlert = handle.alert(data.msg  || self.message);
                    self.passAlert.show();
                }
                App.hideLoading();
            });
            return this;
        },
        goBuyCheckTip: function(e){
            e.preventDefault(e);
            self.amountVal= Number($("#imoney_num").val());
            self.goBuyData= {"amountVal":self.amountVal};

            if(self.amountVal== ""){
                App.showToast("请输入投资金额");
                $("#imoney_num").val("");
                return;
            }else{                
                if(isNaN(self.amountVal)){
                    App.showToast("请输入合法数字金额");
                    $("#imoney_num").val("");
                }
                else if(self.amountVal%100!=0){
                    self.passAlert = handle.alert("投资金额需是100元的整数倍");
                    self.passAlert.show();
                    return;
                }
                if(self.amountVal> parseInt(self.pageData.cardData.surplusAmount)){
                    self.passAlert = handle.alert("超过剩余可投金额");
                    self.passAlert.show();
                    $("#imoney_num").val(self.pageData.cardData.surplusAmount)
                    return;
                }
            } 

            if(self.pageData.cardData.isContractAgreed==0){
                sessionStorage.setItem("isagreedData",JSON.stringify(self.goBuyData));
                App.goTo("ttl_buy_two");
            }
            else{
                //进行数据传递
                self.goBuyPagePost(self.goBuyData);
            }
        },
        goContractTip: function (e) {
            
            App.goTo('ttl_invest_tip');
        },
        goContractTransfer: function (e) {
            
            App.goTo('ttl_service_tip');
        },
        giveUp: function() {
            abortChange.exec({
                type: "post",
                success: function(data) {
                    if (data.ret == 0) {
                        //解锁成功
                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg);
                    }
                },
                error: function() {
                    App.hideLoading();
                    App.showToast(self.message);
                }
            })
        },
        goRechargePage: function(){

            App.goTo('recharge');
        }        
    });

})  