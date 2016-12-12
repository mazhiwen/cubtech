define(function(require, exports, module) {
	module.exports=generateTbody;
	function generateTbody(urlTail,sendData,successFunction){
		this.requestHead=REQUESTHEAD;	
	}
	generateTbody.prototype.send=function(){
				
	}


	/*
	绑定元素 上传 发送
	parameterA: 1 文章  2专题  3话题

  	*/
	generateTbody.prototype.upLoad=function(inputId,responseFn,parameterA){
		var e=document.getElementById(inputId),
			fd=new FormData(),
			tthis=this;
		e.addEventListener("change",function(event){
			var files=e.files,
				xhr = new XMLHttpRequest();
			for(var i=0,file;file=files[i];i++){
				fd.append('file', file);
			}
			fd.append('type',parameterA);
			xhr.addEventListener('load',function(event){
				var responseUrl=JSON.parse(this.responseText)['data']['pic_url'];
				var sysImageId=JSON.parse(this.responseText)['data']['sysImageId'];
				responseFn.call(this,responseUrl,sysImageId);
			});
			xhr.open("POST", tthis.requestHead+"/upload_image", true);
			xhr.send(fd);
		},false);
	}
});

