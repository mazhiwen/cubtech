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
				s+='<tr><td>'+v['name']+'</td><td>'+v['status']+'</td><td><a href="role_edit.html?id='+v['id']+'"><button class="s">编辑</button></a> <button class="s" data-id="'+v['id']+'">删除</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);	
	
});

