define(function (require, exports, module) {
    var tpl = '\
	<article class="mod_page mod_my_invest" >\
	 <div class="bonusExpired">\
	    <div class="bonusExpired_bg1"></div>\
	    <div class="bonusExpired_bg2"></div>\
	    <div class="bonusExpired_bg3" id="bonusExpired_bg3"></div>\
	    <div  class="bonusExpired_img1"><img src="./images/bonus_logo.png" ></div>\
	    <div class="bonusExpired_img2"> <img src="./images/bonusExpired_cry.png" ></div>\
	    <div class="bonusExpired_info">哎呀来晚了，红包已经失效!</div>\
	    \
	    <div class="bonusExpired_txt"><p id="userInfo" class="bonusExpired_txt1" ></p><button id="toJXM" style="margin-top: 5px">立即前往加薪猫理财</button>\
	    <p id="nerAdv">首次投资秒送30元微信现金红包</p>\
	    </div>\
	 </div>\
	  \
	</article>';


    module.exports = tpl;
})