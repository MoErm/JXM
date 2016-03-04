//天添利 推荐页
define(function(require, exports, module) {
    var Model = require("jxm/model/model");
    var recommend = require('jxm/tpl/ttl_recommend.tpl');
    var footer = require('jxm/tpl/footer.tpl');
    var snapSvg = require("jxm/utils/snap.svg-min");
    var store = require('jxm/model/store');
    var tool = require('jxm/utils/Tool');
    var getTtlCulInvest = new Model.getTtlCulInvest();
    var handle = new tool();
    var loginStore = new store.loginStore();
    var getUserInfo = new Model.getUserInfo();
    var getBannerImages = new Model.getBannerImages();
    var imageSlider = null;
    var self = null;
    module.exports = App.Page.extend({
        initialize: function() {
            this.header = document.querySelector("#header");
            return this;
        },
        events: {
            'click .godetail': 'goDetailPage', //查看详情
            'click .ico_f_list': 'goRecommend', //推荐
            'click .js_product_list': 'goInvest', //理财
            'click .js_my_invest': 'goMyInvest', //我的投资
            'click .js_setting': 'goSetting' //设置
        },
        onShow: function() {
            self = this.initialize();
            self.message = '网络错误，请稍后重试';
            $(self.header).hide();
            var query = self.request.query;
            var openid= query&&query.openid||"";
            if(openid!=""){
                sessionStorage.setItem("openid",openid);
            }

            handle.share();
            handle.orientationTips();
            self.initInvest();
            self.getUserInfo();
            self.getBannerImg();
        },       
        getUserInfo:function(){
            getUserInfo.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        loginStore.set(data.data);
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || self.message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(self.message);
                }
            });
        },
        getBannerImg: function(){
            getBannerImages.exec({
                type: 'get',
                success: function(data){
                    if(data.ret == 0){
                        self.bannerData= data.data;
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg  || self.message);
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(self.message);
                }
            });
        },
        initAD: function() {
            var container = self.$el.find(".img_box");
            var minHeight = $(window).width() / 3.2;
            console.log(self.bannerData)
                
            var imgs =self.bannerData ? self.bannerData.bannerImages:[{
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
            var lineWidth= $("#chart_line").width()*0.92;

            var pathPoint = [ 'M0 0','M47 126C189 85,160 35 '+lineWidth+ ' 5'];
            var lineGrad = chartLine.paper.gradient("r(0.1, 1, 1)#FFC34A-#FF6500");
            
            var drawLine = chartLine.paper.path(pathPoint[1]).attr({
                stroke: lineGrad,
                strokeWidth: 3,
                fill: "none"
            });

            function drawText(){
                // 收益率
                var tSpanText = chartLine.paper.text(150, 110, ["收益率", "按天增长"]).attr({
                    fill:'#9b9b9b'
                });
                // 数字样式
                $(tSpanText.node.childNodes[0]).attr({
                    fill:'#FF6400',
                    "font-size": "1.8rem"
                });
                // 最高年化收益率
                var tSpanMax = chartLine.paper.text(150,30, ["12%", "最高年化收益率"]).attr({
                    fill:'#9b9b9b'
                });
                // 最高年化收益率 数字样式
                $(tSpanMax.node.childNodes[0]).attr({
                    fill:'#FF6400',
                    "font-size": "2rem"
                });
                // 起息文字
                var tSpanMin = chartLine.paper.text(180,70, ["5%", "起天天加息"]).attr({
                    fill:'#9b9b9b'
                });
                //数字样式
                $(tSpanMin.node.childNodes[0]).attr({
                    fill:'#FF6400',
                    "font-size": "2rem"
                });
            }             
            function drawMaxPoint(){
                var maxPoint = chartLine.paper.circle(lineWidth,5,3).attr({
                    fill: "#FF6500"
                });
            }
            function drawMinPoint(){
                var minPoint = chartLine.paper.circle(47,126,3).attr({
                    fill: "#FF6500"
                });
            }
            function draw() {
                var current_frame = 0;
                var total_frames = 60;
                var self = this;
                var path = document.querySelector('#chart_line path');
                var pathLength = path.getTotalLength();
                path.style.transition = path.style.WebkitTransition ='none';
                path.style.strokeDasharray = pathLength + ' ' + pathLength;
                path.style.strokeDashoffset = pathLength;
                path.getBoundingClientRect();
                path.style.transition = path.style.WebkitTransition='stroke-dashoffset 1.2s ease-in-out';
                path.style.strokeDashoffset = '0';

                drawMinPoint();
                setTimeout(function(){
                    drawMaxPoint();
                }, 1300)
            };
            draw();

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
                        App.showToast(data.msg || self.message);
                    }
                },
                error: function() {
                    App.hideLoading();
                }
            });
        },
        goDetailPage: function() {

            App.goTo("ttl_introduce?last=1");
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
        }
    })
})