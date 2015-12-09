//天添利 推荐页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var recommend = require('jxm/tpl/ttl_recommend.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var snapSvg = require("jxm/utils/snap.svg-min");
    var getTtlCulInvest = new Model.getTtlCulInvest();
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            this.header = document.querySelector("#header");
            return this;
        },
        events: {
            'click #godetail': 'goDetailPage', //查看详情
            'click .ico_f_list': 'goRecommend', //推荐
            'click .js_product_list': 'goInvest', //理财
            'click .js_my_invest': 'goMyInvest', //我的投资
            'click .js_setting': 'goSetting' //设置
        },
        onShow: function() {
            self = this.initialize();
            self.setHeader();
            self.initInvest();
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '推荐',
                back: {
                    'tagname': '',
                    callback: function () {}
                },
                right: null
            });
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
        initChart: function() {
            var chartLine = Snap("#chart_line");
            var pathPoint = 'M15 110C159 105,20 75 300 1';
            var lineGrad = chartLine.paper.gradient("r(0.1, 1, 1)#FFC34A-#FF6500");
            var drawLine = chartLine.paper.path(pathPoint).attr({
                stroke: lineGrad,
                strokeWidth: 2,
                fill: "none"
            });
            var tSpanMin = chartLine.paper.text(15, 70, ["5%", "起天天加息"]).attr({
                fill:'#9b9b9b'
            });
            //数字样式
            $(tSpanMin.node.childNodes[0]).attr({
                fill:'#FF6400',
                "font-size": "2rem"
            });
            var tSpanMax = chartLine.paper.text(100, 15, ["12%", "最高年化收益率"]).attr({
                fill:'#9b9b9b'
            });
            //数字样式
            $(tSpanMax.node.childNodes[0]).attr({
                fill:'#FF6400',
                "font-size": "2rem"
            });
        },
        initFooter: function() {
            $(".foot_nav .item").removeClass('cur');
            $(".foot_nav .ico_tuijian").addClass('cur');
        },
        initInvest: function() {
            App.showLoading();
            getTtlCulInvest.exec({
                type: 'get',
                success: function(data) {
                    var pageData = data.data;
                    if (data.ret == 0) {
                        App.hideLoading();
                        //添加内容
                        self.$el.html(_.template(recommend)(pageData) + footer);
                        App.hideLoading();
                        self.initChart();
                        self.initAD();
                        self.initFooter();

                    } else if (data.ret == 999001) {
                        handle.goLogin();
                    } else {
                        App.showToast(data.msg || message);
                    }
                },
                error: function() {
                    App.hideLoading();
                }
            });
        },
        goDetailPage: function() {

            App.goTo("ttl_introduce");
        },
        goInvest: function() {

            App.goTo('list');
        },
        goMyInvest: function() {

            App.goTo('my_invest');
        },
        goSetting: function() {

            App.goTo('setting');
        },
        goRecommend: function() {

            App.goTo('ttl_recommend');
        },
    })
})