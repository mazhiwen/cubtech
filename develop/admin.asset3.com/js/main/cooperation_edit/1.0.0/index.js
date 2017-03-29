define(function(require) {
	var	commonMain=require('commonMain'),
		companyname=$(".companyname"),
		companyfullname=$(".companyfullname"),
		address=$(".address"),
		postcode=$(".postcode"),
		siteurl=$(".siteurl"),
		priority=$(".priority"),
		coverImgDom=$("#cover_img"),
		ImageId='',
		commit_button=$(".confirm_button"),
		//myDateTimePicker=require('dateTimePicker'),
		//postTimePicker=new myDateTimePicker('#activedate','#filldate',function(d){}),
		id=PARSESTRING.getGet('id');
	//postTimePicker._init();



	function commonSendFn(id,tthis,sendTail){
		tthis.prop("disabled",true);
		var companynameV=companyname.val(),
			priorityV=priority.val(),
			isId=PARSESTRING.isEmpty(id);
		if(PARSESTRING.isEmpty([companynameV,priorityV])){
			var sendData={
				companyName:companynameV,
				priority:priorityV,
				companyFullName:companyfullname.val(),
				address:address.val(),
				postCode:postcode.val(),
				siteUrl:siteurl.val(),
				sys_image_id:ImageId
			};
			if(isId) sendData['id']=id;
			AJAXMY.send(
				'/cooperation/'+sendTail,
				sendData,
				function(d){
					if(d['result']) {
						POPUPWINDOW.alert('添加成功',function(){
							window.location.href='cooperation_list.html';
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
			companyname.val(dr['companyName']);
			companyfullname.val(dr['companyFullName']);
			address.val(dr['address']);
			postcode.val(dr['postCode']);
			siteurl.val(dr['siteUrl']);
			priority.val(dr['priority']);
			ImageId=dr['sysImageId'];
			coverImgDom.attr("src",dr['coverPic']);
			commit_button.click(function(){
				commonSendFn(id,$(this),'update');

			});

		});		
	}else{
		commit_button.click(function(){
			commonSendFn('',$(this),'save');
		});

	}





	AJAXMY.upLoadCooperation('cover_image_input',function(responseUrl,sysImageId){
		console.log(responseUrl);
		console.log(sysImageId);
		coverImgDom.attr("src",responseUrl);
		ImageId=sysImageId;
	},2);













	
});

