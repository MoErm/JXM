define(function (require, exports, module) {
    var tpl = '<article class="mod_reg_login mod_reg">\
        <ul>\
        <li class="frm_item">\
        <input  type="tel" class="frm_inpt js_mobile" maxlength="11"  placeholder="请输入您的手机号" />\
        </li>\
        <li class="frm_item frm_item_getcode">\
        <input  type="text" class="frm_inpt verification js_code" maxlength="8" placeholder="短信验证码" />\
        <span class="code">获取验证码</span></li>\
    <li class="frm_item">\
        <input type="password" class="frm_inpt js_password" maxlength="12"  placeholder="请设置登录密码" />\
         <span class="btn_eye" data-tips="show" id="js_password_eye"></span>\
        <p class="frm_tips hightlight" id="js_Password_hint" style="display:none;">登录密码6~12位，包含字母、数字和符号组合</p>\
    </li>\
    <li class="frm_item invite_code">\
        <input type="tel" class="frm_inpt" id="js_invite_code" maxlength="4"  value="" placeholder="邀请码（选填）" />\
        <p class="frm_tips lowlight">使用邀请码可获得加薪猫认证理财师的专属服务！</p>\
    </li>\
    <li class="frm_btn"> <a href="" id="js_startReg" class="btn_link btn_link2">完成注册</a> </li>\
    <li class="reg_agreement">注册即同意<a href="javascript:void(0)" class="webtxt"id="js_Website_registration">《网站注册协议（会员版）》</a>和<a href="javascript:void(0)" class="webtxt Investor_statement">《合格投资人申明》</a></li>\
    </ul>\
    <div class="registered">已有账号？<span class="webtxt" id="js_login" style="cursor: pointer;">立即登录</span></div>\
    </article>\
    <footer class="foot_copyright">\
        <div class="fixed">\
        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
        <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
    </div>\
    </footer>';
    module.exports = tpl;
})
