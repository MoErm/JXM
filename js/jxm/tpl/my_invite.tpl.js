define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invite">\
	<% if(role =="02"||role =="03") {%>\
	<div class="new_active" >\
	展义员工邀请排行榜 <a href="javascript:void(0)"style="color:#f60;" class="js_situation">查看详情</a><span style="position:absolute;right:10px;width:20px;height:20px;"class="js_close">X</span>\
	</div>\
	<% }%>\
	<% if(role !="01") {%>\
	  <div class="v_mod invest_base_info" style="padding-top: 20px">\
	    <div class="item">\
	      <div class="v_item v_item1">\
	        <div class="v_item_bd"><span class="v_item_cont"><i class="rmb">&yen;&nbsp</i><%=totalBonus%></span></div>\
	        <div class="v_item_bd"><a href="javascript:void(0)" class="btn_link btn_link1 js_contract" <% if(role == "02" || role == "03") {%> id="15"<% } else if (role == "04"|| role == "05"){%>id="16"<%}%>>查看规则</a></div>\
	      </div>\
	    </div>\
	    <div class="item">\
	      <div class="v_item v_item2">\
	        <div class="v_item_bd"><span class="v_item_title">昨日红包（元）</span><span class="v_item_cont"><%=tommBonus%></span></div>\
	        <div class="v_item_bd"><span class="v_item_title">本月红包（元）</span><span class="v_item_cont"><%=curMonthBonus%></span></span></div>\
	      </div>\
	    </div>\
	  </div>\
	  <div class="v_mod mod_invite_code">\
	    <p class="txt">我的邀请码：<%=invCode%></p>\
	    <p class="tips tips_warning">客户及好友使用邀请码注册并投资，即可获得红包佣金</p>\
	  </div>\
	  <%if(inviteeListlength != 0){%>\
	   <div class="v_mod invite_list">\
	    <h2 class="hd_title">已邀请并完成绑卡的好友：</h2>\
	    <ul class="list">\
	      <li class="item">\
	        <div class="v_item">\
	          <div class="v_item_bd col_1">姓名</div>\
	          <div class="v_item_bd col_2">手机号 </div>\
	          <div class="v_item_bd col_3">红包总额（元）</div>\
	        </div>\
	      </li>\
	      	<% _.each(inviteeList, function(inviter){%>\
	      <li class="item">\
	        <div class="v_item">\
	          <div class="v_item_bd col_1"><%=inviter.userName%></div>\
	          <div class="v_item_bd col_2"><%=inviter.userId%></div>\
	          <div class="v_item_bd col_3"><%=inviter.userBonus%></div>\
	        </div>\
	      </li>\
	      	<% })%>\
	    </ul>\
	  </div>\
	  <% } %>\
	<% } else if (role =="01") {%>\
	  <div class="v_mod invest_base_info"  style="padding-top: 20px">\
	    <div class="item">\
	      <div class="v_item v_item3">\
	        <div class="v_item_bd"><span class="v_item_title">成功邀请人数</span><span class="v_item_cont"><%=totalCount%></span></div>\
	        <div class="v_item_bd"><span class="v_item_title">红包总额（元）</span><span class="v_item_cont"><%=totalBonus%></span></div>\
	        <div class="v_item_bd"><a href="javascript:void(0)" class="btn_link btn_link1 js_contract" id="14">查看规则</a></div>\
	      </div>\
	    </div>\
	  </div>\
	  <%if(invListlength != 0){%>\
	   <div class="v_mod invite_list">\
	    <h2 class="hd_title">已邀请并完成绑卡的好友：</h2>\
	    <ul class="list">\
	      <li class="item">\
	        <div class="v_item">\
	          <div class="v_item_bd col_1">手机号</div>\
	          <div class="v_item_bd col_2">状态</div>\
	          <div class="v_item_bd col_3">红包发放（元）</div>\
	        </div>\
	      </li>\
	      	<% _.each(invList, function(inviter){%>\
	      <li class="item">\
	        <div class="v_item">\
	          <div class="v_item_bd col_1"><%=inviter.userId%></div>\
	          <div class="v_item_bd col_2"><%=inviter.investStatus%></div>\
	          <div class="v_item_bd col_3"><%=inviter.userBonus%></div>\
	        </div>\
	      </li>\
	      	<% })%>\
	    </ul>\
	  </div>\
	  <% } %>\
	<% }%>\
	\
	</article>\
	';
	/*var tpl ='\
	<h2 class="hd_title" style="position: relative;text-align: center;margin: 200px auto;font-size: 1.6rem;color: #535353;">邀请功能开发中，敬请期待</h2>\
	'*/
	module.exports = tpl;
})