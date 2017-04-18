define(function(require) {

	var commonMain=require('commonMain'),
		id=PARSESTRING.getGet('id'),
		platform=$(".platform"),
		version_num=$(".version_num"),
		version_descs=$(".version_descs"),
		version_store=$(".version_store"),
		version_code=$(".version_code"),
		version_url=$(".version_url"),
		forced=$(".forced"),
		onlyandroidbox=$(".onlyandroidbox"),
		commitbutton=$(".commitbutton"),
		ImageId='';	


	function commonSendFn(id,tthis,sendTail){
		tthis.prop("disabled",true);
		var platformV=platform.val(),
			version_numV=version_num.val(),
			version_descsV=version_descs.val(),
			version_storeV=version_store.val(),
			version_codeV=version_code.val(),
			isId=PARSESTRING.isEmpty(id);	
		if(PARSESTRING.isEmpty([platformV,version_numV,version_descsV])){
			var sendData={
				platform:platformV,
				version_num:version_numV,
				version_desc:version_descsV,
				forced:forced.prop("checked")
			};
			if(isId) sendData['id']=id;
			if(platformV=='android'&&!PARSESTRING.isEmpty([version_storeV,version_codeV])){
				POPUPWINDOW.alert('Android选项未填');
				tthis.prop('disabled',false);
				return false;
			}else{
				if(platformV=='android'){
					
					sendData['version_store']=version_storeV;
					sendData['version_code']=version_codeV;
					sendData['version_url']=version_url.val();
				}
				AJAXMY.send(
					'/version/'+sendTail,
					sendData,
					function(d){
						if(d['result']) {
							POPUPWINDOW.alert('添加成功',function(){
								window.location.href='app_version.html';
							});
						}
					},
					function(){
						tthis.prop('disabled',false);
					}
				);
			}				
		}else{
			POPUPWINDOW.alert('部分选项未填/格式错误');
			tthis.prop('disabled',false);
			return false;
		}
	}
	

	if(id){
		AJAXMY.send('/version/edit',{id:id},function(data){
			var d=data['result'];
			platform.val(d['platform']);

			if(d['platform']=='android'){
				onlyandroidbox.show();
			}
			version_num.val(d['versionNum']);
			version_descs.val(d['versionDesc']);
			version_store.val(d['versionStore']);
			version_code.val(d['versionCode']);
			version_url.val(d['versionUrl']);
			forced.prop("checked",d['status']);	
		});
		commitbutton.click(function(){
			commonSendFn(id,$(this),'update');
		});
	}else{
		commitbutton.click(function(){	
			commonSendFn('',$(this),'save');
		});	
	}
	
	platform.change(function(){
		if($(this).val()=='android'){
			onlyandroidbox.show();
		}else{
			onlyandroidbox.hide();

		}


	});

	
	


});

