define(function(require) {
	
	var $=require('jquery'),
		docCookies=new(require('docCookies'));
	

	//console.log(document.cookie);
	$("#login-button").click(function(){

		//ajax数据  

		//如果密码正确


			//登陆记录
			if($("#check_save_login").prop("checked")){
				var nowDate=new Date();
				var endDate=new Date(nowDate.getTime()+5000000);
				docCookies.setItem('loginName',$('#login_name').val(),Infinity);
				docCookies.setItem('loginPassword',$('#login_password').val(),endDate);
				console.log(docCookies.getItem('loginName'));
			}else{
				

				docCookies.setItem('loginName',$('#login_name').val());
				docCookies.setItem('loginPassword',$('#login_password').val());


			}
			//获取权限,展示网页, 每个网页加判断用户以及权限
			if(docCookies.getItem('loginName')=='mazhiwen'){



				window.location.href='information_list.html';
			}else{

				window.location.href='fetched_news_list.html';
			}
			

		
	});
});

