define(function (require, exports, module) {
    var tpl= '\
    <article class="mod_user_center mod_card_bind">\
                    <form action="" method="post" id="signForm" accept-charset="utf-8">\
                    <div class="bind_bank_card">\
                        <div class="cardNo">\
                            <div class="bind_card_title" style="background: #e4e3e3">银行卡号</div>\
                            <div class="bind_card_text"  ><input type="tel" readonly="readonly"  class="text_input  js_card_number" style="background: #e4e3e3"  maxlength="19" /></div>\
                        </div>\
                         <div class="cardBank js_band_card">\
                            <div class="bind_card_title">开户银行</div>\
                            <div class="bind_card_text"><input type="tel" readonly="readonly"  class="text_input js_card_bankName" id="js_card_bankName" maxlength="19"/></div>\
                        </div>\
                        <div class="cardBank js_address">\
                            <div class="bind_card_title">所属省份</div>\
                            <div class="bind_card_text"><input type="text" readonly="readonly"" class="text_input inpt_readonly js_address_select" /></div>\
                        </div>\
                        <div class="cardBank ">\
                            <div class="bind_card_title">预留手机号</div>\
                            <div class="bind_card_text"><input type="tel"  placeholder="请输入银行预留手机号"  class="text_input " id="js_cardMobile"  maxlength="11"/></div>\
                        </div>\
                    </div>\
                    <div style="clear: both">\
                     </div>\
                    <div class="btn_box_submit js_next">下一步</div>\
                    <input type="hidden" id="mchnt_cd" name="mchnt_cd">\
                    <input type="hidden" id="mchnt_txn_ssn" name="mchnt_txn_ssn">\
                    <input type="hidden" id="login_id" name="login_id">\
                    <input type="hidden" id="mobile" name="mobile">\
                    <input type="hidden" id="page_notify_url" name="page_notify_url">\
                    <input type="hidden" id="signature" name="signature">\
                </form>\
                </article>';
    module.exports = tpl;
//    <div class="notice "><div class="notice_tran">由于银行服务器维护，暂时停止工行、农行、招行、兴业银行的绑卡和支付业务，但不影响兑付。恢复时间另行通知，给您带来不便深感抱歉。</div></div><div class="notice_detail"><a class="js_notice">查看详情</a></div>\
//    <div style="clear: both"></div>
})


//<div class="v_mod">\
//<ul class="user_center_list">\
//    <li class="item" >\
//        <div class="item_hd">姓名</div>\
//        <div class="item_bd">\
//            <input type="text"  placeholder="请输入您的姓名" class="inpt_txt js_name" maxlength="10"/>\
//        </div>\
//    </li>\
//    <li class="item">\
//        <div class="item_hd">身份证号</div>\
//        <div class="item_bd">\
//            <input type="text"  placeholder="请输入您的18位二代身份证号" class="inpt_txt  js_id_card" maxlength="18" style="text-transform:uppercase;" />\
//        </div>\
//    </li>\
//</ul>\
//</div>