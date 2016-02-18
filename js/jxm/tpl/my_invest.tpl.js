define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	\
	  <div class="my_invest">\
	      <div class="invest_title">总资产<small>(元)</small></div>\
	      <div class="invest_money"><%=totalProp%></div>\
	      </div>\
	      \
	  <div class="v_mod invest_base_info">\
	    <div class="item">\
	      <div class="v_item v_item2" style="text-align: left">\
	        <div class="v_item_bd" style="padding-left:10px "><span class="v_item_title js_test ">当前收益<small>(元)</small></span><span class="v_item_cont" style="font-size: 2rem;position: relative"><%=currentIncome%></span></div>\
	        <div style="padding-left:20px;" class="v_item_bd" ><span class="v_item_title">历史收益<small>(元)</small></span><span class="v_item_cont  " style="font-size: 2rem;position: relative"><%=historyIncome%></span></div>\
	      </div>\
	    </div>\
	    \
	  </div>\
	    <div class="my_change ico_redbao">\
	    <span  class="fontBlack">加薪红包</span>\
	    <span class="change"><%=change%></span>\
	    </div>\
	    <div class="invest_tiantian ico_ttl">\
	        <span class="fontBlack">天添利</span>\
	        <span class="change">昨日收益<%=demandYestIncome%>元</span>\
	    </div>\
	    <div class="invest_tiantian2 ico_jiaxin invest_record">\
	        <span  class="fontBlack">持有产品(<%=fixedPeriodOrderCount%>)</span>\
	        <span class="change"></span>\
	    </div>\
	    <div class="invest_invite ico_yaoqing">\
	        <span  class="fontBlack">我的邀请(<%=inviteeCount%>)</span>\
	        <span class="change">已获返利<%=bonusAmount%>元</span>\
	    </div>\
	  \
        <div id="titletest" style="display:none"></div>\
	</article>';



	module.exports = tpl;
})