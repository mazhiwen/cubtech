define(function(require,exports,module) {
	module.exports=uploadFile;
	function uploadFile(inputEleId,responseFunction){
		var InputEleDom=document.getElementById(inputEleId),
			myFormData=new FormData();
		InputEleDom.addEventListener("change",function(event){
			var files=InputEleDom.files,
				xhr = new XMLHttpRequest();
			for(var i=0,file;file=files[i];i++){
				myFormData.append('file', file);
			}
			xhr.addEventListener('load',function(event){
				var responseUrl=JSON.parse(this.responseText)['data']['head_pic'];
				responseFunction.call(this,responseUrl);
			});
			xhr.open("POST", "http://123.56.237.44:8090/app/user/head_pic", true);
			xhr.send(myFormData);
		},false);
	}
});



