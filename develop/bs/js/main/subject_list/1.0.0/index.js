define(function(require) {
	$=require('jquery');
	var ajaxMy=require('ajaxMy'),
		commonMain=require('commonMain'),
		paging = require('paging'),
		transformTime=new(require('transformTime')),
		subject_list_tbody=$("#subject_list_tbody"),
		ifFinishEdit=false;
	function request(getPaging){
		new ajaxMy('/subject/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			subject_list_tbody.empty();
			var s;
			$.each(d['result'],function(key,value){	
				s+='<tr data-id="'+value['id']+'"><td>'+value['id']+'</td><td>'+value['name']+'</td><td>'+value['articleNum']+'</td><td>'+transformTime.MSTo(value['createTime'])+'</td><td>/</td><td contenteditable="true">'+value['priority']+'</td>';
				if(value['name']){
					s+='<td><input type="checkbox"></td>';
				}else{
					s+='<td><input type="checkbox"></td>';
				}
				s+='<td><a href="subject_edit.html?id='+value['id']+'"><button class="s">编辑</button></a> <button class="s">删除</button></td></tr>'; 
			});
			subject_list_tbody.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);
	/*subject_list_tbody.on('click','tr>td:nth-child(6)>input',function(event){
		console.log($(this).parent().parent().attr("data-id"));
		//new ajaxMy();
	});*/
	subject_list_tbody.on('click','tr>td:nth-child(8)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		new ajaxMy('/subject/delete',{subject_id:$(this).parent().parent().attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}else{
				alert('删除失败');	
			}
			that.prop('disabled',false);
		});
	});
	subject_list_tbody.on('click','tr>td:nth-child(7)>input',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		new ajaxMy('/index/save',{id:$(this).parent().parent().attr("data-id"),status_index:$(this).prop('checked'),type:3},function(d){
			if(d['result']){
				alert('修改成功');
			}else{
				alert('修改失败');
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		});
	});

	subject_list_tbody.on('input','tr>td:nth-child(6)',function(event){
		ifFinishEdit=true;
		console.log(ifFinishEdit);
	});
	subject_list_tbody.on('mouseout','tr>td:nth-child(6)',function(event){
		if(ifFinishEdit){
			console.log($(this).text());
			var s=$(this).text();
			$(this).attr('contenteditable',false);
			$(this).prop('disabled',true);
			that=$(this);
			new ajaxMy('/ /update',{id:$(this).parent().attr("data-id"),priority:$(this).text()},function(d){
				that.prop('disabled',false);
				that.attr('contenteditable',true);
				if(d['result']){
					alert('修改成功');
				}else{
					alert('修改失败');
				}
			});
			ifFinishEdit=false;
		}
	});
});

