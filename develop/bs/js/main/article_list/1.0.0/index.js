define(function(require) {
	var commonMain=require('commonMain');
	var paging = require('paging'),
		transformTime=new(require('transformTime')),
		table_body=$("#table_body"),
		title_input=$("#title_input"),
		title_btn=$("#title_btn"),
		author_btn=$("#author_btn"),
		author_input=$("#author_input"),
		uploader_btn=$("#uploader_btn"),
		uploader_input=$("#uploader_input");	
	function request_list(getPaging,otherData){
		var data={page:getPaging,size:PERPAGINGCOUNT};
		if(otherData.length!=0){
			data=Object.assign(data,otherData);
		}
		AJAXMY.send('/article/list',data,function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td>'+v['title']+'</td><td>'+v['categoryName']+'</td><td>'+v['nickName']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+transformTime.MSToYMDHMS(v['updateTime'])+'</td><td>'+v['praiseNum']+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td>';
				if(v['indexStatus']) s+='<td><input type="checkbox" checked></td>';
				else s+='<td><input type="checkbox"></td>';
				s+='<td><a href="article_edit.html?id='+v['id']+'" target="_blank" class="glyphicon glyphicon-edit"></a> <button class="glyphicon-trash glyphicon"></button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){
				request_list(this.clickPaging,otherData);	
			});
			myPaging._init();
		});
	}
	request_list(1,{});

	title_btn.click(function(){
		request_list(1,{title:title_input.val()});
	});
	author_btn.click(function(){
		request_list(1,{nick_name:author_input.val()});
	});
	uploader_btn.click(function(){
		request_list(1,{editor_nick_name:uploader_input.val()});
	});

	table_body.on('click','tr>td:nth-child(11)>input',function(event){
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
	table_body.on('click','tr>td:nth-child(12)>button:nth-child(2)',function(event){
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

