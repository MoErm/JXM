define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_account">\
        <div class="v_mod">\
        <ul class="user_center_list">\
        <li class="item">\
        <div class="item_hd">手机号码</div>\
        <div class="item_bd"><%= mobile %>&nbsp;&nbsp;&nbsp;</div>\
        </li>\
        <li class="item v_arrow_r" id="js_mod_log_password">\
        <div class="item_hd" >修改登录密码</div>\
        </li>\
        <li class="item v_arrow_r set_trans_psw">\
        <div class="item_hd">修改交易密码</div>\
        <div class="item_bd" id="js_set"></div>\
        </li>\
        <li class="item v_arrow_r reset_password ">\
        <div class="item_hd">忘记交易密码</div>\
        </li>\
        </ul>\
        </div>\
        <div class="mod_login_out" id="js_login_out">退出登录</div>\
        </article>\
        <footer class="foot_copyright">\
        <div class="fixed">\
        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
        <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
    </div>\
    </footer> ';
    module.exports = tpl;
})
