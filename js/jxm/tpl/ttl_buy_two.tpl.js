define(function (require, exports, module) {
    var tpl ='<article class="ttl_buy_two">\
    		<div class="ttl_buy_two_tip">\
	    		<h2 class="head">指定默认银行卡</h2>\
	    		<ul class="list">\
					<li>为了保证您的资金安全，</li>\
					<li>我们严格执行同卡进出原则，</li>\
					<li>您当前的投资金额仅能赎回到此张银行卡！</li>\
					<li class="cat"></li>\
	    		</ul>\
    		</div>\
    		<div class="ttl_buy_two_action">\
				<input type="button" value="不同意" class="disagree" id="disagree" />\
				<input type="button" value="同意" class="agree" id="agree" />\
    		</div>\
        </article>';

    module.exports = tpl;
})
