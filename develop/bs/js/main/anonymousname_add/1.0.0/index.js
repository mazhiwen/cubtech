
define(function(require) {
	var $=require('jquery');


	var commonNavigation=require('commonNavigation');
	new commonNavigation();
	
	$("#confirm-button").click(function(){
		
		var regexp=new RegExp('\\s+','g');
		var a=$("#input-name").val().split(regexp);
		console.log(a);
	});
	
});

