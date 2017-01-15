    $(document).on("click", ".download-block", function () {
        window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta';
        /*
        downloader.openApp({
            packageName: "com.eq.stock",
            scheme: 'equanta://',
            downloadAndroid: "http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta",
            downloadIOS: "https://itunes.apple.com/cn/app/yi-kuang/id1137638296?mt=8"
        });*/
    })

    $(".main-wrap").on("click", "img", function () {
        var _scheme = 'hyb-image-preview:' + $(this).attr("src")
        window.location.href = _scheme;
    })