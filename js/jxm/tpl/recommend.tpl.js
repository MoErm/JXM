define(function (require, exports, module) {
    var tpl = 
    	'<article class="recommend">\
    		<div class="recommend_ad">\
				<div class="mod_focus">\
			        <div class="img_box">\
			        </div>\
			    </div>\
    		</div>\
            <div class="recommend_total">\
				<div class="recommend_total_l">\
					<span class="title">累计投资用户</span>\
					<p class="number">20000/人次</p>\
				</div>\
				<div class="recommend_total_r">\
					<span class="title">累计投资金额</span>\
					<p class="number">3689万元</p>\
				</div>\
            </div>\
            <div class="recommend_detail">\
				<div class="recommend_detail_t">\
					<h2 class="head"><em class="title">天添利</em>收益率会涨的活期理财</h2>\
				</div>\
				<div class="recommend_detail_m">\
					<div class="chart">\
						<svg id="chart_line" width="300" height="100">\
						    <path d="M50 300 C41 10,50 14,300 1" stroke="#000" fill="none" style="stroke-width: 3px;"></path>\
						</svg>\
						<p class="chart_min"><em>5%</em>起天天加息</p> \
						<p class="chart_max"><em>12%</em>最高年化收益率</p>\
					</div>\
					<div class="info">\
						<ul class="info_list">\
							<li><em class="list_one"></em><span>收益率递增</span></li>\
							<li><em class="list_two"></em><span>当日起息</span></li>\
							<li><em class="list_three"></em><span>24小时可赎</span></li>\
							<li><em class="list_four"></em><span>100%保障</span></li>\
						</ul>\
					</div>\
				</div>\
				<div class="recommend_detail_b">\
					<a href="#" class="godetail">查看详情</a>\
				</div>\
            </div>\
        </article>';

    module.exports = tpl;
})
