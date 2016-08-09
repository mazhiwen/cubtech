define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var commonMain=new(require('commonMain')),
		ajaxMy=require('ajaxMy'),
		phone_input=$('#phone_input'),
		password_input=$("#password_input");
	if(docCookies.hasItem('loginName')){
		phone_input.val(docCookies.getItem('loginName'));
		password_input.val(docCookies.getItem('loginPassword'));
	}
	docCookies.removeItem('loginName');
	docCookies.removeItem('loginPassword');
	//login_name_v='13011111111';
	//login_password_v='lkjhgfdsa';
	$("#login_button").click(function(e){
		new ajaxMy('/login/login',{mobile:phone_input.val(),pwd:password_input.val()},function(d){
			if(d){
				//返回正确 存cookie
				var od=new Date(new Date().getTime()+1*24*60*60*1000);
				docCookies.setItem('loginName',phone_input.val(),od,'/');
				docCookies.setItem('loginPassword',password_input.val(),od,'/');
				docCookies.setItem('userHead',d['result']['headPic'],od);//'../images/comment_icon.png'
				window.location.href="home.html";
			}else{
				popUpWindow.alert('登陆失败',function(){});
			}
		});	
	});
});

