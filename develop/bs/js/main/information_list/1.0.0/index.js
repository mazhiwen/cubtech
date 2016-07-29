define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		paging = require('paging'),
		ajaxMy=require('ajaxMy'),
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	function request(getPaging){
		new ajaxMy('/info/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				var s1,s2;
				v['type']==2?(s1='',s2='news_edit'):(s1=transformTime.MSTo(v['postTime']),s2='morningpost_edit');	
				s+='<tr><td>'+v['id']+'</td><td>'+v['title']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSTo(v['createTime'])+'</td><td>'+s1+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td><td><a href="'+s2+'.html?id='+v['id']+'"><button class="s">编辑</button></a> <button class="s" data-id="'+v['id']+'">删除</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);
	table_body.on('click','tr>td:nth-child(8)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		new ajaxMy('/article/delete',{id:$(this).attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}else{
				alert('删除失败');	
			}
			that.prop('disabled',false);
		});
	});	

});

