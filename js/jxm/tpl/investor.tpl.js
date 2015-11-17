define(function (require, exports, module) {
    var tpl = '<ul class="list">\
                            <li class="item">\
                                <div class="v_item">\
                                    <div class="v_item_bd col_1">用户</div>\
                                    <div class="v_item_bd col_2">投资金额(元) </div>\
                                    <div class="v_item_bd col_3">时间</div>\
                                </div>\
                            </li>\
                            <%_.each(records, function(item){%>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="v_item_bd col_1"><%=item.userAccount%></div>\
                                        <div class="v_item_bd col_2"><%=item.investAmount%></div>\
                                        <div class="v_item_bd col_3"><%=item.startTime%></div>\
                                    </div>\
                                </li>\
                            <%})%>\
                        </ul>';
    module.exports = tpl;
})
