define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	  <form action="" method="post" id="fuyouReset" accept-charset="utf-8">\
             <input type="hidden" id="mchnt_cd" name="mchnt_cd">\
             <input type="hidden" id="mchnt_txn_ssn" name="mchnt_txn_ssn">\
             <input type="hidden" id="login_id" name="login_id">\
             <input type="hidden" id="busi_tp" name="busi_tp">\
             <input type="hidden" id="back_url" name="back_url">\
             <input type="hidden" id="signature" name="signature">\
        </form>\
	</article>';



	module.exports = tpl;
})