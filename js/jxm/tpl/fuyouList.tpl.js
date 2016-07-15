define(function (require, exports, module) {
	var tpl = '\
	<% _.each(records, function(record){%>\
    <div  class="fuyou_list" id="<%=record.serialNo%>">\
		<div class="fuyou_list_line1 ">\
			<span class="fuyou_span1 "><%=showName(record.tradeType,record.productName,record.chargeWay,record.carRetPeriod)%></span>\
			<% if(record.inOut=="01") {%>\
			<span  class=" fuyou_span2\
			<% if(record.tradeStatus=="12"||record.tradeStatus=="21"||record.tradeStatus=="32"||record.tradeStatus=="41"||record.tradeStatus=="52"||record.tradeStatus=="62"||record.tradeStatus=="82"||record.tradeStatus=="92") {%>\
			 fuyouIn \
			 <%} else{%>\
			  fuyouOut \
			  <% } %>\
			  ">+<%=dealMoney2(record.tradeAmount)%></span>\
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
	';



	module.exports = tpl;
})