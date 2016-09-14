define(function(require,exports,module) {
	module.exports=uploadFile;
	/*
	articleType: 1 文章  2专题  3话题
	
	function uploadFile(inputEleId,articleType,responseFunction){	
		var InputEleDom=document.getElementById(inputEleId),
			myFormData=new FormData();
		InputEleDom.addEventListener("change",function(event){
			var files=InputEleDom.files,
				xhr = new XMLHttpRequest();
			for(var i=0,file;file=files[i];i++){
				myFormData.append('file', file);
			}
			myFormData.append('type',articleType);
			xhr.addEventListener('load',function(event){
				var responseUrl=JSON.parse(this.responseText)['data']['pic_url'];
				var sysImageId=JSON.parse(this.responseText)['data']['sysImageId'];
				responseFunction.call(this,responseUrl,sysImageId);
			});
			xhr.open("POST", "https://www.e-quanta.com/upload_image", true);
			xhr.send(myFormData);
		},false);
	}*/
});



