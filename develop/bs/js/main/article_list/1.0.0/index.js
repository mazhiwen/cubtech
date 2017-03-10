define(function(require) {
	var commonMain=require('commonMain');
	var paging = require('paging'),
		transformTime=new(require('transformTime')),
		parseString=new(require('parseString')),
		table_body=$("#table_body"),
		title_input=$("#title_input"),
		author_input=$("#author_input"),
		search_btn=$("#search_btn"),
		uploader_input=$("#uploader_input"),
		keyword_input=$("#keyword_input"),
		article_type=$("#article_type");	

	var articleListPaging=new paging("#paging",MAXPAGING,function(currentPage){
		request_list(currentPage,{});
	});
	function request_list(getPaging,otherData){
		var data={page:getPaging,size:PERPAGINGCOUNT};
		if(otherData.length!=0){
			data=Object.assign(data,otherData);
		}
		AJAXMY.send('/article/list',data,function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				var sourceType='';
				switch(v['source']){
					case null:
					sourceType='不选择';
					break;
					case 1:
					sourceType='转载';
					break;
					case 2:
					sourceType='一匡原创';
					break;
					case 3:
					sourceType='大V原创';
					break;
				};	
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td><a href="https://www.e-quanta.com/article_details.html?id='+v['id']+'" target="_blank">'+v['title']+'</a></td><td>'+v['categoryName']+'</td><td>'+v['keyword']+'</td><td>'+v['nickName']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+transformTime.MSToYMDHMS(v['updateTime'])+'</td><td>'+v['praiseNum']+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td><td>'+v['viewNum']+'</td>';
				if(v['indexStatus']) s+='<td><input type="checkbox" checked></td>';
				else s+='<td><input type="checkbox"></td>';
				s+='<td>'+sourceType+'</td><td><div class="btn_group"><a href="article_edit.html?id='+v['id']+'" class="button btn_xs">编辑</a><button class="button btn_xs article_delete">删除</button></div></td></tr>';
				//s+='<td>'+sourceType+'</td><td><a href="article_edit.html?id='+v['id']+'" class="glyphicon glyphicon-edit"></a> <button class="glyphicon-trash glyphicon onlyicon"></button></td></tr>';
				//<div class="btn_group"><a href="article_edit.html?id='+v['id']+'" class="button btn_s">编辑</a><button class="button btn_s article_delete">删除</button></div>
			});
			table_body.append(s);
			articleListPaging.refreshDom(d['pages']);
		});
	}



	AJAXMY.send('/category/select_list',null,function(d){
		var s='<option value=" "></option>';
		$.each(d['result'],function(k,v){
			s+='<option value="'+k+'">'+v+'</option>';
		});
		article_type.append(s);
	});

	search_btn.click(function(){
		var o={};
		var s=parseString.getNoEmpty(title_input.val());
		if(s!==false)Object.assign(o,{title:s});
		s=parseString.getNoEmpty(author_input.val());
		if(s!==false)Object.assign(o,{nick_name:s});
		s=parseString.getNoEmpty(uploader_input.val());
		if(s!==false)Object.assign(o,{editor_nick_name:s});
		s=parseString.getNoEmpty(article_type.val());
		if(s!==false)Object.assign(o,{category_code:s});
		s=parseString.getNoEmpty(keyword_input.val());
		if(s!==false)Object.assign(o,{keyword:s});
		//request_list(1,o);
		articleListPaging.pageFn=function(currentPage){
			request_list(currentPage,o);
		};
		articleListPaging.executePageFn(1);

	});

	table_body.on('click','tr>td:nth-child(13)>input',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/index/save',{type:1,id:$(this).parent().parent().attr("data-id"),status_index:$(this).prop('checked')?true:false},function(d){
			if(d['result']){
				POPUPWINDOW.alert('修改成功');
			}else{
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		});
	});

	table_body.on('click','.article_delete',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/article/delete',{id:tthis.parent().parent().parent().attr("data-id")},function(d){
				if(d['result']){
					POPUPWINDOW.alert('删除成功');
					tthis.parent().parent().parent().remove();
				}else{
					POPUPWINDOW.alert('删除失败');	
				}
			},function(){
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});

	
});

