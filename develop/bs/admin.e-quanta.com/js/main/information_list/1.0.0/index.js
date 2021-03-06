define(function(require) {
	

	var commonMain=require('commonMain'),
		paging = require('paging'),
		
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	function request(getPaging){
		AJAXMY.send('/info/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				var s1,s2;
				v['type']==2?(s1='',s2='news_edit'):(s1=transformTime.MSToYMDHMS(v['postTime']),s2='morningpost_edit');	
				s+='<tr><td>'+v['id']+'</td><td>'+v['title']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+s1+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td><td><a href="'+s2+'.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon" data-id="'+v['id']+'"></button></td></tr>';
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
		AJAXMY.send('/article/delete',{id:$(this).attr("data-id")},function(d){
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

