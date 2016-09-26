define(function(require) {
	var commonMain=require('commonMain'),
		paging = require('paging'),
		table_body=$("#table_body"),
		parseString=new(require('parseString'));
	
	function request(getPaging){
		AJAXMY.send('/push/list',{page:getPaging,size:PERPAGINGCOUNT},function(data){
			table_body.empty();
			$.each(data['result'],function(key,value){
				var id=value['id'];
				var type='';
				switch (value['type']){
					case 0:
					type='无跳转';break;
					case 1:
					type='文章';break;
					case 2:
					type='早报/要闻';break;
					case 3:
					type='指定url';break;
					case 4:
					type='专题';break;
					case 5:
					type='话题';break;
					case 6:
					type='吐槽';break;
				};
				var pushTo='';
				switch (value['pushTo']){
					case 0:
					pushTo='全部';break;
					case 1:
					pushTo='大V';break;
					case 2:
					pushTo='普通用户';break;
					case 3:
					pushTo='自定义';break;
				};
				var deviceType='';
				switch (value['deviceType']){
					case 0:
					deviceType='全部';break;
					case 1:
					deviceType='IOS';break;
					case 2:
					deviceType='Android';break;
				};
				table_body.append('<tr><td>'+id+'</td><td>'+value['content']+'</td><td>'+type+'</td><td>'+value['target']+'</td><td>'+pushTo+'</td><td>'+deviceType+'</td><td>'+parseString.MSToYMDHMS(value['pushTime'])+'</td><td><a href="sys_push_edit.html?id='+id+'" class="glyphicon glyphicon-edit"></a><button class="glyphicon-trash glyphicon onlyicon" data-id="'+id+'"></button></td></tr>');
			});
			myPaging=new paging("#paging",data['pages'],MAXPAGING,getPaging,function(){
				request(this.clickPaging);	
			});
			myPaging._init();
		});
	}
	request(1);	
	

});

