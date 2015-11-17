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
                            <li class="item v_arrow_r">\
                                <div class="item_hd ico_s_invite js_my_invite">我的邀请</div>\
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
                </article>\
                <footer class="foot_copyright foot_fixed">\
                <div class="fixed">\
                    <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
                    <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
                    <div class="foot_nav">\
                    <ul>\
                        <li class="item ico_f_list js_product_list">产品列表</li>\
                        <li class="item ico_f_invest js_my_invest">我的投资</li>\
                        <li class="item ico_f_setting cur">设置</li>\
                    </ul>\
                    </div>\
                </div>\
                </footer> ';
    module.exports = tpl;
})
