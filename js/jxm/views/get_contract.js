define(function (require, exports, module) {
	var Model = require("jxm/model/model");
	var Store = require("jxm/model/store");
	var Template = require("jxm/tpl/get_contract.tpl");
	var TemplatePay = require("jxm/tpl/get_contract_pay.tpl");

	var getContract = new Model.getContract();
	var tool = require('jxm/utils/Tool')
	var handle = new tool();

	module.exports = App.Page.extend({
		initialize:function(){
			self=this;
		},
		onShow: function () {
			this.setHeader();
			return this.render();
		},
		render: function () {
			var self = this
			var query = this.request.query;
                if(_.isUndefined(query) || _.isUndefined(query.cid)){
					App.showToast("获取数据出错");
					window.setTimeout(function(){App.goBack()},2000)
                    return;
                }
                if(_.isUndefined(query.pid)){
                	query.pid = ''
                }
                if(_.isUndefined(query.oid)){
                	query.oid = ''
                }
			App.showLoading();
            var type=query.type||"2";
//            if(type=="2"&&query.cid==13){
//                self.$el.html(TemplatePay);
//                return
//            }

			getContract.set({'contractNo':query.cid,'productNo':query.pid,'orderNo':query.oid,'type':type})
			return getContract.exec({
				type: 'get'
			}).then(function (data) {
				App.hideLoading();
                    if (data.ret == 0) {
        		        self.$el.html(data.data.contractInfo);
                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || '网络错误');
                    }
			}).catch(function (error) {
				App.hideLoading();
				App.showToast(error.msg  || '网络错误');
				
			})
		},
		onHide: function (){
			var self = this
			self.$el.html('');
		},
		setHeader: function () {
			var header = new App.UI.UIHeader();
			header.set({
				view: this,
				title: '协议条款',
				back: {
					'tagname': 'back',
					callback: function () {
						App.goBack()
					}
				},
				right: null
			});
		}
	})
})