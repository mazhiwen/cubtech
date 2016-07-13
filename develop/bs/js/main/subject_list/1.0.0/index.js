seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");
define(function(require) {
	
	var $=require('jquery');


	$.ajax({

		type:"GET",
		url:"//123.56.237.44:8091/admin/subject/list",
		data:{page:1,size:10,token:12},
		dataType:"json",
		success:function(data){
			console.log(data['data']);


		}


	});






	var paging = require('paging');
	var myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  });
	myPaging._init();
	
});

