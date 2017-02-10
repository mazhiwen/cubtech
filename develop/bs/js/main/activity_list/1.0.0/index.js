define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		table_body=$("#table_body"),
		table_body_lsit=$("#table_body_lsit");

	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/event/list',{page:currentPage,size:PERPAGINGCOUNT},function(dr){
			table_body_lsit.empty();
			var s='',status,applyType,sOperate,disMessage,replayDom;
			var statusArray={
				'-1':'取消',
				'1':'报名中',
				'2':'进行中',
				'3':'结束'		
			};
			var boolText={
				'true':'是',
				'false':'否'
			};
			$.each(dr['result'],function(k,v){
				s+='<tr data-id='+v['id']+'><td>'+v['id']+'</td><td>'+v['title']+'</td><td>'+statusArray[v['status']]+'</td><td>'+parseString.MSToYMDHMS(v['startTime'])+'</td><td>'+parseString.MSToYMDHMS(v['endTime'])+'</td><td>'+v['address']+'</td><td>'+v['organizer']+'</td><td>'+boolText[v['applyStatus']]+'</td><td>'+v['applyCount']+'</td><td>'+v['applicantCount']+'</td><td><a href="activity_verify.html?id='+v['id']+'"><button class="text_button">审核</button></a> <a href="activity_edit.html?id='+v['id']+'"><button class="text_button">编辑</button></a> <button class="text_button delete_activity">取消活动</button></td></tr>';
			});
			table_body_lsit.append(s);
			myPaging.refreshDom(dr['pages']);
		});
	});


	table_body.on('click','.delete_activity',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/event/delete',{id:tthis.parent().parent().attr("data-id")},function(d){
				if(d['result']){
					alert('删除成功');
					tthis.parent().parent().remove();
				}else{
					alert('删除失败');	
				}
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});



	
});

