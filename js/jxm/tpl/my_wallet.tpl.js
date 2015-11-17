define(function (require, exports, module) {
	var tpl = '\
	<article class="mod_page mod_my_invest">\
	\
       <div class="select_box">\
       <div class="selected" id="in_change">我收到的</div>\
       <div class="select_title" id="out_change">我发出的</div>\
       </div>\
       <div style="clear: both;height: 36px"></div>\
       <div id="change_in" >\
	  <div class="v_mod_2 invest_base_info">\
	    <div class="item" style="margin: 0;padding: 0">\
	      <div class="v_item v_item2">\
	        <div class="v_item_bd"><span class="v_item_title">可使用(元)</span><span class="v_item_cont" style="font-size: 2rem"><%=usableAmount%></span></div>\
	        <div class="v_item_bd"><span class="v_item_title">已使用(元)</span><span class="v_item_cont" style="font-size: 2rem"><%=usedAmount%></span></div>\
	      </div>\
	    </div>\
	  </div>\
	  \
	  <% if(isEmpty==0) {%>\
	   <ul class="invest_list" id="inList">\
	  	<% _.each(items, function(order){%>\
	    <li  class="v_mod item ">\
	        <p class="status status2 <%if(order.status != "01") {%>status_fail<% } %>"><%=order.statusDesc%></p>\
	    	<h3 class="hd_title"><%=order.sourceName%></h3>\
	        <div class="v_item">\
	        	<div class="v_item_hd">\
		                    <br>	\
		            	<p><span class="v_item_title" style="width: 70px">有效期至：</span><span class="v_item_cont" style="width: 60%;color: #b5b5b5;"><%=order.expiringTime%></span></p>\
	            </div>\
	        	<div class="v_item_bd" style="width: 26%;">\
	            	<span class="v_item_title" style="font-size: 2rem;<%if(order.status != "01") {%>color:#797979<% } %>"><%=order.amount%></span>\
	            </div>\
	        </div>\
   		</li>\
   		<% })%>\
	  </ul>\
	  <div class="more_record ico_arrow js_history" >仅显示最近30天内的红包</div>\
	  <%} else{%>\
	  	\
	  	\
	  <div class="no_products ico_logo">空空如也<br>一个红包都没有</div>\
	  \
	  <% } %>\
	  </div>\
	  <div id="change_out" style="display: none">\
	  <div id="outList">\
	       <% if(sended.isEmpty==0) {%>\
	       <% _.each(sended.items, function(item){%>\
	     <div class="change_item">\
	      	<div class="change_box">\
                <div class="bg"></div>\
                <div name="<%=item.cid%>" class="rount" style="display: none;"></div>\
                <div class="bg2"></div>\
                <div name="<%=item.cid%>" class="rount2" style="display: none;"></div>\
                <div id="test_num" class="\
              <% if(item.status=="02") {%>\
                num_none\
                <%} else{%>\
                  num\
                  <% } %>\
                "><%=item.surplusCount%>/<%=item.totalCount%></div>\
            </div>\
                <div class="change_time">有效期至：<br><%=item.expiringTime%></div>\
                  <% if(item.status=="02") {%>\
                <div  class="change_btn_none"  id="<%=item.shareUrl%>">发光了</div>\
                    <%} else if(item.status=="01"){%>\
                    <div  class="change_btn"  id="<%=item.shareUrl%>">发红包</div>\
                     <%} else if(item.status=="03"){%>\
                    <div  class="change_btn_none"  id="<%=item.shareUrl%>">已过期</div>\
                   <% } %>\
	     </div>\
	     <% })%>\
	     </div>\
	     <div class="more_record ico_arrow" id="testMore">仅显示最近30天内的红包</div>\
	      <%} else{%>\
	     <div class="no_products ico_logo">空空如也<br>一个红包都没有</div>\
	    <% } %>\
	  </div>\
	</article>';
	module.exports = tpl;
})