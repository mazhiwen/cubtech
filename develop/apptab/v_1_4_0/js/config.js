
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

      "ajaxMy":'lib/ajaxMy/1.0.0/ajaxMy.js',
      "components":'lib/components/components.js',
      "downloadapp":'modules/downloadapp/downloadApp.js',
      "commonMain":'../../js/modules/commonmain/1.0.0/commonMain.js',
      "zepto":"lib/zepto/zepto.js",
      "eq":"base/eq/eq.js",
      "downloader":"base/downloader/downloader.js",
      "proHub":"main/proHub.js",
      "template":"view/template.js"

    },
    paths:{
       'admin'://'https:'+
       URLHEAD
    }
});
//seajs.use(URLHEAD+"/js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");
seajs.use(URLHEAD+"/v_1_4_0/js/main/"+pageName);


