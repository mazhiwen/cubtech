define(function(require) {
	var	commonMain=require('commonMain'),
		title=$(".title"),
		address=$(".address"),
		salary=$(".salary"),
		content=$(".content"),
		requirements=$(".requirements"),
		commit_button=$(".confirm_button"),
		myDateTimePicker=require('dateTimePicker'),
		postTimePicker=new myDateTimePicker('#activedate','#filldate',function(d){}),
		id=PARSESTRING.getGet('id');
	postTimePicker._init();



	function commonSendFn(id,tthis,sendTail){
		tthis.prop("disabled",true);
		var titleV=title.val(),
			addressV=address.val(),
			contentV=content.val(),
			requirementsV=requirements.val(),
			isId=PARSESTRING.isEmpty(id);
		if(PARSESTRING.isEmpty([titleV,addressV,contentV])){
			var sendData={
				title:titleV,
				address:addressV,
				salary:salary.val(),
				content:contentV,
				requirements:requirementsV,
				post_time:$("#filldate").val()
			};
			if(isId) sendData['id']=id;
			AJAXMY.send(
				'/joboffer/'+sendTail,
				sendData,
				function(d){
					if(d['result']) {
						POPUPWINDOW.alert('添加成功',function(){
							window.location.href='jobs_list.html';
						});
					}
				},
				function(){
					tthis.prop('disabled',false);
				}
			);
		}else{
			POPUPWINDOW.alert('部分选项未填/格式错误');
			tthis.prop('disabled',false);
			return false;
		}

	}


	if(id){
		AJAXMY.send('/joboffer/edit',{id:id},function(data){
			var dr=data['result'];
			title.val(dr['title']);
			address.val(dr['address']);
			salary.val(dr['salary']);
			content.val(dr['content']);
			requirements.val(dr['requirements']);
			$("#filldate").val(PARSESTRING.MSToYMDHMS(dr['postTime']));
			commit_button.click(function(){
				commonSendFn(id,$(this),'update');

			});

		});		
	}else{
		commit_button.click(function(){
			commonSendFn('',$(this),'save');
		});

	}



















	
});

