define(function(require) {
	
	var 
		commonMain=require('commonMain'),
		paging = require('paging'),
		transformTime=new(require('transformTime')),
		subject_list_tbody=$("#subject_list_tbody"),
		ifFinishEdit=false;
	/*function request(getPaging){
		AJAXMY.send('/subject/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			subject_list_tbody.empty();
			var s;
			$.each(d['result'],function(key,value){	
				s+='<tr data-id="'+value['id']+'"><td>'+value['id']+'</td><td>'+value['name']+'</td><td>'+value['articleNum']+'</td><td>'+transformTime.MSToYMDHMS(value['createTime'])+'</td><td>/</td><td contenteditable="true">'+value['priority']+'</td>';
				if(value['indexStatus']){
					s+='<td><input type="checkbox" checked></td>';
				}else{
					s+='<td><input type="checkbox"></td>';
				}
				s+='<td><a href="subject_edit.html?id='+value['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>'; 
			});
			subject_list_tbody.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);*/
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/subject/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			subject_list_tbody.empty();
			var s;
			$.each(d['result'],function(key,value){	
				s+='<tr data-id="'+value['id']+'"><td>'+value['id']+'</td><td>'+value['name']+'</td><td>'+value['articleNum']+'</td><td>'+transformTime.MSToYMDHMS(value['createTime'])+'</td><td>/</td><td contenteditable="true">'+value['priority']+'</td>';
				if(value['indexStatus']){
					s+='<td><input type="checkbox" checked></td>';
				}else{
					s+='<td><input type="checkbox"></td>';
				}
				s+='<td><a href="subject_edit.html?id='+value['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>'; 
			});
			subject_list_tbody.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});	

	
	/*subject_list_tbody.on('click','tr>td:nth-child(6)>input',function(event){
		console.log($(this).parent().parent().attr("data-id"));
		//AJAXMY.send();
	});*/
	subject_list_tbody.on('click','tr>td:nth-child(8)>button:nth-child(2)',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/subject/delete',{subject_id:tthis.parent().parent().attr("data-id")},function(d){
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


	subject_list_tbody.on('click','tr>td:nth-child(7)>input',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/index/save',{id:$(this).parent().parent().attr("data-id"),status_index:$(this).prop('checked'),type:3},function(d){
			if(d['result']){
				alert('修改成功');
			}else{
				
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		});
	});

	//***********************contenteditable 改动请求**************//
	subject_list_tbody.on('input','tr>td:nth-child(6)',function(event){
		ifFinishEdit=true;
	});
	subject_list_tbody.on('mouseout','tr>td:nth-child(6)',function(event){
		if(ifFinishEdit){
			var s=$(this).text();
			$(this).attr('contenteditable',false);
			$(this).toggleClass('disabled');
			that=$(this);
			AJAXMY.send('/subject/update_priority',{subject_id:$(this).parent().attr("data-id"),priority:$(this).text()},function(d){
				if(d['result']){
					alert('修改成功');
				}else{
				}
				that.toggleClass('disabled',false);
				that.attr('contenteditable',true);
			});
			ifFinishEdit=false;
		}
	});
	//***********************contenteditable 改动请求**************//
});

