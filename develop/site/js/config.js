
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
seajs.config({
    base: "./js/lib/",
    alias: {
      "jquery": "jquery/jquery/3.1.0/jquery-3.1.0.min.js",
      "getGet": "getGet/1.0.0/getGet.js",
      "ajaxMy":'ajaxMy/1.0.2/ajaxMy.js',
      "getHtml":'gethtml/1.0.0/getHtml.js',
      "docCookies":"doccookies/1.0.0/docCookies.js",
      "uploadFile":'uploadfile/1.0.0/uploadFile.js',
      "popUpWindow":'popupwindow/1.0.0/popUpWindow.js',
      "commonNavigation":'../../../modules/commonnavigation/1.0.0/commonNavigation.js',
      "commonMain":'../../../modules/commonmain/1.0.0/commonMain.js',
      "commonCopy":'../../../modules/commoncopy/1.0.0/commonCopy.js',
      "mustLogin":'../../../modules/mustlogin/1.0.0/mustLogin.js'
    }
});
seajs.use("./js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");

