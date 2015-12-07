define(function (require, exports, module) {
    var tpl ='<article class="ttl_pay_test">\
		<div class="ttl_pay_test_t">支付验证<em class="close" id="payClose"></em></div>\
		<div class="ttl_pay_test_m">\
			<ul class="paycontent">\
				<li>\
					<p class="head">验证码</p>\
					<div class="test_code">\
						<input type="text" class="code" maxLength=6/>\
						<span class="title">已获取（<em class="num">22</em>）</span>\
					</div>\
				</li>\
				<li>\
					<p class="head">交易密码</p>\
					<div class="test_password">\
						<input type="text" class="password" />\
					</div>\
				</li>\
				<li class="forget"><a href="#" class="forget_password">忘记密码?</a></li>\
			</ul>\
		</div>\
		<div class="ttl_pay_test_b">\
			<div class="action">\
				<input type="button" value="支付" class="gopay" id="gopay" />\
				<p class="tip">请在 <em class="tip_num">4分23秒</em> 内完成支付！</p>\
			</div>\
		</div>\
    </article>';

    module.exports = tpl;
})
