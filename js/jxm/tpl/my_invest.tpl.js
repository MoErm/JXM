define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	<div class="notice" style="display: none"><div class="notice_text"></div></div>\
		<div style="clear: both"></div>\
	  <div class="my_invest">\
	  	<div class="user_title"><p>小星星</p>\
	  	12387654321</div>\
	      <div class="invest_title">总资产<small>(元)</small></div>\
	      <div class="invest_money"><%=totalProp%></div>\
	  </div>\
	      <div class="my_invest_income">\
				<div class="currentIncome">\
					<span>当前收益(元)</span>\
					<span><%=currentIncome%></span>\
				</div>\
				<div  class="historyIncome">\
					<span>历史收益(元)</span>\
					<span><%=historyIncome%></span>	\
				</div>\
	      </div>\
	      \
	     \
	 <div class="invest_amount">\
		 <div class="invest_amount_1">\
			 \
			 <span class="invest_amount_b"><p class="invest_amount_a">现金余额(元)</p>100</span>\
		 </div>\
		 <div class="invest_amount_2">\
		 	<button class="invest_btn">充值</button>\
		 </div>\
	 </div>\
	    <div style="clear: both"></div>\
	    \
	    <div class="invest_menu invest_menu_top">\
			<div class="invest_menu_1 invest_icon_ttl">\
				<span class="invest_menu_text1">天添利</span>\
				<span class="invest_menu_text2">昨日收益<%=demandYestIncome%>元</span>\
			</div>\
			<div class="invest_menu_2 invest_icon_jxm">\
				<span class="invest_menu_text1">加薪系列</span>\
				<span class="invest_menu_text2">持有<%=fixedPeriodOrderCount%>笔</span>\
			</div>\
	    </div>\
	    \
	    <div style="clear: both"></div>\
	     <div class="invest_menu invest_menu_body">\
			<div class="invest_menu_1 invest_icon_hb">\
				<span class="invest_menu_text1">红包</span>\
				<span class="invest_menu_text2"><%=change%></span>\
			</div>\
			<div class="invest_menu_2 invest_icon_yhk">\
				<span class="invest_menu_text1">银行卡</span>\
				<span class="invest_menu_text2">未绑卡</span>\
			</div>\
	    </div>\
	     <div style="clear: both"></div>\
	     <div class="invest_menu invest_menu_body">\
			<div class="invest_menu_1 invest_icon_wdyq">\
				<span class="invest_menu_text1">我的邀请</span>\
				<span class="invest_menu_text2"><%=inviteeCount%>名理财好友</span>\
			</div>\
			<div class="invest_menu_2 ">\
				<span class="invest_menu_text1"></span>\
				<span class="invest_menu_text2"></span>\
			</div>\
	    </div>\
	    \
	  </div>\
	  \
        <div id="titletest" style="display:none"></div>\
	</article>';



	module.exports = tpl;
})