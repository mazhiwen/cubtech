define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var ajaxMy=new(require('ajaxMy')),
        ball=(require('ball'))('canvas',180,4),
		phone_input=$('#phone_input'),
		password_input=$("#pwd_input"),
		if_invi=$("#if_invi"),
		inv_code=$("#inv_code");
	new (require('commonMain'));	
	if(docCookies.hasItem('loginName')){
		phone_input.val(docCookies.getItem('loginName'));
		password_input.val(docCookies.getItem('loginPassword'));
	}
	//login_name_v='18600576402';
	//login_password_v='asdfghjkl';
	if_invi.change(function(){
		$(this).is(':checked')?inv_code.prop("disabled",false):(
			inv_code.prop("disabled",true),
			inv_code.val('')
			);
	});
	$("#login_btn").click(function(e){
		//b 已经有cookie  并且输入账号密码与cookie不相符
		if((phone_input.val()!=docCookies.getItem('loginName')||password_input.val()!=docCookies.getItem('loginPassword'))&&docCookies.hasItem('loginName')){
			docCookies.removeItem('loginName','/');
			docCookies.removeItem('loginPassword','/');
		}
		var sd={
			mobile:phone_input.val(),
			pwd:password_input.val()
		};
		if($.trim(inv_code.val()).length!=0){
			Object.assign(sd,{code:inv_code.val()});
		}
		ajaxMy.send('/login/login',sd,function(d){
				//登录成功
                var od=new Date(new Date().getTime()+7*24*60*60*1000);
				if(d){
					if(docCookies.hasItem('loginName')){
						//如果已有cookie
					}else{
						//没有cookie
                        docCookies.setItem('loginName',phone_input.val(),od,'/');
                        docCookies.setItem('loginPassword',password_input.val(),od,'/');    
					}
                    docCookies.setItem('userHead',d['result']['headPic'],od);
                    docCookies.setItem('vita',d['result']['vita'],od);
					window.location.href="home.html";
				}else{
					popUpWindow.alert('登陆失败',function(){});
				}
			}
		);	
	});


	
});

