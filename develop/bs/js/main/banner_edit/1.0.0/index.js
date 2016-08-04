define(function(require) {
	$=require('jquery');
	var	ajaxMy=require('ajaxMy'),
		commonMain=require('commonMain'),
		getGet=require('getGet'),
		uploadFile=require('uploadFile'),
		name=$("#name"),
		cover_img=$("#cover_img"),
		sn=$("#sn"),
		url=$("#url"),
		target_id=$("#target_id"),
		type=$("#type"),
		commit_button=$("#commit_button"),
		targetid_outer=$("#targetid_outer"),
		url_span=$("#url_span"),
		id=getGet('id'),
		ImageId=null;
	if(id){
		ajaxMy('/banner/get_banner',{banner_id:id},function(d){
			var d=d['result'];
			name.val(d['title']);
			url.val(d['actionUrl']);
			sn.val(d['priority']);
			cover_img.attr('src',d['bgPic']);
			type.val(d['action']);
			ImageId=d['sysImageId'];
			if (type.val()==2){
				url_span.text('链接:');
			}else{
				url_span.text('目标ID:');
			}
		});
		commit_button.click(function(){
			$(this).prop('disabled',true);
			var that=$(this);
			ajaxMy(
				'/banner/update',
				{
					id:id,
					title:name.val(),
					desc:'两两说不要描述',
					bg_pic:cover_img.attr('src'),
					sys_image_id:ImageId,
					priority:sn.val(),
					action:type.val(),
					action_url:url.val()	
				},
				function(d){
					if(d['result']) alert('编辑成功');
					that.prop('disabled',false);
				}
			);
		});
	}else{
		commit_button.click(function(){
			$(this).prop('disabled',true);
			var that=$(this);
			ajaxMy(
				'/banner/insert',
				{
					title:name.val(),
					desc:'两两说不要描述',
					bg_pic:cover_img.attr("src"),
					sys_image_id:ImageId,
					priority:sn.val(),
					action:type.val(),
					action_url:url.val()
				},
				function(d){
					if(d['result']) alert('添加成功');
					that.prop('disabled',false);
				}
			);
		});	
	}
	uploadFile('cover_image_input',1,function(responseUrl,sysImageId){
		cover_img.attr("src",responseUrl);
		ImageId=sysImageId;
	});
	type.change(function(){
		if (type.val()==2){
			url_span.text('链接:');
		}else{
			url_span.text('目标ID:');
		}
	});

});

