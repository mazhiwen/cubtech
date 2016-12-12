define(function(require) {
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		
		table_body=$("#table_body"),
		ifFinishEdit=false;

	/*function request(getPaging){
		AJAXMY.send('/banner/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['title']+'</td><td contenteditable="true">'+v['priority']+'</td><td><a href="banner_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);	*/
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/banner/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['title']+'</td><td contenteditable="true">'+v['priority']+'</td><td><a href="banner_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});	
	table_body.on('click','tr>td:nth-child(3)>button:nth-child(2)',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/banner/delete',{banner_id:tthis.parent().parent().attr("data-id")},function(d){
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

	table_body.on('input','tr>td:nth-child(2)',function(event){
		ifFinishEdit=true;
	});
	table_body.on('mouseout','tr>td:nth-child(2)',function(event){
		if(ifFinishEdit){
			var s=$(this).text();
			$(this).attr('contenteditable',false);
			$(this).toggleClass('disabled');
			that=$(this);
			AJAXMY.send('/ /update',{id:$(this).parent().attr("data-id"),priority:$(this).text()},function(d){
				if(d['result']){
					alert('修改成功');
				}else{
					alert('修改失败');
				}
				$(this).toggleClass('disabled');
				that.attr('contenteditable',true);
			});
			ifFinishEdit=false;
		}
	});
});

