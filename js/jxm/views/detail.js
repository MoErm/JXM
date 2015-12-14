//产品详情
define(function (require, exports, module) {
        var detail = require('jxm/tpl/detail.tpl');
        var history = require('jxm/tpl/investor.tpl');
        var model = require('jxm/model/model');
        var tool = require('jxm/utils/Tool');
        var detailModel = new model.detailModel();
        var investModel = new model.investModel();
        var realStatusCheck = new model.realStatusCheck();
        var toInvestConfirmMode = new model.toInvestConfirm();
        var abortChange= new model.abortChange();
        var handle = new tool();
        var message = '网络错误，请稍后重试';
        var self;
        var timer;
        var androidFlag=false;
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            events: {
                'click .js_tab div': 'tabShow',//选项卡切换
                'click .js_buy': 'buy',//购买产品
                'click .js_investHistory': 'investHistory'//投资记录
            },
            loginTimeout:function(){
                if(androidFlag){
                    window.orderDetail.loginOverTime()
                    return
                }
                handle.goLogin();
            },
            onShow: function () {
                var query = this.request.query;
                if(query&&query.android){
                    androidFlag=query.android
                }
                self.setHeader();
                handle.orientationTips();
                return self.showProduct();

            },
            showInfo: function(){
                var top = $(window).scrollTop();
                if(top > self.tabTop -  self.$('.js_tab').height() - 12){
                    self.$('.js_tab').addClass('fixed');
                }else{
                    self.$('.js_tab').removeClass('fixed');
                }
            },
            goList: function(){
                setTimeout(function(){
                    App.goTo('list');
                },2000);
            },
            comeType : function(type, ceiling, rate, floor){
                var dealStr = function (str) {
                    var str = str.replace(/%/,'');
                    return str.indexOf('.') == -1 ? str + '.0' : str;
                };
                var str, ceiling = dealStr(ceiling), rate = dealStr(rate), floor = dealStr(floor);
                switch(type){
                    case '01':
                        str = ceiling;
                        break;
                    case '02':
                        str = Number(ceiling)+Number(rate);
                        break;
                    case '03':
                        str = '浮动';
                        break;
                    case '04':
                        str = floor + '<i class="unit">~' + ceiling + '</i>';
                        break;
                    default:
                        str = ceiling;
                }

                return str;
            },
            showProduct: function(){
                var query = this.request.query;
                if(_.isUndefined(query) || _.isUndefined(query.pid)){
                    App.goTo('list');
                    return;
                }
                App.showLoading();
                detailModel.set({'productNo': query.pid});
                return detailModel.exec({
                    type: 'get',
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0 && !_.isEmpty(data.data)){
                            var data = data.data;
                            var key = ['historyPerformance','redeemMode', 'fundCustodian', 'valueDate', 'expectedExpiringDate', 'canFinishedEarly','repaymentMode','investFactorage', 'incomeRateCeiling', 'activityIncomeRate', 'incomeRateFloor', 'bonusModed'];
                            _.each(key, function(i){
                                if(_.isUndefined(data[i])) {
                                    data[i] = '';
                                }
                            })
                            if(data.salesCharge && data.salesCharge == '0.0%' && data.serviceCharge && data.serviceCharge == '0.0%'){
                                data.investFactorage = '免手续费';
                            }
                            self.data = data;
                            data.noProgress = handle.noProgress();
                            data.cutTime = handle.cutTime;
                            data.btnStatus = handle.btnStatus;
                            data.showTag = handle.showTag;
                            data.comeType = self.comeType;
                            self.time = Math.floor(handle.dealTime(data.serverTime).getTime()/1000);
                            data.getSaleEndTime = Math.floor(handle.dealTime(data.saleEndTime).getTime()/1000);
                            data.getSaleStartTime = Math.floor((handle.dealTime(data.saleStartTime).getTime())/1000);
                            data.getSaleEndString = handle.countDown(data.getSaleEndTime - self.time);
                            data.getSaleStartString = handle.countDown(data.getSaleStartTime - self.time);
                            data.history = _.isUndefined(query.history);
                            data.isShow = !data.productDetail && !data.riskControll;
                            self.$el.html(_.template(detail)(data));
                            if (self.prevPage == 'list') {
                                window.setTimeout(function(){ $(window).scrollTop(0) }, 50);
                            }
                            if(!data.isShow){
                                setTimeout(function () {
                                    self.tabTop = self.$('.js_tab').offset().top;
                                    $(window).bind('scroll', function () {
                                        self.showInfo();
                                    });
                                    $(window).bind('touchmove', function () {
                                        self.showInfo();
                                    });
                                }, 100);
                            }else{
                                investModel.set({'productNo': self.data.productNo});
                                investModel.exec({
                                    type: 'get',
                                    'success': function(data){
                                        if(data.ret == 0){
                                            if(data.data && data.data.records && data.data.records.length){
                                                self.$('.js_history').html(_.template(history)(data.data));
                                                self.$('.js_history').show();
                                                self.$('.js_content').show();
                                            }
                                        }else if(data.ret == 999001){
                                            self.loginTimeout();
                                        }
                                    },
                                    error: function(){
                                    }
                                })
                            }
                            if(data.saleStatus == 1 || data.saleStatus == 2){
                                timer = setInterval(function(){ self.showTime();},1000);
                            }
                        }else if(data.ret == 999001){
                            self.loginTimeout();
                        }else{
                            App.showToast(data.msg  || message);
                            self.goList();
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                        self.goList();
                    }
                })
            },
            checkStep:function(){
                App.showLoading();
                realStatusCheck.exec({
                    type: 'get',
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){
                            if(data.phase==1){
                                App.goTo("bind_card_new")
                            }else if(data.phase==2){
                                App.goTo('bind_card_new_step2');
                            }else if(data.phase==3){
//                                if(data.defaultCheckMode=='02'){
//                                    App.goTo('amount_check')
//                                }else{
//                                    App.goTo('bind_card_new_step3');
//                                }
                                App.goTo('bind_card_new_step3');
                                //跳转至手机号check
                            }else if(data.phase==4){
                                App.goTo("set_card_psw")
                            }else{
                                App.goTo("setting")
                            }
                        }else if(data.ret == 999001){
                            self.loginTimeout();
                        }else{
                            App.showToast(data.msg  || message);
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            },
            giveUp:function(){
                abortChange.exec({
                    type: "post",
                    success: function (data){
                        if(data.ret == 0){
                            //解锁成功
                           // self.toInvestConfirm();
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else{
                            App.showToast(data.msg);
                        }
                    },
                    error:function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            },
            //立即购买
            toInvestConfirm: function(){
                if(androidFlag){
                    window.orderDetail.productBuy(self.data.productNo)
                    return
                }
                App.showLoading();
                toInvestConfirmMode.set({'productNo': self.data.productNo});
                toInvestConfirmMode.exec({
                    type: 'post',
                    'success': function(data){
                        var url = self.request.url;
                        if(data.ret == 0){
                            App.goTo('invest_confirm?pid=' + self.data.productNo)
                        }else if(data.ret == 110001){
                            //未绑定银行卡
                            App.hideLoading();
                            if(!self.promptAlert){
                                self.promptAlert = handle.prompt('未绑定银行卡，是否现在去设置','放弃', '去设置', null, function(){
                                    handle.setProductLink(url);
                                    App.goTo('bind_card_new');
                                });
                            }
                            self.promptAlert.show();
                        }else if(data.ret == 110009){
                            //未设置交易密码
                            App.hideLoading();
                            if(!self.passAlert){
                                self.passAlert = handle.prompt('未设置交易密码，是否现在去设置','放弃', '去设置', null, function(){
                                    handle.setProductLink(url);
                                    App.goTo('set_card_psw');
                                });
                            }
                            self.passAlert.show();
                        }else if(data.ret == 110203){
                            App.hideLoading();

                            self.promptAlert = handle.alert(" 您的银行卡处于换卡中，由于系统升级请使用原卡进行购买",function(){
                                //解除锁定
                                self.giveUp()
                            });
                            self.promptAlert.show();

//                            self.promptAlert = handle.prompt('您的银行卡处于换卡中，无法进行投资，请继续完成换成或终止换卡','放弃', '去更换',function(){
//                                //解除锁定
//                                self.giveUp()
//                            }, function(){
//                                //继续更换
//                                App.goTo("rebind_card")
//                            });
//                            self.promptAlert.show();
                        }
                        else if(data.ret == 999001){
                            self.loginTimeout();
                        }else{
                            App.hideLoading();
                            App.showToast(data.msg  || message);
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message)
                    }
                })
            },
            noHistory: function(){
                self.$('.js_history').html('暂无投资历史');
            },
            //投资记录
            investHistory: function(){
                self.$('.js_explain').hide();
                self.$('.js_history').show();
                if(!self.investData){
                    investModel.set({'productNo': self.data.productNo});
                    investModel.exec({
                        type: 'get',
                        'success': function(data){
                            App.hideLoading();
                            if(data.ret == 0){
                                self.investData = data.data;
                                if(data.data && data.data.records && data.data.records.length){
                                    self.$('.js_history').html(_.template(history)(data.data));
                                }else{
                                    self.noHistory();
                                }
                            }else if(data.ret == 999001){
                                self.loginTimeout();
                            }else{
                                self.noHistory();
                            }
                        },
                        error: function(){
                            App.hideLoading();
                            self.noHistory();
                        }
                    })
                }
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '产品详情',
                    back: {
                        'tagname': 'back',
                        callback: function () {
                            App.goTo('list');
                        }
                    },
                    right: null
                });
            },
            //购买产品
            buy: function(){
                if(self.data.saleStatus == 1){
                   //立即购买
                   self.toInvestConfirm();
               }else if(self.data.saleStatus == 2){
                   if(!self.alert){
                       self.alert = handle.alert('该产品将于' + self.data.saleStartTime + '准时开售，敬请期待');
                   }
                   self.alert.show();
               }
            },
            //选项卡切换
            tabShow: function(e){
                var index = $(e.target).index();
                self.tabCss(index);
                self.$('.js_explain').hide();
                self.$('.js_explain').eq(index).show();
            },
            tabCss: function(index){
                self.$('.js_tab div').removeClass('cur');
                self.$('.js_tab div').eq(index).addClass('cur');
            },
            //产品倒计时
            showTime: function(item){
                //saleStatus 1 售卖中 2 即将开始 3 售卖结束
                var listTime = self.$('.js_status');
                var btnName = self.$('.js_btn_name');
                var buyBtn = self.$('.js_buy');
                if(self.data.saleStatus == 1){
                    btnName.html(handle.btnStatus(1));
                    if(!buyBtn.hasClass('btn_link2')){
                        buyBtn.removeClass('btn_link1');
                        buyBtn.addClass('btn_link2');
                    }
                    listTime.html('距离购买结束：' + handle.countDown(self.data.getSaleEndTime - self.time));
                    ++self.time;
                    if(self.data.getSaleEndTime - self.time == 0){
                        self.data.saleStatus = 3;
                    }
                }else if(self.data.saleStatus == 2){
                    btnName.html(handle.btnStatus(2));
                    if(buyBtn.hasClass('btn_link2')){
                        buyBtn.removeClass('btn_link2');
                        buyBtn.addClass('btn_link3');
                    }
                    listTime.html('距离购买开始：' + handle.countDown(self.data.getSaleStartTime - self.time));
                    ++self.time;
                    if(self.data.getSaleStartTime - self.time == 0){
                        self.data.saleStatus = 1;
                    }
                }else{
                    self.data.saleStatus = 3;
                    btnName.html(handle.btnStatus(3));
                    buyBtn.removeClass('btn_link2');
                    buyBtn.addClass('btn_link1');
                    listTime.html('购买结束时间：' + handle.cutTime(self.data.saleEndTime));
                    self.$('.js_progress').replaceWith(self.data.noProgress);
                    clearInterval(timer);
                }
            },
            onHide: function(){
                self.investData = null;
                if(self.alert){ self.alert.hide();}
                if(self.promptAlert){self.promptAlert.hide();}
                if(self.passAlert){self.passAlert.hide();}
                if(timer){clearInterval(timer);}
                $(window).unbind('scroll');
                $(window).unbind('touchmove');
                self.$el.html('');
            }
        })
})

