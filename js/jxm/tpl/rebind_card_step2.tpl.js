define(function (require, exports, module) {
    var tpl= '\
    <article class="mod_user_center mod_card_bind">\
      <form action="" method="post" id="myform" accept-charset="utf-8">\
                    <div class="v_mod mod_invest_info">\
                        <ul class="user_center_list" style="padding: 0">\
                            <li class="item js_name">\
                                    <div class="v_item">\
                                        <div class="iten_left">姓名</div>\
                                        <div class="iten_right"><%=userName%></div>\
                                    </div>\
                                </li>\
                             <li class="item js_id_card">\
                                    <div class="v_item">\
                                        <div class="iten_left">身份证号</div>\
                                        <div class="iten_right"><%=maskCard(certNo)%></div>\
                                    </div>\
                                </li>\
                        </ul>\
                    </div>\
                    <h2 class="bind_bank_text" style="">请填写银行预留的实名信息</h2>\
                    <div class="v_mod" style="clear: both">\
                        <ul class="user_center_list">\
                            <li class="item">\
                                <div class="item_hd">银行卡号</div>\
                                 <div class="item_bd" style="width: 65%;position: relative">\
                                     <input type="tel"  placeholder="请输入银行卡号(仅支持借记卡)" class="inpt_txt  js_card_number"  maxlength="19" />\
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
                    <div class="btn_box_submit js_next">下一步</div>\
                <input type="hidden" id="cardNo" name="cardNo">\
                <input type="hidden" id="certNo" name="certNo"  value="<%=certNo%>">\
                <input type="hidden" id="usrName" name="usrName" value="<%=userName%>">\
                <input type="hidden" id="certType" name="certType" >\
                <input type="hidden" id="appSysId" name="appSysId" >\
                <input type="hidden" id="signMethod" name="signMethod">\
                <input type="hidden" id="pgRetUrl" name="pgRetUrl" >\
                <input type="hidden" id="bgRetUrl" name="bgRetUrl" >\
                <input type="hidden" id="ordSeqId" name="ordSeqId">\
                <input type="hidden" id="ordDate" name="ordDate">\
                <input type="hidden" id="signature" name="signature">\
                </form>\
                </article>';
    module.exports = tpl;
})
