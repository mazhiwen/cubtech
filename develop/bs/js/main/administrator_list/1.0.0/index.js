
define(function(require) {

	var commonNavigation=require('commonNavigation');
	new commonNavigation();

	
	var paging = require('paging');
	var myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  });
	myPaging._init();
	
});

