#### eq.js
eq.js是一匡H5的通用基础库

 
##### downloader.js
downloader.js 是创建下载引导banner，绑定唤起app的scheme协议。

使用方法：
1. 页面引入download.js

``` javascript
创建banner，返回一个jq对象
download.createBar(imgSrc,position);   //position传“top”或者 “bottom”

唤起App
downloader.openApp({
    packageName: "com.eq.app",
    scheme: 'openapp.equante://',
    downloadAndroid: "安卓下载地址",
    downloadIOS: "https://itunes.apple.com/us/app/eq",
    downloadUrl: "download.html"
});
```    

##### bridge.js
bridge.js是app内和h5通信的基础库

使用方法：
1. 页面引入bridge.js

``` javascript
eqBridge.ready(function(){
    //所有可调用的方法都在ready后绑定
})

//登陆
eqBridge.login(callback)  
    
});
```  

 
 
