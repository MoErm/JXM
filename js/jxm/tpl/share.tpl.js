define(function (require, exports, module) {
    var tpl = '<div class="mod_share js_share" style="display:none;z-index:99999">\
                <ul class="nav">\
                    <li class="item ico_wx_group js_wx_group" style="display:none">微信朋友圈</li>\
                    <li class="item ico_wx js_wx_group">微信</li>\
                    <li class="item ico_weibo" style="display:none">新浪微博</li>\
                    <li class="item ico_qq" style="display:none">QQ</li>\
                    <li class="item ico_qzone" style="display:none">QQ空间</li>\
                    <li class="item ico_code js_two_dimension">二维码</li>\
                </ul>\
                <div class="btn_link js_share_close">取消</div>\
                </div>';
    module.exports = tpl;
})
