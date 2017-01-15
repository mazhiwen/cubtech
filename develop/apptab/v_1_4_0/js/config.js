

//本地

//URLHEAD='//localhost/e-quanta/develop/apptab';
//REQUESTHEAD='//localhost:8080';


//测试
//REQUESTHEAD=URLHEAD='//testapi.e-quanta.com';


//线上
URLHEAD=REQUESTHEAD='//api.e-quanta.com';


var pageName=document.getElementById('page_main').getAttribute('data-main');
seajs.config({
    base: URLHEAD+"/js/",
    alias: {

      "ajaxMy":'lib/ajaxMy/1.0.0/ajaxMy.js',
      "components":'lib/components/components.js',
      "downloadapp":'modules/downloadapp/downloadApp.js',
      "popUpWindow":"lib/popupwindow/1.0.0/popUpWindow.js",
      "template":"view/template.js",
      "zepto":"lib/zepto/zepto.js",
      "proHub":"main/proHub.js",
      "eq":"base/eq/eq.js",
      "weixinshare":"lib/weixinshare/1.0.0/weiXinShare.js",
      "sha1":"lib/sha1/1.0.0/sha1.js",
      //"downloader":"base/downloader/downloader.js",


      "downloader":"../../js/base/downloader/downloader.js",
      "commonMain":'../../js/modules/commonmain/1.0.0/commonMain.js',
      
    

      "weixin":"weixindomain/open/js/jweixin-1.1.0.js"

    },
    paths:{
       'admin':URLHEAD,
       'weixindomain':'//res.wx.qq.com'
    }
});
//seajs.use(URLHEAD+"/js/main/"+pageName+"/"+pageVersionObj[pageName]+"/index");
seajs.use(URLHEAD+"/v_1_4_0/js/main/"+pageName);


