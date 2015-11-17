define(function (require, exports, module){
	var tpl ='\
	<article class="mod_page v_mod page_finish_float">\
	  <div class="ad_box"></div>\
	  <div class="finish_float">\
	    <div class="item item_finish ico_finish cur">\
	      <p class="txt">成功支付<i class="numb"><%=floatProdInfo.investAmout%></i></p>\
	      <p class="tips">今天 <%=today%></p>\
	    </div>\
	  </div>\
	  <div class="invest_hold">\
	  	<h2 class="hd_title">持仓信息</h2>\
	    <ul class="list">\
	    	<li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">当前市值</div>\
	            <div class="v_item_bd"><%=floatProdInfo.currentValue%></div>\
	          </div>\
	        </li>\
	    	<li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">当前份额</div>\
	            <div class="v_item_bd"><%=floatProdInfo.currentCount%></div>\
	          </div>\
	        </li>\
	    	<li class="item">\
	          <div class="v_item">\
	            <div class="v_item_hd">当前净额</div>\
	            <div class="v_item_bd"><%=floatProdInfo.currentNet%></div>\
	          </div>\
	        </li>\
	    </ul>\
	  </div>\
	  <ul class="v_mod invest_details">\
	    <li class="v_item">\
	      <div class="v_item_hd">投资金额</div>\
	      <div class="v_item_bd"><%=floatProdInfo.investAmout%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">认购手续费</div>\
	      <div class="v_item_bd"><%=floatProdInfo.factorage%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">净认购金额</div>\
	      <div class="v_item_bd"><%=floatProdInfo.netAmount%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">权益确认日期</div>\
	      <div class="v_item_bd"><%=floatProdInfo.rightConfirmDate%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">订单编号</div>\
	      <div class="v_item_bd"><%=orderNo%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">创建时间</div>\
	      <div class="v_item_bd"><%=createTime%></div>\
	    </li>\
	  </ul>\
	</article>\
	<footer class="foot_copyright">\
	  <div class="fixed">\
	    <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
	    <p class="copyright">©2015 加薪猫 jiaxinmore.com</p>\
	  </div>\
	</footer>\
	';
	module.exports = tpl;
})