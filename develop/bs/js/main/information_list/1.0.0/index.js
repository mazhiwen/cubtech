define(function(require) {
	

	var commonMain=require('commonMain'),
		paging = require('paging'),
		
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/info/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				var s1,s2,type='';
				v['type']==2?(s1='',s2='news_edit',type='要闻'):(s1=transformTime.MSToYMDHMS(v['postTime']),s2='morningpost_edit',type='早报');	
				s+='<tr><td>'+v['id']+'</td><td>'+type+'</td><td>'+v['title']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+s1+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td><td><a href="'+s2+'.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon" data-id="'+v['id']+'"></button></td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});

	table_body.on('click','.glyphicon-trash',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/article/delete',{id:tthis.attr("data-id")},function(d){
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

