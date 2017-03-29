define(function(require) {
	require('jquery');
	$=jQuery;
	new(require('compatible'));
	AJAXMY=new(require('ajaxMy'));
	POPUPWINDOW=new(require('popUpWindow'));
	DOCCOOKIES=new(require('docCookies'));
	PARSESTRING=new(require('publicParseString')); 
	var navMulLevUl=require('navigationMultiLevelUl'),
		navMulLevUlMy=new navMulLevUl('#left'),
		currentDom=navMulLevUlMy.getCurDom();
	//if(!DOCCOOKIES.hasItem('loginName')){
	//	POPUPWINDOW.alert('未登录，请登录',function(){
	//		window.location.href='../login.html';
	//	});
	//}else{
		//顶部右侧用户状态
		$("#top").append('<span>一匡后台管理系统_测试版,测试版,测试版</span><div id="top_right"><img id="login_user_head" src=""><span id="login_user_nic_name">nickName</span></div><div id="user_info_outer"><div><img id="user_info_head" src=""><p id="user_info_name">nickName</p><p id="user_info_intro">vita</p></div><p><span id="user_info_gen">gender</span><span id="user_info_phone">mobile</span><span id="user_info_id">id</span></p><div><button id="sign_out">退出登录</button></div></div>');
		$("#login_user_nic_name,#user_info_name").text(DOCCOOKIES.getItem('userNickName'));	
		$("#login_user_head,#user_info_head").attr("src",DOCCOOKIES.getItem('userHead'));
		$("#user_info_intro").text(DOCCOOKIES.getItem('userVita'));
		$("#user_info_gen").text('性别:'+DOCCOOKIES.getItem('userGender'));
		$("#user_info_phone").text('手机:'+DOCCOOKIES.getItem('userMobile'));
		$("#user_info_id").text('ID:'+DOCCOOKIES.getItem('userId'));
		var top_right=$("#top_right"),
			user_info_outer=$("#user_info_outer");
		user_info_outer.hide();	
		top_right.click(function(){
			user_info_outer.css("display")=='none'?
			(user_info_outer.show(),top_right.css("background-color","rgb( 54, 127, 169)"))
			:(user_info_outer.hide(),top_right.css("background-color","transparent"));
		});
		$("#sign_out").click(function(){
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
		
		$("#left").css("height",document.body.clientHeight-51);
		currentDom.css("color","rgb(60, 142, 188)");
		currentDom.parent().parent().show();
		currentDom.parent().parent().parent().parent().show();

		//生成碎屑
		
		$("#navigation-crumb>span:eq(0)").text(currentDom.parent().parent().prev().parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(1)").text(currentDom.parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(2)").text(currentDom.text());	
	//}	
	
});

