define(function (require, exports, module) {
    var tpl = '<article class="news">\
                   <div  class="news_tabs">\
                        <div class="news_tab_1 selected" data-tab="1">系统通知</div>\
                        <div class="news_tab_2" data-tab="2">到期提醒</div>\
                        <div class="news_tab_3" data-tab="3">平台公告</div>\
                        <p class="news_select" id="news_select" style="-webkit-transition: -webkit-transform ease-out 0.4s;-webkit-transform:translateX(0)"></p>\
                   </div>\
                   <div class="" id="news_tabList1">\
                        <div>\
                            <div class="news_date">2016-05-30  10:29:59</div>\
                            <div class="news_text">\
                                <div class="news_title">摩西摩西</div>\
                                <div class="news_content">自2016.06.12日起，加薪猫账户正式升级为富友金账户，安全更有保障。</div>\
                            </div>\
                       </div>\
                        <div>\
                            <div class="news_date">2016-05-30  10:29:59</div>\
                            <div class="news_text">\
                                <div class="news_title">事实上</div>\
                                <div class="news_content">自2016.06.12日起，加薪猫账户正式升级为富友金账户，安全更有保障。</div>\
                            </div>\
                       </div>\
                        <div>\
                            <div class="news_date">2016-05-30  10:29:59</div>\
                            <div class="news_text">\
                                <div class="news_title">打打</div>\
                                <div class="news_content">自2016.06.12日起，加薪猫账户正式升级为富友金账户，安全更有保障。</div>\
                            </div>\
                       </div>\
                   </div>\
                   <div class="" id="news_tabList2"></div>\
                   <div class="" id="news_tabList3"></div>\
                </article>';
    module.exports = tpl;
})
