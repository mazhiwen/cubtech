define(function(require) {
	var $=require('jquery');

	$("#confirm-button").click(function(){
		
		var regexp=new RegExp('\\s+','g');
		var a=$("#input-name").val().split(regexp);
		console.log(a);
	});
	
});

