define(function (require, exports, module) {
	var Store = require("jxm/model/store");
	var Template = require("jxm/tpl/invest_finish_regular.tpl");
	var tool = require("jxm/utils/Tool");
	var common = require("jxm/common/common")
	var handle = new tool();
	var self;
	module.exports = App.Page.extend({
		initialize:function(){
			self = this;
		},
        events: {
            'click .finish_hongbao': 'SeBonus'
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
			this.setHeader()

			this.render()

		},
		render: function(){
			var data = JSON.parse(localStorage.getItem('regular'))
            self.data=data;
			if(_.isNull(data)) {App.showToast("非法请求,将返回列表页");window.setTimeout(function(){App.goTo("list")},2000);return;}
			var investAmount=data.data.fixedProdInfo&&parseFloat((data.data.fixedProdInfo.investAmount).split(",").join(""));

			self.$el.html(_.template(Template)(data.data));
			//if(investAmount&&investAmount>=10000){common.showAD(self)};
			//localStorage.removeItem('regular')
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