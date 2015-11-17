define(function (require, exports, module) {
    var setting = require("jxm/tpl/setting.tpl");
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var self;
    var tel = '4008-339-869';
    module.exports = App.Page.extend({
        initialize:function(){
            self = this;
        },
        afterMount: function(){

                self.$el.html(_.template(setting)({tel: tel, customer: tel.replace(/-/g, '')}));

        },
        events: {
            'click .js_account_setup': 'goSetup',//用户设置
            'click .js_product_list': 'list',//产品列表
            'click .js_my_invest': 'invest',//我投资
            'click .js_add_card': 'goAddCard',//我的银行卡
            'click .js_my_invite':'goInvite',//我的邀请
            'click .js_phone':'goPhone',//客服电话
            'click .js_about_us':'goAboutUs'//关于加薪猫
        },
        goSetup: function () {
            App.goTo('account');
        },
        goAddCard: function () {
            App.goTo('add_card');
        },
        goInvite: function () {
            App.goTo('my_invite');
        },
        goAboutUs: function () {
            App.goTo('about_us');
        },
        goPhone: function () {
            var customer = self.$('.js_customer');
            if(!self.callPhone){
                self.callPhone = handle.prompt('拨打客服电话 ' + tel,'取消', '呼叫', null, function(){
                    customer.trigger('click');
                    customer.trigger('click');
                });
            }
            self.callPhone.show();
        },
        onShow: function () {
            handle.share();
            self.setHeader();
        },
        list: function(){
            App.goTo('list');
        },
        invest: function(){
            App.goTo('my_invest');
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '设置',
                back: {
                    'tagname': '',
                    callback: function () {}
                },
                right: null
            });
        },
        onHide: function(){
            if(self.callPhone){
                self.callPhone.hide();
            }
        }
    })
})
