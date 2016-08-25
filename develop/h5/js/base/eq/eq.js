;(function (win) {
    /**============================
     私有方法
     ==============================*/
    function pageLockHandler(e) {
        e.preventDefault();
    }

    /**============================
     公共方法
     ==============================*/
    var eq = {
        vision: "1.0.0",
        //锁定页面
        pageLock: function () {
            document.addEventListener("touchmove", pageLockHandler, false)
        },
        // 解锁页面
        pageUnlock: function () {
            document.removeEventListener("touchmove", pageLockHandler, false)
        },
        //获取url参数
        getUrlString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        },
        //存储cookie
        setCookie: function (c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays)
            document.cookie = c_name + "=" + encodeURI(value) +
                ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
        },
        //获取cookie
        getCookie: function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=")
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1
                    c_end = document.cookie.indexOf(";", c_start)
                    if (c_end == -1) c_end = document.cookie.length
                    return decodeURI(document.cookie.substring(c_start, c_end))
                }
            }
            return ""
        },
        //获取浏览器信息
        getBrowserInfo: function () {
            var ua = navigator.userAgent.toLowerCase();
            var isIos = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1 || false;
            var inWx = ua.indexOf('micromessenger') > -1 || false;
            var isEquanta = ua.indexOf('equanta') > -1 || false;
            var resultObj = {
                isIos: isIos,
                inWx: inWx,
                isEq: isEquanta
            }
            return resultObj
        },
        /**日期格式化
         * eq.formatTime(time,'yyyy-MM-dd HH:mm:ss')
         * */
        formatTime: function (time, format) {
            var t = new Date(time);
            var tf = function (i) {
                return ( i < 10 ? '0' : '') + i
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        },
        //校验系统
        validate: {
            // 验证手机号
            checkTel: function (value) {
                var reg = /^(13|14|15|17|18)\d{9}$/;
                return reg.test(value);
            },

            //验证邮箱地址
            checkEmail: function (value) {
                var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                return reg.test(value);
            },

            //验证图片格式
            checkPicture: function (value) {
                var reg = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
                return reg.test(value);
            },

            //验证压缩格式
            checkRar: function (value) {
                var reg = /(.*)\.(rar|zip|7zip|tgz)$/;
                return reg.test(value);
            },

            //验证身份证
            checkIDCard: function (value) {
                var reg = /^([0-9]){7,18}(x|X)?$/;
                return reg.test(value);
            },

            //验证QQ号
            checkQQ: function (value) {
                var reg = /[1-9][0-9]{4,14}/;
                return reg.test(value);
            },

            //验证密码 字母开头，长度在6~20之间，只能包含字母、数字和下划线
            checkPassWord: function (value) {
                var reg = /^[a-zA-Z]\w{5,19}$/;
                return reg.test(value);
            },

            //验证信用卡
            checkCreditCard: function (value) {
                var reg = /[0-9]{13,16}/;
                return reg.test(value);
            },

            //验证银联卡
            checkBankCard: function (value) {
                var reg = /^62[0-5]\d{13,16}$/;
                return reg.test(value);
            },

            //验证Visa卡
            checkVisaCard: function (value) {
                var reg = /^4[0-9]{12}(?:[0-9]{3})?$/;
                return reg.test(value);
            },

            //验证万事达卡
            checkMasterCard: function (value) {
                var reg = /^5[1-5][0-9]{14}$/;
                return reg.test(value);
            },

            //验证登录名
            checkLoginName: function (value) {
                var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){4,19}$/;
                return reg.test(value);
            },

            //验证真实姓名 考虑到外国人名 xx·XXX
            checkTrueName: function (value) {
                var reg = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;
                return reg.test(value);
            },

            //验证中文
            checkChinese: function (value) {
                var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
                return reg.test(value);
            }
        }
    };

    if (typeof define == "function" && window.seajs != undefined) {
        define(function (require, exports, module) {
            module.exports = eq;
        })
    } else {
        win.eq = eq;
    }
})(window);













