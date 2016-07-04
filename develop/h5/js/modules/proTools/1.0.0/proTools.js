//表单提交及验证组件
define(function (require, exports, module) {
    /**============================
     工具函数
     ==============================*/
    //cookie操作
    var cookies = {
        setCookie: function (name, value, expires) {
            if (!name)return;
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expires)
            document.cookie = name + "=" + encodeURI(value) +
                ((expires == null) ? "" : ";expires=" + exdate.toGMTString())
        },
        getCookie: function (name) {
            if (!name || !document.cookie) {//没有cookie时或空方法
                return null;
            }
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)", "g"));
            if (typeof(index) == 'undefined' && !!arr) {
                var value;
                for (var i = 0; i < arr.length; ++i) {
                    var key_value = decodeURI(arr[i]);
                    value = key_value.substring(key_value.indexOf('=') + 1, key_value.length);
                    value = value.replace(/\;$/, '');
                    if (!!value) {
                        return value;
                        break;
                    }
                }
                return value;
            } else {
                if (arr != null && !!arr[index]) {
                    var key_value = decodeURI(arr[index]), value = key_value.substring(key_value.indexOf('=') + 1, key_value.length - 1);
                    return value;
                }
            }
            return null;
        },
        delCookie: function (name) {
            if (!name)return;//空方法
            document.cookie = name + '=;expires=' + new Date().toGMTString();
        }
    }

    //基于ua的工具
    var uaTools = {
        getSystem: function () {

        },
        getBrowser: function () {

        }
    }

    //模板辅助工具
    var tmodHelper = {
        dataFormat: function (data, format) {
            date = new Date(data);
            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                var v = map[t];
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                    }
                    return v;
                }
                else if (t === 'y') {
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        },
        encodeStr: function (str) {
            return encodeURI(str);
        }
    }

    //字符串校验工具
    var checker = function (type, string) {
        switch (type) {
            case "tel":
                if (!/(^1\d{10}$)/.test(string)) {
                    return false;
                } else {
                    return true;
                }
                break;
            case "email":
                break;
            case "name":
                break;
        }
    }

    //获取url参数
    var getUrlString = function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }


    /**============================
     组件群
     ==============================*/
    //codeSender-发送验证码
    function CodeSender(opts) {
        this.$btn = opts.$btn;
        this.beforeSend = opts.beforeSend || function () {
                return true
            };
        this.sendFn = opts.sendFn;//点击发送的代码
        this.totalTime = opts.totalTime || 60
        this.timesupFn = opts.timesupFn //时间到了后执行
        this.canSend = true; //是否可以发送
        this.init();
    }

    CodeSender.prototype = {
        init: function () {
            this.bindEvent()
        },
        bindEvent: function () {
            var self = this;
            this.$btn.on("click", function () {
                if (!self.canSend)return;
                if (self.beforeSend()) {
                    self.sendFn();
                    self.status = false;
                    self.$btn.html(self.totalTime + "s后重发").addClass("code-sending");
                    self.timer = setInterval(function () {
                        self.totalTime--;
                        self.$btn.html(self.totalTime + "s后重发")
                        if (self.totalTime <= 0) {
                            self.$btn.html("重新发送").removeClass("code-sending");
                            self.status = true;
                            clearInterval(self.timer);
                        }
                    }, 1000)
                }
            })
        }
    }

    //通用错误提示层
    var alertWarning = function (text) {
        $(".alert-box").remove();
        $("body").append($('<div class="alert-box"><div class="alert-warning">' + text + '</div></div>'))
    }


    var proTools = {
        CodeSender: CodeSender,
        setCookie: cookies.setCookie,
        getCookie: cookies.getCookie,
        delCookie: cookies.delCookie,
        getSystem: uaTools.getSystem,
        getBrowser: uaTools.getBrowser,
        getUrlString: getUrlString,
        checker: checker,
        alertWarning: alertWarning,
        tmodHelper: tmodHelper
    }
    module.exports = proTools
})