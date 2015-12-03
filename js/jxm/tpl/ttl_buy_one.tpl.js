define(function (require, exports, module) {
    var tpl ='<article class="ttl_introduce">\
    		<div class="ttl_introduce_t">\
				<div class="earn">\
					<p>昨日收益/元</p>\
					<h2>162.77</h2>\
				</div>\
    		</div>\
    		<div class="ttl_introduce_m">\
				<div class="total">\
					<p>总金额/元</p>\
					<h2>+163.77</h2>\
				</div>\
				<div class="history">\
					<p>历史收益/元</p>\
					<h2>+163.77</h2>\
				</div>\
    		</div>\
			<div class="ttl_introduce_b">\
				<h3 class="title">\
					<em></em>\
					<span>收益率小助手</span>\
				</h3>\
				<div class="chart">\
					<div class="chart_head">\
						<p>今日最高收益率</p>\
						<h2>5.027%</h2>\
					</div>\
					<div class="chart_content" id="chart_content">\
					</div>\
				</div>\
				<div class="action">\
					<input type="button" value="购买" class="action_buy" id="action_buy" />\
					<input type="button" value="赎回" class="action_get" id="action_get" />\
				</div>\
			</div>\
        </article>';

    module.exports = tpl;
})
