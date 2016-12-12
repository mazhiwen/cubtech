define(function(require) {	
	var commonMain=require('commonMain'),
		dateTimePicker=require('dateTimePicker'),
		parseString=new(require('parseString')),
		myDateTimePicker=new dateTimePicker('#activedate','#filldate',function(d){}),
		type=$("#type"),
		upload_user=$("#upload_user"),
		button_push_now=$("#button_push_now"),
		activedate=$("#activedate"),
		confirm_button=$("#confirm_button"),
		content=$("#content"),
		push_to_type=$("#push_to_type"),
		device_type=$("#device_type"),
		filldate=$("#filldate"),
		to_users=$("#to_users"),
		url=$("#url"),
		url_span=$("#url_span"),
		id=parseString.getGet("id"),
		excelDate='';
	myDateTimePicker._init();
	/*确认按钮
	$("#confirm-button").click(function(){
		confirm("确认于"+$("#filldate").val()+"推送以上内容及链接？");
	});*/

	/*选择用户方式*/
	push_to_type.change(function(){
		to_users.hide();
		if (push_to_type.val()==3){
			upload_user.show();
		}else{
			upload_user.hide();
		}
	});
	/*推送时间方式*/
	$('input[name="way_push_time"]').change(function(){
		if($(this).val()==1){
			activedate.prop("disabled",false);
			button_push_now.prop("disabled",true);
			confirm_button.show();
		}else{
			activedate.prop("disabled",true);
			button_push_now.prop("disabled",false);
			confirm_button.hide();
		}
	});
	/*目标id 链接*/
	type.change(function(){
		if (type.val()==4){
			url_span.text('链接:');
		}else{
			url_span.text('目标ID:');
		}
	});
	function getFormDate(){
		var data={
			content:content.val(),
			type:type.val(),
			target:url.val(),
			push_to:push_to_type.val(),
			device_type:device_type.val()
		};
		if(push_to_type.val()==3){
			Object.assign(data,{push_to_users:excelDate});
		}
		return data;
	}
	/*立即推送事件*/
	function button_push_now_listener(requestUrl,appendData){
		button_push_now.click(function(){
			POPUPWINDOW.confirm("立即推送","确认立即推送以上内容及链接？",function(){
				AJAXMY.send(requestUrl,Object.assign({push_time:''},getFormDate(),appendData),function(data){
					if(data['result']){
						POPUPWINDOW.hide();
						POPUPWINDOW.alert('立即推送成功',function(){
							location.reload(true);
						});
					};
				});
			},function(){});
		});
	}
	/*确认按钮事件*/
	function confirm_button_listener(requestUrl,appendData){
		confirm_button.click(function(){
			POPUPWINDOW.confirm("定时推送","确认在"+filldate.val()+"推送以上内容及链接？",function(){
				AJAXMY.send(requestUrl,Object.assign({push_time:filldate.val()},getFormDate(),appendData),function(data){
					if(data['result']){
						POPUPWINDOW.hide();
						POPUPWINDOW.alert('编辑成功',function(){
							location.reload(true);
						});
					};
				});
			},function(){});
		});
	}
	/*是否有id操作*/
	if(id){
		AJAXMY.send('/push/edit',{id:id},function(data){
			var dataResult=data['result'];
			content.val(dataResult['content']);
			type.val(dataResult['type']);
			url.val(dataResult['target']);
			push_to_type.val(dataResult['pushTo']);
			device_type.val(dataResult['deviceType']);
			filldate.val(parseString.MSToYMDHMS(dataResult['pushTime']));
			if(dataResult['pushTo']==3){
				var s='';
				$.each(JSON.parse(dataResult['pushToUsers']),function(k,v){
					s+='['+v['user_id']+','+v['nick_name']+']';
				});
				to_users.append(s);
				to_users.show();
			}
			button_push_now_listener('/push/update',{id:id});
			confirm_button_listener('/push/update',{id:id});
		});
	}else{
		button_push_now_listener('/push/save',{});
		confirm_button_listener('/push/save',{});
	}
	/*上传excel*/
	AJAXMY.upLoadExcel('upload_user_input',function(responseData){
		excelDate=responseData;
	});
});

