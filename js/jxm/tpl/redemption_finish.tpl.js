define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page">\
	  <div class="finish_regular redemption_finish_bg" style="">\
	    <div class="item item_redeem ico_finish ">赎回金额<i class="numb"><%=redeemAmount%>元&ensp; <%if(ransomId==-1){%>等待银行处理中<%}%></i><br>\
	    <p><%=redeemTime%></p>\
	    </div>\
	    <div class="item  ico_chart">\
	      <p class="txt">到账时间</p>\
	      <p class="tips">T+3个工作日</p>\
	    </div>\
	  </div>\
	  <%if(ransomId!=-1){%>\
	  <h3 class="redemption_title">从以下订单赎回:</h3>\
	 <div id="invest_page">\
       <ul class="invest_list" id="invest_record">\
	    <li  class="v_mod item investList">\
	    	<span class="redemption_span1">起息日期</span><span class="redemption_span2">2014/11/11</span><span class="redemption_span3" style="color: #000000">-10000.00</span><br>\
	    	<span class="redemption_span1">赎回收益率</span><span class="redemption_span2">5.007%</span><span class="redemption_span3">1000.00+100.00</span><br>\
	    	<span class="logo"><img src="http://test.jiaxinmore.com/resource/bankLogo/guangda.png"   alt="">招商银行(尾号1233)</span>\
   		</li>\
	  </ul>\
        </div>\
        <%}%>\
	</article>';
	module.exports = tpl;
})