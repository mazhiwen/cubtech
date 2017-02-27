define(function(require) {
	var	commonMain=require('commonMain'),
		name=$(".name"),
		commit_button=$("#commit_button"),
		id=PARSESTRING.getGet('id'),
		component_code=$(".component_code"),
		page_code=$(".page_code"),
		is_display=$(".is_display"),
		is_mutiple=$(".is_mutiple"),
		add_component_btn=$(".add_component_btn"),
		table_body_component=$(".table_body_component");


	if(id){
		AJAXMY.send('/component/edit',{id:id},function(d){
			var d=d['result'];
			component_code.val(d['componentCode']);
			name.val(d['componentName']);
			page_code.val(d['pageCode']);
			is_mutiple.prop("checked",!d['single']);
			is_display.prop("checked",d['display']);
			$.each(JSON.parse(d['components']),function(k,v){
				table_body_component.append('<tr><td><input type="text" class="son_component_name" value="'+v['componentName']+'"></td><td><input type="text" class="son_component_code" value="'+v['componentCode']+'"></td><td><input type="checkbox" class="is_show_son_component" checked="'+v['display']+'"></td><td><button title="删除" class="glyphicon-trash glyphicon onlyicon"></button></td></tr>');
			});
		});
	}
	
	//提交

	
	commit_button.click(function(){
		$(this).prop('disabled',true);
		var that=$(this),
			sendData={
				component_code:component_code.val(),
				component_name:name.val(),
				display:is_display.prop("checked"),
				single:!is_mutiple.prop("checked"),
				page_code:page_code.val()
			},
			components=[],
			requestUrl='/component/save';
		$.each($(".table_body_component>tr"),function(key,value){
			var sonComponent={};
			sonComponent['componentCode']=$(this).find(".son_component_code").val();
			sonComponent['componentName']=$(this).find(".son_component_name").val();
			sonComponent['display']=$(this).find(".is_show_son_component").prop("checked");
			components.push(sonComponent);
		});
		sendData['components']=JSON.stringify(components);
		
		if(PARSESTRING.isEmpty(id)){

			sendData['id']=id;
			requestUrl='/component/update';	
		}	
		AJAXMY.send(
			requestUrl,
			sendData,
			function(d){
				if(d['result']) alert('添加成功');
			},
			function(){
				that.prop('disabled',false);
			}
		);
	});

	//添加操作
	add_component_btn.click(function(){
		table_body_component.append('<tr><td><input type="text" class="son_component_name"></td><td><input class="son_component_code" type="text"></td><td><input type="checkbox" class="is_show_son_component"></td><td><button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>');
	});


	//删除操作
	table_body_component.on('click','.glyphicon-trash',function(event){
		$(this).parent().parent().remove();
	});	

});

