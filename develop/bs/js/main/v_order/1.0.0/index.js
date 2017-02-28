define(function(require) {
	var commonMain=require('commonMain'),
		paging = require('paging'),
		table_body=$("#table_body"),
		ifFinishEdit=false;


	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/user/list_v',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				/*
				var type='';
				switch(v['type']){
					case 1:
					type='文章';break;
					case 2:
					type='话题';break;
					case 3:
					type='专题';break;
				}*/
				
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['applyType']+'</td><td class="priority_value" contenteditable="true">'+v['priority']+'</td><td><img src="'+v['headPic']+'"></td><td>'+v['vita']+'</td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});

	/////////////////////////////contenteditable 改动请求/////////////////////////////
	table_body.on('input','.priority_value',function(event){
		ifFinishEdit=true;
	});
	table_body.on('mouseout','.priority_value',function(event){
		if(ifFinishEdit){
			var s=$(this).text();
			$(this).attr('contenteditable',false);
			$(this).toggleClass('disabled');
			that=$(this);
			AJAXMY.send('/user/update_priority',{user_id:$(this).parent().attr("data-id"),priority:$(this).text()},function(d){
				if(d['result']){
					POPUPWINDOW.alert('修改成功');
				}
				that.toggleClass('disabled',false);
				that.attr('contenteditable',true);
			});
			ifFinishEdit=false;
		}
	});

	
});

