define(function(require) {
	require('jquery');
	$=jQuery;
	new(require('compatible'));
	AJAXMY=new(require('ajaxMy'));

	POPUPWINDOW=new(require('popUpWindow'));
	DOCCOOKIES=new(require('docCookies'));
	PARSESTRING=new(require('parseString'));

	MYUI = new (require('myUI'));
	
	var navMulLevUl=require('navigationMultiLevelUl'),
		navMulLevUlMy=new navMulLevUl('#left'),
		currentDom=navMulLevUlMy.getCurDom();
	


/*	if(!DOCCOOKIES.hasItem('loginName')){
		POPUPWINDOW.alert('未登录，请登录',function(){
			window.location.href='../login.html';
		});
	}else{
*/

		//顶部右侧用户状态
		
		$(".top").append('<div class="top_left"><span class="label">一匡后台管理系统_测试版,测试版,测试版</span></div><div class="top_right">'+'<span class="label">hello , '+DOCCOOKIES.getItem('userNickName')+'</span><img class="login_user_head" src="http://cdn.e-quanta.com/headpic/default.png"><button class="button sign_out">退出系统</button></div>');
		$("#login_user_nic_name,#user_info_name").text(DOCCOOKIES.getItem('userNickName'));	
		$(".login_user_head").attr("src",DOCCOOKIES.getItem('userHead'));
		var top_right=$(".top_right"),
			user_info_outer=$("#user_info_outer");
		user_info_outer.hide();	
		top_right.click(function(){
			user_info_outer.css("display")=='none'?
			user_info_outer.show()
			:user_info_outer.hide()
		});
		$(".sign_out").click(function(){
			AJAXMY.send('/login/logout',{},function(d){
				if(d['result']){
					DOCCOOKIES.removeItem('loginName','/');
					DOCCOOKIES.removeItem('loginPassword','/');
					window.location.href='../login.html';
				}else{
					POPUPWINDOW.alert('退出失败',function(){});
				}
			});
		});
		//生成左侧导航
		
		currentDom.parent().addClass("active");
		currentDom.parent().parent().show();
		currentDom.parent().parent().parent().parent().show();

		//生成碎屑
		
		$("#navigation-crumb>span:eq(0)").text(currentDom.parent().parent().prev().parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(1)").text(currentDom.parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(2)").text(currentDom.text());	
	//}	
	
});

