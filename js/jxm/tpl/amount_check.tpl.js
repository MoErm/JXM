define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_card_bind_new">\
                    <div class="v_mod mod_invest_info bind_card_info">\
                        <ul class="list bind_line_height" >\
                            <li class="item_first">\
                                    <div class="v_item">\
                                        <div class="iten_left">姓名</div>\
                                        <div class="iten_right"><%=name%></div>\
                                    </div>\
                                </li>\
                             <li class="item2 ">\
                                    <div class="v_item">\
                                        <div class="iten_left">身份证号</div>\
                                        <div class="iten_right"><%=idNo%></div>\
                                    </div>\
                                </li>\
                                 <li class="item2">\
                                    <div class="v_item">\
                                        <div class="iten_left">银行卡号</div>\
                                        <div class="iten_right" id="amount_cardNo"><%=cardNo%></div>\
                                    </div>\
                                </li>\
                                <li class="item2">\
                                    <div class="v_item">\
                                        <div class="iten_left">开户银行</div>\
                                        <div class="iten_right" id="amount_bankName"><%=bankName%></div>\
                                    </div>\
                                </li>\
                                 <li class="item2">\
                                    <div class="v_item">\
                                        <div class="iten_left">所属省市</div>\
                                        <div class="iten_right" id="amount_provinceName"><%=provinceName%>&ensp;<%=cityName%></div>\
                                    </div>\
                                </li>\
                        </ul>\
                    </div>\
                    <div class="v_mod" style="margin-top: 10px;">\
                        <ul class="user_center_list" style="background-color: #ffffff;border-bottom: 1px solid #d0d0d0">\
                            <li class="item2" >\
                                <div class="item_hd" style="width:50%;float: left">银行卡验证金额：</div>\
                                <div class="item_bd " style="color: #000000;width:40%;float: right;text-align: right;padding-right: 15px">\
                                    0.<input type="tel" value="" placeholder="" class="inpt_txt amount_input"  maxlength="2" />元\
                                </div>\
                            </li>\
                           </ul>\
                    </div>\
             <div class="bind_tips" >本次验证金额打到您的银行卡中，请及时查询并输入收到的验证金额完成验证。</div>\
                    <div class="btn_box_submit js_next">下一步</div>\
                    <p class="entrust_agreement2 js_agreement checked">我已阅读并同意<a href="javascript:void(0)" class="weblink">《委托支付服务协议》</a></p>\
                </article>';
    module.exports = tpl;
})
