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
					'-2':'报名已截止',
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
				},
				domesticStatus={
					'true':'国内',
					'false':'海外'
				};
				
			$.each(dr['result'],function(k,v){
				var isTop='';
				if(v['stick']=='1'){
					isTop='checked';
				}
				if(v['status']=='-1'){
					sOperate='已取消';					
				}else if(v['status']=='3'){
					sOperate='<a href="activity_edit.html?id='+v['id']+'"><button class="text_button">编辑</button></a>';
				}else{
					sOperate='<a href="activity_verify.html?id='+v['id']+'"><button class="text_button">审核</button></a> <a href="activity_edit.html?id='+v['id']+'"><button class="text_button">编辑</button></a> <button class="text_button cancel_activity">取消活动</button>';
				}
				s+='<tr data-id='+v['id']+'><td>'+v['id']+'</td><td>'+v['eventName']+'</td><td>'+statusArray[v['status']]+'</td><td>'+v['startDateTime']+'</td><td>'+v['endDateTime']+'</td><td>'+v['address']+'</td><td>'+v['organizer']+'</td><td>'+boolText[v['applyStatus']]+'</td><td>'+v['applyCount']+'</td><td>'+v['applicantCount']+'</td><td>'+publishStatus[v['publishStatus']]+'</td><td>'+domesticStatus[v['domestic']]+'</td><td><input class="istop" type="checkbox" '+isTop+'></td><td>'+sOperate+'</td></tr>';
			});
			table_body_lsit.append(s);
			myPaging.refreshDom(dr['pages']);
		});
	});

	table_body_lsit.on('click','.istop',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/event/stick',{id:$(this).parent().parent().attr("data-id"),stick:$(this).prop('checked')?1:0},function(d){
			if(d['result']){
				POPUPWINDOW.alert('修改成功');
			}else{
				that.prop('checked')?that.prop('checked',false):that.prop('checked',true);
			}
			that.prop('disabled',false);
		},function(){
			that.prop('disabled',false);
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

