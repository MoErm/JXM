//我的银行卡
define(function (require, exports, module) {
    var infoCard = require('jxm/tpl/info.card.tpl'),
        footer = require('jxm/tpl/card.footer.tpl'),
        self;
        module.exports = App.Page.extend({
            initialize:function(){
                self = this;
            },
            afterMount: function(){
                self.$el.html(infoCard + footer);
            },
            events: {

            },
            onShow: function () {
                self.setHeader();
                App.hideLoading();
            },
            setHeader: function () {
                var header = new App.UI.UIHeader();
                header.set({
                    view: this,
                    title: '我的银行卡',
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










