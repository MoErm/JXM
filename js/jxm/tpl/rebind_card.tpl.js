define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_card_bind">\
        <ul>\
        <div class="rebind_div">\
        <li class="frm_item" style="margin-top: 0">\
        <p class="frm_inpt2_title">交易密码</p><input type="password" class="frm_inpt2 js_password"  value="" maxlength="12" placeholder="请输入交易密码" />\
        <span class="btn_eye" data-tips="show" id="js_password_eye"></span>\
        </li>\
        </div>\
    <li class="frm_btn" style="margin: 15px 15px;"> <a  class="btn_link btn_link2" id="js_submit">提交</a> </li>\
     <li class="frm_item other" style="margin: 15px 15px;"><a class="getpsswrd" id="forgetPwd">忘记密码？</a></li>\
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
