var dumpling = {
    initHeight: function() {
        var g_width = document.body.clientWidth
        var imgHeight = g_width / 640 * 495
        $("#banner").css("height", imgHeight)
        $(".Xmas_calendar").css("height", g_width / 611 * 805)

        $(".address_banner_txt").css("marginTop", g_width / 640 * 315)
        $(".Xmas_line").css("paddingTop", g_width / 640 * 170)
        if (g_width >= 414) {
            $(".Xmas_detail_box").css("height", g_width / 611 * 740 - $(".Xmas_line").height() - g_width / 640 * 170 - 20)
            $(".Xmas_detail_box").css("marginTop", 20)
        } else {
            $(".Xmas_detail_box").css("height", g_width / 611 * 740 - $(".Xmas_line").height() - g_width / 640 * 170)
        }
    },
    showCover: function() {
        //显示蒙层
        $("#cover").css("height", document.body.scrollHeight);
        $("#cover").css("width", document.body.clientWidth);
    },
    showCoverText: function(msg) {
        //显示文字蒙层
        var self = this;
        self.showCover();
        $("#coverText").css("margin-top", window.innerHeight / 2);
        $("#coverText").css("width", document.body.clientWidth * 0.6);
        $("#coverText").html(msg);
        window.setTimeout(function() {
            self.closeCover();
        }, 1500);
    },
    closeCover: function() {
        //关闭蒙层
        $("#cover").css("height", 0);
        $("#coverText").css("width", 0);
        $("#coverText").html("");
    },
    getImgMsgCode: function() {
        var self = this;
        $.ajax({
            type: 'get',
            // url: "../../apps/api/user/getCaptcha", 
            url: "http://test.jiaxinmore.com/apps/api/user/getCaptcha",
            success: function(data) {
                if (data.ret == 0) {
                    var img = "data:image/gif;base64," + data.data.captchaData;
                    $("#img_code").attr("src", img);
                } else {
                    self.showCoverText(data.msg);
                }
            },
            error: function() {
                self.showCoverText('网络异常');
            }
        });
    },
    freshImgCodeFn: function() {
        var self = this;
        var freshBtn = $("#img_code");

        // 初始化图片验证码
        self.getImgMsgCode();
        // 初始化事件
        freshBtn.on("click", function() {
            self.getImgMsgCode();
        });
    },
    getSubmit: function() {
        var self = this;
        var day = $("#select_day").val();
        var time = $("#select_time").val();
        var phone = $("#input_phone").val();
        var imgCode = $("#code_box").val();
        if (phone == "" || phone.length < 11) {
            self.showCoverText("请输入正确的手机号");
            return;
        }
        if (imgCode == "") {
            self.showCoverText("请输入验证码");
            return;
        }

        $.ajax({
            type: 'POST',
            // url: "../../apps/api/activity/chkYuanxiaoPic",
            url: "http://test.jiaxinmore.com/apps/api/activity/chkYuanxiaoPic",
            data: {
                "dateCode": day,
                "timeCode": time,
                "mobile": phone,
                "picCaptcha": imgCode
            },
            success: function(data) {
                if (data.ret == 0) {
                    self.msgCode.showMsgCodeCover();
                } else {
                    self.showCoverText(data.msg);
                }
            },
            error: function() {
                self.showCoverText('网络异常');
            }
        });
    },
    submitOrderFn: function() {
        var self = this;
        var subBtn = $("#subBtn");

        subBtn.on("click", function() {
            self.getSubmit();
        });
    },    
    msgCodeFn: function() {
        //短信验证码
        var self = this;
        self.msgCode = {
            getMsgCode: function() {
                var that = this;

                $.ajax({
                    type: 'get',
                    // url: "../../apps/api/activity/sendYuanxiaoSms",
                    url: "http://test.jiaxinmore.com/apps/api/activity/sendYuanxiaoSms",
                    success: function(data) {
                        if (data.ret == 0) {
                            that.getMsgCountDown();
                        } else {
                            self.showCoverText(data.msg);
                        }
                    },
                    error: function() {
                        self.showCoverText('网络异常');
                    }
                });
            },
            getMsgCountDown: function(timer) {
                //获取验证码倒计时
                var that = this;
                var tBox = $("#msgTitle");
                var second = timer || 60;

                clearInterval(that.codetimer);
                that.codetimer = setInterval(function() {
                    tBox.html('已获取（' + second + '）');
                    tBox.data("hascode", 1);
                    tBox.addClass("disabled");
                    second -= 1;
                    if (second == -1) {
                        clearInterval(that.codetimer);
                        tBox.html('重新获取');
                        tBox.data("hascode", 0);
                        tBox.removeClass("disabled");
                    }
                }, 1000);
            },
            getCheckMsgCode: function() {
                var that = this;
                var postData = {
                    "msgCaptcha": $("#msgCode").val()
                }
                clearTimeout(that.codetimer);
                $.ajax({
                    type: 'get',
                    // url: "../../apps/api/activity/sendYuanxiaoSms",
                    url: "http://test.jiaxinmore.com/apps/api/activity/sendYuanxiaoSms",
                    data: postData,
                    success: function(data) {
                        if (data.ret == 0) {
                            that.hideMsgCodeCover();
                            self.showCoverText("预约成功");
                            setTimeout(function() {
                                window.location.reload();
                            }, 1500)
                        } else {
                            self.showCoverText(data.msg);
                        }
                    },
                    error: function() {
                        self.showCoverText('网络异常');
                    }
                });
            },
            showMsgCodeCover: function() {
                var that = this;
                var msgCodeBox = $("#msgCodeCover");

                msgCodeBox.show();
                self.showCover();
                that.getMsgCode();
            },
            hideMsgCodeCover: function() {
                var msgCodeBox = $("#msgCodeCover");

                msgCodeBox.hide();
                self.closeCover();
            },
            subGetMsgCodeFn: function() {
                //获取短信验证码
                var that = this;
                var titleBtn = $("#msgTitle");
                titleBtn.on("click", function() {
                    if(titleBtn.hasClass('disabled')){
                        return;
                    }
                    else{
                        that.getMsgCode();
                    }
                });
            },
            closeMsgCodeFn: function() {
                var that = this;
                var closeBtn = $("#msgClose");

                closeBtn.on("click", function() {
                    that.hideMsgCodeCover();
                });
            },
            submitSureFn: function() {
                var that = this;
                var submitBtn = $("#msgSubBtn");

                submitBtn.on("click", function() {
                    that.getCheckMsgCode();
                });
            },
            init: function(){
                var that = this;
                that.subGetMsgCodeFn();
                that.closeMsgCodeFn();
                that.submitSureFn();
            }
        }
        self.msgCode.init();
    },
    init: function() {
        var self = this;
        self.initHeight();        
        self.freshImgCodeFn();
        self.submitOrderFn();
        self.msgCodeFn();
    }
}
$(document).ready(function() {
    dumpling.init();
});