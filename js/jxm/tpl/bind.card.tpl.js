define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_card_bind">\
                    <h2 class="hd_title">请填写银行预留的实名信息</h2>\
                    <div class="v_mod">\
                        <ul class="user_center_list">\
                            <li class="item">\
                                <div class="item_hd">姓名</div>\
                                <div class="item_bd">\
                                    <input type="text" value="" placeholder="请输入您的姓名" class="inpt_txt js_name" maxlength="10"/>\
                                </div>\
                            </li>\
                            <li class="item">\
                                <div class="item_hd">身份证号</div>\
                                <div class="item_bd">\
                                    <input type="text" value="" placeholder="请输入您的18位二代身份证号" class="inpt_txt  js_id_card" maxlength="18"/>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <h2 class="hd_title bank_tips">请填写银行预留的实名信息</h2>\
                    <div class="v_mod">\
                        <ul class="user_center_list">\
                            <li class="item">\
                                <div class="item_hd">开户银行</div>\
                                <div class="item_bd js_band_card">\
                                    <input type="text" value="" placeholder="选择开户银行" readonly="readonly" class="inpt_txt inpt_readonly" /><i class="drop"></i>\
                                </div>\
                            </li>\
                            <li class="item">\
                                <div class="item_hd">所属省份</div>\
                                <div class="item_bd js_address">\
                                    <input type="text" value="" placeholder="选择开户行省市" readonly="readonly" class="inpt_txt inpt_readonly" /><i class="drop"></i>\
                                </div>\
                            </li>\
                            <li class="item">\
                                <div class="item_hd">银行卡号</div>\
                                <div class="item_bd">\
                                    <input type="tel" value="" placeholder="请输入银行卡号" class="inpt_txt  js_card_number"  maxlength="19"/>\
                                </div>\
                            </li>\
                            <li class="item">\
                                <div class="item_hd">手机号</div>\
                                <div class="item_bd">\
                                    <input type="tel" value="" placeholder="请输入银行预留手机号" class="inpt_txt  js_tel" maxlength="11"/>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="btn_box_submit js_next">下一步</div>\
                    <p class="entrust_agreement js_agreement checked">我已阅读并同意<a href="javascript:void(0)" class="weblink">《委托支付服务协议》</a></p>\
                </article>';
    module.exports = tpl;
})
