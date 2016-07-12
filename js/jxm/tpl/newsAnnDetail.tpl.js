define(function (require, exports, module) {
    var tpl = ' <div class="js_ann" data-annid="<%=annId%>">\
                            <div class="news_date"><%=issueTime%></div>\
                            <div class="news_text">\
                                <div class="news_title"><%=annTitle%></div>\
                                <div class="news_content"><%=annContent%></div>\
                            </div>\
                       </div>\
                ';
    module.exports = tpl;
})
