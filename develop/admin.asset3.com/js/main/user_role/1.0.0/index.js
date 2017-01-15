define(function(require) {
	
	var commonMain=require('commonMain'),
		
		getGet=require('getGet'),
		id=getGet('id'),
		role_name=$('#role_name'),
		role_id=$('#role_id'),
		confirm_button=$("#confirm_button"),
		permission=$("#permission");
	if(id){
		AJAXMY.send('/user/edit',{id:id},function(d){
			var d=d['result'];
			role_id.val(d['id']);
			role_name.val(d['nickName']);
		});
		AJAXMY.send('/user/list_role_by_user_id',{user_id:id},function(d){
			var d=d['result'];
			//role_name.val(d['name']);
			permission.empty();
			var s='';
			$.each(d,function(k,v){
				var ischeck=v['has']?'checked':' ';
				s+='<div class="form-input"><span>'+v['name']+':</span><input type="checkbox" value="'+v['id']+'" '+ischeck+'></div>';
			});
			permission.append(s);
			confirm_button.click(function(){
				$(this).prop('disabled',true);that=$(this);
				var role_ids='';
				permission.find('input').each(function(index,element){
					if($(this).prop('checked')) role_ids+=$(this).val()+',';	
				});
				AJAXMY.send('/user/update_user_role',{
					user_id:id,
					role_ids:role_ids
				},function(d){
					if(d['result']){
						alert('修改成功');
					}
					that.prop('disabled',false);
				});
			});
		});
	}else{
		alert('需要由角色页面进入');
		window.location.href="user_list.html";
	}	
});

