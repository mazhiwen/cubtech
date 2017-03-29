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
URLHEAD='//localhost/e-quanta/develop/admin.asset3.com';
REQUESTHEAD='//localhost:8080';

//测试
//REQUESTHEAD=URLHEAD='http://testadmin.asset3.com';

//线上
//URLHEAD=REQUESTHEAD='//admin.asset3.com';
//URLHEAD=REQUESTHEAD='http://admin.asset3.com';

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
    
    a: "1.0.0",
    banner_list:"1.0.0",
    banner_edit : "1.0.0",

    
    user_list: "1.0.0",
    user_edit:"1.0.0",
    user_feed_list:"1.0.0",
    user_feed_details:"1.0.0",
    role_list:"1.0.0",
    role_edit:"1.0.0",
    administrator_list:"1.0.0",
    administrator_edit:"1.0.0",
    jobs_edit:'1.0.0',
    jobs_list:'1.0.0',
    user_role:'1.0.0',
    cooperation_list:"1.0.0",
    cooperation_edit : "1.0.0",
    role_permission:'1.0.0'
    
},
pageName=document.getElementById('page_main').getAttribute('data-main');
seajs.config({
    base: URLHEAD+"/js/lib/",
    alias: {
      /*
      共用库
      */
      "commonEdit": "equantaAdmin/js/modules/commonedit/1.0.0/commonEdit",
      "popUpWindow":'equantaAdmin/js/lib/popupwindow/1.0.0/popUpWindow.js',
      "jquery": "equantaAdmin/js/lib/jquery/jquery/3.1.0/jquery-3.1.0.min.js",
      "getGet": "equantaAdmin/js/lib/getget/1.0.0/getGet.js",
      "docCookies":"equantaAdmin/js/lib/doccookies/1.0.0/docCookies.js",
      "transformTime":'equantaAdmin/js/lib/transformtime/1.0.0/transformTime.js',
      "publicParseString": "equantaAdmin/js/lib/parsestring/1.0.0/parseString.js",
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
      "commonNavigation":'../../../modules/commonnavigation/1.0.0/commonNavigation.js',
      "commonMain":'../../../modules/commonmain/1.0.0/commonMain.js',
      "integratedcomponents":'../../../modules/integratedcomponents/integratedComponents.js'
    },
    paths:{
       'equantaAdmin':'https://admin.e-quanta.com/'
      // URLHEAD
    }
});
seajs.use(URLHEAD+"/js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");



