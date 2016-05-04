define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	  \
	   <div class="fuyou">\
	      <div class="invest_title">现金余额<small>(元)</small></div>\
	      <div class="invest_money"><%=amount%></div>\
	  </div>\
	      <div class="fuyou_income">\
				<div class="currentIncome">\
					<span>提现</span>\
				</div>\
				<div  class="historyIncome">\
					<span>充值</span>\
				</div>\
	      </div>\
    <div class="fuyou_title">资金记录</div>\
    <div  class="fuyou_list" id="fuyouList_1">\
		<div class="fuyou_list_line1 ">\
			<span class="fuyou_span1 ">天添利赎回</span>\
			<span class="fuyou_span2">1000元</span>\
		</div>\
		<div class="fuyou_list_line2">\
			<span class="fuyou_span1">2015/1/12 23:12:12</span>\
			<span class="fuyou_span2">交易成功</span>\
		</div>\
    </div>\
     <div  class="fuyou_list">\
		<div class="fuyou_list_line1 fuyou_line">\
			<span class="fuyou_span1">天添利赎回</span>\
			<span class="fuyou_span2">1000元</span>\
		</div>\
		<div class="fuyou_list_line2">\
			<span class="fuyou_span1">2015/1/12 23:12:12</span>\
			<span class="fuyou_span2">交易成功</span>\
		</div>\
    </div>\
	</article>';



	module.exports = tpl;
})