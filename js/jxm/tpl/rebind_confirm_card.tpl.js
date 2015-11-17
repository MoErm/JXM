define(function (require, exports, module) {
    var tpl = '<article class="mod_user_center card_bind_code">\
                    <h2 class="hd_title">绑定银行卡需要短信确认，验证码已发送至手机：<%=mobile%>，请按提示操作。</h2>\
                    <div class="v_mod">\
                        <ul class="user_center_list">\
                            <li class="item">\
                                <div class="item_hd">验证码</div>\
                                <div class="item_bd">\
                                <input type="text" value="" placeholder="短信验证码" class="inpt_txt js_code">\
                                <span class="code js_obtain js_obtain_code">获取验证码</span> </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="btn_box_submit js_next">下一步</div>\
                </article>';
    module.exports = tpl;
})
