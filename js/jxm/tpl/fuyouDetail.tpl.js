define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	  \
	   <div class="fuyouDetail">\
	      <div class="fuyouDetail_title">交易金额(元)</div>\
	      <div class="fuyouDetail_money"><%=dealMoney3(tradeAmount)%></div>\
	  </div>\
	  <div class="fuyouDetail_list">\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">状态</span><span class="fuyouDetail_span2"><%=tradeStatusDesc%></span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">交易类型</span><span class="fuyouDetail_span2"><%=showName(tradeType,productName,chargeWay)%></span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">交易时间</span><span class="fuyouDetail_span2"><%=tradeTime%></span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">流水号</span><span class="fuyouDetail_span2"><%=serialNo%></span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">备注</span><span class="fuyouDetail_span2"><%=remark%></span></div>\
	  </div>\
	</article>';



	module.exports = tpl;
})