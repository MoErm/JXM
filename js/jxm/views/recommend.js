//我的银行卡
define(function (require, exports, module) {
    var recommendTpl = require('jxm/tpl/recommend.tpl');
    var hammer = require('hammer');
    var Model = require("jxm/model/model");
    var footer = require('jxm/tpl/card.footer.tpl');
    var getAddrModel = new Model.getAddrModel();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var message = '网络错误，请稍后重试';
    var self;
    var timeTemp=0;
    module.exports = App.Page.extend({
        onShow: function () {
            self.setHeader()
            self.$el.html(recommendTpl);
        },
       
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '加薪猫月度对账单',
                back: {
                    'tagname': 'invite', 'value': '',
                    itemFn: function () {
                        return '<span class="right_txt_btn user js_invite" id="abcd">邀请好友</span><span id="abc">absssc</span>';
                    },
                    callback: function () {
                             App.goBack()
                    }
                },
                right: null
            });
        },
        afterMount: function () {
            self=this
        },
        onHide: function(){
            this.$el.html('');
        }
    })
})










