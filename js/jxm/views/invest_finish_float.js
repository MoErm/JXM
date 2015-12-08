define(function (require, exports, module) {
	var Store = require("jxm/model/store");
	var Template = require("jxm/tpl/invest_finish_float.tpl");
	var tool = require("jxm/utils/Tool");
	var common = require("jxm/common/common")
	var handle = new tool();
	var self;
	module.exports = App.Page.extend({
		initialize:function(){
			self = this;
		},
		onShow: function () {
			this.setHeader()
			this.render()
            App.hideLoading();
		},
		render: function(){
			var data = JSON.parse(localStorage.getItem('float'))
			if(_.isNull(data)) {App.showToast("非法请求,将返回列表页");window.setTimeout(function(){App.goTo("list")},2000);return;}
			var investAmount=data.data.fixedProdInfo&&parseFloat((data.data.fixedProdInfo.investAmount).split(",").join(""));
			data.data.today = data.data.createTime.split(" ")[0]
			self.$el.html(_.template(Template)(data.data));
			//if(investAmount&&investAmount>=10000){common.showAD(self)};
			localStorage.removeItem('float')
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