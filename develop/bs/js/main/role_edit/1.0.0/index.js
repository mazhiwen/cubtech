define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		id=getGet('id'),
		role_name=$('#role_name'),
		role_description=$('#role_description'),
		confirm_button=$("#confirm_button");
	if(id){
		new ajaxMy('/role/edit',{id:id},function(d){
			var d=d['result'];
			role_name.val(d['name']);
			role_description.val('功能未开放');
			confirm_button.click(function(){
				$(this).prop('disabled',true);that=$(this);
				new ajaxMy('/role/update',{
					id:id,
					name:role_name.val()
				},function(d){
					if(d['result']){
						alert('修改成功');
					}
					that.prop('disabled',false);
				});
			});
		});
	}else{
		confirm_button.click(function(){
			$(this).prop('disabled',true);that=$(this);
			new ajaxMy('/role/add',{
				name:role_name.val()
			},function(d){
				if(d['result']){
					alert('添加成功');
					window.location.reload();
				}
				that.prop('disabled',false);
			});
		});
	}


});

