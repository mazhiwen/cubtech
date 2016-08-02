define(function(require) {
	
	var $=require('jquery'),
		docCookies=new(require('docCookies')),
		ajaxMy=require('ajaxMy'),
		login_name=$('#login_name'),
		login_password=$('#login_password');


/*
new ajaxMy('/web/login/login',{mobile:'13011111111',pwd:'lkjhgfdsa'},function(d){
				console.log(d);
				if(d){
					//返回正确 存cookie
					var od=new Date(new Date().getTime()+1*24*60*60*1000);
					docCookies.setItem('loginName','13011111111',od);
					docCookies.setItem('loginPassword','lkjhgfdsa',od);
					//window.location.href="home.html";
				}else{
					alert('登陆失败');
					//返回错误 alert 密码错误等
					//popUpWindow.confirm('确倒萨倒萨','倒萨大',function(){alert(1);},function(){});
				}	
			});*/
	//docCookies.removeItem('loginName');
	$("#login-button").click(function(){
		var login_name_v=login_name.val(),login_password_v=login_password.val();
		login_name_v='13011111111';
		login_password_v='lkjhgfdsa';		  
		//docCookies.setItem('loginName',login_name_v,false,'/');
		//docCookies.setItem('loginPassword',login_password_v,false,'/');
		$.ajax({
			type:"POST",
			//url:'//admin.e-quanta.com/web/login/login',
			url:'//123.56.237.44:8091/web/login/login',
			data:{mobile:login_name_v,pwd:login_password_v},
			dataType:"json",
			success:function(d){
				if(d['data']['result']){
					var od=false;
					if($("#check_save_login").prop("checked")){od=new Date(new Date().getTime()+1*24*60*60*1000);}
					docCookies.setItem('loginName',login_name_v,od,'/');
					docCookies.setItem('loginPassword',login_password_v,od,'/');
					window.location.href='./html/class_article.html';	
				}
				else{
					alert('请求失败');
				}
			}

		});

		
	});
});

