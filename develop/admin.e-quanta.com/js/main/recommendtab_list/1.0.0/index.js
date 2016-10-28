define(function(require) {
	var commonMain=require('commonMain'),
		paging = require('paging'),
		
		transformTime=new(require('transformTime')),
		table_body=$("#table_body"),
		ifFinishEdit=false;
	function request(getPaging){
		AJAXMY.send('/index/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				var type,status;
				switch(v['type']){
					case 1:
					type='文章';break;
					case 2:
					type='话题';break;
					case 3:
					type='专题';break;
				}
				if(v['status']){
					status='checked';
				}else{
					status='';
				}
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td>'+type+'</td><td>'+v['title']+'</td><td contenteditable="true">'+v['priority']+'</td><td><input type="checkbox" '+status+'></td><td></td><td><button class="s">移除</button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);
	//***********************contenteditable 改动请求**************//
	table_body.on('input','tr>td:nth-child(4)',function(event){
		ifFinishEdit=true;
	});
	table_body.on('mouseout','tr>td:nth-child(4)',function(event){
		if(ifFinishEdit){
			var s=$(this).text();
			$(this).attr('contenteditable',false);
			$(this).toggleClass('disabled');
			that=$(this);
			AJAXMY.send('/index/update',{id:$(this).parent().attr("data-id"),priority:$(this).text()},function(d){
				if(d['result']){
					alert('修改成功');
				}
				that.toggleClass('disabled',false);
				that.attr('contenteditable',true);
			});
			ifFinishEdit=false;
		}
	});
	//***********************contenteditable 改动请求**************//
	table_body.on('click','tr>td:nth-child(5)>input',function(event){
		$(this).prop('disabled',true);that=$(this);
		AJAXMY.send('/index/update',{id:$(this).parent().parent().attr("data-id"),status:$(this).prop('checked')?1:0},function(d){
			if(d['result']){
				alert('修改成功');
			}else{
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		});
	});
	table_body.on('click','tr>td:nth-child(7)>button',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/index/delete',{id:$(this).parent().parent().attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}
			that.prop('disabled',false);
		});
	});

	
});

