define(function(require) {
	var getGet=require('getGet'),
		commonNavigation=require('commonNavigation'),
		coverImageInput=document.getElementById('cover_image_input'),
		subjectNameDom=$("#subject_name"),
		subjectDescriptionDom=$("#subject_description"),
		coverImgDom=$("#cover_img"),
		subjectListSn=$("#subject_list_sn"),
		subjectId,
		myFormData=new FormData();
	new commonNavigation();
	subjectId=getGet('id');
	AJAXMY.send('/subject/edit',{subject_id:subjectId},function(data){
		var o=data['data']['result'];
		subjectNameDom.val(o['name']);
		subjectDescriptionDom.val(o['description']);
		coverImgDom.attr("src",o['bgPic']);
		subjectListSn.val(o['priority']);
	});

	$("#confirm-button").click(function(){

		//myFormData.append(coverImageInput.files[0].name, coverImageInput.files[0]);
		myFormData.append('subject_id', subjectId);
		myFormData.append('name', subjectNameDom.val());
		myFormData.append('desc', subjectDescriptionDom.val());
		myFormData.append('file', coverImageInput.files[0]);
		myFormData.append('priority', subjectListSn.val());
		AJAXMY.send('http://123.56.237.44:8090/app/user/head_pic',myFormData,function(data){

			console.log(data);
		});
	});
	/*
	coverImageInput.addEventListener("change",function(event){
		var files=coverImageInput.files;
		var formData=new FormData();
		for(var i=0,file;file=files[i];i++){
			formData.append('file', file);
		}
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load',function(event){

			console.log(JSON.parse(xhr.responseText)['11_jpg']['name']);
			
			//JSON.parse(xhr.responseText,function(key,value){
			//	if(key!=='') 
			//	console.log(value);
			//});
		
		});
		xhr.open("POST", "http://123.56.237.44:8090/app/user/head_pic", true);
		xhr.send(formData);
	},false);*/
	
});

