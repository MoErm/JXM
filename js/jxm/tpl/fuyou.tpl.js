define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	  \
	   <div class="fuyou">\
	      <div class="invest_title">现金余额<small>(元)</small></div>\
	      <div class="invest_money"><%=dealMoney3(amount)%></div>\
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
    <div id="ListArea">\
    <% _.each(records, function(record){%>\
    <div  class="fuyou_list" id="<%=record.serialNo%>">\
		<div class="fuyou_list_line1 ">\
			<span class="fuyou_span1 "><%=showName(record.tradeType,record.productName)%></span>\
			<% if(record.inOut=="01") {%>\
			<span  class="fuyou_span2 fuyouIn">+<%=dealMoney2(record.tradeAmount)%></span>\
                <%} else{%>\
                <span  class="fuyou_span2 fuyouOut">-<%=dealMoney2(record.tradeAmount)%></span>\
                <% } %>\
		</div>\
		<div class="fuyou_list_line2">\
			<span class="fuyou_span1"><%=record.tradeTime%></span>\
			<span class="fuyou_span2"><%=record.tradeStatusDesc%></span>\
		</div>\
    </div>\
    <% })%>\
    </div>\
	</article>';



	module.exports = tpl;
})