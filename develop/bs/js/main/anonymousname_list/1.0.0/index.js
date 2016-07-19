
define(function(require) {

	$=require('jquery');

	var commonNavigation=require('commonNavigation');
	new commonNavigation();
	
	$("#other-outer").hide();
	$("#navigation-article").click(function(){

		$("#edit-article-outer").show();
		$("#other-outer").hide();

	});
	
	$("#navigation-other").click(function(){

		$("#edit-article-outer").hide();
		$("#other-outer").show();

	});

});

