
seajs.use("../js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {

	$=require('jquery');

	var commonNavigation=require('commonNavigation');
	new commonNavigation();

	var dateTimePicker=require('dateTimePicker');
	var my_chooseDate=new dateTimePicker('#activedate','#filldate',function(d){});
	my_chooseDate._init();

	ue.ready(function(){

		//var html = ue.getContent();

		//console.log(ue);


	});


	$("#commit-button").click(function(){
		console.log(ue.getContent());
	});


});

