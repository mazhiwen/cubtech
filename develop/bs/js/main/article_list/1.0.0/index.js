define(function(require) {
	$ = require('jquery');
	var commonMain=require('commonMain'),
		paging = require('paging'),
		ajaxMy=require('ajaxMy'),
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	function request(getPaging){
		new ajaxMy('/article/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td>'+v['title']+'</td><td>'+v['categoryName']+'</td><td>'+v['nickName']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSTo(v['createTime'])+'</td><td>'+transformTime.MSTo(v['updateTime'])+'</td><td>'+v['praiseNum']+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td>';
				if(v['status']) s+='<td><input type="checkbox" checked></td>';
				else s+='<td><input type="checkbox"></td>';
				s+='<td><a href="article_edit.html?id='+v['id']+'"><button class="s">编辑</button></a> <button class="s">删除</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);
	table_body.on('click','tr>td:nth-child(11)>input',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		new ajaxMy('/article/status',{id:$(this).parent().parent().attr("data-id"),status:$(this).prop('checked')?1:0},function(d){
			if(d['result']){
				alert('修改成功');
			}else{
				alert('修改失败');
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		});
	});
	table_body.on('click','tr>td:nth-child(12)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		new ajaxMy('/article/delete',{id:$(this).parent().parent().attr("data-id")},function(d){
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

