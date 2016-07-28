define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var commonMain=new(require('commonMain')),
		docCookies=new(require('docCookies')),
		ajaxMy=require('ajaxMy'),
		phone_input=$('#phone_input'),
		password_input=$("#password_input");
	if(docCookies.hasItem('loginName')){
		phone_input.val(docCookies.getItem('loginName'));
		password_input.val(docCookies.getItem('loginPassword'));
	}
	//docCookies.removeItem('loginName');
	//docCookies.removeItem('loginPassword');
	$("#login_button").click(function(e){
		if(docCookies.hasItem('loginName')&&docCookies.getItem('loginName')==phone_input.val()&&docCookies.getItem('loginPassword')==password_input.val()){
			window.location.href="home.html";
		}else{
			new ajaxMy('/web/login/login',{mobile:phone_input.val(),pwd:password_input.val()},function(d){
				console.log(d);
				if(d){
					//返回正确 存cookie
					var od=new Date(new Date().getTime()+1*24*60*60*1000);
					docCookies.setItem('loginName',phone_input.val(),od);
					docCookies.setItem('loginPassword',password_input.val(),od);
					window.location.href="home.html";
				}else{
					alert('登陆失败');
					//返回错误 alert 密码错误等
					//popUpWindow.confirm('确倒萨倒萨','倒萨大',function(){alert(1);},function(){});
				}	
			});	
		}
	});


});

