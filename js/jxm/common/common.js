define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var store = require('jxm/model/store');
    var payOrderMode = new Model.payOrder();
    var confirmRedeem = new Model.confirmRedeem();
    var getMsgCodeModel = new Model.getMsgCodeModel();
    var getTtlPayCode = new Model.getTtlPayCode();
    var goTtlPayOrder = new Model.goTtlPayOrder();
    var goTtlPayResult = new Model.goTtlPayResult(); 
    var checkOrder = new Model.checkOrder();    
    var abortChange = new Model.abortChange();
    var tool = require("jxm/utils/Tool");
    var qrcode = require("jxm/utils/qrcode");
    var handle = new tool();
    var share = require("jxm/tpl/share.tpl");
    var shareBonus = require("jxm/tpl/shareBonus.tpl");
    var loginStore = new store.loginStore();
    var Common = {
        showPayWin: function(order, data, hasCode) {
            var tem = '<div id="js_paywin" class="mod_popup" style="width:300px;">\
                          <div class="pop_cont">\
                            <div class="pop_hd">\
                              <h2>支付验证</h2>\
                              <a href="javascript:void(0)" class="btn_close js_close"></a></div>\
                            <div class="pop_bd">\
                              <div class="pay_info">\
                                <h3>' + order.productName + '</h3>\
                                <p class="sum"><span class="tag_name">支付金额</span><span class="webtxt numb">' + data.paymentAmount + '</span></p>';

            tem += '<p class="sum"><span class="tag_name">红包</span><span class="webtxt numb">' + data.crAmount + '</span></p>'

            tem += '</div>\
                              <div class="bank_info">\
                                <div class="v_item">\
                                  <div class="v_item_hd"><span class="bank_img"><img src="' + data.bankLogo + '" alt=""></span><span class="bank_name">' + data.bankName + '</span><span class="bank_card">尾号' + data.cardTailNo + '</span></div>\
                                  <div class="v_item_bd"><span style="display: block">支付限额</span><span class="webtxt numb" style="display: block;font-size: 1.2rem">' + data.transactLimit + '</span></div>\
                                </div>\
                              </div>\
                              <div class="pay_form">\
                                <ul>\
                                  <li class="frm_item frm_item_getcode">\
                                    <label for="inpt_code">验证码</label>\
                                    <input type="text" id="inpt_code" maxlength="8 "class="frm_inpt" value="" placeholder="" style="padding-right:10px;" >\
                                    <span class="code js_code">获取验证码</span></li>\
                                  <li class="frm_item">\
                                    <label for="inpt_pssword">交易密码</label>\
                                    <input type="password" id="inpt_pssword" maxlength="12" class="frm_inpt" value="" placeholder="" >\
                                  </li>\
                                  <li class="frm_btn"> <a href="javascript:void(0)" class="btn_link btn_link2 js_pay">支付</a> </li>\
                                  <li class="frm_tips">请在<span class="webtxt time js_time">' + '-分-秒' + '</span>内完成支付！</li>\
                                </ul>\
                              </div>\
                            </div>\
                          </div>\
                          <div class="mod_popup_mask hidden" style="background:#000;opacity:0.5;position:absolute;left:20px;top:5px;width:270px;height:375px"></div>\
                          <div class="mod_popup_toast hidden" style="text-align:center;height:20px;top:180px;position:absolute;left:50%;background:#000;opacity:0.8;padding:10px 20px;color:#fff;border-radius:5px"></div>\
                        </div>'

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
                                //                               else if(data.ret ==300002){
                                //                                   clearInterval(self.paytimer);
                                //                                   self.payCountAlert  = handle.alert('支付确认中，请到"我的投资"查看支付结果', function(){
                                //                                       App.goTo("my_invest")
                                //                                   });
                                //                                   self.payCountAlert.show();
                                //                               }
                                else {
                                    clearInterval(self.paytimer);
                                    //App.showToast(data.msg);
                                }
                            }
                        },
                        error: function() {
                            App.hideLoading();
                            App.showToast('网络错误,请稍后重试');
                        }
                    });

                },
                showSelfToast: function(message) {
                    var self = this;
                    self.$el.find('.mod_popup_toast').html(message);
                    self.$el.find('.mod_popup_mask').toggleClass('hidden')
                    self.$el.find('.mod_popup_toast').toggleClass('hidden')

                    var left = self.$el.find('.mod_popup_toast').width() / 2
                    self.$el.find('.mod_popup_toast').css('margin-left', '-' + left + 'px')
                    self.hideSelfToast();
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
                    App.showToast('<img src="./images/yl.png" width="40%" style="margin: 10px 0"><br>支付结果已提交，请等待<span id="js_pay_count_down">10</span>秒', 10000);
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
                        self.$el.find('.js_code').data("hascode", 1);
                        self.$el.find('.js_code').addClass("code_disabled");
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.codetimer);
                            self.$el.find('.js_code').html('获取验证码');
                            self.$el.find('.js_code').data("hascode", 0);
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
                        self.showCodeCountDown(60);
                    }

                },
                onHide: function() {
                    var self = this;
                    clearInterval(self.paytimer);
                    clearInterval(self.codetimer);
                    clearInterval(self.ordertimer);
                    self.$el.find('.js_code').data("hascode", 0);
                    self.$el.find('.js_code').removeClass("code_disabled");
                    //alert隐藏
                    self.payCountAlert && self.payCountAlert.hide();
                    self.payCountAlert && self.orderCountAlert.hide();
                },
                getCode: function() {
                    var self = this;
                    if (self.$el.find('.js_code').data("hascode")) {
                        return;
                    }

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
                            self.showCodeCountDown(data.data.retryWait);
                        } else if (data.ret == 999001) {
                            self.$el.find('.js_code').data("hascode", 0);
                            App.goTo('login');
                        } else {
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
                                self.$el.find('.js_code').data("hascode", 0)
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
                weixin: '<div class="mod_guide js_share_info" style="position:fixed;top:0px;right:0px;">\
                            <div class="guide_img js_share_close"><img src="images/invite.png" alt=""></div>\
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
        payRedeem: function(redeemValue) {
            var tem = '<div class="payRedeem">\
                        <div class="payRedeem_title">交易密码<div class="payRedeem_close"></div></div>\
                        <div class="payRedeem_input">交易密码<input type="password" id="redeemPwd" maxlength="12"></div>\
                        <p class="payRedeem_forget"><a id="payRedeem_forget_a">忘记交易密码？</a></p>\
                        <button class="payRedeem_btn payRedeem_margin payRedeem_bgGrey" id="payRedeem_btn">确认赎回</button>\
                    </div>';
            var payFlag=false;
            var popwin = new App.UI.UIPopWin({
                events:{
                    "click .payRedeem_close":"onHideLayer",
                    "click #payRedeem_forget_a":"forget",
                    "input #redeemPwd":"canPay",
                    "click .payRedeem_btn":"doPay"

                },
                maskToHide: false,
                template: tem,
                onHideLayer: function() {
                    this.hide();
                },
                canPay:function(){
                    var tradePassword =$('#redeemPwd').val();
                    if(tradePassword.length>0){
                        payFlag=true;
                        $('#payRedeem_btn').removeClass("payRedeem_bgGrey")
                        $('#payRedeem_btn').addClass("payRedeem_bgRed")
                    }else{
                        payFlag=false;
                        $('#payRedeem_btn').addClass("payRedeem_bgGrey")
                        $('#payRedeem_btn').removeClass("payRedeem_bgRed")
                    }
                },
                forget:function(){
                    App.goTo("forget_password")
                    this.hide();
                },
                doPay:function(){
                    if(!payFlag){
                        return
                    }

                    var tradePassword =$('#redeemPwd').val();
                    if(tradePassword==""){
                        App.showToast("请输入交易密码")
                        return
                    }
                    var data={
                        'tradePassword':tradePassword,
                        'redeemAmount':redeemValue
                    }
                    App.showLoading()
                    confirmRedeem.set(data)
                    confirmRedeem.exec({
                        type: 'post',
                        success: function(data){
                            App.hideLoading();
                            if(data.ret == 0){
                                App.goTo("redemption_finish?redeemAmount="+data.data.redeemAmount+"&redeemTime="+data.data.redeemTime+"&ransomId=-1")

                            }else if(data.ret == 999001) {
                                handle.goLogin();
                            }else{
                                self.promptAlert = handle.alert(data.msg,function(){
                                    this.hide();
                                });
                                self.promptAlert.show();
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
        ttlPayWin: function(data){
            var tem = '<article class="ttl_pay_test">\
                    <div class="ttl_pay_test_t">支付验证<em class="close" id="payClose"></em></div>\
                    <div class="ttl_pay_test_m">\
                        <div class="paycontent pay_form">\
                            <ul>\
                              <li class="frm_item frm_item_getcode">\
                                <label for="inpt_code">验证码</label>\
                                <input type="text" id="checkCode" maxlength="8 "class="frm_inpt" value="" placeholder="" style="padding-right:10px;" >\
                                <span class="code js_code">获取验证码</span></li>\
                              <li class="frm_item">\
                                <label for="inpt_pssword">交易密码</label>\
                                <input type="password" id="checkPassword" maxlength="12" class="frm_inpt" value="" placeholder="" >\
                              </li>\
                              <li class="forget"><a href="#" class="forget_password" id="forget_password">忘记交易密码?</a></li>\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="ttl_pay_test_b">\
                        <div class="action">\
                            <input type="button" value="支付" class="gopay" id="gopay" />\
                            <p class="tip">请在 <em class="tip_num"></em> 内完成支付！</p>\
                        </div>\
                    </div>\
                </article>';
            var self = null;
            var popwin = new App.UI.UIPopWin({
                maskToHide: false,
                template: tem,
                events: {
                    'click #payClose': 'onHideLayer',
                    'click #gopay': 'payOrder',
                    'click .js_code': 'getCode',
                    'click #forget_password':'goForgetPassword'
                },
                initialize: function() {
                    return this;
                },
                onShow: function() {
                    self = this.initialize();
                    self.showOrderCountDown();
                    self.showCodeCountDown(60);                    
                },
                showCodeCountDown: function(timer) {
                    //获取验证码倒计时
                    var second = timer || 60;
                    clearInterval(self.codetimer);
                    self.codetimer = setInterval(function() {
                        self.$el.find('.js_code').html('已获取（' + second + '）');
                        self.$el.find('.js_code').data("hascode", 1);
                        self.$el.find('.js_code').addClass("code_disabled");
                        second -= 1;
                        if (second == -1) {
                            clearInterval(self.codetimer);
                            self.$el.find('.js_code').html('获取验证码');
                            self.$el.find('.js_code').data("hascode", 0);
                            self.$el.find('.js_code').removeClass("code_disabled");
                        }
                    }, 1000);
                },
                showOrderCountDown: function() {
                    //支付倒计时
                    var surplus = data.postData.surplusPayTime;
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
                    App.showToast('<img src="./images/yl.png" width="40%" style="margin: 10px 0"><br>支付结果已提交，请等待<span id="js_pay_count_down">10</span>秒', 10000);
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
                                App.goTo("ttl_pay_success");
                                localStorage.setItem('ttl_success_data', JSON.stringify(data));
                                clearInterval(self.paytimer);
                            } else if (data.ret == 300001) {
                                clearInterval(self.paytimer);
                                self.payCountAlert = handle.alert(data.data.orderStatusReason, function() {
                                    App.goTo("my_invest");
                                });
                                    self.payCountAlert.show();
                            }else{
                                clearInterval(self.paytimer);                                
                            }
                                
                        },
                        error: function() {
                            App.hideLoading();
                            App.showToast('网络错误,请稍后重试');
                        }
                    });
                },
                onHideLayer: function() {

                    self.hide();
                },
                getCode: function() {
                    if (self.$el.find('.js_code').data("hascode")) {
                        return;
                    }

                    App.showLoading();
                    getTtlPayCode.exec({
                        type: 'get',
                        success: function(data){
                            App.hideLoading();
                            if (data.ret == 0) {
                                self.showCodeCountDown(60);
                            } else if (data.ret == 999001) {
                                self.$el.find('.js_code').data("hascode", 0);
                                App.goTo('login');
                            } else {
                                App.showToast(data.msg || "网络错误");
                            }
                         },
                        error: function(){
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
                    var orderNo= data.postData.orderNo;

                    if (code == "") {
                        App.showToast("验证码不能为空");
                        return;
                    }
                    if (psw == "") {
                        App.showToast("请输入平台交易密码");
                        return;
                    }
                    

                    App.showLoading();
                    goTtlPayOrder.set({
                        'checkMsg': code,
                        'tradePwd': psw,
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
                                self.$el.find('.js_code').data("hascode", 0)
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
                
                goForgetPassword: function(){
                    self.hide();
                    App.goTo("forget_password");
                }
            });
            popwin.show();
        }
    }


    return Common;
});
