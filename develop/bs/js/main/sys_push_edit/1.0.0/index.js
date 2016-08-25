define(function(require) {	
	var commonMain=require('commonMain'),
		dateTimePicker=require('dateTimePicker'),
		paging = require('paging'),
		my_dateTimePicker=new dateTimePicker('#activedate','#filldate',function(d){}),
		type=$("#type"),
		select_user=$("#select_user"),
		upload_user=$("#upload_user"),
		button_push_now=$("#button_push_now"),
		activedate=$("#activedate"),
		url_span=$("#url_span");

	my_dateTimePicker._init();

	button_push_now.click(function(){
		POPUPWINDOW.confirm("确认立即推送以上内容及链接？");
	});
	$("#confirm-button").click(function(){
		confirm("确认于"+$("#filldate").val()+"推送以上内容及链接？");
	});

	$('input[name="way_cho_user"]').change(function(){
		$('input[name="way_cho_user"]:not(:checked)').parent().next().prop("disabled",true);
		$('input[name="way_cho_user"]:checked').parent().next().prop("disabled",false);

	});

	$('input[name="way_push_time"]').change(function(){
		if($(this).val()==1){
			activedate.prop("disabled",false);
			button_push_now.prop("disabled",true);
		}else{
			activedate.prop("disabled",true);
			button_push_now.prop("disabled",false);
		}
	});

	type.change(function(){
		if (type.val()==3){
			url_span.text('链接:');
		}else{
			url_span.text('目标ID:');
		}
	});
});

