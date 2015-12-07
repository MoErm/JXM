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
					<span class="title">累计投资用户</span>\
					<p class="number"><%=investCount%>/人次</p>\
				</div>\
				<div class="ttl_recommend_total_r">\
					<span class="title">累计投资金额</span>\
					<p class="number"><%=investAmount%>万元</p>\
				</div>\
            </div>\
            <div class="ttl_recommend_detail">\
				<div class="ttl_recommend_detail_t">\
					<h2 class="head"><em class="title">天添利</em>收益率会涨的活期理财</h2>\
				</div>\
				<div class="ttl_recommend_detail_m">\
					<div class="chart">\
						<svg id="chart_line"></svg>\
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
				<div class="ttl_recommend_detail_b">\
					<input type="button" value="查看详情" class="godetail" id="godetail" />\
				</div>\
            </div>\
        </article>';

    module.exports = tpl;
})
