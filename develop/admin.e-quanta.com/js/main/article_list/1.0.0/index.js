define(function(require) {
	var commonMain=require('commonMain');
	var paging = require('paging'),
		transformTime=new(require('transformTime')),
		p=new(require('parseString')),
		table_body=$("#table_body"),
		title_input=$("#title_input"),
		author_input=$("#author_input"),
		search_btn=$("#search_btn"),
		uploader_input=$("#uploader_input"),
		article_type=$("#article_type");	
	function request_list(getPaging,otherData){
		var data={page:getPaging,size:PERPAGINGCOUNT};
		if(otherData.length!=0){
			data=Object.assign(data,otherData);
		}
		AJAXMY.send('/article/list',data,function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td>'+v['title']+'</td><td>'+v['categoryName']+'</td><td>'+v['keyword']+'</td><td>'+v['nickName']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+transformTime.MSToYMDHMS(v['updateTime'])+'</td><td>'+v['praiseNum']+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td>';
				if(v['indexStatus']) s+='<td><input type="checkbox" checked></td>';
				else s+='<td><input type="checkbox"></td>';
				s+='<td><a href="article_edit.html?id='+v['id']+'" class="glyphicon glyphicon-edit"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){
				request_list(this.clickPaging,otherData);	
			});
			myPaging._init();
		});
	}
	request_list(1,{});

	AJAXMY.send('/category/select_list',null,function(d){
		var s='<option value=" "></option>';
		$.each(d['result'],function(k,v){
			s+='<option value="'+k+'">'+v+'</option>';
		});
		article_type.append(s);
	});

	search_btn.click(function(){
		var o={};
		var s=p.getNoEmpty(title_input.val());
		if(s!==false)Object.assign(o,{title:s});
		s=p.getNoEmpty(author_input.val());
		if(s!==false)Object.assign(o,{nick_name:s});
		s=p.getNoEmpty(uploader_input.val());
		if(s!==false)Object.assign(o,{editor_nick_name:s});
		s=p.getNoEmpty(article_type.val());
		if(s!==false)Object.assign(o,{category_code:s});
		request_list(1,o);
	});

	table_body.on('click','tr>td:nth-child(12)>input',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/index/save',{type:1,id:$(this).parent().parent().attr("data-id"),status_index:$(this).prop('checked')?true:false},function(d){
			if(d['result']){
				alert('修改成功');
			}else{
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		});
	});

	table_body.on('click','tr>td:nth-child(13)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/article/delete',{id:$(this).parent().parent().attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}else{
				
			}
			that.prop('disabled',false);
		});
	});

	
});

