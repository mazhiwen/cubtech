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
		summary=$("#summary"),
		commit_button=$("#commit_button"),
		id=getGet('id');
	if(id){
		ajaxMy('/banner/get_banner',{banner_id:id},function(d){
			var d=d['result'];
			name.val(d['title']);
			url.val(d['actionUrl']);
			sn.val(d['priority']);
			summary.val(d['description']);
			cover_img.attr('src',d['bgPic']);
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
					bg_pic:cover_img.attr("src"),
					priority:sn.val(),
					action:'',
					action_url:url.val()
				},
				function(d){
					if(d['result']) alert('编辑成功');
					else alert('编辑失败');
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
					id:id,
					title:name.val(),
					desc:summary.val(),
					bg_pic:cover_img.attr("src"),
					priority:sn.val(),
					action:'',
					action_url:url.val()
				},
				function(d){
					if(d['result']) alert('添加成功');
					else alert('添加失败');
					that.prop('disabled',false);
				}
			);
		});	
	}
	uploadFile('cover_image_input',1,function(responseUrl,sysImageId){
		cover_img.attr("src",responseUrl);
		ImageId=sysImageId;
	});

});

