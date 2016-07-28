define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		id=getGet('id'),
		user_type=$('#user_type'),
		nick_name=$('#nick_name'),
		summary=$('#summary'),
		phone=$('#phone'),
		wechat_id=$('#wechat_id'),
		wechat_name=$('#wechat_name');
	if(id){
		new ajaxMy('/user/edit',{id:id},function(d){
			var d=d['result'];
			user_type.val(d['authV']);
			nick_name.val(d['nickName']);
			summary.val(d['vita']);
			phone.val(d['mobile']);
			//wechat_id.val(d['name']);
			//wechat_name.val(d['name']);
			$("#confirm_button").click(function(){
				new ajaxMy('/user/update',{
					id:id,
					nick_name:nick_name.val(),
					auth_v:user_type.val(),
					mobile:phone.val(),
					vita:summary.val()
				},function(d){
					if(d['result']){
						alert('修改成功');
					}else{
						alert('修改失败');
					}
					window.location.reload();
				});
			});
		});
	}else{
		$("#confirm_button").click(function(){
			new ajaxMy('/user/save',{
				nick_name:nick_name.val(),
				auth_v:user_type.val(),
				mobile:phone.val(),
				vita:summary.val()
			},function(d){
				if(d['result']){
					alert('添加成功');
				}else{
					alert('添加失败');
				}
				window.location.reload();
			});
		});
	}
});

