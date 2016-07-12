seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");
define(function(require) {

	$=require('jquery');


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

