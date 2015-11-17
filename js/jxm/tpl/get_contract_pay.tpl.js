define(function (require, exports, module) {
	var tpl = '\
	<div class=WordSection1 style="font-size:10.5pt;font-family:Microsoft YaHei;margin:0 10px;background: url(http://test.jiaxinmore.com/resource/jxmLogo.png) repeat-y; background-size:100%">\
        <p class=MsoTitle style="margin:0cm;margin-bottom:.0001pt"><span style="font-size:12.0pt; ;color:black;font-weight:normal">上海展义金融信息服务有限公司</span></p>\
    <p class=MsoTitle style="margin:0cm;margin-bottom:.0001pt"><span   style=" ;color:black">委托支付服务协议</span></p>\
    <p class=MsoNormal align=left style="text-align:left;line-height:13.45pt;    vertical-align:baseline"><b><span lang=EN-US style="font-size:8.5pt;font-family:   "Tahoma","sans-serif";color:#3D3D3D">&nbsp;</span></b></p>\
    <p class=MsoNormal style="margin-top:7.8pt"><b><span style="font-size:10.0pt; ">授权人：加薪猫理财平台个人会员</span></b></p>\
    <p class=MsoNormal style="margin-top:7.8pt"><b><span style="font-size:10.0pt; ">被授权人：上海艺岳资产管理有限公司（下称<span lang=EN-US>“</span>艺岳资产<span lang=EN-US>”</span>）</span></b></p>\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt"><span    style="font-size:10.0pt; ">一、若授权人就其在加薪猫平台【平台：</span>  \
       <span    lang=EN-US><a href="http://www.jiaxinmore.com"><span style="font-size:10.0pt;">www.jiaxinmore.com</span></a></span><spantyle="font-size:10.0pt; ">，</span>\
       <span   style="font-size:10.0pt; ;color:black">包括手机<span lang=EN-US>APP</span></span><span style="font-size:10.0pt; ">】通过中国银联电子支付进行绑定本人银行卡并支付产品等相关事宜时，授权如下：</span></p>\
\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt"><span style="font-size:10.0pt; ">\
    1. 授权人授权艺岳资产及/或艺岳资产指定第三方上海展义金融信息服务有限公司（“艺岳资产指定第三方”）根据授权人签署的相关协议以及授权人的“确认付款“指令，从授权人指定的代扣银行账户，通过艺岳资产指定的其他第三方机构主动扣收等值于投资产品购买价款的款项。</span></p>\
\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt"><span style="font-size:10.0pt; ">\
    2. 授权人知晓并确认，本授权书系使用授权人加薪猫平台用户名、以网络在线点击确认的方式向艺岳资产发出。本授权书自授权人在加薪猫平台点击确认时生效，由艺岳资产及/或艺岳资产指定第三方通过其他第三方机构从授权人指定的银行账户中代扣相当于投资金额（包括投资手续费）的款项。授权人已在投资前绑定银行账户信息并确认在代扣完成以前不会进行任何更新，在代扣的过程中，艺岳资产及/或艺岳资产指定第三方根据授权人绑定的银行账户信息进行相关操作，无需再向授权人确认银行账户信息和密码。本授权书一经生效即不可撤销。授权人确认并承诺，艺岳资产及/或艺岳资产指定第三方根据本授权书所采取的全部行动和措施的法律后果均由授权人承担。</span></p>\
\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt">\
    <span style="font-size:10.0pt; ">\
    3. 艺岳资产仅根据本授权书所述的授权人的授权进行相关操作，无义务对其根据本授权书所采取的全部行动和措施的时效性和结果承担任何责任。</span></p>\
\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt"><span  style="font-size:10.0pt; ">\
    4. 在授权人银行卡开户行、中国银联、艺岳资产指定的其他第三方机构、代扣执行机构等代扣所经机构或司法部门、监管部门等第三方提出要求时，授权人同意艺岳资产向该第三方提供本协议。</span></p>\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt"><span    style="font-size:10.0pt; ">二、若授权人就其在加薪猫平台【平台：</span>  \
       <span    lang=EN-US><a href="http://www.jiaxinmore.com"><span style="font-size:10.0pt;">www.jiaxinmore.com</span></a></span><spantyle="font-size:10.0pt; ">，</span>\
    <span style="font-size:10.0pt; ;color:black">包括手机<span lang=EN-US>APP</span></span><span style="font-size:10.0pt; ">】通过其他指定的银行/第三方支付机构进行绑定本人银行卡并支付产品等相关事宜时，授权如下：</span></p>\
        <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt">\
    \
    <span style="font-size:10.0pt; ">\
    1. 授权人授权展义金融根据授权人签署的相关协议以及授权人的“确认付款“指令，从授权人指定的代扣银行账户，通过展义金融指定的第三方机构主动扣收等值于投资产品购买价款的款项。</span></p>\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt">\
     <span style="font-size:10.0pt; ">\
    2. 授权人知晓并确认，本授权书系使用授权人加薪猫网站用户名、以网络在线点击确认的方式向展义金融发出。本授权书自授权人在加薪猫网站点击确认时生效，由展义金融通过第三方机构从授权人指定的银行账户中代扣相当于投资金额（包括投资手续费）的款项。授权人已在投资前绑定银行账户信息并确认在代扣完成以前不会进行任何更新，在代扣的过程中，展义金融根据授权人绑定的银行账户信息进行相关操作，无需再向授权人确认银行账户信息和密码。本授权书一经生效即不可撤销。授权人确认并承诺，展义金融根据本授权书所采取的全部行动和措施的法律后果均由授权人承担。</span></p>\
   <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt">\
    <span style="font-size:10.0pt; ">\
    3. 展义金融仅根据本授权书所述的授权人的授权进行相关操作，无义务对其根据本授权书所采取的全部行动和措施的时效性和结果承担任何责任。</span></p>\
     <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt">\
     <span style="font-size:10.0pt; ">\
    4. 在授权人银行卡开户行、中国银联、展义金融指定的第三方机构、代扣执行机构等代扣所经机构或司法部门、监管部门等第三方提出要求时，授权人同意展义向该第三方提供本协议。</span></p>\
    \
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt"><span\
    style="font-size:10.0pt; ">特此授权。</span></p>\
\
    <p class=MsoNormal style="margin-top:7.8pt;text-indent:20.0pt"><span\
    lang=EN-US style="font-size:10.0pt; ">&nbsp;</span></p>\
\
    </div>\
	';
	module.exports = tpl
})