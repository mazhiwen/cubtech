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

/*
本地
*/
URLHEAD='//192.168.1.199:8080/bs';
REQUESTHEAD='//192.168.1.199:8080';

/*
测试

URLHEAD=REQUESTHEAD='//testadmin.e-quanta.com';
*/
/*
线上

URLHEAD=REQUESTHEAD='//admin.e-quanta.com';
*/
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
      "navigationMultiLevelUl": "navigation-multi-level-ul/1.0.3/navigationMultiLevelUl.js",
      "paging": "paging/1.0.0/paging.js",
      "dateTimePicker": "date-time-picker/1.0.0/dateTimePicker.js",
      "ajaxMy":'ajaxMy/1.0.2/ajaxMy.js',
      "commonNavigation":'../../../modules/commonnavigation/1.0.0/commonNavigation.js',
      "commonMain":'../../../modules/commonmain/1.0.0/commonMain.js'
    },
    paths:{
       'admin'://'https:'+
       URLHEAD
    }
});
seajs.use(URLHEAD+"/js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");



