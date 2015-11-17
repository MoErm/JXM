define(function (require, exports, module) {
    var tpl= '<div class="notice "><div class="notice_tran">由于银行服务器维护，暂时停止工行、农行、招行、兴业银行的绑卡和支付业务，但不影响兑付。恢复时间另行通知，给您带来不便深感抱歉。</div></div><div class="notice_detail"><a class="js_notice">查看详情</a></div>\
    <div style="clear: both"></div>\
    <article class="mod_user_center mod_card_bind">\
                    <div class="v_mod mod_invest_info">\
                        <ul class="user_center_list" style="padding: 0">\
                            <li class="item js_name">\
                                    <div class="v_item">\
                                        <div class="iten_left">姓名</div>\
                                        <div class="iten_right"><%=name%></div>\
                                    </div>\
                                </li>\
                             <li class="item js_id_card">\
                                    <div class="v_item">\
                                        <div class="iten_left">身份证号</div>\
                                        <div class="iten_right"><%=idNo%></div>\
                                    </div>\
                                </li>\
                                <%if(phase=="3" ){%>\
                                 <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">银行卡号</div>\
                                        <div class="iten_right"><%=cardNo%></div>\
                                    </div>\
                                </li>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">开户银行</div>\
                                        <div class="iten_right"><%=bankName%></div>\
                                    </div>\
                                </li>\
                                 <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">所属省市</div>\
                                        <div class="iten_right"><%=provinceName%>&ensp;<%=cityName%></div>\
                                    </div>\
                                </li>\
                                <% }%>\
                        </ul>\
                    </div>\
                    <%if(phase=="2" ){%>\
                    <h2 class="bind_bank_text" style="">请填写银行预留的实名信息</h2>\
                    <div class="v_mod" style="clear: both">\
                        <ul class="user_center_list">\
                            <li class="item">\
                                <div class="item_hd">银行卡号</div>\
                                 <div class="item_bd" style="width: 65%;position: relative">\
                                    <input type="tel"  placeholder="请输入银行卡号(仅支持借记卡)" class="inpt_txt  js_card_number"  id="js_card_number" maxlength="19"/>\
                                </div>\
                                 <div class="bind_bank_tips"></div>\
                            </li>\
                            <li class="item">\
                                <div class="item_hd">开户银行</div>\
                                <div class="item_bd js_band_card">\
                                     <input type="tel" value="" placeholder="" readonly="readonly" class="inpt_txt" id="js_card_bankName" maxlength="19"/>\
                                </div>\
                            </li>\
                             <li class="item">\
                                <div class="item_hd">所属省份</div>\
                                <div class="item_bd js_address">\
                                    <input type="text" value="" placeholder="选择开户行省市" readonly="readonly" class="inpt_txt inpt_readonly" /><i class="drop"></i>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                   <% }%>\
                    <div class="btn_box_submit js_next">下一步</div>\
                </article>';
    module.exports = tpl;
})
