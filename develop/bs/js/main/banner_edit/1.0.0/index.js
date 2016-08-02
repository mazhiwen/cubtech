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
		url_outer=$("#url_outer"),
		id=getGet('id'),
		ImageId=null;
	if(id){
		ajaxMy('/banner/get_banner',{banner_id:id},function(d){
			var d=d['result'];
			name.val(d['title']);
			url.val(d['actionUrl']);
			sn.val(d['priority']);
			summary.val(d['description']);
			cover_img.attr('src',d['bgPic']);
			action.val(d['action']);
		});
		commit_button.click(function(){
			$(this).prop('disabled',true);
			var that=$(this);
			ajaxMy(
				'/banner/update',
				{
					id:id,
					title:name.val(),
					desc:summary.val(),
					bg_pic:cover_img.attr('src'),
					priority:sn.val(),
					action:action.val(),
					action_url:url.val(),
					sys_image_id:ImageId
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
					desc:summary.val(),
					bg_pic:cover_img.attr("src"),
					priority:sn.val(),
					action:action.val(),
					action_url:url.val(),
					sys_image_id:ImageId
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
	url_outer.hide();
	type.change(function(){
		if (type.val()==1){
			url_outer.show();targetid_outer.hide();
		}else{
			targetid_outer.show();url_outer.hide();
		}
	});

});

