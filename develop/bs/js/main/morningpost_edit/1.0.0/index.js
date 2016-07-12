seajs.use("../js/modules/commonnavigation/1.0.0/commonNavigation");
seajs.use("../js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {

	$=require('jquery');

	

	var dateTimePicker=require('dateTimePicker');
	var my_dateTimePicker=new dateTimePicker('#activedate','#filldate',function(d){});
	my_dateTimePicker._init();

	ue.ready(function(){

		//var html = ue.getContent();

		//console.log(ue);


	});


	$("#commit-button").click(function(){
		console.log(ue.getContent());
	});


});

