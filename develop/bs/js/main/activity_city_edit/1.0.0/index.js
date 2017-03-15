define(function(require) {
	var commonMain=require('commonMain'),
		id=PARSESTRING.getGet('id'),
		name=$('.name'),
		full_name=$('.full_name'),
		english_name=$('.english_name'),
		is_domestic=$('.is_domestic'),
		commit_button=$(".commit_button");	


	function commonSendFn(id,tthis,sendTail){
		tthis.prop("disabled",true);
		var address_name=name.val(),
			full_nameV=full_name.val(),
			english_nameV=english_name.val(),
			isId=PARSESTRING.isEmpty(id);
		if(PARSESTRING.isEmpty([address_name,full_nameV])){
			var sendData={
				address_name:address_name,
				full_name:full_nameV,
				english_name:english_nameV,
				domestic:is_domestic.prop("checked")
			};
			if(isId) sendData['id']=id;
			AJAXMY.send(
				'/event/address/'+sendTail,
				sendData,
				function(d){
					if(d['result']) {
						POPUPWINDOW.alert('添加成功',function(){
							window.location.href='activity_city_config.html';
						});
					}
				},
				function(){
					tthis.prop('disabled',false);
				}
			);
		}else{
			POPUPWINDOW.alert('部分选项未填/格式错误');
			tthis.prop('disabled',false);
			return false;
		}

	}


	if(id){
		AJAXMY.send('/event/address/edit',{id:id},function(data){
			var dr=data['result'];
			name.val(dr['addressName']);
			full_name.val(dr['fullName']);
			english_name.val(dr['englishName']);
			is_domestic.prop('checked',dr['domestic']);
			commit_button.click(function(){
				commonSendFn(id,$(this),'update');

			});

		});		
	}else{
		commit_button.click(function(){
			commonSendFn('',$(this),'save');
		});

	}







	

});

