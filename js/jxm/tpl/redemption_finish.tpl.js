define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page">\
	  <div class="finish_regular redemption_finish_bg" style="">\
	    <div class="item redemption_detail_ico_back">成功赎回<i class="numb"><%=redeemAmount%>元&ensp; </i><%if(ransomId==-1){%>等待银行处理<%}%><br>\
	    <p><%=redeemTime%></p>\
	    </div>\
	    <div class="item  redemption_detail_ico_card">\
	      <p class="txt">到账时间</p>\
	      <p class="tips">预计t+3个工作日返回至银行账户，实际到账时间视银行而定</p>\
	    </div>\
	  </div>\
	</article>';
	module.exports = tpl;
})