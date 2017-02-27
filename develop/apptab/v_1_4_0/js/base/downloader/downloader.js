define(function(require, exports, module) {

    module.exports=downloader;
    

    var e = function(e) {
        var n = document.querySelector("head"),
        o = document.createElement("style"),
        i = e || "bottom";
        //o.innerHTML = ".download-wrap {position: fixed; width: 100%; padding-top: 16%; max-width: 750px;margin: 0 auto; }.download-block { width: 100%; max-width: 750px; position: fixed; " + i + ": 0; left: 0; right: 0; margin: 0 auto; z-index: 15;display:block; }",
        o.innerHTML = ".download-wrap {width: 100%; max-width: 700px;margin: 0 auto; }.download-block { width: 100%; max-width: 700px; position: fixed; " + i + ": 0; left: 0; right: 0; margin: 0 auto; z-index: 15;display:block; }";
        //n.appendChild(o)
    };


    var eq=require('eq');


    
    function downloader(){
        
    }

    downloader.prototype.createBar=function(n, o){

        e(o);
            //var i = [ '<a class="download-block" >', '<img class="pct100"  src="' + n + '" />', "</a>"].join("");
            var i='<a class="download-block"><div></div></a>';
            return $(i)
    }

    downloader.prototype.openApp=function(e) {
            //console.log(eq);
            //alert(eq);
            var n = navigator.userAgent.indexOf("Android") > -1,
            o = function(e) {
                return e.downloadUrl ? void(location.href = e.downloadUrl) : void(location.href = n ? e.downloadAndroid: e.downloadIOS)
            },
            i = function(e) {
                /*
                return window.WeixinJSBridge ? void WeixinJSBridge.invoke("getInstallState", {
                    packageName: e.packageName,
                    packageUrl: e.scheme
                },
                function(i) {
                    var t = i.err_msg;
                    if (t.indexOf("get_install_state:no") > -1) o(e);
                    else if (location.href = e.scheme, !n) {
                        var a = (new Date).getTime();
                        setTimeout(function() { (new Date).getTime() - a > 1500 || o(e)
                        },
                        1e3)
                    }
                }) : void t(e)
                eq.pageLock();*/
                eq.pageLock();
                var $tipsShow = $("#tipsShow")
                    $tipsShow.addClass("tips-show");
                $tipsShow.off().on("click", function () {
                    eq.pageUnlock();
                    $tipsShow.removeClass("tips-show")
                });
            },
            t = function(e) {
                n ? a(e) : d(e)
            },
            a = function(e, n) {
                var i = (new Date).getTime();
                c.src = e.scheme,
                setTimeout(function() { (new Date).getTime() - i > 2e3 || o(e)
                },
                1500)
            },
            d = function(e) {
                o(e)
            },
            r = function(e) {
                navigator.userAgent.indexOf("MicroMessenger") > -1 ? i(e) : t(e)
            };
            if (n) {
                var c = document.createElement("iframe");
                c.style.display = "none",
                document.body.appendChild(c)
            } else var c = {
                src: ""
            };
            r(e)
        }
});    