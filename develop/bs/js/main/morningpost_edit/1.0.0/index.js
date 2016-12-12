seajs.use("../js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {
	var commonMain=require('commonMain'),
		getGet=require('getGet'),
		parseString=new(require('parseString')),
		transformTime=new(require('transformTime')),
		dateTimePicker=require('dateTimePicker'),
		my_dateTimePicker=new dateTimePicker('#activedate','#filldate',function(d){}),
		commit_button=$("#commit-button"),
		filldate=$("#filldate"),
		summary=$("#summary"),
		title=$("#title"),
		activedate=$("#activedate"),
		postTimeRadio=$('input[name="post_time"]'),
		id=getGet('id');
	my_dateTimePicker._init();

	$("input[name='post_time'][value='1']").attr("checked",true);
	ue.ready(function(){
		if(id){
			AJAXMY.send('/info/edit',{id:id},function(d){
				var d=d['result'];
				if(parseString.isEmpty(d['postTime'])){
					filldate.val(transformTime.MSToYMDHMS(d['postTime']));		
				}else{
					$("input[name='post_time'][value='2']").attr("checked",true);
				}				
				summary.val(d['summary']);
				title.val(d['title']);
				ue.setContent(d['content']);
			});
			commit_button.click(function(){
				var postTime=postTimeRadio.val()==1?filldate.val():'';
				var that=$(this);
				$(this).prop('disabled',true);
				AJAXMY.send(
					'/info/update_report',
					{
						id:id,
						content:ue.getContent(),
						post_time:postTime,
						summary:summary.val(),
						title:title.val()
					},
					function(d){
						if(d['result']) alert('编辑成功');
						that.prop('disabled',false);
					}
				);
			});
		}else{
			commit_button.click(function(){
				$(this).prop('disabled',true);
				var that=$(this);
				var postTime='';
				if($("input[name='post_time']:checked").val()==1){
					if(parseString.isEmpty(filldate.val())){
						postTime=filldate.val();	
					}else{
						POPUPWINDOW.alert('需要选择发送时间');
						that.prop('disabled',false);
						return false;
					}
				}else{
					postTime='';
				}
				AJAXMY.send(
					'/info/save_report',
					{
						content:ue.getContent(),
						post_time:postTime,
						summary:summary.val(),
						title:title.val()
					},
					function(d){
						if(d['result']){ 
							alert('添加成功');
							window.location.href="information_list.html";
						}
						that.prop('disabled',false);
					}
				);
			});	
		}
		//时间选择
		postTimeRadio.change(function(){
			console.log($(this).val());
			if($(this).val()==1){
				activedate.prop("disabled",false);
			}else{
				activedate.prop("disabled",true);
			}
		});

	});

});

