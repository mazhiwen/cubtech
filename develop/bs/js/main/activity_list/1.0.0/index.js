define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		table_body_lsit=$("#table_body_lsit");

	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/event/list',{page:currentPage,size:PERPAGINGCOUNT},function(dr){
			table_body_lsit.empty();
			var s='',
				sOperate,
				statusArray={
					'-1':'已取消',
					'1':'报名中',
					'2':'进行中',
					'3':'结束'		
				},
				boolText={
					'true':'是',
					'false':'否'
				},
				publishStatus={
					'true':'已发布',
					'false':'未发布'
				};

			$.each(dr['result'],function(k,v){
				if(v['status']=='-1'){
					sOperate='已取消';					
				}else if(v['status']=='3'){
					sOperate='<a href="activity_edit.html?id='+v['id']+'"><button class="text_button">编辑</button></a>';
				}else{
					sOperate='<a href="activity_verify.html?id='+v['id']+'"><button class="text_button">审核</button></a> <a href="activity_edit.html?id='+v['id']+'"><button class="text_button">编辑</button></a> <button class="text_button cancel_activity">取消活动</button>';
				}
				s+='<tr data-id='+v['id']+'><td>'+v['id']+'</td><td>'+v['eventName']+'</td><td>'+statusArray[v['status']]+'</td><td>'+parseString.MSToYMDHMS(v['startTime'])+'</td><td>'+parseString.MSToYMDHMS(v['endTime'])+'</td><td>'+v['address']+'</td><td>'+v['organizer']+'</td><td>'+boolText[v['applyStatus']]+'</td><td>'+v['applyCount']+'</td><td>'+v['applicantCount']+'</td><td>'+publishStatus[v['publishStatus']]+'</td><td>'+sOperate+'</td></tr>';
			});
			table_body_lsit.append(s);
			myPaging.refreshDom(dr['pages']);
		});
	});


	table_body_lsit.on('click','.cancel_activity',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirmInput('请填写取消理由','',function(btn,value){
			AJAXMY.send('/event/status',{id:tthis.parent().parent().attr("data-id"),status:'-1',reason:value},function(d){
				if(d['result']){
					POPUPWINDOW.alert('操作成功');
					tthis.parent().empty().text('活动取消');
				}else{
					POPUPWINDOW.alert('操作失败');	
				}
			},function(){
				tthis.prop('disabled',false);
			});			
		},function(){
			tthis.prop('disabled',false);
		});
	});

	table_body_lsit.on('click','.delete_activity',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/event/delete',{id:tthis.parent().parent().attr("data-id")},function(d){
				if(d['result']){
					POPUPWINDOW.alert('操作成功');
					tthis.parent().parent().remove();
				}else{
					POPUPWINDOW.alert('操作失败');	
				}
			},function(){
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});
	
});

