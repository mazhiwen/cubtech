define(function(require) {
	
	var commonNavigation=new(require('commonNavigation')),
		paging = require('paging'),
		myPaging=new paging("#paging",13,10,11,function(){ console.log(this);  }),
		docCookies=new(require('docCookies'));

		
	
	myPaging._init();
	
});

