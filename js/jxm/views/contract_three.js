define(function (require, exports, module) {
    var aboutus = require('jxm/tpl/contract_three.tpl');
    var footer = require('jxm/tpl/card.footer.tpl');
    module.exports = App.Page.extend({
        afterMount: function () {
            this.$el.html(aboutus + footer);
        },
        onShow: function () {
            this.setHeader();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '',
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
