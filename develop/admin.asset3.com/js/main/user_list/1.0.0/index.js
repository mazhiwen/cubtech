define(function(require) {
	var commonMain=require('commonMain'),
		paging = require('paging'),
		transformTime=new(require('transformTime')),
		table_body=$("#table_body"),
		search_phone=$("#search_phone"),
		search_name=$("#search_name"),
		search_input=$("#search_input");
	function request(currentPage,otherData){
		var data={page:currentPage,size:PERPAGINGCOUNT};
		if(otherData.length!=0){
			Object.assign(data,otherData);
		}
		AJAXMY.send('/user/list',data,function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				var type;
				if(v){
					switch(v['authV']){
					case 0:
					type='普通用户';break;
					case 1:
					type='大V';break;
					default:
					type='';break;
					}
					s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['mobile']+'</td><td>'+type+'</td><td></td><td>'+v['vita']+'</td><td>'+v['articleNum']+'</td><td>'+v['followNum']+'</td><td>'+v['fansNum']+'</td><td>'+v['praiseNum']+'</td><td>'+v['collectNum']+'</td><td>'+transformTime.MSToYMDHMS(v['registerTime'])+'</td><td><a href="user_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon" data-id="'+v['id']+'"></button> <a href="user_role.html?id='+v['id']+'" class="glyphicon-user glyphicon"></a></td></tr>';	
				} 
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	}
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		request(currentPage,{});
	});
	search_phone.click(function(){
		myPaging.pageFn=function(currentPage){
			request(currentPage,{mobile:search_input.val()});
		};
		myPaging.executePageFn(1);
	});
	search_name.click(function(){
		myPaging.pageFn=function(currentPage){
			request(currentPage,{nick_name:search_input.val()});
		};
		myPaging.executePageFn(1);
	});

	table_body.on('click','tr>td:nth-child(13)>button:nth-child(2)',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/user/delete',{id:tthis.attr("data-id")},function(d){
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

