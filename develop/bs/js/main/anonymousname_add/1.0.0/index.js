
define(function(require) {
	$=require('jquery');


	var ajaxMy=require('ajaxMy'),
		commonMain=require('commonMain'),
		paging = require('paging'),
		transformTime=new(require('transformTime'));
	
	$("#confirm-button").click(function(){
		
		var regexp=new RegExp('\\s+','g');
		var a=$("#input-name").val().split(regexp);
		console.log(a);
	});
	
});

