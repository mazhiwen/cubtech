define(function(require) {
	$=require('jquery');
	var	ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		commonMain=require('commonMain'),
		uploadFile=require('uploadFile'),
		subjectNameDom=$("#subject_name"),
		subjectDescriptionDom=$("#subject_description"),
		coverImgDom=$("#cover_img"),
		subjectListSn=$("#subject_list_sn"),
		subjectId,
		coverImgUrl='',
		ImageId=null;

	subjectId=getGet('id');
	if(subjectId){
		ajaxMy('/subject/edit',{subject_id:subjectId},function(d){
			var o=d['result'];
			subjectNameDom.val(o['name']);
			subjectDescriptionDom.val(o['description']);
			coverImgUrl=o['bgPic'];
			coverImgDom.attr("src",o['bgPic']);
			subjectListSn.val(o['priority']);
		});
	}
	$("#confirm-button").click(function(){
		$(this).prop("disabled",true);
		var that=$(this);
		if(subjectId){
			ajaxMy(
				'/subject/update',
				{
					subject_id:subjectId,
					name:subjectNameDom.val(),
					desc:subjectDescriptionDom.val(),
					bgpic:coverImgUrl,
					priority:subjectListSn.val()
				},
				function(d){
					if(d['result']){
						alert('修改成功');
					}else{
						alert('修改失败');
					}
					that.prop("disabled",false);
				}
			);
		}else{
			ajaxMy(
				'/subject/save',
				{
				name:subjectNameDom.val(),
				desc:subjectDescriptionDom.val(),
				bgpic:coverImgUrl,
				priority:subjectListSn.val()
				},
				function(d){
					if(d['result']){
						alert('添加成功');
					}else{
						alert('添加失败');
					}
					that.prop("disabled",false);
				}
			);
		}
	});

	uploadFile('cover_image_input',1,function(responseUrl,sysImageId){
		coverImgDom.attr("src",responseUrl);
		ImageId=sysImageId;
	});

	
});

