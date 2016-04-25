define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	  \
	   <div class="fuyouDetail">\
	      <div class="fuyouDetail_title">交易金额(元)</div>\
	      <div class="fuyouDetail_money">12333</div>\
	  </div>\
	  <div class="fuyouDetail_list">\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">状态</span><span class="fuyouDetail_span2">成功</span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">交易类型</span><span class="fuyouDetail_span2">投资月月加薪</span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">交易时间</span><span class="fuyouDetail_span2">2015/12/12 12:12:12</span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">流水号</span><span class="fuyouDetail_span2">4008123123</span></div>\
	  	<div class="fuyouDetail_line"><span class="fuyouDetail_span1">备注</span><span class="fuyouDetail_span2">失败信息提示</span></div>\
	  </div>\
	</article>';



	module.exports = tpl;
})