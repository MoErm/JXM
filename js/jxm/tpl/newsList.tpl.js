define(function (require, exports, module) {
    var tpl = '<% _.each(records, function(news){%>\
                        <div>\
                            <div class="news_date"><%=news.pushTime%></div>\
                            <div class="news_text">\
                                <div class="news_title"><%=news.title%></div>\
                                <div class="news_content"><%=news.content%></div>\
                            </div>\
                       </div>\
                       <% })%>';
    module.exports = tpl;
})
