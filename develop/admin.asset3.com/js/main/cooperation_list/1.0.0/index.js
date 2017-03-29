define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		ifFinishEdit=false,
		table_body=$("#table_body");
	
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/cooperation/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			var s='';
			var checkStatus={
				'true':'checked',
				'false':''
			};
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['companyName']+'</td><td>'+v['siteUrl']+'</td><td class="priorityvalue" contenteditable="true">'+v['priority']+'</td><td><input class="enable_status" type="checkbox" '+checkStatus[v['status']]+'></td>';
				s+='<td><a href="cooperation_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>'; 
			});
			table_body.html(s);
			myPaging.refreshDom(d['pages']);
		});
	});	


	table_body.on('click','.glyphicon-trash',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/cooperation/delete',{id:tthis.parent().attr("data-id")},function(d){
				if(d['result']){
					POPUPWINDOW.alert('删除成功');
					tthis.parent().parent().remove();
				}else{
					POPUPWINDOW.alert('删除失败');	
				}
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});



	//设置可用状态：
	table_body.on('change','.enable_status',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);		
		AJAXMY.send('/cooperation/status',{id:tthis.parent().parent().attr("data-id"),status:tthis.prop('checked')},function(data){
			tthis.prop('disabled',false);
			if(data['result']){
				POPUPWINDOW.alert('编辑成功');
			}
		});
	});



	/////////////////////////////contenteditable 改动请求/////////////////////////////
	table_body.on('input','.priorityvalue',function(event){
		ifFinishEdit=true;
	});
	table_body.on('mouseout','.priorityvalue',function(event){
		if(ifFinishEdit){
			var s=$(this).text();
			$(this).attr('contenteditable',false);
			$(this).toggleClass('disabled');
			that=$(this);
			AJAXMY.send('/cooperation/update_priority',{user_id:$(this).parent().attr("data-id"),priority:$(this).text()},function(d){
				if(d['result']){
					POPUPWINDOW.alert('修改成功');
				}
				that.toggleClass('disabled',false);
				that.attr('contenteditable',true);
			});
			ifFinishEdit=false;
		}
	});
	
	
});

