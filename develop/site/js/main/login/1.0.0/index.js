define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var ajaxMy=new(require('ajaxMy')),
		phone_input=$('#phone_input'),
		password_input=$("#password_input");
	new (require('commonMain'));	
	if(docCookies.hasItem('loginName')){
		phone_input.val(docCookies.getItem('loginName'));
		password_input.val(docCookies.getItem('loginPassword'));
	}
	$("#login_button").click(function(e){
		//b 已经有cookie  并且输入账号密码与cookie不相符
		if((phone_input.val()!=docCookies.getItem('loginName')||password_input.val()!=docCookies.getItem('loginPassword'))&&docCookies.hasItem('loginName')){
			docCookies.removeItem('loginName','/');
			docCookies.removeItem('loginPassword','/');
		}
		ajaxMy.send('/login/login',{
			mobile:phone_input.val(),
			pwd:password_input.val()
			},function(d){
				//登录成功
				if(d){
					if(docCookies.hasItem('loginName')){
						//如果已有cookie
					}else{
						//没有cookie
						var od=new Date(new Date().getTime()+7*24*60*60*1000);
						docCookies.setItem('loginName',phone_input.val(),od,'/');
						docCookies.setItem('loginPassword',password_input.val(),od,'/');
						docCookies.setItem('userHead',d['result']['headPic'],od);
					}
					window.location.href="home.html";
				}else{
					popUpWindow.alert('登陆失败',function(){});
				}
			}
		);	
	});
	
});

