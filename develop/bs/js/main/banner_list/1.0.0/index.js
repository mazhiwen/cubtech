define(function(require) {
	$ = require('jquery');
	var commonMain=require('commonMain'),
		paging = require('paging'),
		ajaxMy=require('ajaxMy'),
		myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  });
	myPaging._init();

	new ajaxMy('/banner/list',{page:1,size:PERPAGINGCOUNT},function(d){


	});
	
});

