seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");
define(function(require) {

	var paging = require('paging');
	var myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  });
	myPaging._init();
	
});

