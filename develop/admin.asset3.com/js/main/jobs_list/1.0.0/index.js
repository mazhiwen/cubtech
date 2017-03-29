define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		table_body=$("#table_body");
	
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/joboffer/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			var s='';
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['title']+'</td><td>'+v['address']+'</td><td>'+v['salary']+'</td><td>'+PARSESTRING.MSToYMDHMS(v['postTime'])+'</td>';
				s+='<td><a href="jobs_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>'; 
			});
			table_body.html(s);
			myPaging.refreshDom(d['pages']);
		});
	});	


	table_body.on('click','.glyphicon-trash',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/joboffer/delete',{id:tthis.parent().attr("data-id")},function(d){
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
	
	
});

