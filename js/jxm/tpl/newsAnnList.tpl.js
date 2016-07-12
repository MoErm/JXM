define(function (require, exports, module) {
    var tpl = '<% _.each(records, function(news){%>\
                        <div class="js_ann" data-annid="<%=news.annId%>">\
                            <div class="news_date"><%=news.issueTime%></div>\
                            <div class="news_text">\
                                <div class="news_title"><%=news.annTitle%></div>\
                                <div class="news_content"><%=news.annBrief%></div>\
                            </div>\
                       </div>\
                       <% })%>';
    module.exports = tpl;
})
