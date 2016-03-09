define(function (require, exports, module) {
	var Store = require("jxm/model/store");
	var Template = require("jxm/tpl/invest_finish_regular.tpl");
	var tool = require("jxm/utils/Tool");
	var common = require("jxm/common/common")
    var model = require('jxm/model/model');
    var activityCondition = new model.activityCondition();
	var handle = new tool();
	var self;
	module.exports = App.Page.extend({
		initialize:function(){
			self = this;
		},
        events: {
            'click .finish_hongbao_btn': 'SeBonus',
            'click .js_notice': 'toAddressReg'
        },
        toAddressReg:function(){
            window.location.href=window.location.origin+'/activity/818hero/addressReg_Xmas.html'
        },

        regQR:function(){
            App.Bridge(function(bridge,scope){
                //bridge.init();
                //注册返回函数
                bridge.registerHandler('showQR', function(data, responseCallback) {
                    common.sendBonus(true,self.data.data.shareUrl);
                    //$(".js_two_dimension").click();
                })
            },self);
        },
        SeBonus:function(){
            self.regQR();
            if(handle.mobileType()=='android'){
                var shareConfig={'title': '我刚刚投资了加薪猫理财，得到一个抵现礼包，快来抢啊！','url':self.data.data.shareUrl,'desc':'红包来了！加薪猫理财，怎么开心怎么来!',"imgUrl":"http://test.jiaxinmore.com/images/bonus_icon.jpg"};
                window.WebViewJavascriptBridge.callHandler('doShare',shareConfig,function(response) {
                    //TODO
                })
            }else {
                common.sendBonus();
                var shareConfig = {"link": self.data.data.shareUrl, "title": "我刚刚投资了加薪猫理财，得到一个抵现礼包，快来抢啊！","desc":"红包来了！加薪猫理财，怎么开心怎么来!","imgUrl":"http://test.jiaxinmore.com/images/bonus_icon.jpg"};
                handle.share(shareConfig);
            }



        },
		onShow: function () {
            App.hideLoading();
			this.setHeader();
			this.render();
		},
		render: function(){
            App.hideLoading();
			var data = JSON.parse(localStorage.getItem('regular'));
            self.data=data;
			if(_.isNull(data)) {App.showToast("非法请求,将返回列表页");window.setTimeout(function(){App.goTo("list")},2000);return;}
			var investAmount=data.data.fixedProdInfo&&parseFloat((data.data.fixedProdInfo.investAmount).split(",").join(""));
			self.$el.html(_.template(Template)(data.data));
            if(self.data.data.hasNewerBonus==1){
                App.hideLoading();
                common.newBonus(self.data.data.bonusAmount,self.data.data.bonusValidityPeriod);
            }
            self.checkUser();
			//if(investAmount&&investAmount>=10000){common.showAD(self)};
			//localStorage.removeItem('regular')
		},
        checkUser:function(){
            activityCondition.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0) {

                        if(data.data&&(data.data.productSource=='00'||data.data.productSource=='01')){

                            if(data.data.isGot=='0'){
                                if(data.data.productSource=='00'){
                                    self.$('.notice_tran_Xmas').html("当日继续投资任意活动产品"+data.data.surplusAmount+"，您即可获取双旦大礼")
                                }else if(data.data.productSource==01){
                                    self.$('.notice_tran_Xmas').html(data.data.zxEndDate+"前继续投资中信保理"+data.data.surplusAmount+"，您即可获取双旦大礼")
                                }
                                self.$('.notice_Xmas').css("display","block")
                                self.$('.js_notice').css("display","block")
                            }else{
                                self.$('.notice_Xmas').css("display","block")
                                self.$('.js_notice').css("display","block")
                                self.$('.notice_tran_Xmas').html(" 您已获得双旦活动奖品，立即前往填写您的收货地址信息")
                            }
                        }else{
                            self.$('.notice_Xmas').css("display","none")
                            self.$('.js_notice').css("display","none")
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
		setHeader: function(){
			var header = new App.UI.UIHeader();
			header.set({
				view: this,
				title: '交易成功',
				back: {
					'tagname': '',
					callback: function () {
						
					}
				},
				right: [{
					'tagname': 'custom', 'value': '完成', 
					itemFn: function () {
				    	return '<span class="cm-header-btn fr js_custom" style="margin-right:10px">完成</span>';
				    },
				    callback: function () {
				    	App.goTo('my_invest')
				    }
				}]
			});
		}
	})
})