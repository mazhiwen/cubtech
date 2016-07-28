define(function(require) {
	 $=require('jquery');
	var	ajaxMy=require('ajaxMy'),
		commonMain=require('commonMain'),
		edit_area=$("#edit_area"),
		getGet=require('getGet'),
		class_code=$("#class_code"),
		class_name=$("#class_name"),
		class_directoryStatus=$("#class_directoryStatus"),
		id=getGet('id');
	if(id){
		new ajaxMy('/category/edit',{id:id},function(d){
			var d=d['result'];
			class_code.val(d['code']);
			class_name.val(d['name']);
			d['directoryStatus']?class_directoryStatus.prop('checked',true):class_directoryStatus.prop('checked',false);
		});
	}else{
		class_code.prop('disabled',false);
	}	
	
	$("#confirm_button").click(function(){
		if(id){
			new ajaxMy('/category/update',{id:id,name:class_name.val(),status_dir:class_directoryStatus.prop('checked')},function(d){
				if(d['result']){
					alert('修改成功');
				}else{
					alert('修改失败');
				}
				window.location.reload();
			});
		}else{
			new ajaxMy('/category/save',{code:class_code.val(),name:class_name.val(),status_dir:class_directoryStatus.prop('checked')},function(d){
				if(d['result']){
					alert('添加成功');
				}else{
					alert('添加失败');
				}
			});
		}
	});

	
});

