define(function(require) {
	
	var commonMain=require('commonMain'),
		
		getGet=require('getGet'),
		id=getGet('id'),
		role_name=$('#role_name'),
		role_description=$('#role_description'),
		confirm_button=$("#confirm_button"),
		permission=$("#permission");
		/*2 web 0admin  1app*/

	if(id){
		AJAXMY.send('/role/edit',{id:id},function(d){
			var d=d['result'];
			role_name.val(d['name']);
			role_description.val('功能未开放');
		});
		AJAXMY.send('/role/list_action_by_role_id',{role_id:id},function(d){
			var d=d['result'];
			//role_name.val(d['name']);
			permission.empty();
			var s='';
			$.each(d,function(k,v){
				var ischeck=v['has']?'checked':' ';
				s+='<div class="form-input"><span>'+v['description']+':</span><input type="checkbox" value="'+v['id']+'" '+ischeck+'></div>';
			});
			
			permission.append(s);
			confirm_button.click(function(){
				$(this).prop('disabled',true);that=$(this);
				var action_ids='';
				permission.find('input').each(function(index,element){
					if($(this).prop('checked')) action_ids+=$(this).val()+',';	
				});
				AJAXMY.send('/role/update_role_actions',{
					role_id:id,
					action_ids:action_ids
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
		window.location.href="role_list.html";
	}	
});

