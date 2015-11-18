define(function (require, exports, module) {
    var tpl = '\
	<article class="mod_page mod_my_invest" >\
	 <div class="bonusOpen_page">\
	    <%if(isRegistered=="0"){%>\
	    <img src="./images/bonusOpen_bgNew.jpg" class="bonusOpen_bg">\
	     <%}else{%>\
	     <img src="./images/bonusOpen_bgOld.jpg" class="bonusOpen_bg">\
	     <%}%>\
	     <%if(isGot=="1"){%>\
              <div class="bonusOpen_get"  >\
              <p class="amount">￥<%=amount%></p>\
              <p>有效期至：<%=expiringTime%></p>\
              <p>已存入您(<%=mobile%>)账户，余额：<%=change%></p>\
              </div>\
              <div class="bonusOpen_txt"><button id="toJXM">立即前往加薪猫理财</button>\
	  <%}else{%>\
          <%if(isEmpty=="1"){%>\
          <div class="bonusOpen_none" >\
          <img src="./images/bonusOpen_none.png">\
          <p>红包被抢光了</p>\
          </div>\
          \
          <div class="bonusOpen_txt"><p>目前您(<%=mobile%>)账户，余额：<%=change%></p><button id="toJXM">立即前往加薪猫理财</button>\
          <%}%>\
	  <%}%>\
	  \
	     <%if(isRegistered=="0"){%>\
	    <p>首次投资秒送30元微信现金红包</p>\
	   <%}%>\
	     </div>\
	    <div class="bonusOpen_friend">看看小伙伴们的手气如何</div>\
	    <% _.each(records, function(item){%>\
	     <div class="bonusOpen_friendList">\
            <div class="headImg">\
                <img src="\
                <%if(item.photo==null||item.photo==""){%>\
                http://m.jiaxinmore.com/images/wx.png\
                <%}else{%>\
                <%=item.photo%>\
                <%}%>">\
            </div>\
            <div class="time">\
            <%=item.nickname%><br>\
            <%=item.addTime%>\
            </div>\
            <div class="amount"><%=item.amount%>元</div>\
	    </div>\
	    <% })%>\
	 </div>\
	  <div style="height: 100px;width: 100%;background-color: #f95d4e"></div>\
	  \
	</article>';


    module.exports = tpl;
})