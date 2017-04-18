define(function(require) {
	new require('commonEdit');
	var commonMain=require('commonMain'),
		parseString=new(require('parseString')),
		dateTimePicker=require('dateTimePicker'),
		/*dateStart=new dateTimePicker(
				{
					activateDom:'#activedate',
					fillDom:'#filldate',
					HMSEmpty:true
				}

			),*/
		dateStart=new MYUI.DateTimePicker(
				{
					box:'.date_start_box',
					HMSEmpty:true
				}

			),
		dateEnd=new MYUI.DateTimePicker(
				{
					box:'.date_end_box',
					HMSEmpty:true
				}

			),
		/*
		dateEnd=new dateTimePicker(
				{
					activateDom:'#activedate_end',
					fillDom:'#filldate_end',
					HMSEmpty:true
				}

			),
		dateLine=new dateTimePicker(
				{
					activateDom:'#activedate_line',
					fillDom:'#filldate_line'
				}
			),*/
		dateLine=new MYUI.DateTimePicker(
				{
					box:'.date_line_box'
				}

			),
		id=parseString.getGet('id'),
		title=$('.title'),
		country=$('.country'),
		province=$('.province'),
		city=$('.city'),
		organizer=$('.organizer'),
		third_url=$('.third_url'),
		organizer_url=$('.organizer_url'),
		is_free=$('.is_free'),
		is_card=$('.is_card'),
		is_sign=$('.is_sign'),
		istop=$('.istop'),
		is_domestic=$('.is_domestic'),
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
	


	//dateStart.setDate('2016-8-5');
	//console.log(dateStart.getDateTime());
	



	
	function commonSendFn(id,tthis,publish_status,sendTail){
		console.log(dateStart.getDate());
		console.log(dateEnd.getDate());
		console.log(dateStart.getTime());
		console.log(dateEnd.getTime());
		console.log(dateLine.getDateTime());
		tthis.prop("disabled",true);
		var title_v=title.val(),
			start_time=dateStart.getDate('YY-MM-DD'),
			end_time=dateEnd.getDate('YY-MM-DD'),
			apply_count=sign_count.val(),
			countryV=country.val(),
			provinceV=province.val(),
			cityV=city.val(),
			addressDetail=address_details.val(),
			isId=parseString.isEmpty(id);
		console.log([title_v,start_time,end_time,countryV,cityV,ImageId,addressDetail]);	
		if(parseString.isEmpty([title_v,start_time,end_time,countryV,cityV,ImageId,addressDetail])&&parseString.isNumber(apply_count)){
			if(dateLine.getDateTime()!=null&&dateLine.getTime()==null){
				POPUPWINDOW.alert('请选择报名截止时间');
				tthis.prop('disabled',false);
				return false;
			}else{
				var apply_status=is_sign.prop("checked");
				var sendData={
					event_name:title_v,
					sys_image_id:ImageId,
					cover_pic:cover_img.attr("src"),
					content:ue.getContent(),
					event_start_date:start_time,
					event_end_date:end_time,
					//deadline:dateLine.renderDateDom.val(),
					country:countryV,
					province:provinceV,
					city:cityV,
					address_detail:addressDetail,
					organizer:organizer.val(),
					url:organizer_url.val(),
					contact:organizer_contact.val(),
					free_status:is_free.prop("checked"),
					card_status:is_card.prop("checked"),
					stick:istop.prop("checked")?1:0,
					apply_status:apply_status,
					apply_count:apply_count,
					keyword:'',
					publish_status:publish_status,
					domestic:is_domestic.prop("checked")
				};
				if(dateLine.getDateTime()!=null){
					sendData['deadline']=dateLine.getDateTime();
				}else{
					sendData['deadline']='';
				}
				if(dateStart.getTime('HH:II:SS')!=null){
					sendData['event_start_time']=dateStart.getTime('HH:II:SS');
				}
				if(dateEnd.getTime('HH:II:SS')!=null){
					sendData['event_end_time']=dateEnd.getTime('HH:II:SS');
				}
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
			}	
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
				//filldate.val(parseString.MSToYMDHMS(dr['startTime']));
				//filldate_end.val(parseString.MSToYMDHMS(dr['endTime']));
				//dateStart.renderDateDom.val(dr['eventStartDate']+' '+dr['eventStartTime']);
				dateStart.setDate(dr['eventStartDate']+' '+dr['eventStartTime']);
				//dateEnd.renderDateDom.val(dr['eventEndDate']+' '+dr['eventEndTime']);
				dateEnd.setDate(dr['eventEndDate']+' '+dr['eventEndTime']);
				//dateLine.renderDateDom.val(PARSESTRING.MSToYMDHMS(dr['deadline']));
				dateLine.setDate(PARSESTRING.MSToYMDHMS(dr['deadline']));
				country.val(dr['country']);
				province.val(dr['province']);
				city.val(dr['city']);
				organizer.val(dr['organizer']);
				organizer_url.val(dr['url']);
				organizer_contact.val(dr['contact']);
				address_details.val(dr['addressDetail']);
				is_card.prop('checked',dr['cardStatus']);
				is_domestic.prop('checked',dr['domestic']);
				is_free.prop('checked',dr['freeStatus']);
				is_sign.prop('checked',dr['applyStatus']);
				istop.prop('checked',dr['stick']);
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

		ImageId='';
		cover_img.attr("src",'');
	});

	$(".is_sign").change(function(){
		$(this).is(":checked")?switch_sign_box.hide():switch_sign_box.show();
	});
	

});

