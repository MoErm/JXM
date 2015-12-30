define(function (require, exports, module) {
    var tpl ='<article class="ttl_service_tip" id="ttl_service_tip">\
    	<div class="ttl_service_tip_t">\
			<h3 class="tip_head">债权收益权转让服务协议</h3>\
    		<ul class="tip_title">\
    			<li><span class="list_title">甲方 (受让方)：</span> <%=serviceData.contractorA%></li>\
    			<li><span class="list_title">证件号码：</span><%=serviceData.bankAccount%></li>\
    			<li><span class="list_title">乙方 (转让方)：</span><%=serviceData.contractorB%></li>\
    			<li><span class="list_title">住所：</span><%=serviceData.addressB%></li>\
    			<li><span class="list_title">丙方 (服务方)：</span>上海展义金融信息服务有限公司</li>\
    			<li><span class="list_title">住所：</span>上海市长宁区虹桥路2283号君座别墅11号楼4楼</li>\
    		</ul>\
    	</div>\
    	<div class="ttl_service_tip_m">\
    		<p class="tip_title">根据《中华人民共和国合同法》及相关法律的规定，三方遵循平等、自愿、互利和诚实信用原则，就债权收益权转让事项及相关服务事宜协商一致，达成如下条款：</p>\
    		<dl class="tip_list">\
	    		<dt>第一条释义</dt>\
	    		<dd>\
					<p>1.1受让方：是指债权收益权的受让方，即本协议中的受让方，是本协议所述债权收益权的最终受益人。本合同项下受让方应为加薪猫理财平台个人会员，或符合服务方所确定的其他资格（如有）。</p>\
					<p>1.2转让方：是指债权收益权的转让方，即本协议中的转让方，是本协议所述债权收益权所对应债权的原持有者或债权收益权的原持有者。</p>\
					<p>1.3服务方：是指为受让方及转让方提供债权收益权转让的技术平台、信息，并可供转让方及受让方进行交易资金结算（由服务方直接或间接指定的第三方机构提供交易资金结算服务）等服务的机构，即指本协议中服务方运营的【加薪猫网站】（网址：www.jiaxinmore.com及服务方根据业务需要不时修改的其他网址及/或网站名称）。</p>\
					<p>1.4债权：指本协议所述债权收益权所对应的基础债权，基础债权可能为一笔或多笔债权，其基本要素以《债权收益权转让清单》（附件）为准。</p>\
					<p>1.5债权收益权：指以债权为基础资产取得收益的权利，受让方根据本协议受让债权收益权后，即有权获得对应的债权收益，相应承担对应的债权风险。</p>\
					<p>1.6 受让方预期年化收益率：指受让方受让债权收益权后预期在债权正常兑付情形下受让方年化收益率。受让方预期年化收益率为以投资金额（即受让方支付的转让价款）为基准计算的预期年化收益率，具体如附件所示。</p>\
	    		</dd>\
	    		<dt>第二条债权收益权转让基本要素</dt>\
	    		<dd>债权收益权转让的基本要素,如债权基本信息、债权收益权之转让人、受让人、受让方预期年化收益率、收益权转让基准日等具体信息如附件一所示。</dd>\
	    		<dt>第三条 债权收益权转让完成</dt>\
	    		<dd>\
					<p>3.1受让方签署本协议并在本协议规定的期限内支付债权收益权转让价款（“收益权转让价款”）后，受让方受让债权收益权成功，受让方自债权收益权转让基准日（含）起享有债权收益权。</p>\
					<p>3.2受让方在加薪猫平台上通过其注册的账户签订本协议即视为不可撤销地授权服务方从受让方指定的银行账户中主动扣收等值于收益权转让价款的款项并支付给转让方。受让方知晓并确认，服务方可直接通过第三方机构提供代收付服务，也可再授权其他方通过指定的第三方提供代收付服务，服务方仅根据前述授权提供代收付服务，无义务对该项代扣代收的时效性和结果承担任何责任，受让方应保证受让方银行账户中有足额款项且应承担前述代收付的法律后果。 </p>\
					<p>3.3	债权收益权转让后，其对应的债权的相关附属权利（包括抵押权、质押权等）不转让予受让方，而由原债权人继续持有抵押权/质押权，原有抵押/质押登记不作变更登记，转让方及受让方对此均表示认可。</p>\
					<p>3.4	协议生效后，转让方与受让方以本协议为依据形成真实、合法、有效的债权收益权转让行为。转让方及受让方均同意，服务方不对转让方及受让方在本协议项下的义务提供任何担保。</p>\
	    		</dd>\
	    		<dt>第四条 债权存续管理及委托投资</dt>\
	    		<dd>\
	    			<p>4.1受让方成功受让债权收益权后，转让方作为债权收益权所对应债权或原债权收益权持有人，应继续负责或由原债权人继续负责对债权进行存续事务管理，包括但不限于了解及监督借款资金使用、债务人信用状况变化以及担保物价值变化等，一旦发现可能有损受让方利益的情况，转让方应及时通报受让方。</p>\
	    			<p>4.2	债权收益权转让后，受让方在存续期间内，除本协议另有约定外，不得主张债权收益权对应的债权提前到期。除本协议另有约定外，未经转让方及服务方同意，受让方不得将债权收益权转让给任何第三人或机构。</p>\
	    			<p>4.3 受让方成功受让债权收益权后，在申请赎回前，不进行分配。如在受让方受让债权收益权后债权收益权所对应的基础债权有部分或全部到期的，受让方委托服务方自动续投。即：受让方授权并委托服务方替受让方，优先选择相同转让方、相同份额的同质产品（收益方式、资产类型）进行投资。受让方按原债权转让价款之金额持有委托投资后的对应债权收益权。服务方根据本条授权替受让方续投的，续投产品的条款及条件原则上参照本协议约定。受让方确认，如服务方根据本条替受让方进行续投的，受让方接受服务方替其续投的全部投资结果，续投的投资风险由受让方自行承担。尽管有前述约定，服务方不保证续投一定成功。如出现续投不成功或无法续投的情形，则应根据本协议第六条向受让方分配投资本金及预期收益。</p>\
	    			<p>4.4 服务方根据受让方委托进行续投时，受让方同意服务方保管原有资产到期得到的收益，用于支付续投的有关费用。</p>\
	    			<p>4.5 服务方根据受让方委托进行续投时，如果发生转让方变更或资产类型变化两种情况，服务方应该在原资产到期前三个工作日通知受让方。并根据受让方的意愿，进行赎回或续投操作。如受让方选择续投，应签订新的服务协议。</p>\
	    		</dd>\
	    		<dt>第五条 债权收益权赎回及回购</dt>\
	    		<dd>\
					<p>5.1	受让方成功受让债权收益权后，可以在服务方的服务时间内随时提出赎回申请，赎回申请以网页点击的方式确认。赎回确认的时间即为债权收益权赎回日。</p>\
					<p>5.2转让方回购债权收益权是指转让方在债权收益权赎回日，根据受让方的赎回申请，回购受让方持有的相应份额的债权收益权。</p>\
					<p>5.3债权收益权申请赎回时，受让方持有债权收益权时间和回购价款计算公式如下：\
						<ul class="tip_sublist">\
							<li>(1)	受让方在申请赎回时，受让方持有债权收益权的期限为债权收益权转让基准日（含）至债权收益权赎回日（不含）的实际天数。</li>\
							<li>(2)	转让方按本条约定回购债权收益权的回购价款按以下方式计算：回购价款=债权收益权申请赎回金额+债权收益权申请赎回金额×债权收益权预期年化收益率×受让方持有债权收益权期限÷365。转让方同意委托服务方或其指定第三方通过合作机构代扣并向受让方支付回购价款。</li>\
						</ul>\
					</p>\
					<p>5.4	转让方回购受让方所持有的债权收益权的前提为债权收益权上不存在质押、受让方没有其他任何转让该收益权行为等任何可能使得收益权存在瑕疵、负担或可能被任何第三方追索的情形。</p>\
					<p>5.5	如因各种不可抗力因素，造成债权收益权存在瑕疵、负担或可能被任何第三方追索的情形，转让方保留提前将债权收益权全部或部分赎回的权利。</p>\
	    		</dd>\
	    		<dt>第六条受让方预期收益</dt>\
	    		<dd>\
					<p>6.1受让方受让债权收益权之预期收益（“受让方预期收益”）为按如下公式计算的金额：受让方支付的收益权转让价款×受让方预期年化收益率×收益权转让基准日（含）至债权收益权赎回日/分配日（不含）实际天数÷365。本合同项下涉及金额均精确到分位，分位以下的金额均舍去。为免歧义，债权收益权赎回日（含）起至受让方实际收到最终分配款项之日（含），受让方确认同意收益权转让价款及相应收益均不计息。</p>\
					<p>6.2受让方充分理解并确认同意：受让方最终收益取决于转让方或原始债权人所收到的对应债权回收款项。在任何情形下，转让方或原始债权人仅需以其债权收益权所对应的债权回收款总额为限向受让方支付收益，如转让方或原始债权人收到的债权收益权所对应的债权回收款总额低于受让方支付的收益权转让价款与预期收益之和，而导致受让方实际收益率低于预期收益率的，转让方及原始债权人无义务向受让方进行任何补偿或赔偿。</p>\
	    		</dd>\
	    		<dt>第七条服务费</dt>\
	    		<dd>\
					<p>7.1服务方为转受让双方债权收益权转让事项提供如下技术、信息等相关服务：\
						<ul class="tip_sublist">\
							<li>(1)	公布拟转让债权收益权信息；</li>\
							<li>(2)	为交易完成提供技术服务与支持；</li>\
							<li>(3)	协助收益权存续管理及到期清算分配；</li>\
							<li>(4)	根据受让方的授权委托为受让方进行续投；</li>\
							<li>(5)	其他相关服务。</li>\
						</ul>\
					</p>\
					<p>7.2服务方向受让方收取的服务费按如下方式计算：债权收益权对应债权的实际分配款-（受让方支付的收益权转让价款+受让方预期收益），收取的服务费以零为下限。如受让方申请赎回且转让方回购的，则服务费由服务方与转让方另行协商。服务费支付的时间为转让方收到债权收益权对应债权的回收款之日起五个工作日内，或服务方确认的其他时间。受让方到期分配的，受让方同意并授权转让方在向受让方支付债权收益权分配款时从分配款中扣除上述服务费并直接支付于服务方。</p>\
	    		</dd>\
	    		<dt>第八条债权收益权再转让</dt>\
	    		<dd>\
					<p>8.1受让方成功受让债权收益权后，无权要求撤销或解除本协议，但可以根据本协议进行赎回。除在服务方平台外，不得在债权收益权上设立任何他项权利。</p>\
					<p>8.2受让方可以在服务方平台上将其持有的债权收益权转让给经服务方确认的有特定资格的相关人士，除此之外不得向任何第三人转让。</p>\
	    		</dd>\
	    		<dt>第九条权利与义务</dt>\
	    		<dd>\
					<p>9.1受让方权利与义务\
						<ul class="tip_sublist">\
							<li>9.1.1债权收益权成功转让后，受让方有权享有作为债权收益权持有人根据本协议享有相应的收益，并有义务承担债权收益权项下的风险。</li>\
							<li>9.1.2受让方必须在通过点击确认或类似方式签署本协议以前，完成在服务方成立并运营的加薪猫理财平台【加薪猫理财平台主页网址为www.jiaxinmore.com，以下简称“加薪猫”】注册，包括确认和签署《加薪猫服务协议(会员版)》。</li>\
							<li>9.1.3受让方保证其用于受让债权收益权的资金来源合法且拥有完整的处分权，如果任何第三人对其资金来源提出异议，或因资金来源问题导致转让无效，由受让方承担相应法律后果，同时受让方应免于使转让方和服务方因此承担任何责任。</li>\
							<li>9.1.4受让方具有独立的风险承受能力，对债权收益权转让的方式、交易结构、委托投资和可能存在的风险理解知悉并认可。受让方确认给予服务方本协议项下委托投资的授权。</li>\
							<li>9.1.5受让方承诺并确认在签订本协议时确保收益账户有足额可被支付的、相当于受让债权收益权的投资金额的资金。受让方的收益账户如附件一所示。</li>\
							<li>9.1.6受让方承诺提供的本人信息真实、完整、准确，如存在信息不实的情况（包括但不限于手机号码、电子邮箱错误等），由此造成的一切损失由受让方自行负责。</li>\
							<li>9.1.7受让方自愿接受服务方客服人员电话回访，配合服务方核实相关信息。</li>\
							<li>9.1.8受让方承诺，本协议签署后，未经服务方同意，本合同约定的收益账户不作变更。</li>\
							<li>9.1.9受让方同意：在受让方银行卡开户行、中国银联、服务方指定的第三方代扣机构、代扣行、转让方及服务方监管银行等支付 / 收取款项所经机构或司法部门、监管部门等第三方提出要求时，受让方同意转让方和服务方向该第三方提供本协议。</li>\
						</ul>\
					</p>\
					<p>9.2转让方权利与义务\
						<ul class="tip_sublist">\
							<li>9.2.1转让方有权按照本协议约定收取收益权转让价款。</li>\
							<li>9.2.2转让方负责保管或确保债权收益权所对应债权人保管债权投资的全套资料（包括但不限于借款协议、担保合同（如有）等文本材料）。</li>\
							<li>9.2.3转让方按照本协议约定自行或确保债权收益权所对应债权人进行产品存续事务处理。</li>\
							<li>9.2.4 转让方确认并同意按照本协议约定，在受让方申请赎回时进行回购。</li>\
						</ul>\
					</p>\
					<p>9.3服务方权利与义务\
						<ul class="tip_sublist">\
							<li>9.3.1服务方应向转受让双方提供债权收益权转让的信息，并对转让所需的手续作出技术支持。</li>\
							<li>9.3.2服务方对转受让双方的个人信息，资产情况及其相关服务的情况和资料负有保密义务。</li>\
							<li>9.3.3服务方有权根据本协议向受让方、受让方授权收取服务费。</li>\
							<li>9.3.4 服务方有权根据受让方在本协议项下的授权委托，替受让方进行续投。</li>\
						</ul>\
					</p>\
	    		</dd>\
	    		<dt>第十条税务处理</dt>\
	    		<dd>\
					<p>本协议项下的相关税收由各方根据法律规定各自承担。受让方在本业务中产生的相关税收应自行向主管税务机关申报和缴纳，转让方及服务方不负责代扣，也不负责代为处理，但税务主管要求代扣代缴的除外。</p>\
	    		</dd>\
	    		<dt>第十一条违约责任</dt>\
	    		<dd>\
					<p>任何一方违反本协议的约定，使得本协议的全部或部分不能履行，均应承担违约责任，并赔偿守约方因此遭受的全部损失（包括但不限于由此产生的诉讼费、律师费、公证费、评估费、保全费用、拍卖费和强制执行费用）；如多方违约，根据实际情况各自承担相应的责任。违约方应赔偿因其违约行为而给未违约方造成的损失，包括合同履行后可以获得的利益，但不得超过违约合同一方订立合同时可以预见或应当预见的因违反合同可能造成的损失。</p>\
	    		</dd>\
	    		<dt>第十二条争议处理</dt>\
	    		<dd>\
					<p>本协议在履行过程中，如产生任何争执或纠纷，且协商不成的，向服务方所在地有管辖权的人民法院提起诉讼。</p>\
	    		</dd>\
	    		<dt>第十三条其他事项</dt>\
	    		<dd>\
					<p>13.1本协议采用数据电文的方式签订，受让方登陆加薪猫注册个人会员账户ID，并在加薪猫平台上通过点击确认或类似方式签署本协议即视为个人会员本人真实意愿并以个人会员本人名义签署本协议，本协议即时成立。各方不得以未签订书面协议为由否认本协议效力。</p>\
					<p>13.2本协议成立且转让方收到本协议附件一所列示的投资金额的，受让方在加薪猫点击确认本协议，本协议即时生效。</p>\
					<p>13.3各方确认，本协议的签署、生效和履行以不违反中国的法律法规为前提。如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力，各方仍应履行。</p>\
					<p>13.4本协议附件是本协议的重要组成部分，与本协议有同等效力。</p>\
	    		</dd>\
	    		<dd class="tip_spe">特别约定：受让方充分理解并确认转让方和服务方均不对债权收益权预期年化收益率或受让方预期年化收益率，以及续投产品的收益率做出任何明示的或暗示的承诺或担保,受让方应根据自身的投资偏好和风险承受能力，自行衡量产品信息以及交易的真实性和安全性。</dd>\
    		</dl>\
    		<div class="tip_list_info cur">\
    			<ul class="info_list">\
					<li><span class="list_title">受让方：</span><%=serviceData.contractorA%></li>\
					<li><span class="list_title">转让方：</span><%=serviceData.contractorB%></li>\
					<li><span class="list_title">服务方：</span>上海展义金融信息服务有限公司</li>\
    			</ul>\
    			<p class="info_date">日期：<%=serviceData.contractDate%></p>\
    		</div>\
    	</div>\
    	<div class="ttl_service_tip_b">\
			<p class="tip_title">附件1：《债权收益权转让清单》</p>\
			<table class="tip_table">\
				<thead>\
					<td colspan="2">《债权收益权转让清单》</td>\
				</thead>\
				<tbody>\
					<tr class="tip_table_head"><td colspan="2">债权基本信息</td></tr>\
					<tr>\
						<td class="tip_table_name">债权总额</td>\
						<td><%=serviceData.investAmount%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">债权期限</td>\
						<td>自（<%=serviceData.contractDate%>）起至收益权赎回日</td>\
					</tr>\
					<tr class="tip_table_head"><td colspan="2">债权收益权转让基本信息</td></tr>\
					<tr>\
						<td class="tip_table_name">收益权产品名称：</td>\
						<td><%=serviceData.productName%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">收益权产品代码：</td>\
						<td><%=serviceData.productCode%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">订单号：</td>\
						<td><%=serviceData.orderNo%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">转让人：</td>\
						<td><%=serviceData.contractorB%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">受让人：</td>\
						<td><%=serviceData.contractorA%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">受让方预期年化收益率：</td>\
						<td>与受让方持有债权收益权的期限所对应的预期年化收益率</td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">投资金额：</td>\
						<td><%=serviceData.investAmount%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">收益权转让基准日：</td>\
						<td><%=serviceData.investDate%></td>\
					</tr>\
					<tr>\
						<td class="tip_table_name">受让方收益账户：</td>\
						<td><%=serviceData.bankAccount%></td>\
					</tr>\
					<tr>\
						<td colspan="2">\
							<div class="tip_table_content">\
								<p class="list_title">备注：</p>\
								<ul class="tip_table_list">\
									<li>1.	上述币种均指人民币；</li>\
									<li class="spe_list">2.	收益权转让基准日：除本合同第三条约定，在转让交易成功（以服务方平台订单状态显示为“计息中”为准）的情况下，收益权转让基准日为本附件所示，收益起始日与收益权转让基准日为同一天。</li>\
									<li>3.	本清单所指年度为365个自然日；</li>\
									<li>4.	本清单为《债权收益权转让及服务协议》不可或缺的一部分，与《债权收益权转让及服务协议》具有同等效力；</li>\
									<li>5.	预期年化收益率仅为收益计算方便而设，并不代表转让方、服务方或其他任何第三方对产品收益的承诺或保证。</li>\
									<li>6.	为免歧义，受让方预期收益以收益权转让价款为基数，按照受让方预期年化收益率计算。</li>\
								</ul>\
							</div>\
						</td>\
					</tr>\
				</tbody>\
			</table>\
    	</div>\
        </article>';

    module.exports = tpl;
});