define(function (require, exports, module) {
	var Model = require('jxm/model/model');
	var Store = require('jxm/model/store');
	var Template = require('jxm/tpl/invest_history.tpl');
	//接口
	var historyOrder = new Model.historyOrder();
	var tool = require('jxm/utils/Tool');
	var handle = new tool();
	var self;
	var message = '网络错误，请稍后重试';
	module.exports = App.Page.extend({
		initialize:function(){
			self = this;
		},
		onShow: function () {
			this.setHeader();
			return this.showHistory();
		},
		events: {
            'click .js_float': 'goFloat',
            'click .js_regular': 'goRegular'
        },
        goFloat: function (e) {
            e.preventDefault();
            App.goTo("detail_float?oid=" + $(e.currentTarget).attr('id'));
        },
        goRegular: function (e) {
            e.preventDefault();
            App.goTo("detail_regular?oid=" + $(e.currentTarget).attr('id'))
        },
		showHistory: function () {
			App.showLoading();
			return historyOrder.exec({
				type: 'get',
				 success: function(data){
					 App.hideLoading();
					 if(data.ret == 0){
						 if(_.isNull(data.data)){
							data.data = {};
						 }
						 if(_.isUndefined(data.data.orderList)){
							 data.data.orderList = [];
						 }
						 self.$el.html(_.template(Template)(data));
					 }else if (data.ret == 999001){
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
		setHeader: function () {
			var header = new App.UI.UIHeader();
			header.set({
				view: this,
				title: '历史投资记录',
				back: {
					'tagname': 'back',
					callback: function () {
						App.goBack();
					}
				},
				right: null
			});
		}
	})
})