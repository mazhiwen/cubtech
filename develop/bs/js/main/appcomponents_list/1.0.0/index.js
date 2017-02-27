define(function(require) {
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		
		table_body=$("#table_body"),
		ifFinishEdit=false;


	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/component/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s,is={
				true:'是',
				false:'否'
			},isChecked={
				true:'checked',
				false:''
			};
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['pageCode']+'</td><td>'+v['componentCode']+'</td><td>'+v['componentName']+'</td><td><input type="checkbox" '+isChecked[v['display']]+'></td><td>'+v['layout']+'</td><td>'+is[!v['single']]+'</td><td><a href="appcomponents_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});	



	table_body.on('click','.glyphicon-trash',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/component/delete',{id:tthis.parent().parent().attr("data-id")},function(d){
				if(d['result']){
					POPUPWINDOW.alert('删除成功');
					tthis.parent().parent().remove();
				}else{
					POPUPWINDOW.alert('删除失败');	
				}
			},function(){
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});
/*
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
	});*/
});

