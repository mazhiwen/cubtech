
define(function(require) {
	var commonMain=require('commonMain'),
		paging = require('paging'),
		getGet=require('getGet'),
		parseString=new(require('parseString')),
		transformTime=new(require('transformTime')),
		commit_button=$("#commit-button"),
		title=$("#title"),
		summary=$("#summary"),
		original_url=$("#original_url"),
		table_body=$("#table_body"),
		id=getGet('id'),
		upload_box_delete=$(".upload_box_delete"),
		upload_box_img=$(".upload_box_img"),
		upload_box_img_box=$(".upload_box_img_box"),
		ImageId=null;

	function commonSendFn(id,tthis,sendTail){
		tthis.prop('disabled',true);
		var original_url_v=original_url.val(),
			isId=parseString.isEmpty(id);
		if(parseString.isUrl(original_url_v)||!parseString.isEmpty(original_url_v)){
			var sendData={
				title:title.val(),
				summary:summary.val(),
				sys_image_id:ImageId,
				cover_pic:upload_box_img.attr("src"),
				original_url:original_url.val()
			};
			if(isId) sendData['id']=id;
			AJAXMY.send(
				'/info'+sendTail,
				sendData,
				function(d){
					if(d['result']) POPUPWINDOW.alert('操作成功');
					else POPUPWINDOW.alert('操作失败');
				},
				function(){
					tthis.prop('disabled',false);
				}
			);
		}else{
			POPUPWINDOW.alert('链接输入错误，需要http 或者 https前缀');
			tthis.prop('disabled',false);
		}

	}

	if(id){
		AJAXMY.send('/info/edit',{id:id},function(d){
			var d=d['result'];
			title.val(d['title']);
			summary.val(d['summary']);
			ImageId=d['sysImageId'];
			if(parseString.isEmpty(ImageId)){
				upload_box_img.attr('src',d['coverPic']);
				upload_box_img_box.css("background-color",'white');
			}
			original_url.val(d['originalUrl']);
		});
		commit_button.click(function(){
			commonSendFn(id,$(this),'/update_news');
			
		});
	}else{
		commit_button.click(function(){
			commonSendFn('',$(this),'/save_news');
			
		});	
		
	}

	AJAXMY.upLoadImg('cover_image_input','/admin/info/upload_image',function(data){
		upload_box_img.attr("src",data['pic_url']);
		upload_box_img_box.css("background-color",'white');
		ImageId=data['sysImageId'];
	});
	upload_box_delete.click(function(){
		$(this).prop('disabled',true);
		var that=$(this);
		AJAXMY.send(
			'/article/delete_pic',
			{sys_image_id:ImageId},
			function(d){
				if(d['result']) {
					ImageId='';
					upload_box_img.attr("src",'');
					upload_box_img_box.css("background-color",'transparent');
				}
			},
			function(){
				that.prop('disabled',false);
			}
		);
	});	

});

