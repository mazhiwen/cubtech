define(function(require, exports, module) {
	
	module.exports=ajaxMy;
	
	function ajaxMy(requestDomain,requestSecondDomain,requestHeaders){
		this.requestDomain=requestDomain;
		this.requestSecondDomain=requestSecondDomain;
		this.requestHeaders=requestHeaders;	
	}

	ajaxMy.prototype.send=function(secondDirIndex,urlTail,sendData,headers,successFn){
		$.ajax({
			type:"POST",
			url:this.requestDomain+this.requestSecondDomain[secondDirIndex]+urlTail,
			data:sendData,
			dataType:"json",
			traditional:true,
			headers:this.requestHeaders,
			success:function(d){
				if(d['sys']==200){
					var code=d['code'];
					if(code==0){
						if(d['data']['result']==='false'){
							POPUPWINDOW.alert('操作失败：未知原因');
						}else{
							successFn.call(this,d['data']);
							return;
						}
					}
					else{
						POPUPWINDOW.alert('操作失败：'+d['desc'],function(){});
					} 
				}else{
					POPUPWINDOW.alert('操作失败：网络原因',function(){});
				}
			},
			error:function(Xhr,textStatus,errorThrown){
				POPUPWINDOW.alert(Xhr.status+',服务器出错');
			},
			complete:function (Xhr,textStatus) {
			}
		/*.done(function(data, textStatus, jqXHR){
			if(data['sys']==200){
				var code=data['code'];
				if(code==0){
					if(data['data']['result']==='false'){
						POPUPWINDOW.alert('操作失败：未知原因');
					}else{
						successFn.call(this,data['data']);
						return;
					}
				}
				else{
					POPUPWINDOW.alert('操作失败：'+data['desc'],function(){});
				} 
			}else{
				POPUPWINDOW.alert('操作失败：网络原因',function(){});
			}
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			POPUPWINDOW.alert(jqXHR.status+',服务器出错');
		})
		.always(function(dataOrjqXHR,textStatus,jqXHROrErrorThrown) {
			if(typeof(alwaysFn)=="function"){
				alwaysFn.call(this);
			}
		});	*/
		});		
	}



});

