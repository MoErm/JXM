define(function (require, exports, module) {
    var tpl = '<article class=" mod_forget_password">\
        <div class="sixPass_pad_top"></div>\
        <div class="sixPass_title" id="sixPass_title">请输入6位数字密码</div>\
       <div class="pwd-box">\
            <input type="tel" maxlength="6" class="pwd-input" id="pwd-input">\
            <div class="fake-box">\
                <input type="password" readonly="readonly">\
                <input type="password" readonly="readonly">\
                <input type="password" readonly="readonly">\
                <input type="password" readonly="readonly">\
                <input type="password" readonly="readonly">\
                <input type="password" readonly="readonly">\
            </div>\
        </div>\
        <div class="sixPass_tips" id="sixPass_tips"></div>\
        <div class="btn_box_submit"id="js_confirm" >完成</div>\
        </article>'
      ;
    module.exports = tpl;
})
