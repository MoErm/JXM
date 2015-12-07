define([], function () {
	var initModel=function(opts){
		return App.Model.extend(opts || {});
	};
	var domain=window.location.host.indexOf("localhost")>-1?"test.jiaxinmore.com":window.location.host;
    var host="http://"+domain+"/apps";
	var Model={


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
		}),
		//我的投资
		myProperty: initModel({
			url: host+'/api/userInfo/myProperty'
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

        //chinaPay 验证
        NewCardBindService:initModel({
            url:"http://bianmin-test.chinapay.com/USWeb/NewCardBindService"
        })
	}
	return Model;

});