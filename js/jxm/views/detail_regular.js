define(function (require, exports, module) {
	var Model = require("jxm/model/model");
	var Store = require("jxm/model/store");
	var getOrderInfo = new Model.getOrderInfo();
	var payLayer = require("jxm/common/common")
	var Template = require("jxm/tpl/detail_regular.tpl");
	var tool = require('jxm/utils/Tool');
	var handle = new tool();
	var self;
    var androidFlag=false;
	//接口
	module.exports = App.Page.extend({
		events: {
			'click .js_product': 'goDetail',
			'click .js_pay': 'goPay'
		},
		initialize:function(){
			self = this;
		},
		onShow: function () {
            var query = this.request.query;
            if(query&&query.android){
                    androidFlag=query.android
            }
            this.setHeader(false)
			return this.render()
		},
        loginTimeout:function(){
            if(androidFlag){
                window.orderDetail.loginOverTime()
                return
            }
            handle.goLogin();
        },
		render: function () {
			var self = this
			App.showLoading();
			var query = this.request.query;
                if(_.isUndefined(query) || _.isUndefined(query.oid)){
                    App.goTo('my_invest');
                    return;
                }
            getOrderInfo.set({'orderNo': query.oid});
			return getOrderInfo.exec({
            	type:'get',
            	success: function (data){
            		App.hideLoading();
            		if(data.ret == 0){
            			self.data = data.data
            			self.amount = self.data.fixedProdInfo.investAmout
            			
            			self.timer;
						//判断协议
						if(data.data.orderStatus!="01"&&data.data.orderStatus!="02"&&data.data.orderStatus!="03"&&data.data.orderStatus!="04"&&data.data.orderStatus!="06"){
							self.setHeader(true)
						}
            			//等待支付倒计时
            			if(data.data.orderStatusDesc == "等待支付"){
            				var surplus =  data.data.surplusPayTime;
		                    self.timer = setInterval(function(){ 
		                        var minute = Math.floor(surplus/60);
		                        var second = surplus - minute*60;
		                        $('.js_time').html( minute +'分'+ second +'秒');
		                        surplus -= 1;
		                        self.data.surplusPayTime=surplus-1;
		                        if(surplus == -1) {
		                            clearInterval(self.timer);
		                            self.hide()
		                            self.getOrderInfoAlert = handle.alert('订单已关闭，请重新购买', function(){
                                        if(androidFlag){
                                            window.orderDetail.goToMyInvest()
                                            return
                                        }
                                        App.goTo("my_invest")
                                    }).show();
		                        }
		                    },1000);
            			}


	            	self.$el.html(_.template(Template)(data.data));

            		}else if (data.ret == 999001){
						self.loginTimeout();
            		}else{
						App.showToast(data.msg  || '网络错误');
            		}
	            	
            	},
            	error: function(){
            		App.hideLoading();
                    App.showToast('网络错误');
            	}
            })
		},
		goPay: function () {
            if(androidFlag){
                window.orderDetail.pay(self.data)
                return
            }
//			payLayer.showPayWin(self.data,self.data.paymentAmount,self.data.crAmount,self.data,false)
			payLayer.showPayWin(self.data,self.data,false)
		},
		onHide: function (){
			var self = this
			self.$el.html('');
			clearInterval(self.timer);
			//alert隐藏
			self.getOrderInfoAlert && self.getOrderInfoAlert.hide()
		},
		goDetail: function (e) {
            var query = this.request.query;
            var oid=query.oid
            if(androidFlag){
                window.orderDetail.productDetail(oid)
                return
            }
			App.goTo('detail?pid=' + $(e.currentTarget).attr('id'));
		},
		setHeader: function (showContract) {
			var header = new App.UI.UIHeader();
			header.set({
				view: this,
				title: '订单详情',
				back: {
					'tagname': 'back',
					callback: function () {
                        App.goBack()
					}
				},
				right: showContract?[{
					'tagname': 'custom', 'value': '协议', 
					itemFn: function () {
				    	return '<span class="cm-header-btn fr js_custom" style="margin-right:10px">协议</span>';
				    },
				    callback: function () {
				        App.goTo("get_contract?cid=18&oid="+self.data.orderNo+"&pid="+self.data.productNo)
				    }
				}]:null
			});
		}
	})

})