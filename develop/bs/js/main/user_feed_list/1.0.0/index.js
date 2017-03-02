define(function(require) {
	
	var commonMain=require('commonMain'),
		paging = require('paging'),
		
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	/*function request(getPaging){
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
*/
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/feedback/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['content']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td><a href="user_feed_details.html?id='+v['id']+'"><button class="s button">查看</button></a> <button class="s button" data-id="'+v['id']+'">删除</button></td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});


	table_body.on('click','tr>td:nth-child(5)>button:nth-child(2)',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/feedback/delete',{id:tthis.attr("data-id")},function(d){
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

