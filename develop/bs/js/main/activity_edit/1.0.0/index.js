define(function(require) {
	new require('commonEdit');
	var commonMain=require('commonMain'),
		parseString=new(require('parseString')),
		dateTimePicker=require('dateTimePicker'),
		dateStart=new dateTimePicker('#activedate','#filldate',function(d){}),
		dateEnd=new dateTimePicker('#activedate_end','#filldate_end',function(d){}),
		dateLine=new dateTimePicker('#activedate_line','#filldate_line',function(d){}),
		id=parseString.getGet('id'),
		title=$('.title'),
		address=$('.address'),
		organizer=$('.organizer'),
		third_url=$('.third_url'),
		organizer_url=$('.organizer_url'),
		is_free=$('.is_free'),
		is_card=$('.is_card'),
		is_sign=$('.is_sign'),
		organizer_contact=$('.organizer_contact'),
		sign_count=$('.sign_count'),
		address_details=$('.address_details'),
		cover_img=$('#cover_img'),
		activedate=$("#activedate"),
		switch_sign_box=$(".switch_sign_box"),
		filldate=$("#filldate"),
		filldate_end=$("#filldate_end"),
		dele_cov_img=$("#dele_cov_img"),
		commit_button=$("#commit-button"),
		filldate_line=$("#filldate_line"),
		save_button=$(".save_button"),
		ImageId='';	
	dateStart._init();
	dateEnd._init();
	dateLine._init();
	function commonSendFn(id,tthis,publish_status,sendTail){
		tthis.prop("disabled",true);
		var title_v=title.val();
		var start_time=filldate.val();
		var end_time=filldate_end.val();
		var apply_count=sign_count.val();
		var addressV=address.val();
		var addressDetail=address_details.val();
		var isId=parseString.isEmpty(id);
		if(parseString.isEmpty([title_v,start_time,end_time,addressV,ImageId,addressDetail])&&parseString.isNumber(apply_count)){
			var apply_status=is_sign.prop("checked");
			var sendData={
				event_name:title_v,
				sys_image_id:ImageId,
				cover_pic:cover_img.attr("src"),
				content:ue.getContent(),
				start_time:start_time,
				end_time:end_time,
				deadline:filldate_line.val(),
				address:addressV,
				address_detail:addressDetail,
				organizer:organizer.val(),
				url:organizer_url.val(),
				contact:organizer_contact.val(),
				free_status:is_free.prop("checked"),
				card_status:is_card.prop("checked"),
				apply_status:apply_status,
				apply_count:apply_count,
				keyword:'',
				publish_status:publish_status
			};
			if(isId) sendData['id']=id;
			if(!apply_status) sendData['apply_page_url']=third_url.val();
			AJAXMY.send(
				'/event/'+sendTail,
				sendData,
				function(d){
					if(d['result']) {
						POPUPWINDOW.alert('添加成功',function(){
							window.location.href='activity_list.html';
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



	ue.ready(function(){
		if(id){
			AJAXMY.send('/event/edit',{id:id},function(data){
				var dr=data['result'];
				title.val(dr['eventName']);
				ImageId=dr['sysImageId'];
				cover_img.attr('src',dr['coverPic']);
				ue.setContent(dr['content']);
				filldate.val(parseString.MSToYMDHMS(dr['startTime']));
				filldate_end.val(parseString.MSToYMDHMS(dr['endTime']));
				filldate_line.val(parseString.MSToYMDHMS(dr['deadline']));
				address.val(dr['address']);
				organizer.val(dr['organizer']);
				organizer_url.val(dr['url']);
				organizer_contact.val(dr['contact']);
				address_details.val(dr['addressDetail']);
				is_card.prop('checked',dr['cardStatus']);
				is_free.prop('checked',dr['freeStatus']);
				is_sign.prop('checked',dr['applyStatus']);
				if(dr['applyStatus']) switch_sign_box.hide();
				sign_count.val(dr['applyCount']);
				third_url.val(dr['applyPageUrl']);
				commit_button.click(function(){
					commonSendFn(id,$(this),true,'update');

				});

				save_button.click(function(){
					commonSendFn(id,$(this),false,'update');
				});

			});		
		}else{
			commit_button.click(function(){
				commonSendFn('',$(this),true,'save');
			});

			save_button.click(function(){
				commonSendFn('',$(this),false,'save');
			});
		}
	});

	AJAXMY.upLoadImg('cover_image_input','/admin/event/upload_image',function(data){
		cover_img.attr("src",data['pic_url']);
		ImageId=data['sysImageId'];
	});
	dele_cov_img.click(function(){
		/*$(this).prop('disabled',true);
		var that=$(this);
		AJAXMY.send(
			'/article/delete_pic',
			{sys_image_id:ImageId},
			function(d){
				if(d['result']) {
					ImageId='';
					
				}
				that.prop('disabled',false);
			}
		);*/
		ImageId='';
		cover_img.attr("src",'');
	});

	$(".is_sign").change(function(){
		$(this).is(":checked")?switch_sign_box.hide():switch_sign_box.show();
	});
	

});

