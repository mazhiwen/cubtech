define(function(require) {
	
	var commonMain=require('commonMain'),
		feed_back_content=$("#feed_back_content"),
		time=$("#time"),
		name=$("#name"),
		phone=$(".phone"),
		delete_btn=$("#delete_btn"),
		id=PARSESTRING.getGet('id');
	if(id){
		AJAXMY.send('/feedback/detail',{id:id},function(d){
			var d=d['result'];
			name.val(d['nickName']);
			phone.val(d['contact']);
			feed_back_content.val(d['content']);
			time.text(PARSESTRING.MSToYMDHMS(d['createTime']));

		});
		delete_btn.click(function(){
			AJAXMY.send('/feedback/delete',{id:id},function(d){
			if(d['result']){
				POPUPWINDOW.alert('删除成功');
				window.location.href="user_feed_list.html";
			}
			that.prop('disabled',false);
			});
		});
	}else{
		POPUPWINDOW.alert('需要选择反馈');
		window.location.href="user_feed_list.html";
	}


});

