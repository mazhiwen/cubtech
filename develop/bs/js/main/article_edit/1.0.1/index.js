seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");
seajs.use("../js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {

	$=require('jquery');


	ue.ready(function(){

		//var html = ue.getContent();

		//console.log(ue);


	});


	$("#commit-button").click(function(){
		console.log(ue.getContent());
	});



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

