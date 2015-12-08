define(function (require, exports, module) {
    var aboutus = require('jxm/tpl/aboutus.tpl');
    var footer = require('jxm/tpl/card.footer.tpl');
    module.exports = App.Page.extend({
        afterMount: function () {
            this.$el.html(aboutus + footer);
            App.hideLoading()
        },
        onShow: function () {
            this.setHeader();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '关于加薪猫',
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
