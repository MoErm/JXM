define(function (require, exports, module) {
    var tpl = '<article class="mod_reg_login mod_login">\
        <ul>\
        <li class="frm_item">\
        <input type="tel" class="frm_inpt js_mobile"  maxlength="11"  placeholder="请输入您的手机号" />\
        </li>\
        <li class="frm_item">\
        <input type="password" class="frm_inpt js_password"  maxlength="12" placeholder="登录密码" />\
        <span class="btn_eye js_password_eye" data-tips="show"></span>\
        </li>\
        <li class="frm_item js_identify_code"   data-show="false" style="display: none">\
        <input type="text" class="frm_inpt js_code"  placeholder="验证码" maxlength="8"/>\
        <span class="code"><img  class="js_img_code"></span></li>\
    <li class="frm_btn"> <a href="#" class="btn_link btn_link2 js_startLogin">立即登录</a> </li>\
    <li class="frm_item other"><a href="" class="reg">免费注册</a><a href="" class="getpsswrd">忘记密码？</a></li>\
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
