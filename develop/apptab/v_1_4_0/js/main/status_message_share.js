define(function(require) {


    require('zepto');
    var eq=require('eq');
    var downloader=require('downloader');
    require("proHub");
    var template=require("template");
    require('commonMain');

    //AJAXMY.send('',{},function(data){    });
    
    var e = downloader.createBar("//testapi.e-quanta.com/images/banner.png", "");
    $(".container").after(e);
	
	$(document).on("click", ".download-block", function () {
        downloader.openApp({
            packageName: "com.eq.stock",
            scheme: 'equanta://',
            downloadAndroid: "http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta",
            downloadIOS: "https://itunes.apple.com/cn/app/yi-kuang/id1137638296?mt=8"
        });
    })

});