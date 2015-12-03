define(function (require, exports, module) {
    var tpl ='<article class="ttl_pay_success">\
		<div class="ttl_pay_success_t">\
			<ul class="success_list">\
				<li class="card">\
					<em class="icon"></em>\
					<div class="info">\
						<p class="sub_total">成功支付  30,000 元</p>\
						<p>交通银行（尾号6535）</p>\
						<p>2015/11/15  11:20:33</p>\
					</div>\
				</li>\
				<li class="time">\
					<em class="icon"></em>\
					<div class="info">\
						<p class="sub_time">2015/11/15</p>\
						<p>开始计算收益，今日收益率5.000%</p>\
					</div>\
				</li>\
				<li class="show">\
					<em class="icon"></em>\
					<div class="info">\
						<p class="sub_show">2015/11/16</p>\
						<p>显示收益</p>\
					</div>\
				</li>\
			</ul>\
		</div>\
    </article>';

    module.exports = tpl;
})
