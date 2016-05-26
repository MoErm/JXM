define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/invest_confirm.tpl");
    var tool = require("jxm/utils/Tool")
    var common = require("jxm/common/common")
    var toInvestConfirmMode = new Model.fuyouToInvestConfirm();
    var createOrderMode = new Model.fuyouCreateOrder();

    var abortChange = new Model.abortChange();
    var getRollingNotice = new Model.getRollingNotice();
    
    var handle = new tool();
    var self;
    module.exports = App.Page.extend({
        events: {
            'click .js_agree': 'changeAgree',
            //'click .entrust_agreement':'changeAgree',
            'click .js_regular_pop': 'popRegular',
            'click .js_float_pop': 'popFloat',
            'click .js_invest': 'createOrder', // 立即投资
            'click .js_notice': 'notice',
            'input .js_amount': 'changeAmount',
            'click .js_contract': 'goContractPage',
            'click #cash_addbtn': 'goRechargePage' // 去充值页面
        },
        initialize: function() {
            self = this;
        },
        notice: function() {
            var urlhref = "http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400082926&idx=1&sn=f3c1486ae959330abe726931bd6a0c9d#rd"
            if (window.WebViewJavascriptBridge) {

                window.WebViewJavascriptBridge.callHandler('openUrl', {
                    "url": urlhref
                }, function(response) {})

            } else {
                window.location.href = urlhref;
            }
        },
        initNotice: function() {
            getRollingNotice.exec({
                type: 'get',
                data: {
                    index: '04'
                },
                success: function(data) {
                    if (data.ret == 0) {
                        if (data.data.isShow == 1) {
                            $(".notice").css("display", "block")
                            $(".notice_text").html(data.data.content)
                            self.time = data.data.duration
                            self.noticeAni()
                        }
                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || self.message);
                    }
                },
                error: function() {
                    App.hideLoading();
                    App.showToast(self.message);
                }
            });
        },
        noticeAni: function() {
            $(".notice_text").css("marginLeft", document.body.clientWidth)
            require(["jquery"], function($) {
                $(".notice_text").animate({
                    marginLeft: -($(".notice_text")[0].scrollWidth + document.body.clientWidth)
                }, self.time, "linear", self.noticeAni);
            });
        },
        onShow: function() {
            this.setHeader();
            /* this.active();*/
            if (self.prevPage == 'get_contract') {
                return;
            }
            return this.renderProduct()
        },
        changeAgree: function() {

            self.$('.entrust_agreement').toggleClass('checked')
        },
        showNum: function(num1, num2) {

            return Number(num1) + Number(num2);
        },
        renderProduct: function() { // 初始化产品
            App.showLoading();
            this.$el.html('');
            var query = this.request.query;
            if (_.isUndefined(query) || _.isUndefined(query.pid)) {
                App.goTo('list');
                return;
            }
            toInvestConfirmMode.set({
                'productNo': query.pid
            });
            return toInvestConfirmMode.exec({
                type: 'post',
                success: function(data) {
                    App.hideLoading();
                    if (data.ret == 0) {
                        // 初始化页面数据
                        self.initData = data.data;
                        self.initData.additionalAmount_show = handle.dealMoney(self.initData.additionalAmount);
                        self.initData.minInvestAmount_show = handle.dealMoney(self.initData.minInvestAmount);
                        self.initData.maxInvestAmount_show = handle.dealMoney(self.initData.maxInvestAmount);
                        self.initData.surplusAmount_show = handle.dealMoney(self.initData.surplusAmount);
                        self.initData.allAmount =(self.initData.balance);
                        self.initData.change = (self.initData.change);
                        self.initData.dealMoney3=handle.dealMoney3
                        if (self.initData.incomeType != "03") {
                            self.initData.incomeceiling = self.initData.incomeRateCeiling.split('%')[0]
                            self.initData.incomefloor = self.initData.incomeRateFloor.split('%')[0]
                            self.initData.activityrate = self.initData.activityIncomeRate.split('%')[0]
                        }

                        if (data.data.investFactorage == '--') {
                            self.initData.investfactorage = 0
                        } else {
                            self.initData.investfactorage = data.data.investFactorage
                        }
                        data.data.showNum = self.showNum
                        self.$el.html(_.template(Template)(data.data));
                        self.initNotice();                          

                    } else if (data.ret == 110001) { // 未完成实名绑卡

                        App.hideLoading();
                        self.promptAlert = handle.prompt('未完成实名绑卡,是否立即去绑卡？','放弃', '确定', function(){                          
                            App.goTo('list');
                        },function(){                          
                            App.goTo('bind_card_new');
                        });
                        self.promptAlert.show();
                    } else if (data.ret == 100031) { // 支付系统已升级，请重新验证银行卡

                        App.hideLoading();
                         self.promptAlert = handle.prompt('支付系统已升级，是否重新验证银行卡？','放弃', '确定', function(){                          
                            App.goTo('list');
                        },function(){                          
                            App.goTo('bind_card_new');
                        });                  
                        self.promptAlert.show();

                    } else if (data.ret == 110210) { // 当前银行卡未签约，请先签约

                        App.hideLoading();                       
                        self.promptAlert = handle.prompt('当前银行卡未签约，是否去签约？','放弃', '确定', function(){                          
                            App.goTo('list');
                        },function(){                          
                            App.goTo('fuyou_sign');
                        });                  
                        self.promptAlert.show();

                    } else if (data.ret == 100031) { // 余额查询失败，请稍后重试

                        App.hideLoading();
                        self.promptAlert = handle.alert('余额查询失败，请稍后重试',function(){
                           App.goBack();
                        });                  
                        self.promptAlert.show();

                    } else if (data.ret == 999001) {

                        App.goTo('login');
                    } else {

                        App.showToast(data.msg || '网络错误');
                    }

                },
                error: function() {
                    App.hideLoading();
                    App.showToast('网络错误');
                }
            })
        },       
        changeAmount: function() {
            if (self.initData.productType == '01') {
                if (_.isNull(self.initData.incomeType)) {
                    self.$('.js_profit').html('--')
                } else {
                    //计算预计到期收益

                    var amount = parseFloat(self.$('.js_amount').val()) || 0
                    //var re = /([0-9]+\.[0-9]{2})[0-9]*/;
                    //amount=amount.toString()
                    //amount = amount.replace(re,"$1");
                    ////amount=parseFloat(amount)
                    ////amount=amount.toFixed(2)
                    //self.$('.js_profit').html(amount)
                    //var amount = parseFloat(self.$('.js_amount').val()) || 0
                    //投资天数

                    var tempDate = new Date()
                    var year = tempDate.getFullYear()
                    var month = tempDate.getMonth()
                    var date = tempDate.getDate()
                    var today = new Date(year, month, date)

                    var expectDate = new Date(self.initData.expectExpiringDate)
                    var valueDate = new Date(self.initData.valueDate)

                    if (today >= valueDate) {
                        var day = (expectDate - today) / 1000 / 60 / 60 / 24
                    } else {
                        var day = (expectDate - valueDate) / 1000 / 60 / 60 / 24
                    }


                    //var day = parseInt(self.initData.investDeadline)
                    //预期年化收益率
                    if (self.initData.incomeType == "02") {
                        var activity = parseFloat(self.initData.activityIncomeRate.substring(0, self.initData.activityIncomeRate.length - 1))
                    } else if (self.initData.incomeType == "01" || self.initData.incomeType == "04") {
                        var activity = 0;
                    }
                    var income = parseFloat(self.initData.incomeRateCeiling.substring(0, self.initData.incomeRateCeiling.length - 1))
                    var rate = (income + activity) * 0.01

                    //预期收益
                    var profit = ((amount * rate * day) / 365)

                    self.$('.js_profit').html(Math.floor(profit * 100) / 100) //保留2位小数,不四舍五入

                    //最大金额
                    if (self.initData.maxInvestAmount >= 0 && amount > self.initData.maxInvestAmount) {
                        if (self.initData.surplusAmount > self.initData.maxInvestAmount) {
                            self.initData.realMaxInvestAmount = self.initData.maxInvestAmount;
                        } else {
                            self.initData.realMaxInvestAmount = self.initData.surplusAmount;
                        }
                        self.$('.js_amount').val(self.initData.realMaxInvestAmount)
                        var maxprofit = (self.initData.realMaxInvestAmount * rate * day) / 365
                        self.$('.js_profit').html(Math.floor(maxprofit * 100) / 100)
                        App.showToast('超过单笔订单金额' + self.initData.maxInvestAmount + '元上限')
                        return;
                    } else if (amount > self.initData.surplusAmount) {
                        self.$('.js_amount').val(self.initData.surplusAmount)
                        var maxprofit = (self.initData.surplusAmount * rate * day) / 365
                        self.$('.js_profit').html(Math.floor(maxprofit * 100) / 100)
                        App.showToast('超过剩余可投金额' + self.initData.surplusAmount + '元')
                        return;
                    }else if(amount >  self.initData.allAmount) {
                        var amountStr=amount.toString()
                        self.$('.js_amount').val(amountStr.substring(0, amountStr.length - 1))
                        //var maxprofit = ( self.initData.allAmount * rate * day) / 365
                        //self.$('.js_profit').html(handle.dealMoney3(Math.floor(maxprofit * 100) / 100))
                        //App.showToast('超过剩余可投金额' + self.initData.surplusAmount + '元')
                        $('.imoney_tip').show();
                        return;

                    }else{
                        $('.imoney_tip').hide();
                    }
                }
            } else if (self.initData.productType == '02') {
                var amount = parseFloat(self.$('.js_amount').val()) || 0


                var sales = parseFloat(self.initData.salesCharge.substring(0, self.initData.salesCharge.length - 1)) * 0.01;

                var service = parseFloat(self.initData.serviceCharge.substring(0, self.initData.serviceCharge.length - 1)) * 0.01;

                var cal_fee = amount - (Math.floor(amount / (1 + sales) * 100) / 100) + amount * service;

                //var rate = (sales + service) * 0.01

                //投资手续费
                var fee = Math.floor(cal_fee * 100) / 100;

                fee = fee.toFixed(2);

                if (self.initData.salesCharge != "0.0%" || self.initData.serviceCharge != "0.0%") {
                    self.$('.js_fee').html(fee)
                }


                //最大金额
                if (self.initData.maxInvestAmount >= 0 && amount > self.initData.maxInvestAmount) {
                    self.$('.js_amount').val(self.initData.maxInvestAmount)
                    var maxfee = self.initData.maxInvestAmount - (Math.floor(self.initData.maxInvestAmount / (1 + sales) * 100) / 100) + self.initData.maxInvestAmount * service;
                    maxfee = Math.floor(maxfee * 100) / 100;
                    maxfee = maxfee.toFixed(2);
                    if (self.initData.salesCharge != "0.0%" || self.initData.serviceCharge != "0.0%") {
                        self.$('.js_fee').html(maxfee)
                    }
                    App.showToast('超过单笔订单金额' + self.initData.maxInvestAmount + '元上限')
                    return;
                } else if (amount > self.initData.surplusAmount) {
                    self.$('.js_amount').val(self.initData.surplusAmount)
                    var maxfee = self.initData.surplusAmount - (Math.floor(self.initData.surplusAmount / (1 + sales) * 100) / 100) + self.initData.surplusAmount * service;
                    maxfee = Math.floor(maxfee * 100) / 100;
                    maxfee = maxfee.toFixed(2);
                    if (self.initData.salesCharge != "0.0%" || self.initData.serviceCharge != "0.0%") {
                        self.$('.js_fee').html(maxfee)
                    }
                    App.showToast('超过剩余可投金额' + self.initData.surplusAmount + '元')
                    return;
                }else if(amount >  self.initData.allAmount) {
                    var amountStr=amount.toString()
                    self.$('.js_amount').val(amountStr.substring(0, amountStr.length - 1))
                    //self.$('.js_amount').val( self.initData.allAmount)
                    //var maxprofit = ( self.initData.allAmount * rate * day) / 365
                    //self.$('.js_profit').html(Math.floor(maxprofit * 100) / 100)
                    //App.showToast('超过剩余可投金额' + self.initData.surplusAmount + '元')
                    $('.imoney_tip').show();
                    return;

                }else{
                    $('.imoney_tip').hide();
                }
            }

            //checkTip();
            //// 检查提示
            //function checkTip(){
            //    var amtNum = parseFloat(self.$('.js_amount').val()) || 0;
            //    var balNum= parseFloat(self.initData.balance);
            //    var chaNum= parseFloat(self.initData.change);
            //    if(amount > (balNum+chaNum)){
            //        $('.imoney_tip').show();
            //    }
            //    else{
            //        $('.imoney_tip').hide();
            //    }
            //}
            
        },
        createOrder: function() { //立即投资
            // if (self.initData.productType == "01") { //固定产品

            //     var investAmount = amount + parseFloat(self.$('.js_invest').attr('id'))
            // } else if (self.initData.productType == "02") { //浮动产品
            //     var serviceFee = Math.floor(self.initData.serviceCharge.split("%")[0] * amount) / 100;
            //     var temp = serviceFee; //价内,支付金额=投资金额+服务费
            //     var investAmount = amount + (_.isNaN(temp) ? 0 : temp)
            // }
            var self = this
            App.showLoading(); 
            function createOrderCheck(){
                var start = self.initData.minInvestAmount;
                var addition = self.initData.additionalAmount;
                var amount = parseFloat(self.$('.js_amount').val());
                var surplus = self.initData.surplusAmount;
                var allAmount=self.initData.allAmount
                //是否有可投资金额
                if (surplus <= 0) {
                    App.hideLoading();
                    self.hasNoSurplusAlert = handle.alert('请等待').show();
                    App.goTo('list');
                }
                //是否是数字
                if (!/^[0-9]*$/.test(self.$('.js_amount').val())) {
                    App.hideLoading();
                    self.hasNumAlert = handle.alert('请输入数字').show()
                    return false;
                }
                //是否输入投资金额
                if (isNaN(amount)) {
                    App.hideLoading();
                    self.hasNoAmountAlert = handle.alert('请填写投资金额').show()
                    return false;
                }
                //投资金额大于0
                if (amount < 0) {
                    App.hideLoading();
                    self.hasMinusAmountAlert = handle.alert('投资金额需大于0').show()
                    return false;
                }
                //投资金额大于起投金额
                if (amount < start) {
                    App.hideLoading();
                    self.hasFewAmountAlert = handle.alert('投资金额需大于' + start + '元').show()
                    return false;
                }
                //投资金额符合递增规律
                if ((amount - start) % addition != 0) {
                    App.hideLoading();
                    self.hasWrongIncrementAlert = handle.alert('投资金额需是' + handle.dealMoney(addition) + '的整数倍').show()
                    return false;
                }
                //是否超过剩余可投金额
                if (amount > surplus) {
                    App.hideLoading();
                    self.hasLotAmountAlert = handle.alert('超过剩余可投金额').show()
                    return false;
                }
                // 现金是否够用
                if(amount>allAmount){
                    App.hideLoading();
                    self.hasLotAmountAlert = handle.alert('您的余额不足,请先充值').show()
                    return false;
                }
                return true;
            } 
            //创建订单
            function createOrderFn(){
                var query = self.request.query;
                var change = self.$('.js_amount').html();
                var investAmountNum = self.$('.js_amount').val();
            
                createOrderMode.set({
                    'productNo': query.pid,
                    'investAmount': investAmountNum,
                    'token': self.initData.token
                });
                createOrderMode.exec({
                    type: 'post'
                }).then(function(data) {
                    App.hideLoading();
                    if (data && data.ret == 0) {
                        var creatData=data.data;
                        // 添加产品名字
                        creatData.productName= self.initData.productName;
                        common.showPayWin(creatData);

                    } else if (data.ret == 999901 || data.ret == 300007) {
                        self.promptAlert = handle.alert(data.msg);
                        self.promptAlert.show();
                    } else if (data.ret == 110115) {
                        App.hideLoading();

                        self.promptAlert = handle.alert("银行卡数据异常，请联系客服", function() {});
                        self.promptAlert.show();
                    } else {
                        App.hideLoading();
                        App.showToast(data.msg || '网络错误')
                    }
                }).catch(function(error) {
                    App.hideLoading();
                    App.showToast(error.msg || '网络错误')
                })
            }        
            // 执行订单创建
            if(createOrderCheck()){                
                createOrderFn(); 
            }                     
        },
        onHide: function() {
            var self = this
                //alert隐藏
            self.hasNoSurplusAlert && self.hasNoSurplusAlert.hide()
            self.hasNumAlert && self.hasNumAlert.hide()
            self.hasNoContractAlert && self.hasNoContractAlert.hide()
            self.hasNoAmountAlert && self.hasNoAmountAlert.hide()
            self.hasMinusAmountAlert && self.hasMinusAmountAlert.hide()
            self.hasFewAmountAlert && self.hasFewAmountAlert.hide()
            self.hasWrongIncrementAlert && self.hasWrongIncrementAlert.hide()
            self.hasLotAmountAlert && self.hasLotAmountAlert.hide()
                //说明关闭
            self.popwinRegular && self.popwinRegular.toggleHidden()
            self.popwinFloat && self.popwinFloat.toggleHidden()
        },
        popRegular: function() { // 固定产品收益计算框
            var self = this
            var amount = parseFloat(self.$('.js_amount').val()) || 0

            //投资天数
            var tempDate = new Date()
            var year = tempDate.getFullYear()
            var month = tempDate.getMonth()
            var date = tempDate.getDate()
            var today = new Date(year, month, date)

            var expectDate = new Date(self.initData.expectExpiringDate)
            var valueDate = new Date(self.initData.valueDate)

            if (today >= valueDate) {
                var day = (expectDate - today) / 1000 / 60 / 60 / 24
            } else {
                var day = (expectDate - valueDate) / 1000 / 60 / 60 / 24
            }


            //预期年化收益率
            if (self.initData.incomeType == "02") {
                var activity = parseFloat(self.initData.activityIncomeRate.substring(0, self.initData.activityIncomeRate.length - 1))
            } else if (self.initData.incomeType == "01" || self.initData.incomeType == "04") {
                var activity = 0;
            }
            var income = parseFloat(self.initData.incomeRateCeiling.substring(0, self.initData.incomeRateCeiling.length - 1))
            var rate = (income + activity) * 0.01

            //预期收益
            var profit = ((amount * rate * day) / 365)
            var Common = {
                showPayWin: function() {
                    self.popwinRegular = new App.UI.UIPopWin({
                        template: '<div class="mod_popup" style="width:300px">\
								  <div class="pop_cont">\
								    <div class="pop_hd">\
								      <h2>收益说明</h2>\
								      <a href="javascript:void(0)" class="btn_close"></a></div>\
								    <div class="pop_bd">\
								      <div class="income_info">\
								        <div class="v_item">\
								          <div class="v_item_hd">预计到期收益</div>\
								          <div class="v_item_bd"><span class="webtxt" style="display:block">' + Math.floor(profit * 100) / 100 + '元</span><span class="tips">(以实际到账为准)</span></div>\
								        </div>\
								      </div>\
								      <div class="income_details">\
								        <div class="v_item">\
								          <div class="v_item_bd"><span class="v_item_title"><i class="sign">=</i><i class="numb">' + amount + '</i></span> <span class="v_item_cont">投资金额</span> </div>\
								          <div class="v_item_bd" ><span class="v_item_title"><i class="sign"  style="text-align:center">X</i><i class="numb">' + parseFloat(income + activity) + '%</i></span> <span class="v_item_cont">预期年化收益率</span> </div>\
								          <div class="v_item_bd"><span class="v_item_title"><i class="sign" style="text-align:center">X</i><i class="numb">' + day + '/365</i></span> <span class="v_item_cont">计息天数</span> </div>\
								        </div>\
								      </div>\
								      <p class="tips">* 计息天数=到期日(' + self.initData.expectExpiringDate + ')-起息日</p>\
								    </div>\
								  </div>\
								</div>',
                        events: {
                            'click .btn_close': 'toggleHidden'
                        },
                        toggleHidden: function(e) {
                            this.hide();
                        }

                    })
                    self.popwinRegular.show();
                    self.popwinRegular.reposition()
                }
            };
            Common.showPayWin();
        },
        popFloat: function() { // 浮动产品收益计算框
            var amount = parseFloat(self.$('.js_amount').val()) || 0
            var sales = parseFloat(self.initData.salesCharge.substring(0, self.initData.salesCharge.length - 1)) * 0.01

            var service = parseFloat(self.initData.serviceCharge.substring(0, self.initData.serviceCharge.length - 1)) * 0.01

            var cal_fee = amount - (Math.floor(amount / (1 + sales) * 100) / 100) + amount * service;

            //var rate = (sales + service) * 0.01

            //投资手续费
            var fee = Math.floor(cal_fee * 100) / 100;
            fee = fee.toFixed(2);

            var Common = {
                showPayWin: function() {
                    var tips_word = '<p class="tips">本产品实行价内/价外收费，除认购金额外将另收取<span class="webtxt">' + self.initData.salesCharge + '</span>认购费和<span class="webtxt">' + self.initData.serviceCharge + '</span>平台服务费，共计<span class="webtxt">' + fee + '</span>元。</p>'
                    if (sales == 0 && service == 0) {
                        tips_word = '<p class="tips">平台推广期间，免认购手续费</p>';
                    }
                    self.popwinFloat = new App.UI.UIPopWin({
                        template: '<div class="mod_popup" style="width:300px"">\
						  <div class="pop_cont">\
						    <div class="pop_hd">\
						      <h2>手续费说明</h2>\
						      <a href="javascript:void(0)" class="btn_close"></a></div>\
						    <div class="pop_bd">\
						      <div class="tips_txt">' + tips_word + '</div>\
						    </div>\
						  </div>\
						</div>',
                        events: {
                            'click .btn_close': 'toggleHidden'
                        },
                        toggleHidden: function(e) {
                            this.hide();
                        }

                    })
                    self.popwinFloat.show();
                }
            };
            Common.showPayWin();
        },
        setHeader: function() {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '确认投资',
                back: {
                    'tagname': 'back',
                    callback: function() {
                        App.goBack()
                    }
                },
                right: [{
                    'tagname': 'custom',
                    'value': '',
                    callback: function() {
                        console.log('邀请好友');
                    }
                }]
            });
        },
        goContractPage: function(e) {// 去债权转让服务协议页面

            App.goTo('get_contract?cid=' + $(e.currentTarget).data('contractno') + '&pid=' + $(e.currentTarget).data('productno'))
        },
        goRechargePage: function(){ //去充值页面

            App.goTo('recharge');
        }   

    })
})