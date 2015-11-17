define(function (require, exports, module) {
	var Model = require("jxm/model/model");
	var Store = require("jxm/model/store");
	var Template = require("jxm/tpl/my_invite.tpl");
	//接口
	var myInvite = new Model.myInvite();
	var tool = require('jxm/utils/Tool')
	var handle = new tool();
	var payLayer = require("jxm/common/common");
	var loginStore = new Store.loginStore();
	var self;
	module.exports = App.Page.extend({
		events: {
			'click .js_contract': 'goContract',
            'click .js_close': 'goClose',
            'click .js_situation':'toRanking'
		},
		initialize:function(){
			self = this;
		},
		onShow: function () {
			handle.share();
			this.setHeader();
			return this.render();
		},
        goClose: function () {
            this.$el.find('.new_active').hide();
        },
        toRanking:function(){
            window.location.href="./activity/ranking/ranking.html"
        },
		render: function () {
			var self = this;
			App.showLoading();
			return myInvite.exec({
				type: 'get'
			}).then(function (data) {
				App.hideLoading();

				if(data.ret == 0){
					self.data = data.data;

					if(self.data.role =="01"){
						self.data.invListlength = self.data.invList.length
					}else {
						self.data.inviteeListlength = self.data.inviteeList.length
					}

					
					//var reg = /(\d{3})\d{4}(\d{4})/;
					/*if(self.data.role =="01"){
						self.data.invListlength = self.data.invList.length
						self.data.invList &&  _.each(self.data.invList,function(inviter){
							inviter.userId = inviter.userId.replace(reg,"$1****$2");
						})
						
					}else {
						self.data.inviteeListlength = self.data.inviteeList.length
						self.data.inviteeList &&  _.each(self.data.inviteeList,function(inviter){
							inviter.userId = inviter.userId.replace(reg,"$1****$2");
						})
					}*/
					

					self.$el.html(_.template(Template)(self.data));

        		}else if (data.ret == 999001){
					handle.goLogin();
        		}else{
					App.showToast(data.msg  || '网络错误');
        		}
			}).catch(function (error) {
				App.hideLoading();
				App.showToast(error.msg  || '网络错误');
			})
		},
		goContract: function (e) {
			//App.goTo('get_contract?cid='+$(e.currentTarget).attr('id'))
			if (loginStore.get() && loginStore.get().role == "01") {
				App.goTo("contract_one");
			} else if(loginStore.get() && loginStore.get().role == "02" || loginStore.get()&&loginStore.get().role == "03"){
				App.goTo("contract_two");
			}else if(loginStore.get() && loginStore.get().role == "04" || loginStore.get()&&loginStore.get().role == "05"){
				App.goTo("contract_three");
			};
		},
		onHide: function (){
			var self = this
			self.$el.html('');
		},
		setHeader: function () {
			var header = new App.UI.UIHeader();
			header.set({
				view: this,
				title: '我的邀请',
				back: {
					'tagname': 'back',
					callback: function () {
						App.goBack()
					}
				},
				right: [{
					'tagname': 'invite', 'value': '',
					itemFn: function () {
				    	return '<span class="right_txt_btn user js_invite">邀请好友</span>';
				    },
				    callback: function () {
                        if (window.WebViewJavascriptBridge){
                            var shareConfig={'title': '能送现金红包的理财平台，你听说过吗？','url':handle.inviteCode(),'desc':'加薪猫提供7%-13%年化收益率的理财产品,首次投资秒送30元微信现金红包,身边的好友都抢疯了!'};
                            window.WebViewJavascriptBridge.callHandler('doShare',shareConfig,function(response) {
                                //TODO
                            })
                        }else{
                            payLayer.inviteFriends();
                        }
				    }
				}]
			});
		}
	})
})