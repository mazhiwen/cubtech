define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		id=getGet('id'),
		role_name=$('#role_name'),
		role_description=$('#role_description');
	if(id){
		new ajaxMy('/role/edit',{id:id},function(d){
			var d=d['result'];
			role_name.val(d['name']);
			role_description.val(d['name']);
			summary.val(d['vita']);
			phone.val(d['mobile']);
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

