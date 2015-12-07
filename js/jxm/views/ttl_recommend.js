//天添利 推荐页
define(function(require, exports, module) {
    var recommend = require('jxm/tpl/ttl_recommend.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var snapSvg= require("jxm/utils/snap.svg-min");
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            this.header = document.querySelector("#header");
            return this;
        },
        events: {
            'click #godetail': 'goDetailPage',
            'click .js_setting': 'setting',
            'click .js_my_invest': 'my_invest',
            'click .js_product_list': 'list'
        },
        onShow: function() {
            self = this.initialize();
            //隐藏header
            $(self.header).hide();

            //添加内容
            self.$el.html(recommend + footer);

            //轮播滚动
            self.initAD();
            self.initChart();
            self.initFooter();
            self.$('.ico_tuijian').addClass('cur');
        },
        my_invest:function(){
          App.goTo("my_invest")
        },
        setting: function () {
            App.goTo('setting');
        },
        list: function () {
            App.goTo('list');
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
            imageSlider.show();
        },
        initChart: function(){
            var chartLine= Snap("#chart_line");
            var pathPoint= 'M30 110C129 93, 0 11 300 1';
            var drawLine= chartLine.paper.path(pathPoint).attr({
                stroke:"#FFB83B",
                strokeWidth:2,
                fill:"none"
            });
        },
        initFooter: function(){
            $(".foot_nav .item").removeClass('cur');
            $(".foot_nav .ico_f_list").addClass('cur');
        },
        goDetailPage: function (e) {
            e.preventDefault();
            App.goTo("ttl_introduce");
        }
    })
})