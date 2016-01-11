define(function (require, exports, module) {
    var Model = require("jxm/model/model");
    var Store = require("jxm/model/store");
    var Template = require("jxm/tpl/invest_confirm.tpl");
    var tool = require("jxm/utils/Tool")
    var payLayer = require("jxm/common/common")
    var toInvestConfirmMode = new Model.toInvestConfirm();
    var createOrderMode = new Model.createOrder();
    var abortChange= new Model.abortChange();
    var handle = new tool();
    var self;
    module.exports = App.Page.extend({
        events: {
            'click .js_agree': 'changeAgree',
            //'click .entrust_agreement':'changeAgree',
            'click .js_regular_pop': 'popRegular',
            'click .js_float_pop': 'popFloat',
            'click .js_invest': 'createOrder',
            'click .js_notice': 'notice',
            'input .js_amount': 'changeAmount',
            'click .js_contract': 'goContract',
            'click #cardSelectSecond' :"goCardSelectWin"
        },
        initialize: function () {
            self = this;
        },
        notice:function(){
            var urlhref="http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400082926&idx=1&sn=f3c1486ae959330abe726931bd6a0c9d#rd"
            if(window.WebViewJavascriptBridge){

                    window.WebViewJavascriptBridge.callHandler('openUrl',{"url": urlhref},function(response) {})

            }else{
                window.location.href=urlhref;
            }
        },
      /* active:function(){
            if(parseInt(self.$el.find('.js_par').val())>10000){
                self.$el.find('.new_active').show();
            }else{
                self.$el.find('.new_active').hide();
            }
        },*/
        onShow: function () {
            this.setHeader();
           /* this.active();*/
            if (self.prevPage == 'get_contract') {
                return;
            }
            return this.render()
        },
        changeAgree: function () {
            self.$('.entrust_agreement').toggleClass('checked')
        },
        showNum:function(num1,num2){
            return Number(num1)+Number(num2);
        },
        render: function () {

            App.showLoading();
            this.$el.html('');
            var query = this.request.query;
            if (_.isUndefined(query) || _.isUndefined(query.pid)) {
                App.goTo('list');
                return;
            }
            toInvestConfirmMode.set({'productNo': query.pid});
            return toInvestConfirmMode.exec({
                type: 'post',
                success: function (data) {
                    App.hideLoading();
                    if (data.ret == 0) {

                        self.data = data.data;
                        self.data.additionalAmount_show = handle.dealMoney(self.data.additionalAmount);
                        self.data.minInvestAmount_show = handle.dealMoney(self.data.minInvestAmount);
                        self.data.maxInvestAmount_show = handle.dealMoney(self.data.maxInvestAmount);
                        self.data.surplusAmount_show = handle.dealMoney(self.data.surplusAmount);
                        //默认银行卡信息
                        self.data.bankLogo = self.data.defaultCard.bankLogo;
                        self.data.bankName = self.data.defaultCard.bankName;
                        self.data.cardInfoId = self.data.defaultCard.cardInfoId;
                        self.data.cardNoTail = self.data.defaultCard.cardNoTail.slice(-4);
                        self.data.dailyLimit = self.data.defaultCard.dailyLimit;

                        if (self.data.incomeType != "03") {
                            self.data.incomeceiling = self.data.incomeRateCeiling.split('%')[0]
                            self.data.incomefloor = self.data.incomeRateFloor.split('%')[0]
                            self.data.activityrate = self.data.activityIncomeRate.split('%')[0]
                        }


                        if (data.data.investFactorage == '--') {
                            self.data.investfactorage = 0
                        } else {
                            self.data.investfactorage = data.data.investFactorage
                        }
                        data.data.showNum=self.showNum
                        self.$el.html(_.template(Template)(data.data));
                        //协议返回金额保存
                        /*var amount = localStorage.getItem('amount')
                         if(!_.isUndefined(amount)){
                         self.$('.js_amount').val(amount)
                         localStorage.removeItem('amount')
                         }
                         */

                    }else if(data.ret == 110115){
                        App.hideLoading();

                        self.promptAlert = handle.alert("银行卡数据异常，请联系客服",function(){
                        });
                        self.promptAlert.show();
                    } else if (data.ret == 999001) {
                        App.goTo('login');
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }

                },
                error: function () {
                    App.hideLoading();
                    App.showToast('网络错误');
                }
            })

        },
        goContract: function (e) {
            
            App.goTo('get_contract?cid='+$(e.currentTarget).data('contractno')+'&pid='+$(e.currentTarget).data('productno'))
        },

        changeAmount: function () {

            if (self.data.productType == '01') {
                if (_.isNull(self.data.incomeType)) {
                    self.$('.js_profit').html('--')
                } else {
                    //计算预计到期收益

                    var amount = parseFloat(self.$('.js_amount').val()) || 0

                    //投资天数
                    
                    var tempDate = new Date()
                    var year = tempDate.getFullYear()
                    var month = tempDate.getMonth()
                    var date = tempDate.getDate()
                    var today = new Date(year,month,date)

                    var expectDate = new Date(self.data.expectExpiringDate)
                    var valueDate = new Date(self.data.valueDate)

                     if(today >= valueDate){
                         var day =(expectDate - today) / 1000 / 60 / 60 /24 
                     }else {
                        var day = (expectDate - valueDate)/ 1000 / 60 / 60 /24 
                     }
                    

                    //var day = parseInt(self.data.investDeadline)
                    //预期年化收益率
                    if (self.data.incomeType == "02") {
                        var activity = parseFloat(self.data.activityIncomeRate.substring(0, self.data.activityIncomeRate.length - 1))
                    } else if (self.data.incomeType == "01" || self.data.incomeType == "04") {
                        var activity = 0;
                    }
                    var income = parseFloat(self.data.incomeRateCeiling.substring(0, self.data.incomeRateCeiling.length - 1))
                    var rate = (income + activity) * 0.01

                    //预期收益
                    var profit = ((amount * rate * day) / 365)

                    self.$('.js_profit').html(Math.floor(profit*100)/100) //保留2位小数,不四舍五入

                    //最大金额
                    if (self.data.maxInvestAmount >= 0 && amount > self.data.maxInvestAmount) {
                        if(self.data.surplusAmount>self.data.maxInvestAmount){
                            self.data.realMaxInvestAmount=self.data.maxInvestAmount;
                        }else{
                            self.data.realMaxInvestAmount=self.data.surplusAmount;
                        }
                        self.$('.js_amount').val(self.data.realMaxInvestAmount)
                        var maxprofit = (self.data.realMaxInvestAmount * rate * day) / 365
                        self.$('.js_profit').html(Math.floor(maxprofit*100)/100)
                        App.showToast('超过单笔订单金额'+self.data.maxInvestAmount+'元上限')
                        return;
                    }else if(amount > self.data.surplusAmount){
                        self.$('.js_amount').val(self.data.surplusAmount)
                        var maxprofit = (self.data.surplusAmount * rate * day) / 365
                        self.$('.js_profit').html(Math.floor(maxprofit*100)/100)
                        App.showToast('超过剩余可投金额'+self.data.surplusAmount+'元')
                        return;
                    }

                }
            } else if (self.data.productType == '02') {
                var amount = parseFloat(self.$('.js_amount').val()) || 0


                var sales = parseFloat(self.data.salesCharge.substring(0, self.data.salesCharge.length - 1))*0.01;

                var service = parseFloat(self.data.serviceCharge.substring(0, self.data.serviceCharge.length - 1))*0.01;

                var cal_fee=amount-(Math.floor(amount/(1+sales) *100)/100)+amount*service;

                //var rate = (sales + service) * 0.01

                //投资手续费
                var fee = Math.floor(cal_fee *100)/100;

                fee=fee.toFixed(2);

                if (self.data.salesCharge != "0.0%" || self.data.serviceCharge != "0.0%") {
                    self.$('.js_fee').html(fee)
                }


                //最大金额
                if (self.data.maxInvestAmount >= 0 && amount > self.data.maxInvestAmount) {
                    self.$('.js_amount').val(self.data.maxInvestAmount)
                    var maxfee = self.data.maxInvestAmount-(Math.floor(self.data.maxInvestAmount/(1+sales) *100)/100)+self.data.maxInvestAmount*service;
                    maxfee= Math.floor(maxfee *100)/100;
                    maxfee=maxfee.toFixed(2);
                    if (self.data.salesCharge != "0.0%" || self.data.serviceCharge != "0.0%") {
                        self.$('.js_fee').html(maxfee)
                    }
                    App.showToast('超过单笔订单金额'+self.data.maxInvestAmount+'元上限')
                    return;
                }else if(amount > self.data.surplusAmount){
                    self.$('.js_amount').val(self.data.surplusAmount)
                    var maxfee = self.data.surplusAmount-(Math.floor(self.data.surplusAmount/(1+sales) *100)/100)+self.data.surplusAmount*service;
                    maxfee= Math.floor(maxfee *100)/100;
                    maxfee=maxfee.toFixed(2);
                    if (self.data.salesCharge != "0.0%" || self.data.serviceCharge != "0.0%") {
                        self.$('.js_fee').html(maxfee)
                    }
                    App.showToast('超过剩余可投金额'+self.data.surplusAmount+'元')
                    return;
                }
            }


        },
        createOrder: function () {
            var self = this
            App.showLoading();
            var start = self.data.minInvestAmount;
            var addition = self.data.additionalAmount;
            var amount = parseFloat(self.$('.js_amount').val());
            var surplus = self.data.surplusAmount;
            var selectCardId= $("#cardSelectSecond").find('div[data-cardid]').attr("data-cardid");
            if (self.data.productType == "01") {
                var investAmount = parseFloat(self.$('.js_amount').val()) + parseFloat(self.$('.js_invest').attr('id'))
            } else if (self.data.productType == "02") {
                //var temp = parseFloat(self.$('.js_fee').html())
                var serviceFee=Math.floor(self.data.serviceCharge.split("%")[0]*amount)/100;
                var temp=serviceFee;//价内,支付金额=投资金额+服务费
                var investAmount = parseFloat(self.$('.js_amount').val()) + (_.isNaN(temp) ? 0 : temp)
            }
            //是否有可投资金额
            if (surplus <= 0) {
                App.hideLoading();
                self.hasNoSurplusAlert = handle.alert('请等待').show()
                App.goTo('list')
            }
            //是否是数字
            if (!/^[0-9]*$/.test(self.$('.js_amount').val())) {
                App.hideLoading();
                self.hasNumAlert = handle.alert('请输入数字').show()
                return;
            }
//            //勾选协议
//            if (!(self.$('.js_agree').hasClass('checked'))) {
//                App.hideLoading();
//                self.hasNoContractAlert = handle.alert('请阅读并同意相关协议条款').show()
//                return;
//            }
            //是否输入投资金额
            if (isNaN(parseFloat(self.$('.js_amount').val()))) {
                App.hideLoading();
                self.hasNoAmountAlert = handle.alert('请填写投资金额').show()
                return;
            }
            //投资金额大于0
            if (amount < 0) {
                App.hideLoading();
                self.hasMinusAmountAlert=handle.alert('投资金额需大于0').show()
                return;
            }
            //投资金额大于起投金额
            if (amount < start) {
                App.hideLoading();
                self.hasFewAmountAlert=handle.alert('投资金额需大于' + start + '元').show()
                return;
            }
            //投资金额符合递增规律
            if ((amount - start) % addition != 0) {
                App.hideLoading();
                self.hasWrongIncrementAlert=handle.alert('投资金额需是'+handle.dealMoney(addition)+'的整数倍').show()
                return
            }
            //是否超过剩余可投金额
            if (parseFloat(self.$('.js_amount').val()) > surplus) {
                App.hideLoading();
                self.hasLotAmountAlert=handle.alert('超过剩余可投金额').show()
                return;
            }
            var query = this.request.query;
            var change=self.$('.js_amount').html();
                createOrderMode.set({
                    'productNo': query.pid,
                    'investAmount': self.$('.js_amount').val(),
                    'token': self.data.token,
                    'cardInfoId': selectCardId
                });
                createOrderMode.exec({
                    type: 'post'
                }).then(function (data) {
                    App.hideLoading();
                    if(data&&data.ret==0){
                        payLayer.showPayWin(self.data, data.data)
                    }else if(data.ret==999901||data.ret==300007){
                        self.promptAlert = handle.alert(data.msg);
                        self.promptAlert.show();
                    }else if(data.ret == 110115){
                        App.hideLoading();

                        self.promptAlert = handle.alert("银行卡数据异常，请联系客服",function(){
                        });
                        self.promptAlert.show();
                    }
                    else{
                        App.hideLoading();
                        App.showToast(data.msg || '网络错误')
                    }
                }).catch(function (error) {
                    App.hideLoading();
                    App.showToast(error.msg || '网络错误')
                })

        },

        onHide: function () {
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

        popRegular: function () {
            var self = this
            var amount = parseFloat(self.$('.js_amount').val()) || 0

            //投资天数
            var tempDate = new Date()
            var year = tempDate.getFullYear()
            var month = tempDate.getMonth()
            var date = tempDate.getDate()
            var today = new Date(year,month,date)

            var expectDate = new Date(self.data.expectExpiringDate)
            var valueDate = new Date(self.data.valueDate)

             if(today >= valueDate){
                 var day =(expectDate - today) / 1000 / 60 / 60 /24 
             }else {
                var day = (expectDate - valueDate)/ 1000 / 60 / 60 /24 
             }
                    

            //预期年化收益率
            if (self.data.incomeType == "02") {
                var activity = parseFloat(self.data.activityIncomeRate.substring(0, self.data.activityIncomeRate.length - 1))
            } else if (self.data.incomeType == "01" || self.data.incomeType == "04") {
                var activity = 0;
            }
            var income = parseFloat(self.data.incomeRateCeiling.substring(0, self.data.incomeRateCeiling.length - 1))
            var rate = (income + activity) * 0.01

            //预期收益
            var profit = ((amount * rate * day) / 365)
            var Common = {
                showPayWin: function () {
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
								          <div class="v_item_bd"><span class="webtxt" style="display:block">' + Math.floor(profit*100)/100 + '元</span><span class="tips">(以实际到账为准)</span></div>\
								        </div>\
								      </div>\
								      <div class="income_details">\
								        <div class="v_item">\
								          <div class="v_item_bd"><span class="v_item_title"><i class="sign">=</i><i class="numb">' + amount + '</i></span> <span class="v_item_cont">投资金额</span> </div>\
								          <div class="v_item_bd" ><span class="v_item_title"><i class="sign"  style="text-align:center">X</i><i class="numb">' + parseFloat(income + activity) + '%</i></span> <span class="v_item_cont">预期年化收益率</span> </div>\
								          <div class="v_item_bd"><span class="v_item_title"><i class="sign" style="text-align:center">X</i><i class="numb">' + day + '/365</i></span> <span class="v_item_cont">计息天数</span> </div>\
								        </div>\
								      </div>\
								      <p class="tips">* 计息天数=到期日(' + self.data.expectExpiringDate + ')-起息日</p>\
								    </div>\
								  </div>\
								</div>',
                        events: {
                            'click .btn_close': 'toggleHidden'
                        },
                        toggleHidden: function (e) {
                            this.hide();
                        }

                    })
                    self.popwinRegular.show();
                    self.popwinRegular.reposition()
                }
            };
            Common.showPayWin()

        },
        popFloat: function () {
            var amount = parseFloat(self.$('.js_amount').val()) || 0
            var sales = parseFloat(self.data.salesCharge.substring(0, self.data.salesCharge.length - 1))*0.01

            var service = parseFloat(self.data.serviceCharge.substring(0, self.data.serviceCharge.length - 1))*0.01

            var cal_fee=amount-(Math.floor(amount/(1+sales) *100)/100)+amount*service;

            //var rate = (sales + service) * 0.01

            //投资手续费
            var fee = Math.floor(cal_fee *100)/100;
            fee=fee.toFixed(2);

            var Common = {
                showPayWin: function () {
                    var tips_word='<p class="tips">本产品实行价内/价外收费，除认购金额外将另收取<span class="webtxt">' + self.data.salesCharge + '</span>认购费和<span class="webtxt">' + self.data.serviceCharge + '</span>平台服务费，共计<span class="webtxt">' + fee + '</span>元。</p>'
                    if(sales==0&&service==0){
                        tips_word='<p class="tips">平台推广期间，免认购手续费</p>';
                    }
                    self.popwinFloat = new App.UI.UIPopWin({
                        template: '<div class="mod_popup" style="width:300px"">\
						  <div class="pop_cont">\
						    <div class="pop_hd">\
						      <h2>手续费说明</h2>\
						      <a href="javascript:void(0)" class="btn_close"></a></div>\
						    <div class="pop_bd">\
						      <div class="tips_txt">'+tips_word+'</div>\
						    </div>\
						  </div>\
						</div>',
                        events: {
                            'click .btn_close': 'toggleHidden'
                        },
                        toggleHidden: function (e) {
                            this.hide();
                        }

                    })
                    self.popwinFloat.show();
                }
            };
            Common.showPayWin()
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '确认投资',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goBack()
                    }
                },
                right: [{
                    'tagname': 'custom', 'value': '',
                    callback: function () {
                        console.log('邀请好友');
                    }
                }]
            });
        },
        goCardSelectWin: function(){
            //传入当前银行卡ID
            self.currentCardBox= $(event.target).closest('#cardSelectSecond');
            payLayer.ttlSelectCard(self.currentCardBox);
        }
    })
})