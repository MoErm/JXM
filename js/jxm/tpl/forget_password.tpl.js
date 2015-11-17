define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_forget_password">\
        <div class="v_mod">\
        <ul class="user_center_list">\
        <li class="item">\
        <div class="item_hd">身份证号</div>\
        <div class="item_bd">\
        <input type="text" value="" placeholder="请输入您的身份证号" class="inpt_txt" id="idCard" maxlength="18" />\
        </div>\
        </li>\
        <li class="item">\
        <div class="item_hd">验证码</div>\
        <div class="item_bd">\
        <input type="text" value="" placeholder="短信验证码" class="inpt_txt" id="js_code" maxlength="8" />\
        <span class="code" id="js_Code">获取验证码</span> </div>\
    </li>\
    </ul>\
    </div>\
    <div class="btn_box_submit" id="js_next">下一步</div>\
        </article>\
        <footer class="foot_copyright">\
        <div class="fixed">\
        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
        <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
    </div>\
    </footer> ';
    module.exports = tpl;
})
