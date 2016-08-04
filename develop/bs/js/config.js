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
    subject_edit: "1.0.1",
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
    administrator_edit:"1.0.0",
    top_tab:'1.0.0',
    recommendtab_list:'1.0.0',
    user_role:'1.0.0',
    role_permission:'1.0.0'

},
/*
切换正式环境  调整
domain 
REQUESTDOMAIN   
ueditor-config-serverurl
*/
pageName=document.getElementById('page_main').getAttribute('data-main');
//var domain='https://admin.e-quanta.com';
var domain='http://localhost/e-quanta/develop/bs';
//var domain='//123.56.237.44:8091/bs';
//REQUESTDOMAIN='//admin.e-quanta.com';
REQUESTDOMAIN='//123.56.237.44:8091';
seajs.config({
    base: domain+"/js/lib/",
    alias: {
      "jquery": "jquery/jquery/1.10.1/jquery.js",
      "jqueryHostA": "hostA/js/lib/jquery/jquery/1.10.1/jquery.js",
      "navigationMultiLevelUl": "navigation-multi-level-ul/1.0.3/navigationMultiLevelUl.js",
      "getGet": "getGet/1.0.0/getGet.js",
      "paging": "paging/1.0.0/paging.js",
      "dateTimePicker": "date-time-picker/1.0.0/dateTimePicker.js",
      "ajaxMy":'ajaxMy/1.0.1/ajaxMy.js',
      "transformTime":'transformtime/1.0.0/transformTime.js',
      "commonNavigation":'../../../modules/commonnavigation/1.0.0/commonNavigation.js',
      "uploadFile":'../../../modules/uploadfile/1.0.0/uploadFile.js',
      "docCookies":"doccookies/1.0.0/docCookies.js",
      "commonMain":'../../../modules/commonmain/1.0.0/commonMain.js'
    },
    paths:{
       'hostA':'https://admin.e-quanta.com' 
    }
});
//最大显示几个分页数
MAXPAGING=11;
//每页最大显示几条记录
PERPAGINGCOUNT=20;
seajs.use(domain+"/js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");

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

