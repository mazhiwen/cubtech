define(function(require) {
	var	commonMain=require('commonMain'),
		
		paging = require('paging'),
		getGet=require('getGet'),
		transformTime=new(require('transformTime')),
		id=getGet('id'),
		nickname=$("#nickname"),
		author_name=$("#author_name"),
		comment=$("#comment"),
		table_body=$("#table_body"),
		creat_time=$("#creat_time");

	function request(getPaging){
		AJAXMY.send('/article/reply/list',{page:getPaging,size:PERPAGINGCOUNT,comment_id:id},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				var status;
				status=v['status']?'隐藏':'显示';
				s+='<tr><td>'+v['id']+'</td><td>'+v['content']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+v['nickName']+'</td><td>'+v['repliedNickName']+'</td><td data-id="'+v['id']+'"><button>'+status+'</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}

	if(id){
		AJAXMY.send('/article/comment/detail',{id:id},function(d){
			var d=d['result'];
			nickname.text(d['nickName']);
			creat_time.text(transformTime.MSToYMDHMS(v['createTime']));
			author_name.text(d['authorNickName']);
			comment.text(d['content']);
		});
		request(1);
	}else{
		window.location.href="comment_list.html";
	}
});

