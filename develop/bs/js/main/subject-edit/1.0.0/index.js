define(function(require) {
	
	var $=require('jquery');
	$("#confirm-outer").click(function(){
		var checkedArticleArray=[];
		$('input[name="article-result"]:checked').each(function(){

			checkedArticleArray.push($(this).val());

		});

		console.log(checkedArticleArray);
	});




	var coverImageDom=document.getElementById('cover-image');
	coverImageDom.addEventListener("change",function(event){
		var files=coverImageDom.files;
		var formData=new FormData();
		for(var i=0,file;file=files[i];i++){
			formData.append(file.name, file);
		}
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load',function(event){

			console.log(JSON.parse(xhr.responseText)['11_jpg']['name']);
			/*
			JSON.parse(xhr.responseText,function(key,value){
				if(key!=='') 
				console.log(value);
			});*/
		
		});
		xhr.open("POST", "../js/main/subject-edit/1.0.0/upload.php", true);
		xhr.send(formData);
	},false);
});

