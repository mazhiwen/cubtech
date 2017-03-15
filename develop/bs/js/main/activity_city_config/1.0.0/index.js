define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		table_body_lsit=$("#table_body_lsit");

	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/event/address/list',{page:currentPage,size:PERPAGINGCOUNT},function(dr){
			table_body_lsit.empty();
			var s='',
				sOperate,
				status={
					'0':' ',
					'1':'checked'
				},
				domestic={
					'true':'国内',
					'false':'海外'
				};

			$.each(dr['result'],function(k,v){
				s+='<tr data-id='+v['id']+'><td>'+v['id']+'</td><td>'+domestic[v['domestic']]+'</td><td>'+v['addressName']+'</td><td>'+v['fullName']+'</td><td>'+v['englishName']+'</td><td>'+v['pinyin']+'</td><td>'+v['fullSpell']+'</td><td><input class="hotstatus" type="checkbox" '+status[v['hotStatus']]+'></td><td><input class="status" type="checkbox" '+status[v['status']]+'></td><td><a href="activity_city_edit.html?id='+v['id']+'"><button class="text_button">编辑</button></a> <button class="text_button city_delete">删除</button></td></tr>';
			});
			table_body_lsit.append(s);
			myPaging.refreshDom(dr['pages']);
		});
	});


	//设置热门状态：
	table_body_lsit.on('change','.hotstatus',function(event){
		var tthis=$(this),
			status=tthis.prop('checked')?1:0;
		tthis.prop('disabled',true);		
		AJAXMY.send('/event/address/hot_status',{id:tthis.parent().parent().attr("data-id"),status:status},function(data){
			tthis.prop('disabled',false);
			if(data['result']){
				POPUPWINDOW.alert('编辑成功');
			}
		});
	});
	//设置可用状态
	table_body_lsit.on('change','.status',function(event){
		var tthis=$(this),
			status=tthis.prop('checked')?1:0;
		tthis.prop('disabled',true);		
		AJAXMY.send('/event/address/status',{id:tthis.parent().parent().attr("data-id"),status:status},function(data){
			tthis.prop('disabled',false);
			if(data['result']){
				POPUPWINDOW.alert('编辑成功');
			}
		});
	});





	table_body_lsit.on('click','.city_delete',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/event/address/delete',{id:tthis.parent().parent().attr("data-id")},function(d){
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

