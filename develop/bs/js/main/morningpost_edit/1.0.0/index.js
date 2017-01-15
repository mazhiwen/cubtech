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

	ue.ready(function(){
		if(id){
			AJAXMY.send('/info/edit',{id:id},function(d){
				var d=d['result'];
				if(parseString.isEmpty(d['postTime'])){
					filldate.val(transformTime.MSToYMDHMS(d['postTime']));
					$("input[name='post_time'][value='1']").attr("checked",true);		
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
						if(d['result']) POPUPWINDOW.alert('编辑成功');
						that.prop('disabled',false);
					}
				);
			});
		}else{
			commit_button.click(function(){
				commit_button.prop('disabled',true);
				var //that=$(this),
					summaryV=summary.val(),
					titleV=title.val(),
					content=ue.getContent();
				if(parseString.isEmpty([summaryV,titleV,content])){
					var postTime='';
					if($("input[name='post_time']:checked").val()==1){
						if(parseString.isEmpty(filldate.val())){
							postTime=filldate.val();	
						}else{
							POPUPWINDOW.alert('需要选择发送时间');
							commit_button.prop('disabled',false);
							return false;
						}
					}else{
						postTime='';
					}
					AJAXMY.send(
						'/info/save_report',
						{
							content:content,
							post_time:postTime,
							summary:summaryV,
							title:titleV
						},
						function(d){
							if(d['result']){ 
								POPUPWINDOW.alert('添加成功');
								window.location.href="information_list.html";
							}
							commit_button.prop('disabled',false);
						}
					);

				}else{
					POPUPWINDOW.alert('参数不能为空');
					commit_button.prop('disabled',false);
				}
			});	
		}
		//时间选择
		postTimeRadio.change(function(){
			if($(this).val()==1){
				activedate.prop("disabled",false);
			}else{
				activedate.prop("disabled",true);
			}
		});

	});

});

