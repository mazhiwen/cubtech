seajs.use("../js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {
	var commonMain=require('commonMain'),
		
		getGet=require('getGet'),
		transformTime=new(require('transformTime')),
		dateTimePicker=require('dateTimePicker'),
		my_dateTimePicker=new dateTimePicker('#activedate','#filldate',function(d){}),
		commit_button=$("#commit-button"),
		filldate=$("#filldate"),
		id=getGet('id')
		;
	my_dateTimePicker._init();
	ue.ready(function(){
		if(id){
			AJAXMY.send('/info/edit',{id:id},function(d){
				var d=d['result'];
				filldate.val(transformTime.MSToYMDHMS(d['postTime']));
				ue.setContent(d['content']);
			});
			commit_button.click(function(){
				$(this).prop('disabled',true);
				var that=$(this);
				AJAXMY.send(
					'/info/update_report',
					{
						id:id,
						content:ue.getContent(),
						post_time:filldate.val()
					},
					function(d){
						if(d['result']) alert('编辑成功');
						else alert('编辑失败');
						that.prop('disabled',false);
					}
				);
			});
		}else{
			commit_button.click(function(){
				$(this).prop('disabled',true);
				var that=$(this);
				AJAXMY.send(
					'/info/save_report',
					{
						content:ue.getContent(),
						post_time:filldate.val()
					},
					function(d){
						if(d['result']) alert('添加成功');
						else alert('添加失败');
						that.prop('disabled',false);
					}
				);
			});	
			
		}
	});

});

