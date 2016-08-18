define(function(require) {
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		
		table_body=$("#table_body"),
		ifFinishEdit=false;

	function request(getPaging){
		AJAXMY.send('/directory/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				s+='<tr data-id="'+v['id']+'"><td>'+v['name']+'</td><td>'+v['name']+'</td>';
				if(v['status']){
					s+='<td><input type="checkbox" checked></td>';
				}else{
					s+='<td><input type="checkbox"></td>';
				}
				s+='<td contenteditable="true">'+v['priority']+'</td><td><button class="glyphicon-trash glyphicon"></button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);
	table_body.on('click','tr>td:nth-child(3)>input',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/directory/update',{id:$(this).parent().parent().attr("data-id"),status:$(this).prop('checked')?1:0},function(d){
			if(d['result']){
				alert('修改成功');
			}else{
				alert('修改失败');
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		});
	});
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
			AJAXMY.send('/directory/update',{id:$(this).parent().attr("data-id"),priority:$(this).text()},function(d){
				if(d['result']){
					alert('修改成功');
				}else{
					
				}
				that.toggleClass('disabled',false);
				that.attr('contenteditable',true);
			});
			ifFinishEdit=false;
		}
	});
	//***********************contenteditable 改动请求**************//
	table_body.on('click','tr>td:nth-child(5)>button',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/directory/delete',{id1:$(this).parent().parent().attr("data-id")},function(d){
			if(d['result']){
				$(this).parent().parent().remove();
				alert('移除成功');
			}else{
				
			}
			that.prop('disabled',false);
		});
	});

});

