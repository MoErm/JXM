define(function (require, exports, module) {
    var tpl = 
        '<article class="recommend">\
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
            <div class="recommend_detail">
				<div class="recommend_detail_t">
					<h2 class="head">天添利</h2>
				</div>
				<div class="recommend_detail_m">
					<div class="chart">

					</div>
					<div class="info">

					</div>
				</div>
				<div class="recommend_detail_b">
					<input type="button" value="查看" class="godetail" />
				</div>
            </div>
        </article>';
    module.exports = tpl;
})
