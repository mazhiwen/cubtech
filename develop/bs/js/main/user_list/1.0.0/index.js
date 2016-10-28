define(function(require) {
	var commonMain=require('commonMain'),
		paging = require('paging'),
		transformTime=new(require('transformTime')),
		table_body=$("#table_body"),
		search_phone=$("#search_phone"),
		search_name=$("#search_name"),
		search_input=$("#search_input");
	function request(getPaging,otherData){
		var data={page:getPaging,size:PERPAGINGCOUNT};
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
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,
				function(){
					request(this.clickPaging,otherData);
				}
			);
			myPaging._init();
		});
	}
	request(1,{});

	search_phone.click(function(){
		request(1,{mobile:search_input.val()});
	});
	search_name.click(function(){
		request(1,{nick_name:search_input.val()});
	});

	table_body.on('click','tr>td:nth-child(13)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/user/delete',{id:$(this).attr("data-id")},function(data){
			if(data['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}else{
				alert('删除失败');	
			}
			that.prop('disabled',false);
		});
	});
	
});

