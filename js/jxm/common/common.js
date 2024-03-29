define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var store = require('jxm/model/store');
    var payOrderMode = new Model.fuyouPayOrder(); // fuyou 固定产品支付
    var checkOrder = new Model.fuyouCheckOrder(); // fuyou 固定产品检查支付结果   
    var getMsgCodeModel = new Model.getMsgCodeModel();
    var sendRedeemMsgCode = new Model.fuyouSendRedeemMsgCode(); // fuyou 天添利赎回验证码
    var confirmRedeem = new Model.fuyouConfirmRedeem(); // fuyou 天添利赎回

    var getTtlPayCode = new Model.getTtlPayCode(); // fuyou 天添利支付验证码
    var goTtlPayOrder = new Model.fuyouTtlPayOrder(); // fuyou 天添利支付
    var goTtlPayResult = new Model.fuyouTtlPayResult(); // fuyou 天添利支付结果

    var yujiaSendPayMsgCode = new Model.yujiaSendPayMsgCode(); // yujia 短信
    var yujiaPayCarOrder = new Model.yujiaPayCarOrder(); // yujia 支付

    var getMyBankCard = new Model.addMyBankCard();
    var abortChange = new Model.abortChange();
    var tool = require("jxm/utils/Tool");
    var qrcode = require("jxm/utils/qrcode");
    var handle = new tool();
    var share = require("jxm/tpl/share.tpl");
    var shareBonus = require("jxm/tpl/shareBonus.tpl");
    var loginStore = new store.loginStore();
    var message = '网络错误，请稍后重试';
    var Common = {
        // 普通产品支付弹窗
        showPayWin: function(data, hasCode) {
            var tem = '<div id="js_paywin" class="paywin_box">\
                          <div class="pop_cont">\
                            <div class="pop_hd">\
                              <h2>支付确认</h2>\
                              <a href="javascript:void(0)" class="btn_close js_close"></a></div>\
                            <div class="pop_bd">\
                              <div class="pay_info">\
                                 <p class="sum"><span class="tag_name">'+ data.productName+'</span><span class=" numb">' + data.investAmount + '</span></p>\
                                <p class="sum"><span class="tag_name">支付金额</span><span class="webtxt numb">' + data.paymentAmount + '</span></p>\
                                <p class="sum"><span class="tag_name">红包</span><span class="webtxt numb">' + data.crAmount + '</span></p></div>\
                            <div class="pay_form">\
                                <ul>\
                                  <li class="frm_item frm_item_getcode">\
                                    <label for="inpt_code">验证码</label>\
                                    <input type="text" id="inpt_code" maxlength="8 "class="frm_inpt" value="" placeholder="" style="padding-right:10px;" >\
                                    <span class="code js_code code_disabled">已获取（60）</span></li>\
                                  <li class="frm_btn"> <a href="javascript:void(0)" class="btn_link btn_link2 js_pay">支付</a> </li>\
                                  <li class="frm_tips">请在<span class="webtxt time js_time">' + '-分-秒' + '</span>内完成支付！</li>\
                                </ul>\
                              </div>\
                            </div>\
                          </div>\
                          <div class="mod_popup_mask hidden" style="background:#000;opacity:0.5;position:absolute;left:20px;top:5px;width:270px;height:375px"></div>\
                          <div class="mod_popup_toast hidden" style="text-align:center;height:20px;top:180px;position:absolute;left:50%;background:#000;opacity:0.8;padding:10px 20px;color:#fff;border-radius:5px"></div>\
                        </div>'
            var getCodeFlag=false;
            var popwin = new App.UI.UIPopWin({
                maskToHide: false,
                template: tem,
                events: {
                    'click .js_close': 'onHideLayer',
                    'click .js_pay': 'payOrder',
                    'click .js_code': 'getCode'
                },
                onHideLayer: function() {
                    this.hide();
                },
                showCountToast: function(orderNo) {
                    var self = this;
                    self.hide();
                    self.showPayCountDown();
                    self.showResult = true;
                    checkOrder.set({
                        "orderNo": orderNo
                    })
                    checkOrder.exec({
                        type: 'get',
                        success: function(data) {
                            App.hideToast();
                            if (data.ret == 999001) {
                                App.goTo('login');
                            } else {
                                if (self.showResult == true && data.ret == 0) {
                                    clearInterval(self.paytimer);
                                    if (data.data.productType == "01") {
                                        localStorage.setItem('regular', JSON.stringify(data));
                                        App.goTo('invest_finish_regular');

                                    } else if (data.data.productType == "02") {
                                        localStorage.setItem('float', JSON.stringify(data));
                                        App.goTo('invest_finish_float');
                                    }
                                } else if (self.showResult == true && data.ret == 300001) {
                                    clearInterval(self.paytimer);
                                    self.payCountAlert = handle.alert(data.data.orderStatusReason, function() {
                                        App.goTo("my_invest")
                                    });
                                    self.payCountAlert.show();
                                }
                              
                                else {
                                    clearInterval(self.paytimer);
                                    App.showToast(data.msg);
                                }
                            }
                        },
                        error: function() {
                            App.hideLoading();
                            App.showToast('网络错误,请稍后重试');
                        }
                    });

                },
                hideSelfToast: function() {
                    var self = this;
                    setTimeout(function() {
                        self.$el.find('.mod_popup_mask').toggleClass('hidden');
                        self.$el.find('.mod_popup_toast').toggleClass('hidden');
                    }, 3000)
                },
                showPayCountDown: function() {
                    var self = this;
                    App.showToast('<img src="./images/fuyou_logo.png" width="40%" style="margin: 10px 0"><br>支付结果已提交，请等待<span id="js_pay_count_down">10</span>秒', 10000);
                    var second = 9;
                    self.paytimer = setInterval(function() {
                        $('#js_pay_count_down').html(second);
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.paytimer);
                            self.payCountAlert = handle.alert('支付确认中，请到"我的投资"查看支付结果', function() {
                                App.goTo("my_invest")
                            });
                            self.payCountAlert.show();
                            self.showResult = false;
                        }
                    }, 1000);
                },
                showCodeCountDown: function(timer) {
                    var self = this;
                    //获取验证码倒计时
                    var second = timer || 60;
                    clearInterval(self.codetimer);
                    self.codetimer = setInterval(function() {
                        self.$el.find('.js_code').html('已获取（' + second + '）');
                        getCodeFlag=true
                        self.$el.find('.js_code').addClass("code_disabled");
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.codetimer);
                            self.$el.find('.js_code').html('获取验证码');
                            getCodeFlag=false
                            self.$el.find('.js_code').removeClass("code_disabled");
                        }
                    }, 1000);
                },
                showOrderCountDown: function() {
                    var self = this;
                    //支付倒计时
                    var surplus = data.surplusPayTime;

                    clearInterval(self.ordertimer);
                    self.ordertimer = setInterval(function() {
                        var minute = Math.floor(surplus / 60);
                        var second = surplus - minute * 60;

                        self.$el.find('.js_time').html(minute + '分' + second + '秒');
                        surplus -= 1;
                        if (surplus == -1) {
                            clearInterval(self.ordertimer);
                            self.hide()
                            self.orderCountAlert = handle.alert('订单已关闭，请重新购买。').show();
                        }
                    }, 1000);
                },
                onShow: function() {
                    var self = this
                    self.showOrderCountDown();

                    if (hasCode == false) {
                        self.getCode();
                    } else {
                        getCodeFlag=true
                        self.showCodeCountDown(59);
                    }

                },
                onHide: function() {
                    var self = this;
                    clearInterval(self.paytimer);
                    clearInterval(self.codetimer);
                    clearInterval(self.ordertimer);
                    //self.$el.find('.js_code').data("hascode", 0);
                    getCodeFlag=false
                    self.$el.find('.js_code').removeClass("code_disabled");
                    //alert隐藏
                    self.payCountAlert && self.payCountAlert.hide();
                    self.payCountAlert && self.orderCountAlert.hide();
                },
                getCode: function() {
                    var self = this;
                    //if (self.$el.find('.js_code').data("hascode")==1) {
                    //    return;
                    //}
                    if( getCodeFlag){
                        return
                    }
                    getCodeFlag=true
                    App.showLoading();
                    getMsgCodeModel.set({
                            "type": "1",
                            "destination": "5"
                        }) //组织参数
                    getMsgCodeModel.exec({
                        type: 'post'
                    }).then(function(data) {
                        App.hideLoading();
                        if (data.ret == 0) {
                            self.showCodeCountDown(59);

                        } else if (data.ret == 999001) {
                            //self.$el.find('.js_code').data("hascode", 0);

                            App.goTo('login');
                        } else if (data.ret == 100017) {
                            App.showToast('还需要等待' + data.data.waitSeconds + '秒');
                        } else {
                            //self.showCodeCountDown(data.data.retryWait);
                            App.showToast(data.msg || "网络错误");
                        }

                    }).catch(function() {
                        App.hideLoading();
                        App.showToast('系统错误,请稍后重试');
                    })
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
                            App.showToast(message);
                        }
                    })
                },
                payOrder: function() {
                    var self = this;
                    var code = $('#inpt_code').val();
                    var psw = $('#inpt_pssword').val();
                    var transactLimitNumber = data.transactLimitNumber;

                    var amountInt = parseFloat(data.paymentAmount.substring(0, data.paymentAmount.length - 1));
                    if (code == "") {
                        App.showToast("验证码不能为空");
                        return;
                    }
                    if (psw == "") {
                        App.showToast("请输入平台交易密码");
                        return;
                    }
                    if (transactLimitNumber > 0) {
                        if (amountInt > transactLimitNumber) {
                            App.showToast("支付金额大于银行限额");
                            return;
                        }
                    }

                    App.showLoading();
                    payOrderMode.set({
                        'msgCode': $('#inpt_code').val(),
                        'transactPwd': $('#inpt_pssword').val(),
                        'orderNo': data.orderNo
                    });
                    payOrderMode.exec({
                        type: 'post',
                        success: function(data) {
                            App.hideLoading();
                            if (data.ret == 0) {
                                self.$el.find('.js_pay').html('支付中');
                                self.$el.find('.js_pay').css('background-color', '#898989');
                                self.showCountToast(data.data.orderNo);
                            } else if (data.ret == 999001) {
                                self.hide();
                                handle.goLogin();
                            } else {
                                clearInterval(self.codetimer);
                                //self.$el.find('.js_code').data("hascode", 0)
                                getCodeFlag=false
                                self.$el.find('.js_code').removeClass("code_disabled");
                                self.$el.find('.js_code').html('获取验证码')
                                self.$el.find('#inpt_code').val('')
                                self.$el.find('#inpt_pssword').val('')
                                if (data.ret == 999901) {

                                    self.promptAlert = handle.alert(data.msg);
                                    self.promptAlert.show();
                                } else if (data.ret == 110203) {
                                    self.promptAlert = handle.prompt('您的银行卡处于换卡中，无法进行投资，请继续完成换成或终止换卡', '放弃', '去更换', function() {
                                        //解除锁定
                                        self.giveUp()
                                        self.hide();
                                    }, function() {
                                        //继续更换
                                        App.goTo("rebind_card")
                                    });
                                    self.promptAlert.show();

                                } else if (data.ret == 300008 || data.ret == 300004) {
                                    App.showToast(data.msg, 3000)
                                    self.hide();
                                } else {
                                    App.showToast(data.msg)

                                }

                            }
                        },
                        error: function() {
                            App.hideLoading();
                            self.hide();
                            App.showToast('网络错误');

                        }
                    })
                }
            })
            popwin.show();
        },
        //邀请好友
        inviteFriends: function(isHideShareBar) {
            var popwin = new App.UI.UIPopWin({
                maskToHide: true,
                weixin: '<div class="mod_guide js_share_info" style="position:fixed;top:0px;right:0px;padding: 0;height: 100%;width: 100%">\
                            <div class="guide_img js_share_close" style="height: 100%;width: 100%"><img src="images/invite2.png" alt="" style="width: 120px;height: 25%"><img src="images/invite1.png" alt="" class="invite_img"></div>\
                        </div>',
                dimension: '<div class="mod_popup js_qrcode" style="position:fixed;right:0px;">\
                        <div class="pop_cont">\
                            <div class="pop_bd">\
                                <h3 class="pop_tips_title">赶紧邀请身边的好友扫一扫您<br>的专属二维码进行注册吧!</h3>\
                                <div class="QR_code"><span id="qrCode"></span></div>\
                            </div>\
                        <div class="pop_ft">\
                            <div class="btn_box"><span class="btn_link btn_link2 js_share_close">取消</span></div>\
                        </div>\
                        </div>\
                    </div>',
                events: {
                    'click .js_wx_group': 'wxGroup', //微信朋友圈
                    'click .js_two_dimension': 'twoDimension', //二维码
                    'click .js_share_close': 'onHideLayer'
                },
                wxGroup: function() {
                    this.$('.js_share').hide();
                    this.$el.append(this.weixin);
                    $(".hiui-mask").css("background", "rgba(0,0,0,.85)");
                },
                onHideLayer: function() {
                    this.hide();
                },
                twoDimension: function() {
                    this.$('.js_share').hide();
                    this.$el.append(this.dimension);
                    var top = ($(window).height() - this.$el.find(".js_qrcode").height()) / 2;
                    $(".hiui-mask").css("background", "rgba(0,0,0,.85)");
                    this.$el.find(".js_qrcode").css("top", top);
                    var qrcode = new QRCode(document.getElementById('qrCode'), {
                        width: 245,
                        height: 245,
                        colorDark: "#000000",
                        colorLight: "#ffffff"
                    });
                    qrcode.makeCode(handle.inviteCode());
                },
                onShow: function() {
                    this.$el.append(share);
                    if (isHideShareBar) {
                        //
                    } else {
                        this.$('.js_share').show();
                    }

                }
            });
            popwin.show();
        },
        // 天添利赎回
        payRedeem: function(redeemValue) {
            var tem = '<article class="paywin_box">\
                    <div class="paywin_box_t">赎回确认<em class="close" id="payRedeem_close"></em></div>\
                    <div class="paywin_box_m">\
                        <div class="paycontent pay_form">\
                            <div class="pay_detail">\
                                <p class="title">赎回金额</p>\
                                <h2 class="num" id="payRedeem_redeemValue"></h2>\
                            </div>\
                            <ul class="pay_list">\
                              <li class="frm_item frm_item_getcode">\
                                <label for="inpt_code">验证码</label>\
                                <input type="text" id="checkCode" maxlength="8 "class="frm_inpt" value="" placeholder="" style="padding-right:10px;" >\
                                <span class="code js_code code_disabled">已获取（60）</span></li>\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="paywin_box_b">\
                        <div class="action">\
                            <input type="button" value="确认赎回" class="gopay" id="payRedeem_btn" />\
                        </div>\
                    </div>\
                </article>';
            var self = null;
            var getRedemCodeFlag=true
            var popwin = new App.UI.UIPopWin({
                events: {
                    "click #payRedeem_close": "onHideLayer",
                    "click #payRedeem_btn": "payRedeem",
                    'click .js_code': 'getCode'
                },
                maskToHide: false,
                template: tem,
                initialize: function() {
                    return this;
                },
                onHideLayer: function() {
                    this.hide();
                },
                hideWindow:function(){
                    this.hide();
                },
                showCodeCountDown: function(timer) {
                    //获取验证码倒计时
                    var second = timer || 60;
                    clearInterval(self.codetimer);
                    self.codetimer = setInterval(function() {
                        self.$el.find('.js_code').html('已获取（' + second + '）');
                        getRedemCodeFlag=true
                        self.$el.find('.js_code').addClass("code_disabled");
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.codetimer);
                            self.$el.find('.js_code').html('获取验证码');
                            getRedemCodeFlag=false
                            self.$el.find('.js_code').removeClass("code_disabled");
                        }
                    }, 1000);
                },
                showAcountValue: function(){ // 格式化金额显示
                    var money = redeemValue.toString().split('.');
                    var show = money[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,') + (_.isUndefined(money[1]) ? '.00' : money[1].length == 1 ? "." + money[1] + "0" : "." + money[1])
                    $('#payRedeem_redeemValue').html("¥" + show);
                },
                getCode: function() { //获取赎回验证码
                    if(getRedemCodeFlag){
                        return
                    }
                    App.showLoading();
                    //sendRedeemMsgCode.set({
                    //    'redeemAmount': redeemValue,
                    //});
                    sendRedeemMsgCode.exec({
                        type: 'get',
                        success: function(data) {
                            App.hideLoading();
                            if (data.ret == 0) {
                                self.showCodeCountDown(59);
                            } else if (data.ret == 999001) {
                                App.goTo('login');
                            }else if (data.ret == 100017) {
                                App.showToast('还需要等待' + data.data.waitSeconds + '秒');
                            } else {
                                App.showToast(data.msg || "网络错误");
                            }
                        },
                        error: function() {
                            App.hideLoading();
                        }
                    });
                },              
                payRedeem: function() {
                    var msgCodeVal = $('#checkCode').val();
                    if(msgCodeVal==""){
                        App.showToast("请输入验证码")
                        return
                    }
                    App.showLoading();

                    confirmRedeem.set({
                        'msgCode': msgCodeVal
                    })
                    confirmRedeem.exec({
                        type: 'post',
                        success: function(data) {
                            App.hideLoading();
                            if (data.ret == 0) {
                                App.goTo("redemption_finish?redeemAmount=" + data.data.redeemAmount + "&redeemTime=" + data.data.redeemTime + "&ransomId=-1")

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

                    this.hide();
                },
                onShow: function() {
                    self = this.initialize();
                    self.showAcountValue();
                    //self.getCode();
                    self.showCodeCountDown(59);

                }
            });
            popwin.show();
        },
        //yujialist
        showyujiaList: function(list) {
            var showList=''
            for(var i=0;i<list.length;i++){
                showList+='<div class="monthList_list_2"><span>'+list[i].period+'期</span><span>'+list[i].returnedDate+'</span><span>'+list[i].returnedAmount+'</span></div>'
            }
            var temp='<div id="monthList"><div class="monthList">' +
                '                <div class="monthList_title">月回款详情' +
                '                <div class="monthList_close"  onClick={this.closeLayer}></div>' +
                '            </div>' +
                '            <div class="monthList_showArea">' +
                '                <div class="monthList_list_1">' +
                '                <span>期数</span>' +
                '                <span>回款日期</span>' +
                '                <span>回款金额（元）</span>' +
                '            </div>' +showList+
                '            </div>' +
                '            </div>' +
                '</div>'
            var popwin = new App.UI.UIPopWin({
                events: {
                    "click .monthList_close": "onHideLayer"
                },
                maskToHide: false,
                template: temp,
                onHideLayer: function() {
                    this.hide();
                },
                onShow: function() {
                }
            });
            popwin.show();
        },
        //buyyujia
        buyYujia: function(data) {
            var self;
            var codeCountDown;
            var countDown
            var msgCodeFlag=true
            var temp='<div id="payLayer">' +
                '                <div class="payLayer">' +
                '                <div class="payTitle">支付验证<i class="payCross"></i></div>' +
                '            <div class="payTxt_1">' +
                '                <span class="span_1">'+data.productName+'</span>' +
                '            <span class="span_2">'+data.investPeriod+'期</span>' +
                '            </div>' +
                '            <div class="payTxt_1">' +
                '                <span class="span_1">支付金额</span>' +
                '                <span class="span_2 red">'+handle.dealMoney3(data.investAmount)+'</span>' +
                '            </div>' +
                '            <div class="payTxt_3">' +
                '                <span class="span_1">验证码</span>' +
                '                <span class="span_2"><input type="text" id="msgCode" maxLength="6"/><div class="payCode" id="payCode">获取验证码</div></span>' +
                '                </div>' +
                '            <button class="payBtn" id="yujiaPay" >支付</button>' +
                '            <div class="payTxt_4">' +
                '                <p id="countDown">请在-分-秒内完成支付！</p>        ' +
                '    </div>' +
                '            </div>' +
                '     </div>'
            var popwin = new App.UI.UIPopWin({
                events: {
                    "click #payCode": "getCode",
                    "click .payCross": "onHideLayer",
                    "click #yujiaPay": "pay"
                },
                maskToHide: false,
                template: temp,
                onHideLayer: function() {
                    clearInterval(codeCountDown);
                    clearInterval(countDown);
                    clearInterval(self.yujiapaytimer);
                    this.hide();
                },
                onShow: function() {
                    self=this;
                    this.showCodeCountDown()
                    this.showCountDown(data.surplusPayTime)
                },
                pay:function(){
                    var msgCode=$("#msgCode").val()
                    if(msgCode==""){
                        App.showToast("请输入验证码")
                        return
                    }
                    yujiaPayCarOrder.exec({
                        type: 'post',
                        data:{
                            msgCode:msgCode,
                            orderNo:data.orderNo
                        },
                        success: function(data) {
                            App.hideLoading();
                            if (data.ret == 0) {
                                self.checkCarOrder()
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
                checkCountDownFun:function(){
                    App.showToast('<img src="./images/fuyou_logo.png" width="40%" style="margin: 10px 0"><br>支付结果已提交，请等待<span id="js_pay_count_down">10</span>秒', 10000);
                    var second=9;
                    self.yujiapaytimer = setInterval(function() {
                        $('#js_pay_count_down').html(second);
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.yujiapaytimer);

                            self.showResult = false;
                        }
                    }, 1000);
                },
                checkCarOrder:function(){

                    this.checkCountDownFun()
                    var checkData={
                        orderNo:data.orderNo
                    }
                    checkOrder.exec({
                        type: 'get',
                        data:checkData,
                        success: function(data) {
                            App.hideToast();
                            if (data.ret == 999001) {
                                App.goTo('login');
                            } else {
                                if (self.showResult == true && data.ret == 0) {
                                    clearInterval(self.yujiapaytimer);
                                    localStorage.setItem('yujiaData', JSON.stringify(data));
                                    self.hide()
                                    App.goTo('yujiaFinish');
                                } else if ( data.ret == 300001) {
                                    clearInterval(self.yujiapaytimer);
                                    self.payCountAlert = handle.alert(data.msg, function() {
                                        self.hide()
                                        App.goTo("my_invest")
                                    });
                                    self.payCountAlert.show();
                                }else if (data.ret == 300002) {
                                    clearInterval(self.yujiapaytimer);
                                    self.payCountAlert = handle.alert('支付确认中，请到"我的投资"查看支付结果', function() {
                                        self.hide()
                                        App.goTo("my_invest")
                                    });
                                    self.payCountAlert.show();
                                }else {
                                    clearInterval(self.yujiapaytimer);
                                    self.hide()
                                    App.showToast(data.msg);
                                }
                            }
                        },
                        error: function() {
                            App.hideLoading();
                            self.hide()
                            App.showToast('网络错误,请稍后重试');
                        }
                    });
                },
                getCode:function(){
                    if(msgCodeFlag){
                        return
                    }
                    yujiaSendPayMsgCode.exec({
                        type: 'get',
                        success: function(data) {
                            App.hideLoading();
                            if (data.ret == 0) {

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
                showCountDown:function(time){
                    var surplus = time;
                    countDown =setInterval(function() {
                        var minute = Math.floor(surplus / 60);
                        var second = surplus - minute * 60;
                        $("#countDown").html('请在'+minute + '分' + second + '秒内完成支付！');
                        surplus -= 1;
                        if (surplus == -1) {
                            $("#countDown").html(' ');
                            clearInterval(countDown);
                            self.hide()
                            App.showToast('订单已关闭，请重新购买。')
                        }
                    }, 1000);
                },
                showCodeCountDown:function(time){
                    var surplus = 60;
                    msgCodeFlag=true
                    $("#payCode").addClass("disabled");
                    $("#payCode").removeClass("payCode ");
                    codeCountDown =setInterval(function() {

                        $("#payCode").html('已获取('+ surplus + ')');

                        surplus -= 1;
                        if (surplus < -1) {
                            $("#payCode").removeClass("disabled");
                            $("#payCode").addClass("payCode");
                            msgCodeFlag=false
                            clearInterval(codeCountDown);
                            $("#payCode").html('获取验证码');
                        }
                    }, 1000);
                },
            });
            popwin.show();
        },
        newBonus: function(money,day) {
            var tem = '<div class="newBonus_box newBonus_show1">\
                        <div class="newBonus_close newBonus_show2"></div>\
                        <div class="newBonus_box1">\
                            <div class="newBonus_cycle"><small>￥</small>';
            tem+=money+'</div>\
                             <div class="newBonus_text1">尊贵的客户恭喜您收到了';
            tem+=money+'元\
                            抵现红包！已经放入您的红包账户中</div>\
                             <div class="newBonus_text2">有效期';
            tem+=day+'天，不要浪费哦！</div>\
                             <div class="newBonus_logo"></div>\
                            <button class="newBonus_btn">立即查看</button>\
                        </div>\
                        </div>';
            var popwin = new App.UI.UIPopWin({
                events: {
                    "click .newBonus_close": "onHideLayer",
                    "click .newBonus_btn": "toMyWallet"


                },
                maskToHide: false,
                template: tem,
                onHideLayer: function() {
                    this.hide();
                },
                toMyWallet:function(){
                    this.hide();
                    App.goTo("my_wallet")

                },
                onShow: function() {
                    var width=document.body.clientWidth
                    $(".newBonus_btn").css("marginTop",width*0.8/0.7*0.8+"px")

                }
            });
            popwin.show();
        },
        //富有签约
        signFuyou: function(type) {
            var temp='<div class="signFuyou">\
                       <div class="signFuyou_box1">\
                            <div class="signFuyou_txt"></div>\
                            <div class="signFuyou_img"></div>\
                            <div class="signFuyou_btn">\
                                <button class="btn_left">取消</button>\
                                <button class="btn_right" id="btn_right">'+(type=="sign"?"去签约":"去绑卡")+'</button>\
                            </div>\
                       </div>\
                    </div>'
            var popwin = new App.UI.UIPopWin({
                events: {
                    "click .btn_left": "onHideLayer",
                    "click .btn_right": "toSign"


                },
                maskToHide: false,
                template: temp,
                onHideLayer: function() {
                    this.hide();
                },
                toSign:function(){
                    this.hide();

                    if(type=="sign"){
                        App.goTo("fuyou_sign")
                    }else{
                        App.goTo("bind_card_new")
                    }
                },
                onShow: function() {


                }
            });
            popwin.show();
        },
        //富有签约
        fuyoutankuang: function() {
            var temp='<div class="fuyou_kuang" >\
                      <img src="./images/fuyou_kuang.png" width="80%" style="margin: 0px 10%" class="img_js">\
                      <img src="./images/fuyou_x.png" class="fuyou_x">\
                      \
                    </div>'
            var popwin = new App.UI.UIPopWin({
                events: {
                    "click .fuyou_x": "onHideLayer",
                    "click .img_js": "toSign"


                },
                maskToHide: false,
                template: temp,
                onHideLayer: function() {
                    this.hide();
                },
                toSign:function(){
                    this.hide();
                    window.location.href="http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=503180325&idx=1&sn=9bca7ea79fd2a7527efa4f92c12309a7#wechat_redirect"
                },
                onShow: function() {


                }
            });
            popwin.show();
        },
        //邀请好友
        sendBonus: function(isHideShareBar, url) {
            var popwin = new App.UI.UIPopWin({
                dimension: '<div class="mod_popup js_qrcode" style="position:fixed;right:0px;z-index: 9999">\
                        <div class="pop_cont">\
                            <div class="pop_bd">\
                                <h3 class="pop_tips_title">赶紧邀请身边的好友扫一扫您<br>的专属二维码进行注册吧!</h3>\
                                <div class="QR_code2"><span id="qrCode"></span></div>\
                            </div>\
                        <div class="pop_ft">\
                            <div class="btn_box"><span class="btn_link btn_link2 js_share_close">取消</span></div>\
                        </div>\
                        </div>\
                    </div>',
                events: {
                    'click .js_wx_group': 'wxGroup', //微信朋友圈
                    'click .js_two_dimension': 'twoDimension', //二维码
                    'click .js_share_close': 'onHideLayer',
                    'click .js_share_bonus': 'onHideLayer'
                },

                twoDimension: function() {
                    this.$('.js_share').hide();
                    this.$el.append(this.dimension);
                    var top = ($(window).height() - this.$el.find(".js_qrcode").height()) / 2;
                    $(".hiui-mask").css("background", "rgba(0,0,0,.85)");
                    this.$el.find(".js_qrcode").css("top", top);
                    var qrcode = new QRCode(document.getElementById('qrCode'), {
                        width: 280,
                        height: 280,
                        colorDark: "#000000",
                        colorLight: "#ffffff"
                    });
                    qrcode.makeCode(url);
                },
                onHideLayer: function() {
                    this.hide();
                },

                onShow: function() {
                    this.$el.append(shareBonus);
                    if (isHideShareBar) {
                        this.twoDimension()
                    } else {
                        //this.twoDimension()
                        this.$('.js_share_bonus').css("display", "block");
                    }

                }
            });
            popwin.show();
        },
        //公告
        showAD: function(view) {
            var month = new Date().getMonth() + 1;
            var tpl = '<div class="new_active"> <span class="eve_month">' + month + '</span>月展义理财师邀请排行榜  <a href="javascript:void(0)"style="color:#f60;">查看详情</a>\
                     <span style="position:absolute;right:10px;width:20px;height:20px;"class="js_close">X</span>\
                     </div>'
            view.$el.find(".ad_box").html(tpl);
            view.$el.find(".js_close").click(function() {
                view.$el.find(".new_active").hide()
            });
            view.$el.find(".new_active a").click(function() {
                if (window.WebViewJavascriptBridge) {
                    window.WebViewJavascriptBridge.callHandler('openUrl', {
                        "url": "http://m.jiaxinmore.com/activity/818hero/heroList.html"
                    }, function(response) {})
                } else {
                    window.location.href = "./activity/818hero/heroList.html"
                }
            });
        },
        // 选择银行卡
        ttlSelectCard: function(cardBox,source,productNo){
            var self = null;
            var currentCardId= cardBox.find("div[data-cardid]").attr("data-cardid");
            //显示换银行卡界面
            var getCardList= {
                initialize: function() {
                    return this;
                },
                initCardList: function(){
                    getMyBankCard.exec({
                        type: 'get',
                        success: function(data) {
                            App.hideToast();
                            if (data.ret == 999001) {
                                App.goTo('login');
                            } else if (data.ret == 0) {
                                self.cardList= data.data.cardList;
                                self.CardDetail= "";
                                //生成银行卡列表
                                self.cardList.forEach(function(element, index){
                                    //勾选默认银行卡
                                    if(element.cardId == currentCardId){
                                      self.CardDetail+= '<li class= "cur_card" data-cardid= "'+element.cardId+'"><p class="head"><img src=" '+element.bankLogo+'" alt="" class="banklogo" /></p><div class="mycard_info"><div class="card_detail">\
                                        <p class="card_name" >'+element.bankName+'(尾号'+ element.cardNo.slice(-4)+')</p>\
                                        <p class="limit_text">单笔限额：'+element.transactLimit+'，单日限额：'+element.dailyLimit+'</p></div></div></li>';
                                    }
                                    else{
                                        self.CardDetail+= '<li class= "" data-cardid= "'+element.cardId+'"><p class="head"><img src=" '+element.bankLogo+'" alt="" class="banklogo" /></p><div class="mycard_info"><div class="card_detail">\
                                        <p class="card_name" >'+element.bankName+'(尾号'+ element.cardNo.slice(-4)+')</p>\
                                        <p class="limit_text">单笔限额：'+element.transactLimit+'，单日限额：'+element.dailyLimit+'</p></div></div></li>';
                                    }
                                });                           
                                showCardWin(self.CardDetail,self.cardList);

                            } else if (data.ret == 110001) {
                                self.promptAlert = handle.alert(data.msg,function(){
                                    App.goTo("setting")
                                });
                                self.promptAlert.show();
                                self.setHeader();
                                self.$el.html(addCard + footer);
                            } else {
                                handle.alert('银行卡数据异常，请联系客服');
                            }
                        },
                        error: function() {
                            App.hideLoading();
                            App.showToast('网络错误,请稍后重试');
                        }
                    });
                },
                init:function(){
                    self = this.initialize();
                    self.initCardList();
                }
            }            
            getCardList.init();
            function showCardWin(cardDetail,cardData){                
                var tem = '<article class="paywin_box">\
                    <div class="paywin_box_t">选择支付银行卡<em class="close" id="cardSelectClose"></em></div>\
                    <div class="paywin_box_m">\
                        <div class="ttl_card_select">\
                            <ul class="ttl_card_list" id="cardList">'+cardDetail+'</ul>\
                            <div class="ttl_card_add" id="useNewCard">使用新卡支付</div>\
                        </div>\
                    </div>\
                </article>';
                var selectCardWin = new App.UI.UIPopWin({
                    maskToHide: false,
                    template: tem,
                    events: {
                        'click #cardSelectClose': 'onHideLayer',
                        'click #useNewCard': 'goAddCard',
                        'click .ttl_card_list li': 'goSelectCard',
                    },
                    initialize: function() {
                        return this;
                    },
                    
                    onShow: function() {                    
                        self = this.initialize();
                    },                
                    onHideLayer: function() {
                        self.hide();
                    },
                    goSelectCard: function(){                       
                        self.goSetNewCard();
                    },
                    goAddCard: function(){
                        self.onHideLayer();
                        if(source=='01'){
                            App.goTo("bind_card_new?source=01&productNo="+productNo);
                        }else{
                            App.goTo("bind_card_new?source=02");
                        }

                    },
                    goSetNewCard: function(){
                        self.choosedCardId= Number($(event.target).parents("li").data("cardid"));
                        cardData.forEach(function(element, index){
                            //如果点击银行卡添加信息到页面
                            if(element.cardId == self.choosedCardId){
                                self.choosedCardData= element;
                                self.onHideLayer();
                                self.actNewCard= '<p class="maycard_title"><img src="'+self.choosedCardData.bankLogo+ '" alt="" class="banklogo" /></p><div class="mycard_info" data-cardid= "'+self.choosedCardData.cardId+ '"><div class="card_detail">\
                                    <p class="card_cur">'+self.choosedCardData.bankName+ '(尾号'+self.choosedCardData.cardNo.slice(-4)+ ')</p><p class="limit_text">单笔限额：'+element.transactLimit+'，单日限额：'+element.dailyLimit+'</p></div></div>';
                                    
                                cardBox.html(self.actNewCard);
                            }
                        });
                    }
                });
                selectCardWin.show();
            }
        },
        // 支付弹出窗
        ttlPayWin: function(data,from) {
            var tem = '<article class="paywin_box">\
                    <div class="paywin_box_t">支付确认<em class="close" id="payClose"></em></div>\
                    <div class="paywin_box_m">\
                        <div class="paycontent pay_form">\
                            <div class="pay_detail">\
                                <p class="title">投资金额</p>\
                                <h2 class="num" id="amount_num"></h2>\
                            </div>\
                            <ul class="pay_list">\
                              <li class="frm_item frm_item_getcode">\
                                <label for="inpt_code">验证码</label>\
                                <input type="text" id="checkCode" maxlength="8 "class="frm_inpt" value="" placeholder="" style="padding-right:10px;" >\
                                <span class="code js_code code_disabled">已获取（60）</span></li>\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="paywin_box_b">\
                        <div class="action">\
                            <input type="button" value="支付" class="gopay" id="gopay" />\
                            <p class="tip">请在 <em class="tip_num"></em> 内完成支付！</p>\
                        </div>\
                    </div>\
                </article>';
            var self = null;
            var getCodeFlag_ttl=true
            var popwin = new App.UI.UIPopWin({
                maskToHide: false,
                template: tem,
                events: {
                    'click #payClose': 'onHideLayer',
                    'click #gopay': 'payOrder',
                    'click .js_code': 'getCode',
                    'click #forget_password': 'goForgetPassword'
                },
                initialize: function() {
                    return this;
                },
                onShow: function() {
                    self = this.initialize();
                    self.showOrderCountDown();

                    self.showAcountValue();
                    console.log(from)
                    if(from==false){
                        getCodeFlag_ttl=false
                        self.getCode()
                    }else{
                        self.showCodeCountDown(59);
                    }
                },
                showCodeCountDown: function(timer) {
                    //获取验证码倒计时
                    var second = timer || 60;
                    clearInterval(self.codetimer);
                    self.codetimer = setInterval(function() {
                        self.$el.find('.js_code').html('已获取（' + second + '）');
                        getCodeFlag_ttl=true
                        self.$el.find('.js_code').addClass("code_disabled");
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.codetimer);
                            self.$el.find('.js_code').html('获取验证码');
                            getCodeFlag_ttl=false
                            self.$el.find('.js_code').removeClass("code_disabled");
                        }
                    }, 1000);
                },
                showOrderCountDown: function() {
                    //支付倒计时
                    var surplus = data.surplusPayTime||300;                    
                    clearInterval(self.ordertimer);
                    self.ordertimer = setInterval(function() {
                        var minute = Math.floor(surplus / 60);
                        var second = surplus - minute * 60;
                        self.$el.find('.tip_num').html(minute + '分' + second + '秒');
                        surplus -= 1;
                        if (surplus == -1) {
                            clearInterval(self.ordertimer);
                            self.hide()
                            self.orderCountAlert = handle.alert('订单已关闭，请重新购买。').show();
                        }
                    }, 1000);
                },
                showPayCountDown: function() {
                    App.showToast('<img src="./images/fuyou_logo.png" width="40%" style="margin: 10px 0"><br>支付结果已提交，请等待<span id="js_pay_count_down">10</span>秒', 10000);
                    var second = 9;
                    self.paytimer = setInterval(function() {
                        $('#js_pay_count_down').html(second);
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.paytimer);
                            self.payCountAlert = handle.alert('支付确认中，请到"交易记录"查看支付结果', function() {
                                App.goTo("redeem");
                            });
                            self.payCountAlert.show();
                            self.showResult = false;
                        }
                    }, 1000);
                },
                showCountToast: function(orderNo) {
                    self.hide();
                    self.showPayCountDown();
                    self.showResult = true;
                    goTtlPayResult.set({
                        "orderNo": orderNo
                    })
                    goTtlPayResult.exec({
                        type: 'get',
                        success: function(data) {
                            App.hideToast();
                            if (data.ret == 999001) {
                                App.goTo('login');
                            } else if (data.ret == 0) {
                                clearInterval(self.paytimer);
                                clearInterval(self.ordertimer);
                                App.goTo("ttl_pay_success");
                                localStorage.setItem('ttl_success_data', JSON.stringify(data));
                            } else if (data.ret == 300001) {
                                clearInterval(self.ordertimer);
                                clearInterval(self.paytimer);
                                self.payCountAlert = handle.alert(data.data.orderStatusReason, function() {
                                    App.goTo("redeem");
                                });
                                self.payCountAlert.show();
                            } else {
                                clearInterval(self.ordertimer);
                                clearInterval(self.paytimer);
                            }

                        },
                        error: function() {
                            App.hideLoading();
                            App.showToast('网络错误,请稍后重试');
                        }
                    });
                },
                showAcountValue: function() {
                    var str = data.amountVal
                    var money = str.toString().split('.');
                    var show = money[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,') + (_.isUndefined(money[1]) ? '.00' : money[1].length == 1 ? "." + money[1] + "0" : "." + money[1])
                    $('#amount_num').html("¥" + show);
                },
                onHideLayer: function() {
                    clearInterval(self.paytimer);
                    clearInterval(self.ordertimer);
                    getCodeFlag_ttl=false
                    self.hide();
                },
                getCode: function() {
                    if(getCodeFlag_ttl){
                        return
                    }
                    getCodeFlag_ttl=true
                    App.showLoading();
                    getTtlPayCode.exec({
                        type: 'get',
                        success: function(data) {
                            App.hideLoading();
                            if (data.ret == 0) {
                                self.showCodeCountDown(59);
                            } else if (data.ret == 999001) {
                                //self.$el.find('.js_code').data("hascode", 0);
                                getCodeFlag_ttl=false
                                App.goTo('login');
                            }else if (data.ret == 100017) {
                                 App.showToast('还需要等待' + data.data.waitSeconds + '秒');
                            } else {
                                App.showToast(data.msg || "网络错误");
                            }
                        },
                        error: function() {
                            App.hideLoading();
                        }
                    });
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
                            App.showToast(message);
                        }
                    })
                },
                payOrder: function() {
                    var code = $('#checkCode').val();
                    var psw = $('#checkPassword').val();
                    var orderNo = data.orderNo;

                    if (code == "") {
                        App.showToast("验证码不能为空");
                        return;
                    }

                    App.showLoading();
                    goTtlPayOrder.set({
                        'checkMsg': code,
                        'orderNo': orderNo
                    });
                    goTtlPayOrder.exec({
                        type: 'post',
                        success: function(data) {
                            App.hideLoading();
                            if (data.ret == 0) {
                                self.$el.find('.gopay').html('支付中');
                                self.$el.find('.gopay').css('background-color', '#898989');
                                self.showCountToast(orderNo);
                            } else if (data.ret == 999001) {
                                self.hide();
                                handle.goLogin();
                            } else {
                                clearInterval(self.codetimer);
                                getCodeFlag_ttl=false;
                                self.$el.find('.js_code').removeClass("code_disabled");
                                self.$el.find('.js_code').html('获取验证码');
                                self.$el.find('#checkCode').val('');
                                self.$el.find('#checkPassword').val('');

                                if (data.ret == 999901) {

                                    self.promptAlert = handle.alert(data.msg);
                                    self.promptAlert.show();
                                } else if (data.ret == 110203) {
                                    self.promptAlert = handle.prompt('您的银行卡处于换卡中，无法进行投资，请继续完成换成或终止换卡', '放弃', '去更换', function() {
                                        //解除锁定
                                        self.giveUp()
                                        self.hide();
                                    }, function() {
                                        //继续更换
                                        App.goTo("rebind_card")
                                    });
                                    self.promptAlert.show();

                                } else if (data.ret == 300008 || data.ret == 300004) {
                                    App.showToast(data.msg, 3000)
                                    self.hide();
                                } else {
                                    App.showToast(data.msg)

                                }

                            }
                        },
                        error: function() {
                            App.hideLoading();
                            self.hide();
                            App.showToast('网络错误');

                        }
                    })
                },
                goForgetPassword: function() {
                    self.hide();
                    App.goTo("forget_password");
                }
            });
            popwin.show();
        }
    }


    return Common;
});