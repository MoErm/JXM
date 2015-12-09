define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page">\
	  <div class="finish_regular redemption_finish_bg" style="">\
	    <div class="item item_redeem ico_finish cur">成功赎回<i class="numb"><%=redeemAmount%>元&ensp; <%if(ransomId==-1){%>等待银行处理中<%}%></i><br>\
	    <p><%=redeemTime%></p>\
	    </div>\
	    <div class="item  ico_book">\
	      <p class="txt">到账时间</p>\
	      <p class="tips">T+3个工作日</p>\
	    </div>\
	  </div>\
	</article>';
	module.exports = tpl;
})