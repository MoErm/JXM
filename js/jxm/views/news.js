define(function (require, exports, module) {
    var news = require('jxm/tpl/news.tpl');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    module.exports = App.Page.extend({
        afterMount: function () {
            this.$el.html(news);
            App.hideLoading()
        },
        events: {
            'click .news_tabs>div': 'changeTab'
        },
        changeTab:function(e){
            var className=e.currentTarget.className
            var clickTab=e.currentTarget.dataset.tab;
            var selectedTab=$(".selected")[0].dataset.tab
            var changeTab=clickTab-selectedTab
            if(changeTab==0){
                return
            }
            var news_select = window.document.getElementById("news_select")
            var length = self.$("#news_select").css("-webkit-transform")
            var winWidth=window.innerWidth*0.31
            winWidth=winWidth.toFixed(0)
            winWidth=parseInt(winWidth)
            length = length.substring(11, length.length - 3)
            length = parseInt(length)
            var changeLength=(winWidth*changeTab+length)
            news_select.style.webkitTransform = "translateX("+changeLength+"px)";
            news_select.style.MozTransform = "translateX("+changeLength+"px)";
            news_select.style.msTransform ="translateX("+changeLength+"px)";
            news_select.style.OTransform ="translateX("+changeLength+"px)";
            news_select.style.transform = "translateX("+changeLength+"px)";
            $(".selected").removeClass("selected")
            $("."+className).addClass("selected")
        },
        onShow: function () {
            this.setHeader();

        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '消息中心',
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
