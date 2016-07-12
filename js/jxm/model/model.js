define([], function () {
	var initModel=function(opts){
		return App.Model.extend(opts || {});
	};
	var domain=window.location.host.indexOf("localhost")>-1?"test.jiaxinmore.com":window.location.host;
	//var domain=window.location.host.indexOf("localhost")>-1?"172.16.1.57":window.location.host;
    var host="http://"+domain+"/apps";
	var Model={

        //双蛋活动check
        activityCondition:initModel({
            url:host+"/api/activity/activityCondition"
        }),
		//登录
		loginModel:initModel({
			url:host+"/api/user/login"
		}),
        //登录
        bindWechat:initModel({
            url:host+"/api/user/bindWechat"
        }),
        //获取登录信息
        getUserInfo:initModel({
            url:host+"/api/user/info"
        }),
		//获取验证码
		getMsgCodeModel : initModel({
			url:host+"/api/user/getMsgCode"
		}),
		//开始注册
		signUpModel : initModel({
			url:host+"/api/user/register"
		}),
        //开始注册
        registerCheck : initModel({
			url:host+"/api/user/registerCheck"
		}),
        //获取注册验证
        registerSms : initModel({
            url:host+"/api/user/registerSms"
        }),
        //活动注册
        signUpYYModel : initModel({
            url:host+"/api/user/registerYY"
        }),
		//获取图片验证码
		getCaptchaModel : initModel({
			url:host+"/api/user/getCaptcha"
		}),
		//忘记登陆密码
		RetrievePassword : initModel({
			url: host+'/api/user/resetLoginPwd'
		}),//忘记登陆密码
        loginPwdResetCheck : initModel({
			url: host+'/api/user/loginPwdResetCheck'
		}),//忘记登陆密码
        loginPwdResetSms : initModel({
			url: host+'/api/user/loginPwdResetSms'
		}),
		//修改登陆密码
		ChangeLoginPassword : initModel({
			url: host+'/api/userInfo/modifyPassword'
		}),
		//是否已设置交易密码
		HasSetTransPwd : initModel({
			url: host+'/api/userInfo/isSetedTradePwd'
		}),
		//重置交易密码
		ResetTransactionPwd : initModel({
			url: host+'/api/userInfo/resetTradePwd'
		}),
		//修改交易密码
		ChangeTradePassword : initModel({
			url: host+'/api/userInfo/modifyTradePwd'
		}),
        //验证原交易密码
        chkOldTradePwd : initModel({
			url: host+'/api/userInfo/chkOldTradePwd'
		}),
		//忘记交易密码
		checkTranPwd : initModel({
			url: host+'/api/userInfo/checkForResetTradePwd'
		}),
		//退出登陆
		loginOut : initModel({
			url: host+'/api/user/logout'
		}),
		//添加我的银行卡
		addMyBankCard : initModel({
			url: host+'/api/user/myBankCard'
		}),
		//产品列表
		listModel:  initModel({
			url:host+"/api/product/list"
		}),
		//产品详情
		detailModel: initModel({
			url:host+"/api/product/detail"
		}),
		//投资记录
		investModel: initModel({
			url:host+"/api/product/investRecord"
		}),
		//绑卡验证码校验
		checkMsgCodeModel: initModel({
			url:host+"/api/card/checkMsgCode"
		}),
		//实名身份验证
		verifyIdentityModel: initModel({
			url:host+"/api/card/verifyIdentity"
		}),
		//获取银行信息
		getBankInfoModel: initModel({
			url: host+'/api/card/getBankInfo'
		}),
		//获取地址信息
		getAddrModel: initModel({
			url: host+'/api/card/getProvinces'
		}),
		//设置交易密码
		setTransactPwdModel: initModel({
			url: host+'/api/card/setTransactPwd'
		}),//设置交易密码
        getRealInfo: initModel({
			url: host+'/api/card/getRealInfo'
		}),
		//我的投资
		myProperty: initModel({
			url: host+'/api/userInfo/myProperty'
		}),//我的投资
        orderList: initModel({
			url: host+'/api/userInfo/orderList'
		}),
        //我的零钱
        myChange: initModel({
            url: host+'/api/userInfo/myChange'
        }),
        //我的零钱
        sendedChange: initModel({
            url: host+'/api/userInfo/sendedChange'
        }),

		//我的邀请
		myInvite: initModel({
			url: host+'/api/userInfo/myInvite'
		}),
		//历史订单
		historyOrder: initModel({
			url: host+'/api/userInfo/historyOrder'
		}),
		//订单详情
		getOrderInfo: initModel({
			url: host+'/api/userInfo/getOrderInfo'
		}),
		//获取协议
		getContract: initModel({
			url: host+'/api/product/getContract'
		}),
		//立即领取
		toInvestConfirm: initModel({
			url: host+'/api/order/toInvestConfirm'
		}),
		//创建订单
		createOrder:initModel({
			url: host+'/api/order/createOrder'
		}),
		//支付订单
		payOrder:initModel({
			url: host+'/api/order/payOrder'
		}),
		//检查订单支付结果
		checkOrder:initModel({
			url: host+'/api/order/checkOrder'
		}),
		//微信分享接口
		myShare: initModel({
			url: host + '/api/webChat/jsSignature'
		}),
        //绑卡步骤校验
        realStatusCheck: initModel({
            url:host+"/api/bindcard/realStatusCheck"
        }),
        //6.3	根据卡bin获取银行信息接口
        getBankByBin: initModel({
            url:host+"/api/bindcard/getBankByBin"
        }),
        //实名认证
        realCheck: initModel({
            url:host+"/api/bindcard/realCheck"
        }),
        //再次验证码
        getBindCardMsg: initModel({
            url:host+"/api/bindcard/getBindCardMsg"
        }),
        //消除银行卡信息
        changeCard:initModel({
            url:host+"/api/bindcard/changeCard"
        }),
        //获取验证码
        bindCard:initModel({
            url:host+"/api/bindcard/bindCard"
        }),
        //小额代付校验
        checkDribblet:initModel({
            url:host+"/api/bindcard/checkDribblet"
        }),
        //小额代付申请请求
        sendDribblet:initModel({
            url:host+"/api/bindcard/sendDribblet"
        }),
        //验证码校验
        checkBindCardMsg:initModel({
            url:host+"/api/bindcard/checkBindCardMsg"
        }),
        //拆红包
        openBonus:initModel({
            url:host+"/api/crc/chai"
        }),
        //拆红包
        checkStatus:initModel({
            url:host+"/api/crc/checkStatus"
        }),
        //红包查询
        getRecord:initModel({
            url:host+"/api/crc/getRecord"
        }),
        //换卡验证密码
        checkTradePwd:initModel({
            url:host+"/api/changeCard/checkTradePwd"
        }),
        //是否可以换卡
        changeCheck:initModel({
        url:host+"/api/chinapay/changeCheck"
        }),
        //换卡步骤
        rebindRealStatusCheck:initModel({
            url:host+"/api/changeCard/realStatusCheck"
        }),
        //换卡实名认证
        rebindRealCheck: initModel({
            url:host+"/api/changeCard/realCheck"
        }),
        //换卡重新输入卡号
        rebindChangeCard: initModel({
            url:host+"/api/changeCard/changeCard"
        }),
        //换卡绑卡验证
        rebindBindCard: initModel({
            url:host+"/api/changeCard/bindCard"
        }),
        //换卡绑卡验证
        rebindCheckBindCardMsg: initModel({
            url:host+"/api/changeCard/checkBindCardMsg"
        }),
        //放弃换卡
        abortChange:initModel({
        url:host+"/api/chinapay/abortChange"
        }),
        //获取签名
        getSignature:initModel({
            url:host+"/api/chinapay/getSignature"
        }),
        //获取签名
        checkTradePwdChinaPay:initModel({
            url:host+"/api/chinapay/checkTradePwd"
        }),
        //赎回页跳转接口
        toRedeem:initModel({
            url:host+"/api/demand/toRedeem"
        }),
        //赎回页跳转接口
        confirmRedeem:initModel({
            url:host+"/api/demand/confirmRedeem"
        }),
           //投资记录查询接口
        getUserOrderRecords:initModel({
            url:host+"/api/demand/getUserOrderRecords"
        }),
        //赎回记录查询接口
        getUserRansomRecords:initModel({
            url:host+"/api/demand/getUserRansomRecords"
        }),
           //订单详情接口
        getOrderDetails:initModel({
            url:host+"/api/demand/getOrderDetails"
        }),
        //赎回详情接口
        getRansomDetails:initModel({
            url:host+"/api/demand/getRansomDetails"
        }),
        //获取累计投资信息
        getTtlCulInvest: initModel({
        	url:host+"/api/demand/all"
        }),
        //获取天添利资产信息接口
        getTtlProperty: initModel({
        	url:host+"/api/demand/property"
        }),
        //获取收益率接口
        getTtlRate: initModel({
            url:host+"/api/demand/rate"
        }),
        //购买页面初始化
        initTtlBuyPage: initModel({
            url:host+"/api/demand/toBuy"
        }),
        // 同意天添利协议
        agreeTtlContract: initModel({
            url:host+"/api/demand/agreeContract"
        }),        
        //购买天添利
        goTtlBuyPageCheck: initModel({
            url:host+"/api/demand/createDemandOrder"
        }),
        // 获取天添利支付验证码
        getTtlPayCode: initModel({
            url:host+"/api/demand/getDemandPayMsg"
        }),
        // 天添利支付
        goTtlPayOrder: initModel({
            url:host+"/api/demand/payDemandOrder"
        }),
        // 天添利支付结果检查接口
        goTtlPayResult: initModel({
            url:host+"/api/demand/checkDemandOrder"
        }),
        // 天添利债权协议接口
        getTtlServiceData: initModel({
            url:host+"/api/demand/demandProductContract"
        }),
        
        // 获取banner图片
        getBannerImages: initModel({
             url:host+"/api/notice/getBannerImages"
        }),
        // 获取滚动条
        getRollingNotice: initModel({
             url:host+"/api/notice/getRollingNotice"
        }),
        //chinaPay 验证
        NewCardBindService:initModel({
            url:"http://bianmin-test.chinapay.com/USWeb/NewCardBindService"
        }),

        //以下为富有改动新接口
        //获取地区信息
        fuyouAreas: initModel({
            url:host+"/api/fuyou/areas"
        }),
        //获取用户当前银行卡信息
        fuyouCurrentCardInfo: initModel({
            url:host+"/api/fuyou/currentCardInfo"
        }),
        //开户注册
        fuyouCardRegister: initModel({
            url:host+"/api/fuyou/cardRegister"
        }),
        //签约签名
        fuyouSignForAppSign: initModel({
            url:host+"/api/fuyou/signForAppSign"
        }),
        //查询已绑定的银行卡
        fuyouCard: initModel({
            url:host+"/api/fuyou/card"
        }),
        //查询已绑定的银行卡
        fuyouNotSignedCard: initModel({
            url:host+"/api/fuyou/notSignedCard"
        }),
        //查询现金余额
        fuyouBalance: initModel({
            url:host+"/api/fuyou/balance"
        }),
        //获取充值验证码
        fuyouSmsForCharge: initModel({
            url:host+"/api/fuyou/smsForCharge"
        }),
        //充值页面跳转
        fuyouToCharge: initModel({
            url:host+"/api/fuyou/toCharge"
        }),
        //充值签名
        fuyouSignForCharge: initModel({
            url:host+"/api/fuyou/signForCharge"
        }),
        //提现页面跳转
        fuyouToWithdraw: initModel({
            url:host+"/api/fuyou/toWithdraw"
        }),
        //提现签名
        fuyouSignForWithdraw: initModel({
            url:host+"/api/fuyou/signForWithdraw"
        }),
        //支付密码修改签名
        fuyouSignForPayPwdModify: initModel({
            url:host+"/api/fuyou/signForPayPwdModify"
        }),
        //交易记录查询
        fuyouTradeRecords: initModel({
            url:host+"/api/fuyou/tradeRecords"
        }),
        //交易详情
        fuyouTradeInfo: initModel({
            url:host+"/api/fuyou/tradeInfo"
        }),
        //获取银行信息
        fuyouGetBankInfo: initModel({
            url:host+"/api/fuyou/getBankInfo"
        }),
        //获取银行信息
        fuyouGetBankByBin: initModel({
            url:host+"/api/fuyou/getBankByBin"
        }),
        //购买流程
        //立即投资
        fuyouToInvestConfirm: initModel({
            url:host+"/api/fy/order/toInvestConfirm"
        }),
        //创建订单
        fuyouCreateOrder: initModel({
            url:host+"/api/fy/order/createOrder"
        }),
        //订单支付
        fuyouPayOrder: initModel({
            url:host+"/api/fy/order/payOrder"
        }),
        //检查订单支付结果
        fuyouCheckOrder: initModel({
            url:host+"/api/fy/order/checkOrder"
        }),
        //天天利 购买流程
        // 购买页面初始化
        fuyouInitTtlBuyPage: initModel({
            url:host+"/api/fy/demand/toBuy"
        }),
        // 购买页面初始化
        fuyouToRedeem: initModel({
            url:host+"/api/fy/demand/toRedeem"
        }),
        // 购买天添利
        fuyouTtlBuyPageCheck: initModel({
            url:host+"/api/fy/demand/createDemandOrder"
        }),      
        // 天添利支付
        fuyouTtlPayOrder: initModel({
            url:host+"/api/fy/demand/payDemandOrder"
        }),
        // 天添利支付结果检查接口
        fuyouTtlPayResult: initModel({
            url:host+"/api/fy/demand/checkDemandOrder"
        }),
        // 天添利支付结果检查接口
        fuyouAskRedeem: initModel({
            url:host+"/api/fy/demand/askRedeem"
        }),
        // 天添利赎回验证码接口
        fuyouSendRedeemMsgCode:initModel({
            url:host+"/api/fy/demand/sendRedeemMsgCode"
        }),
        // 天添利赎回页跳转接口
        fuyouConfirmRedeem:initModel({
            url:host+"/api/fy/demand/confirmRedeem"
        }),
        // 御驾
        yujiaToInvest:initModel({
            url:host+"/api/car/toInvest"
        }),
        // 御驾数据校验
        yujiaValidateInvestData:initModel({
            url:host+"/api/car/validateInvestData"
        }),
        // 创建订单
        yujiaCreateCarOrder:initModel({
            url:host+"/api/car/createCarOrder"
        }),
        // 发短信
        yujiaSendPayMsgCode:initModel({
            url:host+"/api/car/sendPayMsgCode"
        }),
        // 支付订单
        yujiaPayCarOrder:initModel({
            url:host+"/api/car/payCarOrder"
        }),
        // 详情
        yujiaOrderDeatil:initModel({
            url:host+"/api/car/orderDeatil"
        }),
        // 详情
        yujiaOrderReturnInfo:initModel({
            url:host+"/api/car/orderReturnInfo"
        }),
        // 资产
        yujiaProperty:initModel({
            url:host+"/api/car/property"
        }),
        // 资产
        yujiaHistoryOrders:initModel({
            url:host+"/api/car/historyOrders"
        }),
        // 资产
        yujiaGetCarContract:initModel({
            url:host+"/api/car/getCarContract"
        }),
        // 消息中心
        msgIndex:initModel({
            url:host+"/api/msgCenter/index"
        }),
        // 消息中心
        msgNotices:initModel({
            url:host+"/api/msgCenter/notices"
        }),
        // 消息中心
        msgAnnouncements :initModel({
            url:host+"/api/msgCenter/announcements "
        }),
        // 消息中心
        msgAnnouncement :initModel({
            url:host+"/api/msgCenter/announcement "
        }),
	}
	return Model;

});