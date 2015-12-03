define(function (require, exports, module) {
    var tpl ='<article class="ttl_buy_one">\
    		<div class="ttl_buy_one_t">\
				<ul class="info_add">\
					<li>\
						<p class="percent">5%~12%</p>\
						<p>收益率递增</p>\
					</li>\
					<li>\
						<p class="title">随存随取</p>\
						<p>投资期限</p>\
					</li>\
					<li>\
						<p><em class="num">980.3</em>万元</p>\
						<p>剩余可投</p>\
					</li>\
				</ul>\
    		</div>\
			<div class="ttl_buy_one_m">\
				<div class="mycard">\
					<p class="head">我的银行卡</p>\
					<div class="mycard_info"></div>\
				</div>\
				<div class="imoney">\
					<p class="head">投资金额</p>\
					<div class="imoney_content"><input type="text" class="imoney_num" placeholder="1000元起投，1000元递增"/></div>\
				</div>\
			</div>\
			<div class="ttl_buy_one_b">\
				<div class="action">\
					<input type="button" value="确认投资" class="action_buy" id="确认投资"/>\
					<div class="action_tip">投资并同意<a href="#">《风险提示书》、</a><a href="#">《产品收益权转让及服务协议》</a>所有条款，充分了解并清楚知晓相应权利义务，愿意承担相关风险</div>\
				</div>\
				<div class="time_tip">\
					<em class="tip_icon"></em>\
					<ul class="time_tiplist">\
						<li>00:00~15:00  投资成功，当日起息</li>\
						<li>15:00~24:00  投资成功，次日起息</li>\
					</ul>\
				</div>\
			</div>\
        </article>';

    module.exports = tpl;
})
