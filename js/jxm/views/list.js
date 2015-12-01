//产品列表
define(function (require, exports, module) {
        var footer = require('jxm/tpl/footer.tpl');
        var list = require('jxm/tpl/list.tpl');
        var model = require('jxm/model/model');
        var store = require('jxm/model/store');
        var tool = require('jxm/utils/Tool');
        var listModel = new model.listModel();
        var loginStore = new store.loginStore();
        var realStatusCheck = new model.realStatusCheck();
        var abortChange= new model.abortChange();
        var getUserInfo = new model.getUserInfo();
        var toInvestConfirmMode = new model.toInvestConfirm();
        var page;
        var handle = new tool();
        var timer = {};
        var message = '网络错误，请稍后重试';
        var imageSlider = null;
        var self;
        var noProgress = handle.noProgress();
        module.exports = App.Page.extend({
            initialize: function(){
                self = this;
            },
            events: {
                'click .js_my_invest': 'myInvest',//我的投资
                'click .js_setting': 'setting',//设置
                'click .js_list_btn': 'listBtn',//购买
                'click .js_list_item': 'listItem'//产品跳转
            },
            onShow: function () {
                var query = this.request.query;
                var openid=query&&query.openid||"";
                if(openid!=""){
                    sessionStorage.setItem("openid",openid);
                }

                self.setHeader();
                handle.share();
                handle.orientationTips();
                self.$el.html('<div class="mod_focus js_show_ad" style="height:188px"></div><div class="js_content"></div>' + footer);
                self.$('.js_product_list').addClass('cur');

                    self.getUserInfo();

                return self.showProduct();
            },
            noProduct: function(){
                self.$('.js_content').html('<div class="no_products ico_logo">暂无可投资产品</div>');
            },
            getUserInfo:function(){
                getUserInfo.exec({
                    type: 'get',
                    success: function(data){
                        if(data.ret == 0){
                            loginStore.set(data.data);
                            self.showAd();
                        }else if(data.ret == 999001){
                            handle.goLogin();
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
                            handle.goLogin();
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

            showProduct: function(){
                App.showLoading();
                page = 1;
                listModel.set({'type': 0,'page': page});
                return listModel.exec({
                    type: 'get',
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){
                            if(data.data){
                                //console.log(data.data)
//                                var userInfo={
//                                    "userId":data.userid,
//                                    "role":data.role,
//                                    "inviteCode":data.inviteCode
//
//                                }
//                                loginStore.set(data.data);
                                if(data.data.items && data.data.items.length){
                                    //取秒比较
                                    var serverTime = Math.floor(handle.dealTime(data.data.serverTime).getTime()/1000);
                                    _.each(data.data.items, function(item){
                                        item.time = serverTime;
                                        //倒计时
                                        item.getSaleEndTime = Math.floor(handle.dealTime(item.saleEndTime).getTime()/1000);
                                        item.getSaleStartTime = Math.floor((handle.dealTime(item.saleStartTime).getTime())/1000);
                                        item.getSaleEndString = handle.countDown(item.getSaleEndTime - item.time);
                                        item.getSaleStartString = handle.countDown(item.getSaleStartTime - item.time);
                                        if(item.saleStatus == 1 || item.saleStatus == 2){
                                            timer[item.productNo] = setInterval(function(){ self.showTime(item);},1000);
                                        }
                                        item.btnText = handle.btnStatus(item.saleStatus);
                                        //item.investDeadline_Date=item.investDeadline.substring(item.investDeadline.length-1);
                                        //item.investDeadline=item.investDeadline.substring(0,item.investDeadline.length-1);
                                    });
                                    data.data.noProgress = noProgress;
                                    data.data.cutTime = handle.cutTime;
                                    data.data.showTag = handle.showTag;
                                    data.data.comeType = handle.comeType;

                                    data.data.show = true;
                                    data.data.showhistory = false;
                                    self.$('.js_content').html(_.template(list)(data.data));
                                    self.nextProduct();
                                }else{
                                    self.noProduct();
                                }
                            }else{
                                    self.noProduct();
                            }
                        }else if(data.ret == 999001){
                            handle.goLogin();
                            self.clearTime();
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
            nextProduct: function(){
                listModel.set({'type': 1,'page': page});
                return listModel.exec({
                    type: 'get',
                    success: function(data){
                        if(data.ret == 0){
                            if(data.data && data.data.items.length){
                                //取秒比较
                                var serverTime = Math.floor(handle.dealTime(data.data.serverTime).getTime()/1000);
                                _.each(data.data.items, function(item){
                                    item.time = serverTime;
                                    //倒计时
                                    item.getSaleEndTime = Math.floor(handle.dealTime(item.saleEndTime).getTime()/1000);
                                    item.getSaleStartTime = Math.floor((handle.dealTime(item.saleStartTime).getTime())/1000);
                                    item.getSaleEndString = handle.countDown(item.getSaleEndTime - item.time);
                                    item.getSaleStartString = handle.countDown(item.getSaleStartTime - item.time);
                                    if(item.saleStatus == 1 || item.saleStatus == 2){
                                        timer[item.productNo] = setInterval(function(){ self.showTime(item);},1000);
                                    }
                                    item.btnText = handle.btnStatus(item.saleStatus);
                                    //item.investDeadline_Date=item.investDeadline.substring(item.investDeadline.length-1);
                                    //item.investDeadline=item.investDeadline.substring(0,item.investDeadline.length-1);
                                });
                                data.data.cutTime = handle.cutTime;
                                data.data.comeType = handle.comeType;
                                data.data.showTag = handle.showTag;
                                data.data.show = false;
                                data.data.showhistory = true;
                                data.data.noProgress = noProgress;
                                self.$('.js_loading').before(_.template(list)(data.data));
                                self.$('.js_history_title').hide();
                                self.$('.js_history_title').eq(0).show();
                                $(window).bind('scroll', function(){
                                    if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                                        self.$('.js_loading').show();
                                        page++;
                                        if(page <= data.data.totalPages){
                                            self.nextProduct();
                                        }else{
                                            page = data.data.totalPages;
                                            $(window).unbind('scroll');
                                            self.$('.js_loading').hide();
                                        }
                                    }
                                })
                            }
                        }else if(data.ret == 999001){
                            self.clearTime();
                            handle.goLogin();
                        }else{
                            self.$('.js_loading').hide();
                        }
                    },
                    error: function(){
                        self.$('.js_loading').hide();
                    }
                })
            },
            showAd: function(){
                var container = self.$('.js_show_ad');
                var minHeight= $(window).width() / 3.2;
                container.css({
                    'max-height': minHeight,
                    'min-height': minHeight,
                    'height': minHeight
                });
                var user=loginStore.get();

                var imgs;
                if(user.role=="05"||user.role=="04"){
                    imgs=[

//                        { id: 6, src: './images/hnjh.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400861107&idx=1&sn=0c871833c6cadd1cb7e546f2de22da5c#rd' },
                        { id: 4, src: './images/zbs12.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=401190971&idx=1&sn=4c1659ecf9359c282c06c68df34fa92d#rd' },
                        { id: 5, src: './images/yjsj.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400415017&idx=1&sn=6e86003f555afdf414af70b9551b85dc&scene=1&srcid=1030tIOyMCMBNev6ytPOKZXj#wechat_redirect' },
//                    { id: 1, src: './images/zbs.png', href:window.location.origin+'/activity/818hero/heroList.html'  },
                        { id: 2, src: './images/xszn.jpg', href:'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=209894037&idx=1&sn=5ad856a2d275475c801c6a0604874843#rd'  },
                        { id: 3, src: './images/xszy.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=210062014&idx=1&sn=babbf5cda487369cf0ae489719e12a73#rd ' }
                    ];
                }else{
                    imgs=[
//                        { id: 6, src: './images/hnjh.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400861107&idx=1&sn=0c871833c6cadd1cb7e546f2de22da5c#rd' },
                        { id: 4, src: './images/zbs12.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=401190971&idx=1&sn=4c1659ecf9359c282c06c68df34fa92d#rd' },
//                    { id: 1, src: './images/zbs.png', href:window.location.origin+'/activity/818hero/heroList.html'  },
                        { id: 2, src: './images/xszn.jpg', href:'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=209894037&idx=1&sn=5ad856a2d275475c801c6a0604874843#rd'  },
                        { id: 3, src: './images/xszy.jpg', href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=210062014&idx=1&sn=babbf5cda487369cf0ae489719e12a73#rd ' }
                    ];
                }


                if (!imageSlider) {
                    imageSlider = new App.UI.UIImageSlider({
                        datamodel: {
                            data: imgs,
                            itemFn: function (item) {
                                return item.src ? '<img width="100%"  src="' + item.src + '" data-href="' + item.href + '">' : '</img>';
                            }
                        },
                        displayNum: 1,
                        wrapper: container,
                        autoPlay: true,
                        itemClick: function(e){
                            if(window.WebViewJavascriptBridge){
                                if(e.id==1){
                                    window.location.href=e.href;
                                }else{
                                    window.WebViewJavascriptBridge.callHandler('openUrl',{"url": e.href},function(response) {})
                                }

                            }else{
                                window.location.href=e.href;
                            }
                        }
                    });
                }
                imageSlider.show();
            },
            //产品倒计时
            showTime: function(item){
                //saleStatus 1 售卖中 2 即将开始 3 售卖结束
                var listItem = self.$('#' + item.productNo);
                var listTime = listItem.find('.js_list_time');
                var listBtn = listItem.find('.js_list_btn');
                if(item.saleStatus == 1){
                    listItem.attr('data-sale','1');
                    listTime.html('距离购买结束：' + handle.countDown(item.getSaleEndTime - item.time));
                    listBtn.html('<span class="btn_link btn_link1">' + handle.btnStatus(1) + '</span>');
                    ++item.time;
                    if(item.getSaleEndTime - item.time == 0){
                        item.saleStatus = 3;
                    }
                }else if(item.saleStatus == 2){
                    listItem.attr('data-sale','2');
                    listTime.html('距离购买开始：' + handle.countDown(item.getSaleStartTime - item.time));
                    listBtn.html('<span class="btn_link btn_link3">' + handle.btnStatus(2) + '</span>');
                    ++item.time;
                    if(item.getSaleStartTime - item.time == 0){
                        item.saleStatus = 1;
                    }
                }else{
                    listItem.removeAttr('data-sale');
                    listTime.html('购买结束时间：' + handle.cutTime(item.saleEndTime));
                    listBtn.html('<span class="btn_link btn_link2">' + handle.btnStatus(3) + '</span>');
                    listItem.find('.js_progress').replaceWith(noProgress);
                    clearInterval(timer[item.productNo]);
                }
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '产品列表',
                    back: {
                        'tagname': '',
                        callback: function () {}
                    },
                    right: null
                });
            },
            myInvest: function(){
                App.goTo('my_invest');
            },
            setting: function(){
                App.goTo('setting');
            },
            listItem: function(e){
                var isHistory = $(e.currentTarget).closest('.js_listing').data('history') ? '&history=1' : '';
                App.goTo('detail?pid=' + $(e.currentTarget).attr('id') + isHistory);
            },
            listBtn: function(e){
                e.stopImmediatePropagation();
                var closest = $(e.currentTarget).closest('.js_list_item');
                var status = $(closest).data('sale');
                var pid = $(closest).attr('id');
                var time  = $(closest).data('time');
                if(status == 1){
                    //立即购买
                    self.toInvestConfirm(pid);
                }else if(status == 2){
                    //即将开始
                    self.alert = handle.alert('该产品将于' + time + '准时开售，敬请期待');
                    self.alert.show();
                }else{
                    //已结束跳转产品详情页
                    App.goTo('detail?pid=' + pid);
                }
            },
            giveUp:function(){
                abortChange.exec({
                    type: "post",
                    success: function (data){
                        if(data.ret == 0){
                            //解锁成功
//                            self.toInvestConfirm(pid);
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
            toInvestConfirm: function(pid){
                App.showLoading();
                toInvestConfirmMode.set({'productNo': pid});
                toInvestConfirmMode.exec({
                    type: 'post',
                    success: function(data){
                        App.hideLoading();
                        if(data.ret == 0){
                            App.goTo('invest_confirm?pid=' + pid)
                        }else if(data.ret == 110001){
                            //未绑定银行卡
                            if(!self.promptAlert){
                                self.promptAlert = handle.prompt('未绑定银行卡，是否现在去设置','放弃', '去设置', null, function(){
                                    handle.setProductLink('list');
                                    App.goTo('bind_card_new');
                                });
                            }
                            self.promptAlert.show();
                        }else if(data.ret == 110009){
                            //未设置交易密码
                            if(!self.passAlert){
                                self.passAlert = handle.prompt('未设置交易密码，是否现在去设置','放弃', '去设置', null, function(){
                                    handle.setProductLink('list');
                                    App.goTo('set_card_psw');
                                });
                            }
                            self.passAlert.show();
                        }else if(data.ret == 110203){
//                            self.promptAlert = handle.alert(" 您的银行卡处于换卡中，由于系统升级请使用原卡进行购买",function(){
//                                //解除锁定
//                                self.giveUp(pid)
//                            });
//                            self.promptAlert.show();

                            self.promptAlert = handle.prompt('您的银行卡处于换卡中，无法进行投资，请继续完成换成或终止换卡','放弃', '去更换',function(){
                                //解除锁定
                                self.giveUp()
                            }, function(){
                                //继续更换
                                App.goTo("rebind_card")
                            });
                            self.promptAlert.show();
                        }
                        else if(data.ret == 999001){
                            self.clearTime();
                            handle.goLogin();
                        }else{
                            App.showToast(data.msg  || message);
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message)
                    }
                })
            },
            //清除所有的时间
            clearTime: function(){
                for(var i in timer){
                    if(timer[i]) clearInterval(timer[i]);
                }
            },
            onHide: function(){
                self.clearTime();
                imageSlider = null;
                if(self.alert){ self.alert.hide();}
                if(self.promptAlert){self.promptAlert.hide();}
                if(self.passAlert){self.passAlert.hide();}
                self.$el.html('');
            }
        })
})


















