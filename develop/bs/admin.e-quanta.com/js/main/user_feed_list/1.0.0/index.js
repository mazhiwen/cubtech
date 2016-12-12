define(function(require) {
	
	var commonMain=require('commonMain'),
		paging = require('paging'),
		
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	function request(getPaging){
		AJAXMY.send('/feedback/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['content']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td><a href="user_feed_details.html?id='+v['id']+'"><button class="s">查看</button></a> <button class="s" data-id="'+v['id']+'">删除</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);
	table_body.on('click','tr>td:nth-child(5)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/feedback/delete',{id:$(this).attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}else{
				
			}
			that.prop('disabled',false);
		});
	});	
});

