
seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");


define(function(require) {
		
	var $=require('jquery');

	$.ajax({

		type:"GET",
		url:"//123.56.237.44:8091/admin/subject/list",
		data:{page:1,size:10,token:12},
		dataType:"json",
		success:function(data){
			var subject_list_tbody=$("#subject_list_tbody");

			subject_list_tbody.empty();
			
			$.each(data['data']['result'],function(key,value){
				
				//console.log(value);
				var s='<tr><td>'+value['id']+'</td><td>'+value['name']+'</td><td>'+value['id']+'</td><td>'+value['id']+'</td><td>'+value['id']+'</td>';
				if(value['name']){
					s+='<td><input type="checkbox"></td>';
				}else{
					s+='<td><input type="checkbox"></td>';
				}
				if(value['name']){
					s+='<td><input type="checkbox"></td>';
				}else{
					s+='<td><input type="checkbox"></td>';
				}
				s+='<td><a href="">编辑</a> <a href="">删除</a></td></tr>'; 
				subject_list_tbody.append(s);

			});



		}


	});


	var paging = require('paging');
	var myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  });
	myPaging._init();
	
});

