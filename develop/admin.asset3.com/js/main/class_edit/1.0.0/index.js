define(function(require) {
	var	commonMain=require('commonMain'),
		edit_area=$("#edit_area"),
		getGet=require('getGet'),
		class_code=$("#class_code"),
		class_name=$("#class_name"),
		id=getGet('id');
	if(id){
		AJAXMY.send('/category/edit',{id:id},function(d){
			var d=d['result'];
			class_code.val(d['code']);
			class_name.val(d['name']);
			
		});
		
	}else{
		class_code.prop('disabled',false);
	}	
	
	$("#confirm_button").click(function(){
		if(id){
			AJAXMY.send('/category/update',{id:id,name:class_name.val()},function(d){
				if(d['result']){
					alert('修改成功');
				}else{
					alert('修改失败');
				}
				window.location.reload();
			});
		}else{
			AJAXMY.send('/category/save',{code:class_code.val(),name:class_name.val()},function(d){
				if(d['result']){
					alert('添加成功');
				}else{
					alert('添加失败');
				}
			});
		}
	});

	
});

