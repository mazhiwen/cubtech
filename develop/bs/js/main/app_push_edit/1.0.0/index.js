
define(function(require) {

	var commonMain=require('commonMain'),
		confirmbutton=$(".confirmbutton"),
		upload_box_img=$(".upload_box_img"),
		inputusertype=$(".inputusertype"),
		inputuser=$(".inputuser"),
		uploaduserbox=$(".uploaduserbox"),
		inputuserbox=$(".inputuserbox"),
		pushcontent=$(".pushcontent"),
		upload_box_img_box=$(".upload_box_img_box"),
		uploadUserExcelData='',
		ImageId=null;

	

	inputusertype.change(function(){
		if (inputusertype.val()==1){
			inputuserbox.show();
			uploaduserbox.hide();
		}else{
			inputuserbox.hide();
			uploaduserbox.show();
		}
	});

	AJAXMY.upLoad('cover_image_input',function(responseUrl,sysImageId){
		upload_box_img.attr("src",responseUrl);
		upload_box_img_box.css("background-color",'white');
		ImageId=sysImageId;
	},1);
	/*上传excel*/
	AJAXMY.upLoadExcel('uploaduser',function(responseData){
		uploadUserExcelData=responseData;
	});

	confirmbutton.click(function(){

		var that=$(this);
		that.prop('disabled',true);
		var sendData={
			content:pushcontent.val()
		};

		if (inputusertype.val()==1){
			sendData['user_id']=inputuser.val();
		}else{
			sendData['user_ids']=uploadUserExcelData;
		}

		AJAXMY.send('/message/send',sendData,function(data){
			if(data['result']) {
				POPUPWINDOW.alert('添加成功',function(){
					window.location.reload();
				});
			}else{
				POPUPWINDOW.alert('添加失败');
			}
			that.prop('disabled',false);
		},function(){
			that.prop('disabled',false);
		});
	});


});

