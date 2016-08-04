define(function(require) {
	var $=require('jquery'),
		docCookies=new(require('docCookies')),
		ajaxMy=require('ajaxMy'),
		login_name=$('#login_name'),
		login_password=$('#login_password');
	docCookies.removeItem('loginName');	
	docCookies.removeItem('loginPassword');	
	docCookies.removeItem('loginName','/');	
	docCookies.removeItem('loginPassword','/');
	if(docCookies.hasItem('loginName')){
		login_name.val(docCookies.getItem('loginName'));
		login_password.val(docCookies.getItem('loginPassword'));
	}
	//docCookies.setItem('loginName',login_name_v,false,'/');
	$("#login-button").click(function(){
		//var login_name_v=login_name.val(),login_password_v=login_password.val();
		//login_name_v='18600576402';
		//login_password_v='asdfghjkl';
		//login_name_v='13011111111';
		//login_password_v='lkjhgfdsa';		  
		$.ajax({
			type:"POST",
			url:REQUESTDOMAIN+'/admin/login/login',
			data:{mobile:login_name.val(),pwd:login_password.val()},
			dataType:"json",
			success:function(d){
				if(d['data']){
					if(d['data']['result']){
						var od=false;
						if($("#check_save_login").prop("checked")){od=new Date(new Date().getTime()+1*24*60*60*1000);}
						docCookies.setItem('loginName',login_name.val(),od,'/');
						docCookies.setItem('loginPassword',login_password.val(),od,'/');
						window.location.href='./html/class_article.html';	
					}
					else{
						alert('请求失败');
					}
				}else{
					alert('登录失败: '+d['desc']);
				}
			}
		});
	});
});

