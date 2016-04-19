define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_change_pssword">\
        <div class="v_mod">\
        <ul class="user_center_list">\
        <li class="item">\
        <div class="item_hd">旧密码</div>\
        <div class="item_bd">\
        <input type="password" value="" maxlength="12"id="js_oldpassword" placeholder="请输入您当前交易的密码" class="inpt_txt" />\
        </div>\
        </li>\
        \
        </ul>\
        </div>\
        <div class="btn_box_submit" id="js_affirm">下一步</div>\
        </article>\
        <footer class="foot_copyright">\
        <div class="fixed">\
        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
        <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
    </div>\
    </footer> ';
    module.exports = tpl;
})
