define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center mod_set_password">\
                    <div class="v_mod">\
                        <ul class="user_center_list">\
                            <li class="item">\
                                <div class="item_hd">交易密码</div>\
                                <div class="item_bd">\
                                    <input type="password" value="" placeholder="6~12位，包含字母、数字和符号的组合" class="inpt_txt js_psw js_psw1"  maxlength="12"/>\
                                </div>\
                            </li>\
                            <li class="item item_tips">\
                                <p class="tips_warning">交易密码不可与登录密码相同</p>\
                            </li>\
                            <li class="item">\
                                <div class="item_hd">确认密码</div>\
                                <div class="item_bd">\
                                    <input type="password" value="" placeholder="重复输入新的密码" class="inpt_txt js_psw js_psw2" maxlength="12"/>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="btn_box_submit js_sure">确认</div>\
                </article>';
    module.exports = tpl;
})
