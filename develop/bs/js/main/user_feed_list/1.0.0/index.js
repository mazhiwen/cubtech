define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		paging = require('paging'),
		ajaxMy=require('ajaxMy'),
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	function request(getPaging){
		new ajaxMy('/feedback/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['content']+'</td><td>'+transformTime.MSTo(v['createTime'])+'</td><td><a href="user_feed_details.html?id='+v['id']+'"><button class="s">查看</button></a> <button class="s" data-id="'+v['id']+'">删除</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);	
});

