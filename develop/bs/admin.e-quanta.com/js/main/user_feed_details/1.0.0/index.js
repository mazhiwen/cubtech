define(function(require) {
	
	var commonMain=require('commonMain'),
		
		getGet=require('getGet'),
		transformTime=new(require('transformTime')),
		feed_back_content=$("#feed_back_content"),
		time=$("#time"),
		name=$("#name"),
		delete_btn=$("#delete_btn"),
		id=getGet('id');
	if(id){
		AJAXMY.send('/feedback/detail',{id:id},function(d){
			var d=d['result'];
			name.val(d['nickName']);
			feed_back_content.val(d['content']);
			time.text(d['createTime']);
		});
		delete_btn.click(function(){
			AJAXMY.send('/feedback/delete',{id:id},function(d){
			if(d['result']){
				alert('删除成功');
				window.location.href="user_feed_list.html";
			}
			that.prop('disabled',false);
			});
		});
	}else{
		alert('需要选择反馈');
		window.location.href="user_feed_list.html";
	}


});

