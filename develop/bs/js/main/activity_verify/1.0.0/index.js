define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		id=parseString.getGet('id'),
		table_body_lsit=$("#table_body_lsit");
	var sendListData={
		actId:id,
		size:PERPAGINGCOUNT
	};	
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		requestListFn(currentPage);
	});	

	function requestListFn(currentPage,selectStatus){
		if(arguments.length>1) sendListData['status']=selectStatus;
		sendListData['page']=currentPage;
		AJAXMY.send('/event/order/list',sendListData,function(data){
			table_body_lsit.empty();
			var s='',status;
			$.each(data['result'],function(k,v){
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td>'+v['applicantName']+'</td><td>'+v['applicantCompany']+'</td><td>'+v['applicantPosition']+'</td><td>'+v['applicantMobile']+'</td><td><a target="_blank" href="'+v['applicantCardPic']+'"><img src="'+v['applicantCardPic']+'"></a></td><td>'+parseString.MSToYMDHMS(v['createTime'])+'</td><td>'+v['userId']+'</td><td>'+v['username']+'</td><td>'+v['userVita']+'</td><td>'+v['userType']+'</td><td>'+v['orgName']+'</td><td>'+v['statusDesc']+'</td><td><button class="text_button verify_yes">通过</button> <button class="text_button verify_no">拒绝</button></td></tr>';
			});
			table_body_lsit.append(s);
			myPaging.refreshDom(data['pages']);
		});
	}

	//requestListFn();

	table_body_lsit.on('click','.verify_yes',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		AJAXMY.send('/event/order/check',{id:tthis.parent().parent().attr("data-id"),isPass:true,desc:''},function(d){
			if(d['result']){
				POPUPWINDOW.alert('操作成功');
				tthis.parent().empty().text('已通过');
			}else{
				POPUPWINDOW.alert('操作失败');	
			}
			tthis.prop('disabled',false);
		});
	});

	table_body_lsit.on('click','.verify_no',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirmInput('请填写拒绝理由','',function(btn,value){
			AJAXMY.send('/event/order/check',{id:tthis.parent().parent().attr("data-id"),isPass:false,desc:value},function(d){
				if(d['result']){
					POPUPWINDOW.alert('操作成功');
					tthis.parent().empty().text('已拒绝');
				}else{
					POPUPWINDOW.alert('操作失败');	
				}
				tthis.prop('disabled',false);
			});			
		},function(){});
	});

	$(".activity_status").change(function(){
		var value=$(this).val();
		myPaging.pageFn=function(currentPage){
			requestListFn(currentPage,value);
		};
		myPaging.executePageFn(1);
	});
	

	
});

