define(function (require, exports, module) {
    var tpl = '<article class="news">\
                   <div  class="news_tabs">\
                        <div class="news_tab_1 selected" data-tab="1">系统通知</div>\
                        <div class="news_tab_2" data-tab="2">到期提醒</div>\
                        <div class="news_tab_3" data-tab="3">平台公告</div>\
                        <p class="news_select" id="news_select" style="-webkit-transition: -webkit-transform ease-out 0.4s;-webkit-transform:translateX(0)"></p>\
                   </div>\
                   <div class="news_tableList" id="news_tabList1">\
                        <%if(notices.length>0){%>\
                        <% _.each(notices, function(news){%>\
                        <div>\
                            <div class="news_date"><%=news.pushTime%></div>\
                            <div class="news_text">\
                                <div class="news_title"><%=news.title%></div>\
                                <div class="news_content"><%=news.content%></div>\
                            </div>\
                       </div>\
                       <% })%>\
                       <%}else{%>\
                        <div class="news_nomsg"></div>\
                        <%}%>\
                   </div>\
                   <div class="news_tableList" id="news_tabList2">\
                   <div class="news_nomsg"></div>\
                   <p class="news_nomsg_txt">这里没有任何消息~</p>\
                   </div>\
                   <div class="news_tableList" id="news_tabList3"> <div class="news_nomsg"></div></div>\
                </article>';
    module.exports = tpl;
})
