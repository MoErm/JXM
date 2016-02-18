define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_setting">\
                    <div class="v_mod">\
                        <ul class="user_center_list">\
                            <li class="item v_arrow_r">\
                                <div class="item_hd ico_s_account js_account_setup">账户设置</div>\
                            </li>\
                            <li class="item v_arrow_r">\
                                <div class="item_hd ico_s_card js_add_card">我的银行卡</div>\
                            </li>\
                            <li class="item v_arrow_r js_phone">\
                                <div class="item_hd ico_s_tel">客服电话</div>\
                                <div class="item_bd"><%=tel%></div>\
                            </li>\
                            <li class="item v_arrow_r">\
                                <div class="item_hd ico_s_logo js_about_us">关于加薪猫</div>\
                            </li>\
                        </ul>\
                        <a href="tel:<%=customer%>" class="js_customer" style="display:none"></a>\
                    </div>\
                     <div id="titletest" style="display:none"></div>\
                </article>\
                <footer class="foot_copyright foot_fixed">\
                <div class="fixed" style="margin-bottom: 55px">\
                    <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
                    <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
                </div>\
                </footer> ';
    module.exports = tpl;
})
