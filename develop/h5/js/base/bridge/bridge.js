;(function (win) {
    win.callbacks = {};
    win.eqBridge = {
        vision: "1.0.0",
        system: {},
        init: function () {
            var self = this;
            var ua = navigator.userAgent.toLowerCase();
            this.system.isIOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1 || false;
            this.system.isAndroid = ua.indexOf('android') > -1 || false;
            this.system.isEqApp = ua.indexOf('equanta') > -1 || false;
            this.readyFnAry = [];

            if (this.system.isEqApp == false) {
                console.log("不是一匡APP");
                return;
            }

            if (win.jsBridge) {
                this.bridge = win.jsBridge;
            } else {
                var timer = setInterval(function () {
                    if (win.jsBridge && self.readyFnAry.length) {
                        clearInterval(timer);
                        self.bridge = win.jsBridge;
                        for (var i = 0; i < self.readyFnAry.length; i++) {
                            self.readyFnAry[i]();
                        }
                    }
                }, 100);
            }
        },
        ready: function (readyFn) {
            if (this.bridge) {
                readyFn();
            } else {
                this.readyFnAry.push(readyFn);
            }
        },
        callHandler: function (name, params, callback) {
            if (callback) {
                var callbackId = "cb" + new Date().getTime();
                win.callbacks[callbackId] = callback;
                params.callbackId = callbackId;
            }
            if (this.system.isAndroid) {
                if (typeof params === "string") {
                    this.bridge[name](params);
                } else {
                    this.bridge[name](JSON.stringify(params));
                }
            }
            if (this.system.isIOS) {
                this.bridge[name](params);
            }
        },
        login: function (callback) {
            this.callHandler("JSLogin", {}, callback)
        },
        callShare: function (params) {
            this.callHandler("JSShare", params)
        },
        setShare: function (params) {
            this.callHandler("JSShareSet", params)
        },
        jumpTo: function (params) {
            this.callHandler("JSCallUpNativeView", params)
        },
        setViewHeight:function(params){
            this.callHandler("JSSetViewHeight", params)
        }
    };
    win.eqBridge.init();
})(window);