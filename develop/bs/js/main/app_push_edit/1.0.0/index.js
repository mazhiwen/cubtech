
define(function(require) {

	var commonMain=require('commonMain'),
		confirmbutton=$(".confirmbutton"),
		upload_box_img=$(".upload_box_img"),
		upload_box_img_box=$(".upload_box_img_box")
		ImageId=null;

	

	

	AJAXMY.upLoad('cover_image_input',function(responseUrl,sysImageId){
		upload_box_img.attr("src",responseUrl);
		upload_box_img_box.css("background-color",'white');
		ImageId=sysImageId;
	},1);


	confirmbutton.click(function(){
		AJAXMY.send('/message/send',{
			user_id:'',
			user_ids:'',
			content:''
		},function(data){
			
		});
	});


});

