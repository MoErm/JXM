//推荐页面
define(function(require, exports, module) {
    var recommend = require('jxm/tpl/recommend.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var snapSvg= require("jxm/utils/snap.svg-min");
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            return this;
        },
        onShow: function() {
            self = this.initialize();
            //隐藏header
            var header = document.querySelector("#header");
            $(header).hide();
            //添加内容
            self.$el.html(recommend + footer);
            //轮播滚动
            self.initAD();
            self.initChart();
        },
        initAD: function() {
            var container = self.$el.find(".img_box");
            var minHeight = $(window).width() / 3.2;
            var imgs = [{
                id: 4,
                src: './images/zbs11.jpg',
                href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=400413790&idx=1&sn=ef4e9f3d4ac84b9d09f6d3671833cd1a#wechat_redirect'
            }, {
                id: 2,
                src: './images/xszn.jpg',
                href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=209894037&idx=1&sn=5ad856a2d275475c801c6a0604874843#rd'
            }, {
                id: 3,
                src: './images/xszy.jpg',
                href: 'http://mp.weixin.qq.com/s?__biz=MzA5NDk4NDA5Ng==&mid=210062014&idx=1&sn=babbf5cda487369cf0ae489719e12a73#rd '
            }];

            container.css({
                "max-height": minHeight,
                "min-height": minHeight,
                "height": minHeight
            });

            if (!imageSlider) {
                imageSlider = new App.UI.UIImageSlider({
                    datamodel: {
                        data: imgs,
                        itemFn: function(item) {
                            return item.src ? '<img width=100% src="' + item.src + '" data-href="' + item.href + '">' : '</img>';
                        }
                    },
                    displayNum: 1,
                    wrapper: container,
                    autoPlay: true,
                    itemClick: function(e) {
                        window.location.href = e.href;
                    }
                });
            } else {
                imageSlider.datamodel.data = imgs;
                imageSlider.refresh();
            }
            imageSlider.show();
        },
        initChart: function(){
            var chartLine= Snap("#chart_line");
        }
    })
})