
seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");


define(function(require) {
	/*	
	var $=require('jquery');

	$.ajax({

		type:"GET",
		url:"//123.56.237.44:8091/admin/subject/list",
		data:{page:1,size:10,token:12},
		dataType:"json",
		success:function(data){
			var subject_list_container=$("#subject_list_container");

			subject_list_container.empty();
			
			$.each(data['data']['result'],function(key,value){
				
				//console.log(value);
				subject_list_container.append('<tr><td>'+value['id']+'</td><td>'+value['name']+'</td><td>'+value['id']+'</td><td>'+value['id']+'</td><td>'+value['id']+'</td><td>'+value['id']+'</td><td></td><td><a href="#">编辑</a> <a href="#">删除</a></td></tr>');

			});



		}


	});
*/





	var paging = require('paging');
	var myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  });
	myPaging._init();
	
});

