define(function(require) {
	var $=require('jquery'),
		ajaxMy=require('ajaxMy'),
		commonNavigation=new(require('commonNavigation')),
		paging = require('paging'),
		subject_list_tbody=$("#subject_list_tbody"),
		myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  });

	new ajaxMy('/subject/list',{page:1,size:10,token:12},function(data){
		subject_list_tbody.empty();
		var s;
		var editHref='subject_edit.html';
		$.each(data['result'],function(key,value){	
			s+='<tr data-id="'+value['id']+'"><td>'+value['id']+'</td><td>'+value['name']+'</td><td>'+value['articleNum']+'</td><td>'+value['createTime']+'</td><td>/</td><td>'+value['priority']+'</td>';
			if(value['name']){
				s+='<td><input type="checkbox"></td>';
			}else{
				s+='<td><input type="checkbox"></td>';
			}
			s+='<td><a href="'+editHref+'?id='+value['id']+'"><button class="s">编辑</button></a> <button class="s">删除</button></td></tr>'; 
		});
		subject_list_tbody.append(s);
	});
	myPaging._init();
	subject_list_tbody.on('click','tr>td:nth-child(6)>input',function(event){
		console.log($(this).parent().parent().attr("data-id"));
		//new ajaxMy();
	});
	subject_list_tbody.on('click','tr>td:nth-child(7)>input',function(event){
		console.log($(this).parent().parent().attr("data-id"));
		//new ajaxMy();
	});
	subject_list_tbody.on('click','tr>td:nth-child(8)>button:nth-child(2)',function(event){
		$(this).prop("disabled",true);
		//$(this).parent().parent().remove();
		console.log($(this).parent().parent().attr("data-id"));
		//new ajaxMy();
	});

	$("#confirm_bottom").click(function(){
		$(this).prop("disabled",true);

	});
});

