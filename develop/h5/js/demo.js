var uniqueId = 1;
function log(message, data) {
    var log = document.getElementById('log')
    var el = document.createElement('div')
    el.className = 'logLine'
    el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + (data ? JSON.stringify(data) : "");
    if (log.children.length) {
        log.insertBefore(el, log.children[0])
    }
    else {
        log.appendChild(el)
    }
}

eqBridge.ready(function () {
    log('eqBridge Ready');

//登陆
    $("#loginBtn").on("click", function () {
        log("JS 调用 登陆")
        eqBridge.login(function (uid) {
            log("UID为" + uid);
        })
    })

//设置分享
    $("#shareBtn").on("click", function () {
        log("JS 调用 分享设置");
        eqBridge.setShare({
            title: "testTitle",
            desc: "testDesc",
            link: window.location.href,
            imgUrl: "http://img30.360buyimg.com/jr_image/jfs/t2623/139/2035970803/38002/6547df68/5755169dN73f73598.jpg"
        })
    });

//直接唤起
    $("#callShare").on("click", function () {
        log("JS 调用 直接唤起分享");
        eqBridge.callShare({
            title: "testTitle",
            desc: "testDesc",
            link: window.location.href,
            imgUrl: "http://img30.360buyimg.com/jr_image/jfs/t2623/139/2035970803/38002/6547df68/5755169dN73f73598.jpg"
        })
    });


//设置webview高度
    $("#setHeight").on("click", function () {
        var _height = $("body").height()
        log("JS 调用 webview高度设置，高度为" + _height);
        eqBridge.setViewHeight(_height);
    });


//跳转原生模块
    $(".buttons-box").on("click", '.jumpBtn', function () {

    })
});

