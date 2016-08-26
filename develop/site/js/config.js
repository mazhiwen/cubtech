
var pageVersionObj = {
    myarticle:"1.0.0",
    article_details:'1.0.0',
    home:'1.0.0',
    contact:'1.0.0',
    about:'1.0.0',
    login:'1.0.0',
    edit:'1.0.0',
    select:'1.0.0'
},
pageName=document.getElementById('page_main').getAttribute('data-main');
/*
最大显示几个分页数
*/
MAXPAGING=11;
/*
文章每次刷新几条
*/
PERPAGINGCOUNT=20;
/*
配置ueditor 工具栏 fix 顶部距离
*/
UEDITORTOPOFFSET=71;
/*
切换环境 
1.更改REQUESTHEAD  ajaxmy 的请求头部
2.ueditor请求
*/
/*
正式环境

REQUESTHEAD='https://www.e-quanta.com';
*/
/*
测试环境

REQUESTHEAD='https://test.e-quanta.com';
*/
/*
本地环境
*/
REQUESTHEAD='//localhost:8080';



seajs.config({
    base: "./js/lib/",
    alias: {
      /*
      共用 admin 域的文件
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
      "getHtml":'gethtml/1.0.0/getHtml.js',
      "ajaxMy":'ajaxMy/1.0.2/ajaxMy.js',
      "commonNavigation":'../../../modules/commonnavigation/1.0.0/commonNavigation.js',
      "commonMain":'../../../modules/commonmain/1.0.0/commonMain.js',
      "commonCopy":'../../../modules/commoncopy/1.0.0/commonCopy.js',
      "mustLogin":'../../../modules/mustlogin/1.0.0/mustLogin.js'
    },
    paths:{
       'admin':'https://admin.e-quanta.com' 
    }


});
seajs.use("./js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");

