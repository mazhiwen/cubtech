
/*
本地
*/
URLHEAD='//localhost/e-quanta/develop/apptab';
REQUESTHEAD='//localhost:8080';

/*
测试

REQUESTHEAD=URLHEAD='//testadmin.e-quanta.com';
*/
/*
线上

URLHEAD=REQUESTHEAD='//admin.e-quanta.com';
*/

var pageName=document.getElementById('page_main').getAttribute('data-main');
seajs.config({
    base: URLHEAD+"/js/",
    alias: {
      //共用库
      //"commonEdit": "admin/js/modules/commonedit/1.0.0/commonEdit",
      //"popUpWindow":'admin/js/lib/popupwindow/1.0.0/popUpWindow.js',
      //"jquery": "admin/js/lib/jquery/jquery/3.1.0/jquery-3.1.0.min.js",
      //"getGet": "admin/js/lib/getget/1.0.0/getGet.js",
      //"docCookies":"admin/js/lib/doccookies/1.0.0/docCookies.js",
      //"transformTime":'admin/js/lib/transformtime/1.0.0/transformTime.js',
      
      //"json2":"json2/1.0.0/json2.js",
      //"compatible":"compatible/1.0.0/compatible.js",
      //"parseString": "parsestring/1.0.0/parseString.js",
      //"navigationMultiLevelUl": "navigation-multi-level-ul/1.0.3/navigationMultiLevelUl.js",
      //"paging": "paging/1.0.0/paging.js",
      //"dateTimePicker": "date-time-picker/1.0.0/dateTimePicker.js",
      "ajaxMy":'lib/ajaxMy/1.0.0/ajaxMy.js',
      "components":'lib/components/components.js',
      //"commonNavigation":'../../../modules/commonnavigation/1.0.0/commonNavigation.js',
      "downloadapp":'modules/downloadapp/downloadApp.js',
      "commonMain":'../../js/modules/commonmain/1.0.0/commonMain.js',
      "zepto":"lib/zepto/zepto.js",
      "eq":"base/eq/eq.js",
      "downloader":"base/downloader/downloader.js",
      "proHub":"main/proHub.js",
      "template":"view/template.js",
      "article":"main/article.js",
      "article_test":"main/article_test.js"
    },
    paths:{
       'admin'://'https:'+
       URLHEAD
    }
});
//seajs.use(URLHEAD+"/js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");
seajs.use(URLHEAD+"/js/main/"+pageName);


