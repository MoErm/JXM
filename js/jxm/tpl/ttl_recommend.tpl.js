define(function (require, exports, module) {
    var tpl = 
    	'<article class="ttl_recommend" id="ttl_recommend">\
    		<div class="ttl_recommend_ad">\
				<div class="mod_focus">\
			        <div class="img_box">\
			        </div>\
			    </div>\
    		</div>\
            <div class="ttl_recommend_total">\
				<div class="ttl_recommend_total_l">\
					<span class="title">累计投资用户(人次)</span>\
					<p class="number"><%=investCount%></p>\
				</div>\
				<div class="ttl_recommend_total_r">\
					<span class="title">累计投资金额(万元)</span>\
					<p class="number"><%=investAmount%></p>\
				</div>\
            </div>\
            <div class="ttl_recommend_detail">\
				<div class="ttl_recommend_detail_m">\
					<div class="chart godetail">\
						<div class="chart_info">\
							<div class="chart_info_head"></div>\
							<ul class="chart_info_list">\
								<li><em class="list_b">5%</em>起天天加息</li>\
								<li><em class="list_a">12%</em>最高收益率</li>\
								<li><em class="list_c">收益率</em>按天增涨</li>\
							</ul>\
						</div>\
						<ul class="chart_num">\
							<li>12.0%</li>\
							<li>10.0%</li>\
							<li>8.0%</li>\
							<li>6.0%</li>\
							<li>5.0%</li>\
						</ul>\
						<svg id="chart_line" class="chart_line"></svg>\
					</div>\
					<div class="info">\
						<ul class="info_list">\
							<li><em class="list_one"></em><span>收益率递增</span></li>\
							<li><em class="list_two"></em><span>当日起息</span></li>\
							<li><em class="list_three"></em><span>随时可赎</span></li>\
							<li><em class="list_four"></em><span>安全兑付</span></li>\
						</ul>\
					</div>\
				</div>\
				<div class="ttl_recommend_detail_b">\
					<input type="button" value="立即抢购" class="godetail_btn godetail" />\
				</div>\
            </div>\
        </article>';

    module.exports = tpl;
})
