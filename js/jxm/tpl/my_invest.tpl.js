define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	<div class="new_active" >\
	12月全民邀请争霸赛 <a href="javascript:void(0)"style="color:#f60;" class="js_situation">查看详情</a>\
	</div>\
	  <div class="v_mod invest_base_info">\
	    <div class="item">\
	      <div class="my_invest">\
	      <div class="invest_title">总资产/元</div>\
	      <div class="invest_money"><%=totalProp%></div>\
	      </div>\
	    </div>\
	    <div class="item">\
	      <div class="v_item v_item2" style="text-align: left">\
	        <div class="v_item_bd" style="padding-left:10px "><span class="v_item_title js_test ">当前收益/元</span><span class="v_item_cont right_arrow" style="font-size: 2rem;position: relative"><%=currentIncome%></span></div>\
	        <div style="padding-left:20px;" class="v_item_bd" ><span class="v_item_title">历史收益/元</span><span class="v_item_cont <% if(hasHistoryOrders == 1) {%>right_arrow js_history<% } %> " style="font-size: 2rem;position: relative"><%=historyIncome%></span></div>\
	      </div>\
	    </div>\
	    \
	  </div>\
	    <div class="my_change ico_hongbao">\
	    <span>我的红包</span>\
	    <span class="change"><%=change%></span>\
	    </div>\
	    <div class="invest_tiantian ico_hongbao">\
	        <span>天添利</span>\
	        <span class="change">昨日收益<%=change%></span>\
	    </div>\
	    <div class="invest_tiantian2 ico_hongbao invest_record">\
	        <span>加薪系列(1)</span>\
	        <span class="change"></span>\
	    </div>\
	    <div class="invest_invite ico_hongbao">\
	        <span>我的邀请(2)</span>\
	        <span class="change">已获返利<%=change%></span>\
	    </div>\
	  \
        \
	</article>';



	module.exports = tpl;
})