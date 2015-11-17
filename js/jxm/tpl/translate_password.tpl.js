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
        <li class="item item_tips">\
        <p class="tips_warning">交易密码不可与登录密码相同</p>\
        </li>\
        <li class="item">\
        <div class="item_hd">新密码</div>\
        <div class="item_bd">\
        <input type="password" value="" id="js_newpassowrd" placeholder="6~12位，包含字母、数字和符号的组合" class="inpt_txt"maxlength="12" />\
        </div>\
        </li>\
        <li class="item">\
        <div class="item_hd">确认密码</div>\
        <div class="item_bd">\
        <input type="password" value="" placeholder="重复输入新的密码" id="js_affirmpassword" class="inpt_txt" maxlength="12"/>\
        </div>\
        </li>\
        </ul>\
        </div>\
        <div class="btn_box_submit" id="js_affirm">确认</div>\
        </article>\
        <footer class="foot_copyright">\
        <div class="fixed">\
        <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
        <p class="copyright">&copy;2015 加薪猫 jiaxinmore.com</p>\
    </div>\
    </footer> ';
    module.exports = tpl;
})
