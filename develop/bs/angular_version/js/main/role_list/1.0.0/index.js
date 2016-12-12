define(function(require) {
	
	var commonMain=require('commonMain'),
		paging = require('paging'),
		table_body=$("#table_body");
	/*function request(getPaging){
		AJAXMY.send('/role/list',{page:getPaging,size:PERPAGINGCOUNT,status:1},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['name']+'</td><td>/</td><td><a href="role_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon" data-id="'+v['id']+'"></button> <a href="role_permission.html?id='+v['id']+'" class="glyphicon glyphicon-lock">权限</a></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);	*/
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/role/list',{page:currentPage,size:PERPAGINGCOUNT,status:1},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['name']+'</td><td>/</td><td><a href="role_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon" data-id="'+v['id']+'"></button> <a href="role_permission.html?id='+v['id']+'" class="glyphicon glyphicon-lock">权限</a></td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});
	table_body.on('click','tr>td:nth-child(3)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);that=$(this);
		AJAXMY.send('/role/delete',{id:$(this).attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}
			that.prop('disabled',false);
		});
	});
});

