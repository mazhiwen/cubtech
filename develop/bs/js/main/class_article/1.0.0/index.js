define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		table_body=$("#table_body");
	
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/category/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['code']+'</td><td>'+v['name']+'</td><td>'+v['name']+'</td>';
				if(v['directoryStatus']){
					s+='<td><input type="checkbox" checked data-code="'+v['code']+'"></td>';
				}else{
					s+='<td><input type="checkbox" data-code="'+v['code']+'"></td>';
				}
				if(v['status']){
					s+='<td data-id="'+v['id']+'"><button class="glyphicon-on glyphicon onlyicon"></button> ';
				}else{
					s+='<td data-id="'+v['id']+'"><button class="glyphicon-off glyphicon onlyicon"></button> ';
				}
				s+='<a href="class_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>'; 
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});	

	table_body.on('click','tr>td:nth-child(4)>input',function(event){
		$(this).prop('disabled',true);
		var that=$(this);
		AJAXMY.send('/category/add_directory',{code:$(this).attr("data-code"),status_dir:$(this).prop('checked')},function(data){
			that.prop('disabled',false);
			if(data['result']){
				alert('修改成功');
			}else{
				alert('修改失败');
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
		});
	});
	table_body.on('click','tr>td:nth-child(5)>button:nth-child(1)',function(event){
		$(this).prop('disabled',true);
		var that=$(this);
		var status=$(this).hasClass('glyphicon-off')?1:0;
		AJAXMY.send('/category/status',{id:$(this).parent().attr("data-id"),status:status,status_dir:$(this).parent().prev().children().eq(0).prop('checked')},function(data){
			that.prop('disabled',false);
			if(data['result']){
				alert('修改成功');
				that.toggleClass('glyphicon-off');
				that.toggleClass('glyphicon-on');
			}else{
				alert('修改失败');	
			}
		});
	});
	table_body.on('click','.glyphicon-trash',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/category/delete',{id:tthis.parent().attr("data-id")},function(d){
				if(d['result']){
					alert('删除成功');
					tthis.parent().parent().remove();
				}else{
					alert('删除失败');	
				}
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});
	
	
});

