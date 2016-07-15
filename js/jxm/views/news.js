define(function (require, exports, module) {
    var news = require('jxm/tpl/news.tpl');
    var newsList = require('jxm/tpl/newsList.tpl');
    var newsAnnList = require('jxm/tpl/newsAnnList.tpl');
    var tool = require('jxm/utils/Tool');
    var handle = new tool();
    var model = require('jxm/model/model');
    var msgIndex = new model.msgIndex();
    var msgNotices = new model.msgNotices();
    var msgAnnouncements = new model.msgAnnouncements();
    var message = '网络错误，请稍后重试';
    var self;
    var tabData;
    var loadingFlag=false;
    module.exports = App.Page.extend({
        afterMount: function () {
            self=this;
            App.hideLoading()
        },
        events: {
            'click .news_tabs>div': 'changeTab',
            'click .js_ann': 'toAnnDetail'
        },
        scrollTopListener:function(){

            $(window).bind('scroll', function(){
                if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                    var selectedTab=$(".selected")[0].dataset.tab;
                    if(selectedTab==1){
                        if(tabData[0].currentPage<tabData[0].totalPages){
                            self.moreNotice(selectedTab)
                        }else{
                            return
                        }
                    }else if(selectedTab==2){
                        if(tabData[1].currentPage<tabData[1].totalPages){
                            self.moreNotice(selectedTab)
                        }else{
                            return
                        }
                    }else{
                        if(tabData[2].currentPage<tabData[2].totalPages){
                            self.moreAnn()
                        }else{
                            return
                        }

                    }
                }
            })
        },
        toAnnDetail:function(e){
            var annId=e.currentTarget.dataset.annid;
            App.goTo("newsAnnDetail?annId="+annId)
        },
        changeTab:function(e){
            var className=e.currentTarget.className
            var clickTab=e.currentTarget.dataset.tab;
            var selectedTab=$(".selected")[0].dataset.tab;
            var changeTab=clickTab-selectedTab
            if(changeTab==0){
                return
            }
            $(".news_tableList").addClass("hidden");
            $("#news_tabList"+clickTab).removeClass("hidden");
            self.changeTabData(clickTab);

            var news_select = window.document.getElementById("news_select");
            var length = self.$("#news_select").css("-webkit-transform");
            var winWidth=window.innerWidth*0.31
            winWidth=winWidth.toFixed(0);
            winWidth=parseInt(winWidth);
            length = length.substring(11, length.length - 3);
            length = parseInt(length);
            var changeLength=(winWidth*changeTab+length);
            news_select.style.webkitTransform = "translateX("+changeLength+"px)";
            news_select.style.MozTransform = "translateX("+changeLength+"px)";
            news_select.style.msTransform ="translateX("+changeLength+"px)";
            news_select.style.OTransform ="translateX("+changeLength+"px)";
            news_select.style.transform = "translateX("+changeLength+"px)";
            $(".selected").removeClass("selected");
            $("."+className).addClass("selected")
        },
        changeTabData:function(tab){
            if(tab=="2"){
                msgNotices.exec({
                    type: 'get',
                    data:{
                        noticeType:"02",
                        page:tabData[1].currentPage
                    },
                    success: function(data){
                        if(data.ret == 0){
                            if(data.data.records.length>0){
                                var inHtml=_.template(newsList)(data.data)
                                //var html=self.$('#news_tabList2').innerHTML
                                //html=html+inHtml
                                self.$('#news_tabList2').html(inHtml)
                            }

                            tabData[1].currentPage=data.data.currentPage
                            tabData[1].totalPages=data.data.totalPages
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else{
                            App.showToast(data.msg );
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            }else if(tab=="3"){
                msgAnnouncements.exec({
                    type: 'get',
                    data:{
                        page:tabData[2].currentPage
                    },
                    success: function(data){
                        if(data.ret == 0){
                            if(data.data.records.length>0) {
                                var inHtml = _.template(newsAnnList)(data.data)
                                self.$('#news_tabList3').html(inHtml)
                            }
                            tabData[2].currentPage=data.data.currentPage
                            tabData[2].totalPages=data.data.totalPages
                        }else if(data.ret == 999001){
                            handle.goLogin();
                        }else{
                            App.showToast(data.msg );
                        }
                    },
                    error: function(){
                        App.hideLoading();
                        App.showToast(message);
                    }
                })
            }
        },
        moreNotice:function(tab){
            if(loadingFlag){
                return
            }
            loadingFlag=true
            msgNotices.exec({
                type: 'get',
                data:{
                    noticeType:"0"+tab,
                    page:tabData[tab-1].currentPage+1
                },
                success: function(data){
                    loadingFlag=false
                    if(data.ret == 0){
                        var inHtml=_.template(newsList)(data.data)
                        var html=self.$('#news_tabList'+tab)[0].innerHTML
                        html=html+inHtml
                        self.$('#news_tabList'+tab).html(html)
                        tabData[tab-1].currentPage=data.data.currentPage
                        tabData[tab-1].totalPages=data.data.totalPages

                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg );
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        moreAnn:function(){
            msgAnnouncements.exec({
                type: 'get',
                data:{
                    page:tabData[2].currentPage+1
                },
                success: function(data){
                    if(data.ret == 0){
                        var inHtml=_.template(newsAnnList)(data.data)
                        var html=self.$('#news_tabList3')[0].innerHTML
                        html=html+inHtml
                        self.$('#news_tabList3').html(html)
                        tabData[2].currentPage=data.data.currentPage
                        tabData[2].totalPages=data.data.totalPages
                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg );
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        initData:function(){

            msgIndex.exec({
                type: 'get',
                success: function(data){

                    if(data.ret == 0){
                        self.$el.html(_.template(news)(data.data));
                        App.hideLoading()
                        $(".news_tableList").addClass("hidden")
                        $("#news_tabList1").removeClass("hidden")
                        tabData[0].currentPage=data.data.currentPage
                        tabData[0].totalPages=data.data.totalPages
                        self.scrollTopListener();
                        var query = self.request.query;
                        if(_.isUndefined(query) || _.isUndefined(query.tab)){

                            return;
                        }else{
                            self.changeTab2(3)
                        }

                    }else if(data.ret == 999001){
                        handle.goLogin();
                    }else{
                        App.showToast(data.msg );
                    }
                },
                error: function(){
                    App.hideLoading();
                    App.showToast(message);
                }
            })
        },
        onShow: function () {
            this.setHeader();
            self.initData();

            tabData=[{
                totalPages:1,
                currentPage:1
            },{
                totalPages:1,
                currentPage:1
            },{
                totalPages:1,
                currentPage:1
            }]

        },
        changeTab2:function(num){
            var className="news_tab_3"
            var clickTab=num;
            var selectedTab=$(".selected")[0].dataset.tab;
            var changeTab=clickTab-selectedTab
            if(changeTab==0){
                return
            }
            $(".news_tableList").addClass("hidden");
            $("#news_tabList"+clickTab).removeClass("hidden");
            self.changeTabData(clickTab);

            var news_select = window.document.getElementById("news_select");
            var length = self.$("#news_select").css("-webkit-transform");
            var winWidth=window.innerWidth*0.31
            winWidth=winWidth.toFixed(0);
            winWidth=parseInt(winWidth);
            length = length.substring(11, length.length - 3);
            length = parseInt(length);
            var changeLength=(winWidth*changeTab+length);
            news_select.style.webkitTransform = "translateX("+changeLength+"px)";
            news_select.style.MozTransform = "translateX("+changeLength+"px)";
            news_select.style.msTransform ="translateX("+changeLength+"px)";
            news_select.style.OTransform ="translateX("+changeLength+"px)";
            news_select.style.transform = "translateX("+changeLength+"px)";
            $(".selected").removeClass("selected");
            $("."+className).addClass("selected")
        },
        setHeader: function () {
            var header = new App.UI.UIHeader();
            header.set({
                view: this,
                title: '消息中心',
                back: {
                    'tagname': 'back',
                    callback: function () {
                        App.goTo("my_invest");
                        $(window).unbind('scroll')
                    }
                },
                right: null
            });
        }
    })
})
