/* @update: 2016-8-17 15:12:12 */
!
function(e) {
    function t(e) {
        e.preventDefault()
    }
    var n = {
        vision: "1.0.0",
        pageLock: function() {
            document.addEventListener("touchmove", t, !1)
        },
        pageUnlock: function() {
            document.removeEventListener("touchmove", t, !1)
        },
        getUrlString: function(e) {
            var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(t);
            return null != n ? decodeURIComponent(n[2]) : null
        },
        setCookie: function(e, t, n) {
            var r = new Date;
            r.setDate(r.getDate() + n),
            document.cookie = e + "=" + encodeURI(t) + (null == n ? "": ";expires=" + r.toGMTString())
        },
        getCookie: function(e) {
            return document.cookie.length > 0 && (c_start = document.cookie.indexOf(e + "="), -1 != c_start) ? (c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), decodeURI(document.cookie.substring(c_start, c_end))) : ""
        },
        getBrowserInfo: function() {
            var e = navigator.userAgent.toLowerCase(),
            t = e.indexOf("ipad") > -1 || e.indexOf("iphone") > -1 || !1,
            n = e.indexOf("micromessenger") > -1 || !1,
            r = e.indexOf("equanta") > -1 || !1,
            c = {
                isIos: t,
                inWx: n,
                isEq: r
            };
            return c
        },
        formatTime: function(e, t) {
            var n = new Date(e),
            r = function(e) {
                return (10 > e ? "0": "") + e
            };
            return t.replace(/yyyy|MM|dd|HH|mm|ss/g,
            function(e) {
                switch (e) {
                case "yyyy":
                    return r(n.getFullYear());
                case "MM":
                    return r(n.getMonth() + 1);
                case "mm":
                    return r(n.getMinutes());
                case "dd":
                    return r(n.getDate());
                case "HH":
                    return r(n.getHours());
                case "ss":
                    return r(n.getSeconds())
                }
            })
        },
        validate: {
            checkTel: function(e) {
                var t = /^(13|14|15|17|18)\d{9}$/;
                return t.test(e)
            },
            checkEmail: function(e) {
                var t = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                return t.test(e)
            },
            checkPicture: function(e) {
                var t = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
                return t.test(e)
            },
            checkRar: function(e) {
                var t = /(.*)\.(rar|zip|7zip|tgz)$/;
                return t.test(e)
            },
            checkIDCard: function(e) {
                var t = /^([0-9]){7,18}(x|X)?$/;
                return t.test(e)
            },
            checkQQ: function(e) {
                var t = /[1-9][0-9]{4,14}/;
                return t.test(e)
            },
            checkPassWord: function(e) {
                var t = /^[a-zA-Z]\w{5,19}$/;
                return t.test(e)
            },
            checkCreditCard: function(e) {
                var t = /[0-9]{13,16}/;
                return t.test(e)
            },
            checkBankCard: function(e) {
                var t = /^62[0-5]\d{13,16}$/;
                return t.test(e)
            },
            checkVisaCard: function(e) {
                var t = /^4[0-9]{12}(?:[0-9]{3})?$/;
                return t.test(e)
            },
            checkMasterCard: function(e) {
                var t = /^5[1-5][0-9]{14}$/;
                return t.test(e)
            },
            checkLoginName: function(e) {
                var t = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){4,19}$/;
                return t.test(e)
            },
            checkTrueName: function(e) {
                var t = /[\u4E00-\u9FA5]{2,5}(?:\xb7[\u4E00-\u9FA5]{2,5})*/;
                return t.test(e)
            },
            checkChinese: function(e) {
                var t = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
                return t.test(e)
            }
        }
    };
    console.log("function" == typeof define && void 0 != window.seajs);
    "function" == typeof define && void 0 != window.seajs ? define(function(require, exports, module) {
        module.exports = n
    }) : e.eq = n
} (window);