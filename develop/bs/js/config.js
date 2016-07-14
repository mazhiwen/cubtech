//入口
var pageVersionObj = {
    login:"1.0.0",
    information_list : "1.0.0",
    fetched_news_list: "1.0.0",
    add_fetch_source:"1.0.0",
    morningpost_edit : "1.0.0",
    news_edit: "1.0.0",
    class_article:"1.0.0",
    class_edit : "1.0.0",
    article_list: "1.0.0",
    article_edit:"1.0.1",
    subject_list : "1.0.0",
    subject_edit: "1.0.0",
    topic_list:"1.0.0",
    topic_edit : "1.0.0",
    anonymousjuicy_list: "1.0.0",
    anonymousname_list:"1.0.0",
    anonymousname_add : "1.0.0",
    a: "1.0.0",
    banner_list:"1.0.0",
    banner_edit : "1.0.0",
    comment_list: "1.0.0",
    comment_details:"1.0.0",
    sys_push_list : "1.0.0",
    sys_push_edit: "1.0.0",
    app_push_list:"1.0.0",
    app_push_edit : "1.0.0",
    user_list: "1.0.0",
    user_edit:"1.0.0",
    user_feed_list:"1.0.0",
    user_feed_details:"1.0.0",
    role_list:"1.0.0",
    role_edit:"1.0.0",
    administrator_list:"1.0.0",
    administrator_edit:"1.0.0"

}


seajs.config({
    base: "../js/lib/",
    alias: {
      "jquery": "jquery/jquery/1.10.1/jquery-debug.js",
      "navigationMultiLevelUl": "navigation-multi-level-ul/1.0.2/navigationMultiLevelUl.js",
      "getGet": "getGet/1.0.0/getGet.js",
      "paging": "paging/1.0.0/paging.js",
      "dateTimePicker": "date-time-picker/1.0.0/dateTimePicker.js"

    }
});



var pageName=document.getElementById('page_main').getAttribute('data-main');

//seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");
seajs.use("../js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");



/*******************************
var debug = true;



var siteHost = {
    home: debug ? "../js/lib/" : "gulpTag/js"
}

//入口文件版本控制
var mainVision = {
    welcome: "1.0.0", //欢迎界面
}

//var comboExSet = debug ? /.*//******************************* : "";
var comboExSet = /.*//*******************************
var distPath = debug ? "modules" : "dist";

seajs.config({
    charset: "utf-8",
    base: siteHost.home,
    alias: {
        "jquery": "jquery/jquery/1.10.1/jquery.js",
        "iScroll": "lib/iscroll/iscroll",
        "template": "view/template.js",
        "common": distPath + "/common/1.0.0/common",
        "proHub": distPath + "/proHub/1.0.0/proHub",
        "proTools": distPath + "/proTools/1.0.0/proTools"
    },
    paths: {
        "mod": distPath
    },
    comboExcludes: comboExSet,
    comboMaxLength: 1000
})



$(function () {
    var $pageType = $("#page_main");
    var main_enter = $pageType.attr("data-main");  //对应页面程序入口
    FastClick && FastClick.attach(document.body);

    if (main_enter) {
        seajs.use(["main/" + main_enter + "/" + mainVision[main_enter] + "/" + main_enter, "common"], function (e, common) {
            if (e != null) {
                window.pageMod = e;
            }
        });  //进入入口
    }
})


******************************/

