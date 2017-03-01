define(function(require) {
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	/*function request(getPaging){
		AJAXMY.send('/article/comment/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				var type,status;
				switch (v['type']){
					case 1:
					type='文章';break;
					case 0:
					type='话题';break;
					default:
					break;
				}
				status=v['status']?'隐藏':'显示';
				s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+type+'</td><td>'+v['content']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td data-id="'+v['id']+'"><a href="comment_details.html?id='+v['id']+'"><button>查看</button></a> <button>'+status+'</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);*/
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/article/comment/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				var type,status;
				switch (v['type']){
					case 1:
					type='文章';break;
					case 0:
					type='话题';break;
					default:
					break;
				}
				status=v['status']?'隐藏':'显示';
				s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+type+'</td><td>'+v['content']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td data-id="'+v['id']+'"><a href="comment_details.html?id='+v['id']+'"><button class="input">查看</button></a> <button class="input">'+status+'</button></td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});
	table_body.on('click','tr>td:nth-child(6)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		var status=$(this).text()=="显示"?1:0;
		AJAXMY.send('/article/comment/status',{id:$(this).parent().attr("data-id"),status:status},function(d){
			if(d['result']){
				alert('修改成功');
				status?that.text('隐藏'):that.text('显示');
			}
			that.prop('disabled',false);
		});
	});
	
});

