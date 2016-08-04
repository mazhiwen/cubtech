;(function () {
    var appendBarCss = function (pos) {
        var head = document.querySelector("head");
        var styleSheet = document.createElement('style');
        var position = pos || "bottom"
        styleSheet.innerHTML = '.download-wrap { width: 100%; padding-top: 16%; max-width: 750px;margin: 0 auto; }.download-block { width: 100%; max-width: 750px; position: fixed; ' + position + ': 0; left: 0; right: 0; margin: 0 auto; z-index: 15;display:block; }'
        head.appendChild(styleSheet);
    }

    var downloader = {
        createBar: function (imgSrc, pos) {   //创建底部下载条
            appendBarCss(pos);
            var tpl = [
                '<div class="download-wrap">',
                '<a class="download-block" >',
                '<img class="pct100"  src="' + imgSrc + '" />',
                '</a></div>'
            ].join('');
            return $(tpl);
        },
        openApp: function (arg) {
            var isAndroid = navigator.userAgent.indexOf('Android') > -1,
                download = function (arg) {//下载操作
                    if (arg.downloadUrl) {
                        location.href = arg.downloadUrl;//有统一的下载页面，直接跳统一下载页面
                        return;
                    }
                    location.href = isAndroid ? arg.downloadAndroid : arg.downloadIOS;
                },
                wxopenapp = function (arg) {
                    if (!window.WeixinJSBridge) {
                        webopenapp(arg);//没有WeixinJSBridge当做是普通web页面
                        return;
                    }

                    WeixinJSBridge.invoke("getInstallState", {//其实不准，只能获用户有没有安装过，如果用户删除了。。。这里会没反应
                        packageName: arg.packageName,
                        packageUrl: arg.scheme
                    }, function (a) {
                        var c = a.err_msg;
                        if (c.indexOf("get_install_state:no") > -1) {
                            //未安装 - 打开下载页面
                            download(arg);
                        } else {
                            //安装过
                            location.href = arg.scheme;
                            if (!isAndroid) {
                                var ts = new Date().getTime();

                                setTimeout(function () {
                                    if (new Date().getTime() - ts > 1500) {
                                        return;
                                    } else {
                                        download(arg);
                                    }
                                }, 1000);
                            }
                        }
                    });
                },
                webopenapp = function (arg) {
                    if (isAndroid) {
                        //安卓
                        androidopenapp(arg);
                    } else {
                        //ios
                        iosopenapp(arg);
                    }
                },
                androidopenapp = function (arg, wx) {
                    //安卓打开app
                    var ts = new Date().getTime();
                    ifr.src = arg.scheme;
                    setTimeout(function () {
                        if (new Date().getTime() - ts > 2000) {
                            return;
                        } else {
                            download(arg);
                        }
                    }, 1500);
                },
                iosopenapp = function (arg) {
                    //ios打开app
                    download(arg);//直接进入app_store或统一的下载地址即可
                },
                openapp = function (arg) {
                    if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
                        //微信环境下
                        wxopenapp(arg);

                    } else {
                        //普通的页面
                        webopenapp(arg);
                    }
                };

            if (isAndroid) {
                var ifr = document.createElement("iframe");
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
            } else {
                var ifr = {src: ''};
            }
            openapp(arg);
        }
    }

    if (typeof define == "function" && window.seajs != undefined) {
        define(function (require, exports, module) {
            module.exports = downloader;
        })
    } else {
        window.downloader = downloader;
    }
}).call(window);