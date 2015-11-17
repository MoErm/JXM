define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page v_mod page_finish_regular">\
	  <div class="ad_box"></div>\
	  <div class="finish_regular">\
	    <div class="item item_finish ico_finish cur">成功支付<i class="numb"><%=fixedProdInfo.investAmount%></i></div>\
	    <div class="item item_start ico_chart">\
	      <p class="txt">起息日 <%=fixedProdInfo.valueDate%></p>\
	      <p class="tips">开始起息</p>\
	    </div>\
	    <div class="item item_end ico_clock2">\
	      <p class="txt"><%=fixedProdInfo.expectExpiringDate%></p>\
	      <p class="tips">预计到期</p>\
	    </div>\
	  </div>\
	  <%if(hasCards=="1"){%>\
	  <div class="finish_hongbao"><img src="./images/hongbao.png" >\
	  <div class="finish_text">\
	  恭喜您获得<strong style="color: #f23039"><%=cardCount%></strong>个红包，赶紧分享给小伙伴吧<br>(自己也可以领取哦)\
	  </div></div>\
	  <div class="foot_copyright"><div class="fixed">\
            <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
            <p class="copyright">©2015 加薪猫 jiaxinmore.com</p>\
          </div>\
          </div>\
	  </article>\
	  <%}else{%>\
	  <div class="no_products ico_logo"></div>\
	  </article>\
        <footer class="foot_copyright">\
          <div class="fixed2">\
            <p class="security">账户资金安全由银行和第三方支付公司共同保障</p>\
            <p class="copyright">©2015 加薪猫 jiaxinmore.com</p>\
          </div>\
        </footer>\
	  <%}%>\
	';

    var rm='<ul class="v_mod invest_details">\
	    <li class="v_item">\
	      <div class="v_item_hd">投资金额</div>\
	      <div class="v_item_bd"><%=fixedProdInfo.investAmount%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">预期年化收益</div>\
	      <div class="v_item_bd"><%if(fixedProdInfo.incomeType =="01") {%><%=fixedProdInfo.incomeRateCeiling%><% }else if(fixedProdInfo.incomeType =="02"){%><%=fixedProdInfo.incomeRateCeiling%>+<%=fixedProdInfo.activityIncomeRate%><% }else if(fixedProdInfo.incomeType =="04"){%><%=fixedProdInfo.incomeRateFloor%>~<%=fixedProdInfo.incomeRateCeiling%><% }%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">预计到期收益</div>\
	      <div class="v_item_bd"><%=fixedProdInfo.expectReturn%> （以实际到账为准）</div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">起息日</div>\
	      <div class="v_item_bd"><%=fixedProdInfo.valueDate%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">预计到期日</div>\
	      <div class="v_item_bd"><%=fixedProdInfo.expectExpiringDate%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">订单编号</div>\
	      <div class="v_item_bd"><%=orderNo%></div>\
	    </li>\
	    <li class="v_item">\
	      <div class="v_item_hd">创建时间</div>\
	      <div class="v_item_bd"><%=createTime%></div>\
	    </li>\
	  </ul>';
	module.exports = tpl;
})