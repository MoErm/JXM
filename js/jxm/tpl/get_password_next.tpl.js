define(function (require, exports, module) {
    var tpl = '<div class="mod_pssword_comfort">\
        <h2>忘记登录密码？</h2>\
    <p class="txt">不用着急,这是常有的事儿~</p>\
    </div>\
    <article class="mod_reg_login mod_get_password">\
        <ul>\
        <li class="frm_item frm_item_getcode">\
        <input type="text" class="frm_inpt js_code" placeholder="短信验证码" maxlength="8" />\
        <span class="code" >获取验证码</span></li>\
        <li class="frm_btn"> <a href="#" class="btn_link btn_link2" id="js_reset">确认重置</a> </li>\
        </ul>\
    </article>\
    <footer class="foot_copyright">\
        <div class="fixed">\
        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
        <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
    </div>\
    </footer>';
    module.exports = tpl;
})
