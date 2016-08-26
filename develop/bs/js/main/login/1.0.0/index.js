define(function(require) {
	require('jquery');
	$=jQuery;
	POPUPWINDOW=new(require('popUpWindow'));
	docCookies=new(require('docCookies'));
	var	ajaxMy=new(require('ajaxMy')),
		login_name=$('#login_name'),
		login_password=$('#login_password');
	if(docCookies.hasItem('loginName')){
		login_name.val(docCookies.getItem('loginName'));
		login_password.val(docCookies.getItem('loginPassword'));
		window.location.href="./html/article_list.html";
	}
	//login_name_v='18600576402';
	//login_password_v='asdfghjkl';
	//docCookies.removeItem('loginName','/');
	//docCookies.removeItem('loginPassword','/');
	/*
	{
	"areaCode":"86",
	"authV":0,
	"gender":null,
	"nickName":"测试",
	"vita":"我就是我",
	"mobile":"18600576402",
	"id":21,
	"headPic":"http://cdn.e-quanta.com/headpic/default.png"
	}*/
	$("#login-button").click(function(){
		//b 已经有cookie  并且输入账号密码与cookie不相符
		if((login_name.val()!=docCookies.getItem('loginName')||login_password.val()!=docCookies.getItem('loginPassword'))&&docCookies.hasItem('loginName')){
			docCookies.removeItem('loginName','/');
			docCookies.removeItem('loginPassword','/');
		}
		ajaxMy.send('/login/login',{
			mobile:login_name.val(),
			pwd:login_password.val()
			},function(d){
				//登录成功
				if(d){
					var dr=d['result'];
					if(docCookies.hasItem('loginName')){
						//如果已有cookie
					}else{
						//没有cookie
						var od=false;
						if($("#check_save_login").prop("checked")){od=new Date(new Date().getTime()+7*24*60*60*1000);}
						docCookies.setItem('loginName',login_name.val(),od,'/');
						docCookies.setItem('loginPassword',login_password.val(),od,'/');
						docCookies.setItem('userNickName',dr['nickName'],od,'/');
						docCookies.setItem('userHead',dr['headPic'],od,'/');
						docCookies.setItem('userGender',dr['gender'],od,'/');
						docCookies.setItem('userVita',dr['vita'],od,'/');
						docCookies.setItem('userMobile',dr['mobile'],od,'/');
						docCookies.setItem('userId',dr['id'],od,'/');
					}
					window.location.href='./html/article_list.html';
				}else{
					POPUPWINDOW.alert('登陆失败',function(){});
				}
			}
		);
	});	
});

