define(function (require, exports, module) {
    var tpl = '<article class="mod_reg_login mod_reg">\
        <ul>\
        <li class="frm_item frm_item_getcode">\
        <input  type="text" class="frm_inpt verification js_code" maxlength="8" placeholder="短信验证码" id="smsCode" />\
        <span class="code">获取验证码</span></li>\
    <li class="frm_btn"> <a href="" id="js_startReg" class="btn_link btn_link2">完成注册</a> </li>\
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
