//2016年12月5日 16:38:55
define(function(require,exports,module) {
	module.exports=weiXinShare;

	require('sha1');
	var wx=require('weixin');
	function weiXinShare(url,title,desc,imgUrl){
        $.ajax({
        	url:URLHEAD+'/app/weixin/ticket',
        	type:'POST',
        	data:{url:url},
        	dataType:'json',
        	success:function(d){
                
                //获取ticket
                var jsapi_ticket=d['data']['result'];
                var noncestr='sss';
                var timestamp=new Date().getTime();
                var s='jsapi_ticket='+jsapi_ticket+'&noncestr='+noncestr+'&timestamp='+timestamp+'&url='+url;
                
                var signature=CryptoJS.SHA1(s, { asString: true }).toString();
                
                //console.log(signature);
                
                /*
                var res=d['data']['result'];
                var noncestr=res['noncestr'];
                var timestamp=res['timestamp'];
                var signature=res['signature'];*/
        		wx.config({
		            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		            appId: 'wx587e9c060f34979a', // 必填，企业号的唯一标识，此处填写企业号corpid
		            timestamp: timestamp, // 必填，生成签名的时间戳
		            nonceStr: noncestr, // 必填，生成签名的随机串
		            signature: signature,// 必填，签名，见附录1
		            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		        });
		        wx.ready(function(){
		            wx.checkJsApi({
		                jsApiList:['onMenuShareTimeline'],
		                success:function(res){
		                }
		            });
		            wx.onMenuShareTimeline({
		                title: title, // 分享标题
		                link: url, // 分享链接
		                imgUrl: imgUrl, // 分享图标
		                desc:desc,
		                success: function () {
                              
		                    //console.log('// 用户确认分享后执行的回调函数');
		                },
		                cancel: function () { 
		                    //console.log('// 用户取消分享后执行的回调函数');
		                }
		            });
                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl:imgUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
		        });
		        wx.error(function(res){
                    
		           // console.log(res);
		        });
        	}
        });
	}
	
});


