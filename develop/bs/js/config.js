/*
最大显示几个分页数
*/
MAXPAGING=11;
/*
每页最大显示几条记录
*/
PERPAGINGCOUNT=20;
/*
ueditor z-index
*/
UEDITORTOPOFFSET=51;
/*
切换正式环境需要调整的值
URLHEAD 
REQUESTHEAD   
ueditor-config-serverurl
*/


//本地
//URLHEAD='//localhost/e-quanta/develop/bs';
//REQUESTHEAD='//localhost:8080';

//测试

//REQUESTHEAD=URLHEAD='//testadmin.e-quanta.com';

//线上
URLHEAD=REQUESTHEAD='//admin.e-quanta.com';


var pageVersionObj = {
    ad_edit:"1.0.0",
    login:"1.0.0",
    ad_list:"1.0.0",
    information_list : "1.0.0",
    fetched_news_list: "1.0.0",
    bs_version: "1.0.0",
    bs_help:"1.0.0",
    add_fetch_source:"1.0.0",
    morningpost_edit : "1.0.0",
    news_edit: "1.0.0",
    class_article:"1.0.0",
    class_edit : "1.0.0",
    article_list: "1.0.0",
    article_edit:"1.0.3",
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
    role_permission:'1.0.0',
    verify_personal:'1.0.0',
    verify_media:'1.0.0',
    verify_org:'1.0.0',
    verify_reply:'1.0.0',
    verify:'1.0.0',
    app_version:'1.0.0',
    organization:'1.0.0',
    onekey_focus:'1.0.0',
    verify_commit:'1.0.0',
    activity_list:'1.0.0',
    activity_edit:'1.0.0',
    activity_verify:'1.0.0',
    appcomponents_edit:'1.0.0',
    appcomponents_list:'1.0.0',
    v_order:'1.0.0',
    activity_city_config:'1.0.0',
    activity_city_edit:'1.0.0',
    statistic:'1.0.0',
    version_edit:'1.0.0',
    app_push_list:'1.0.0',
    app_push_edit:'1.0.0'
},
pageName=document.getElementById('page_main').getAttribute('data-main');
seajs.config({
    base: URLHEAD+"/js/lib/",
    alias: {
      /*
      共用库
      */
      "commonEdit": "admin/js/modules/commonedit/1.0.0/commonEdit",
      "popUpWindow":'admin/js/lib/popupwindow/1.0.0/popUpWindow.js',
      "jquery": "admin/js/lib/jquery/jquery/3.1.0/jquery-3.1.0.min.js",
      "getGet": "admin/js/lib/getget/1.0.0/getGet.js",
      "docCookies":"admin/js/lib/doccookies/1.0.0/docCookies.js",
      "transformTime":'admin/js/lib/transformtime/1.0.0/transformTime.js',
      /*
      私有
      */
      "json2":"json2/1.0.0/json2.js",
      "compatible":"compatible/1.0.0/compatible.js",
      "parseString": "parsestring/1.0.0/parseString.js",
      "navigationMultiLevelUl": "navigation-multi-level-ul/1.0.3/navigationMultiLevelUl.js",
      "paging": "paging/1.0.0/paging.js",
      "dateTimePicker": "date-time-picker/1.0.0/dateTimePicker.js",
      "ajaxMy":'ajaxMy/1.0.2/ajaxMy.js',
      "MyUI":'myui/1.0.0/myUI.js',
      "commonNavigation":'../../../modules/commonnavigation/1.0.0/commonNavigation.js',
      "commonMain":'../../../modules/commonmain/1.0.0/commonMain.js',
      "integratedcomponents":'../../../modules/integratedcomponents/integratedComponents.js'
    },
    paths:{
       'admin'://'https:'+
       URLHEAD
    }
});
seajs.use(URLHEAD+"/js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");



