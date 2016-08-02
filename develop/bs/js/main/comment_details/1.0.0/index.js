define(function(require) {
	$ = require('jquery');
	var	commonMain=require('commonMain'),
		ajaxMy=require('ajaxMy'),
		paging = require('paging'),
		getGet=require('getGet'),
		transformTime=new(require('transformTime')),
		id=getGet('id'),
		table_body=$("#table_body"),
		nickname=$("#nickname"),
		comment=$("#comment"),
		creat_time=$("#creat_time");

	function request(getPaging){
		ajaxMy('/article/reply/list',{page:getPaging,size:PERPAGINGCOUNT,comment_id:id},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				var status;
				status=v['status']?'隐藏':'显示';
				s+='<tr><td>'+v['id']+'</td><td>'+v['content']+'</td><td>'+transformTime.MSTo(v['createTime'])+'</td><td>'+v['nickName']+'</td><td>'+v['repliedNickName']+'</td><td data-id="'+v['id']+'"><button>'+status+'</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}

	if(id){
		ajaxMy('/ /评论详情',{comment_id:id},function(d){
			var d=d['result'];
			name.val(d['title']);
			url.val(d['actionUrl']);
			sn.val(d['priority']);
			summary.val(d['description']);
			cover_img.attr('src',d['bgPic']);
			action.val(d['action']);
		});
		request(1);
	}else{
		window.location.href="comment_list.html";
	}
});

