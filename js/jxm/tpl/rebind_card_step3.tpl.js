define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_card_bind">\
                    <div class="v_mod mod_invest_info">\
                        <ul class="user_center_list" style="padding: 0">\
                            <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">姓名</div>\
                                        <div class="iten_right"><%=name%></div>\
                                    </div>\
                                </li>\
                             <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">身份证号</div>\
                                        <div class="iten_right"><%=idNo%></div>\
                                    </div>\
                                </li>\
                                 <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">银行卡号</div>\
                                        <div class="iten_right" id="step3_cardNo"><%=cardNo%></div>\
                                    </div>\
                                </li>\
                                <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">开户银行</div>\
                                        <div class="iten_right" id="step3_bankName"><%=bankName%></div>\
                                    </div>\
                                </li>\
                                 <li class="item">\
                                    <div class="v_item">\
                                        <div class="iten_left">所属省市</div>\
                                        <div class="iten_right" id="step3_provinceName"><%=provinceName%>&ensp;<%=cityName%></div>\
                                    </div>\
                                </li>\
                        </ul>\
                    </div>\
                    <div class="v_mod">\
                        <ul class="user_center_list">\
                            <li class="item">\
                                <div class="item_hd" style="width: 90px">预留手机号</div>\
                                <div class="item_bd " style="padding-left: 90px;">\
                                    <input type="tel" value="" placeholder="请输入银行预留手机号" class="inpt_txt  js_tel"  maxlength="11" style="width: 90%"/>\
                                <div class="input_tip"></div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="btn_box_submit js_next">下一步</div>\
                    <p class="entrust_agreement2 js_agreement">我已阅读并同意<a href="javascript:void(0)" class="weblink">《委托支付服务协议》</a></p>\
                </article>';
    module.exports = tpl;
})
