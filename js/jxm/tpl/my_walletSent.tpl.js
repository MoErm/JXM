define(function (require, exports, module) {
	var tpl = '\
	       <% _.each(items, function(item){%>\
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
	     <% })%>';
	module.exports = tpl;
})