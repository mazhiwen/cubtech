define(function(require, exports, module) {
	module.exports=ajaxMy;
	function ajaxMy(urlTail,sendData,successFunction){
		this.requestHead=REQUESTHEAD;	
	}

	/*
	json 数据

  	*/
	ajaxMy.prototype.send=function(urlTail,sendData,successFn){
		$.ajax({
			type:"POST",
			url:this.requestHead+'/admin'+urlTail,
			data:sendData,
			dataType:"json",
			traditional:true,
			success:function(d){
				if(d['sys']==200){
					var code=d['code'];
					if(code==0){
						successFn.call(this,d['data']);
					}
					else{
						
						if(code==102){
							DOCCOOKIES.removeItem('loginName','/');
							DOCCOOKIES.removeItem('loginPassword','/');
							POPUPWINDOW.alert('操作失败：'+d['desc'],function(){
								window.location.href=URLHEAD+'/login.html';
							});	
						}else{
							POPUPWINDOW.alert('操作失败：'+d['desc'],function(){});
						}
					} 
				}else{
					POPUPWINDOW.alert('操作失败：网络原因',function(){});
				}
			}
		});		
	}


	/*
	绑定元素 上传 发送
	parameterA: 1 文章  2专题  3话题

  	*/
	ajaxMy.prototype.upLoad=function(inputId,responseFn,parameterA){
		var e=document.getElementById(inputId),
			fd=new FormData(),
			tthis=this;
		e.addEventListener("change",function(event){
			var files=e.files,
				xhr = new XMLHttpRequest();
			for(var i=0,file;file=files[i];i++){
				if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(e.value)){
					alert("非图片格式，重新来");
					return false;

				}else{
					fd.append('file', file);	
				}
				
				console.log(e.value);

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

