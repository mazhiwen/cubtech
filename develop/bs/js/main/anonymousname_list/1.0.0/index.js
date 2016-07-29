define(function(require) {

	$=require('jquery');

	var ajaxMy=require('ajaxMy'),
		commonMain=require('commonMain'),
		paging = require('paging'),
		transformTime=new(require('transformTime'));
	
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

