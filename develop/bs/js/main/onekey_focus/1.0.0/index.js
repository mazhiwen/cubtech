define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		message= $(".message"),
		celebrityIds=$(".celebrityIds"),
		status=$(".status");
	
	AJAXMY.get('/follow/batch_follow',{},function(data){
		var dr=data['result'];
		message.val(dr['message']);
		celebrityIds.val(dr['celebrityIds']);
		dr['status']?status.prop("checked",true):status.prop("checked",false);
	});	
	
	$(".commit").click(function(){
		AJAXMY.send('/follow/batch_follow',{
			'message':message.val(),
			'celebrityIds':celebrityIds.val(),
			'status':$(".status").prop("checked")?1:0
		},function(data){
			if(data['result'])
				POPUPWINDOW.alert('成功',function(){
					window.location.reload();
				});
				
			else
				POPUPWINDOW.alert('失败');
		});


	});	
		







	
});

