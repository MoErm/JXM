define(function (require, exports, module) {
    var tpl = '\
	<article class="mod_page mod_my_invest" >\
	 <div class="bonus_page">\
	    <img src="./images/bonus_bg2.jpg" class="bonus_bg2">\
	    <div class="bonus_img1"><img src="./images/bonus_bg.jpg"  ></div>\
	    <div class="bonus_img2"><img src="./images/bonus_logo.png"  ></div>\
	 <div class="bonus_text">加薪猫理财抢红包啦<br>\
	 <%if(mobile!=null){%>\
	 <div style="display: block" id="bonus_old">您的账户为：<p><%=mobile%></p><button class="bonus_btn">更改</button></div>\
	 <div style="display: none" id="bonus_new"><input  type="tel" id="bonus_phone" class="bonus_input" maxlength="11"   /></div>\
	 <%}else{%>\
	 <div style="display: block" id="bonus_new"><input  type="tel" id="bonus_phone" class="bonus_input" maxlength="11"   placeholder="请输入您的手机号" /></div>\
	 <%}%>\
	 </div>\
	 <div class="bonus_img3 ">\
	 <%if(mobile!=null){%>\
	  <img src="./images/bonus_openBtn.png" id="openImg" ></div>\
	  <%}else{%>\
	  <img src="./images/bonus_openBtn_grey.png" id="openImg" ></div>\
	     <%}%>\
	 </div>\
	  \
	</article>';


    module.exports = tpl;
})