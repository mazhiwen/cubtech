define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		paging = require('paging'),
		ajaxMy=require('ajaxMy'),
		table_body=$("#table_body");
	function request(getPaging){
		new ajaxMy('/role/list',{page:getPaging,size:PERPAGINGCOUNT,status:1},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['name']+'</td><td>/</td><td><a href="role_edit.html?id='+v['id']+'"><button class="s">编辑</button></a> <button class="s" data-id="'+v['id']+'">删除</button> <a href="role_permission.html?id='+v['id']+'"><button class="s">权限</button></a></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);	
	table_body.on('click','tr>td:nth-child(3)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);that=$(this);
		new ajaxMy('/role/delete',{id:$(this).attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}
			that.prop('disabled',false);
		});
	});
});

