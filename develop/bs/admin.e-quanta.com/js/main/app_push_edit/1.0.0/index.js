
define(function(require) {
	var dateTimePicker=require('dateTimePicker');
	var my_dateTimePicker=new dateTimePicker('#activedate','#filldate',function(d){});
	my_dateTimePicker._init();

	var commonMain=require('commonMain'),
		paging = require('paging');

	$("#button-push-now").click(function(){

		confirm("确认立即推送以上内容及链接？");


	});

	
	$("#confirm-button").click(function(){

		confirm("确认于"+$("#filldate").val()+"推送以上内容及链接？");


	});
});

