define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		
		table_body=$("#table_body");
	function request(getPaging){
		AJAXMY.send('/category/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
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
					s+='<td data-id="'+v['id']+'"><button class="glyphicon-on glyphicon"></button> ';
				}else{
					s+='<td data-id="'+v['id']+'"><button class="glyphicon-off glyphicon"></button> ';
				}
				s+='<a href="class_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon"></button></td></tr>'; 
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);

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
	table_body.on('click','tr>td:nth-child(5)>button:nth-child(3)',function(event){
		$(this).prop('disabled',true);
		var that=$(this);
		AJAXMY.send('/category/delete',{id:$(this).parent().attr("data-id")},function(data){
			that.prop('disabled',false);
			if(data['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}else{
				alert('删除失败');	
			}
		});
	});
	
	
});

