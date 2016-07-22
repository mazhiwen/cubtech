define(function(require) {
	var $=require('jquery'),
		ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		commonNavigation=require('commonNavigation'),
		subjectNameDom=$("#subject_name"),
		subjectDescriptionDom=$("#subject_description"),
		coverImgDom=$("#cover_img"),
		subjectListSn=$("#subject_list_sn"),
		subjectId,
		coverImgUrl='',
		uploadFile=require('uploadFile');
	new commonNavigation();
	subjectId=getGet('id');
	if(subjectId){
		ajaxMy('/subject/edit',{subject_id:subjectId},function(data){
			var o=data['data']['result'];
			subjectNameDom.val(o['name']);
			subjectDescriptionDom.val(o['description']);
			coverImgUrl=o['bgPic'];
			coverImgDom.attr("src",o['bgPic']);
			subjectListSn.val(o['priority']);
		});
	}
	$("#confirm-button").click(function(){
		$(this).prop("disabled",true);
		var othis=$(this);
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
				function(data){
					othis.prop("disabled",false);
					if(data['data']){
						if(data['data']['result']){
							alert('修改成功');
						}
					}else{
						alert('修改失败');
					}
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
				function(data){
					othis.prop("disabled",false);
					if(data['data']){
						if(data['data']['result']){
							alert('添加成功');
						}
					}else{
						alert('添加失败');
					}
				}
			);
		}
	});

	uploadFile('cover_image_input',1,function(responseUrl){
		coverImgUrl=responseUrl;
		coverImgDom.attr("src",coverImgUrl);
	});

	
});

