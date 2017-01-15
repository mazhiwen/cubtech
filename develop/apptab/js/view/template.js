/* @update: 2016-8-17 15:16:16 */
!
function() {
    function n(n, e) {
        return (/string|function/.test(typeof e) ? c: i)(n, e)
    }
    function e(n, r) {
        return "string" != typeof n && (r = typeof n, "number" === r ? n += "": n = "function" === r ? e(n.call(n)) : ""),
        n
    }
    function r(n) {
        return p[n]
    }
    function t(n) {
        return e(n).replace(/&(?![\w#]+;)|[<>"']/g, r)
    }
    function a(n, e) {
        if (f(n)) for (var r = 0,
        t = n.length; t > r; r++) e.call(n, n[r], r, n);
        else for (r in n) e.call(n, n[r], r)
    }
    function s(n, e) {
        var r = /(\/)[^\/]+\1\.\.\1/,
        t = ("./" + n).replace(/[^\/]+$/, ""),
        a = t + e;
        for (a = a.replace(/\/\.\//g, "/"); a.match(r);) a = a.replace(r, "/");
        return a
    }
    function i(e, r) {
        var t = n.get(e) || o({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return r ? t(r) : t
    }
    function c(n, e) {
        if ("string" == typeof e) {
            var r = e;
            e = function() {
                return new u(r)
            }
        }
        var t = l[n] = function(r) {
            try {
                return new e(r, n) + ""
            } catch(t) {
                return o(t)()
            }
        };
        return t.prototype = e.prototype = d,
        t.toString = function() {
            return e + ""
        },
        t
    }
    function o(n) {
        var e = "{Template Error}",
        r = n.stack || "";
        if (r) r = r.split("\n").slice(0, 2).join("\n");
        else for (var t in n) r += "<" + t + ">\n" + n[t] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(e + "\n\n" + r),
            e
        }
    }
    var l = n.cache = {},
    u = this.String,
    p = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    },
    f = Array.isArray ||
    function(n) {
        return "[object Array]" === {}.toString.call(n)
    },
    d = n.utils = {
        $helpers: {},
        $include: function(n, e, r) {
            return n = s(r, n),
            i(n, e)
        },
        $string: e,
        $escape: t,
        $each: a
    },
    v = n.helpers = d.$helpers;
    n.get = function(n) {
        return l[n.replace(/^\.\//, "")]
    },
    n.helper = function(n, e) {
        v[n] = e
    },
    "function" == typeof define ? define(function() {
        return n
    }) : "undefined" != typeof exports ? module.exports = n: this.template = n,
    n("article",
    function(n) {
        "use strict";
        var e = this,
        r = e.$helpers,
        t = e.$escape,
        a = n.article,
        s = n.user,
        i = e.$string,
        c = "";
        var myTitle=t(a.title);
        var mySummary=myTitle;
        if(t(a.summary))
            mySummary=t(a.summary);
        
		/***********************************************
		微信分享
        */
        var url=location.href;
        $.ajax({
        	url:'../app/weixin/ticket',
        	type:'POST',
        	data:{url:url},
        	dataType:'json',
        	success:function(d){
                
                //获取ticket
                var jsapi_ticket=d['data']['result'];
                var noncestr='sss';
                var timestamp=new Date().getTime();
                var s='jsapi_ticket='+jsapi_ticket+'&noncestr='+noncestr+'&timestamp='+timestamp+'&url='+url;
                
                var signature=CryptoJS.SHA1(s, { asString: true }).toString();
                
                //console.log(signature);
                
                /*
                var res=d['data']['result'];
                var noncestr=res['noncestr'];
                var timestamp=res['timestamp'];
                var signature=res['signature'];*/
        		wx.config({
		            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		            appId: 'wx587e9c060f34979a', // 必填，企业号的唯一标识，此处填写企业号corpid
		            timestamp: timestamp, // 必填，生成签名的时间戳
		            nonceStr: noncestr, // 必填，生成签名的随机串
		            signature: signature,// 必填，签名，见附录1
		            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		        });
		        wx.ready(function(){
		            wx.checkJsApi({
		                jsApiList:['onMenuShareTimeline'],
		                success:function(res){
		                }
		            });
		            wx.onMenuShareTimeline({
		                title: myTitle, // 分享标题
		                link: url, // 分享链接
		                imgUrl: 'https://api.e-quanta.com/images/favicon.png', // 分享图标
		                desc:'dsadsadsadsadsa',
		                success: function () {
                              
		                    //console.log('// 用户确认分享后执行的回调函数');
		                },
		                cancel: function () { 
		                    //console.log('// 用户取消分享后执行的回调函数');
		                }
		            });
                    wx.onMenuShareAppMessage({
                        title: myTitle, // 分享标题
                        desc: mySummary, // 分享描述
                        link: url, // 分享链接
                        imgUrl: 'https://api.e-quanta.com/images/favicon.png', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
		        });
		        wx.error(function(res){
                    
		           // console.log(res);
		        });
        	}
        });
        
        return c += '<div class="news-wrap"> <div class="news-title-area "> <h6 class="news-title">',
        c += t(a.title),
        c += '</h6> <div class="news-subtitle mt10 pr"> <span class="news-icon abs-lm"></span> <span class="news-time ml15">',
        c += t(r.dataFormat(a.createTime, "yyyy-MM-dd HH:mm")),
        c += '</span> </div> </div> <div class="news-author-area box"> <div class="author-head "> <img class="pct100" src="',
        c += t(s.headPic),
        c += '" alt=""> </div> <div class="author-info boxItem"> <div class="author-name pr"> <span>',
        c += t(s.nickName),
        c += '</span><span class="author-icon ml5"></span>  </div> <h6 class="author-des"> ',
        s.vita && (c += ' <span class="mr5">', c += t(s.vita), c += "</span> "),
        c += ' <span>\u6587\u7ae0\u603b\u6570<span class="main_gold"> ',
        c += t(s.articleNum),
        c += ' </span>\u7bc7</span> </h6> </div> </div> <article class="news-cont-area"> ',
        c += i(a.content),
        c += " ",
        a.originalUrl && (c += ' <div class="ta-r pr15"> <a class="origin-link" href="', c += t(a.originalUrl), c += '" id="originLink" style="display: block;">\u539f\u6587\u94fe\u63a5 <span class="gray">>></span></a> </div> '),
        c += " </article> </div>",
        new u(c);
       
    })
} ();