define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		id=parseString.getGet('id'),
		table_body_lsit=$("#table_body_lsit"),
		isForcePass=false;
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
			var s='',sOperate,userType=['普通用户','大V'];
			$.each(data['result'],function(k,v){
				/*NOT_PAY(0, "待支付"),
				CHECKING(1, "审核中"),
				CHECK_SUCCESS(2, "报名成功"),
				DONE(3, "活动已结束"),
				CHECK_FAIL(-1, "审核未通过"),
				CANCELED(-2, "已取消订单"),
				ACT_CANCELED(-3, "活动已取消"),
				REFUNDING(-4, "退款中"),
				REFUND_ERROR(-5, "退款异常"),
				REFUND_ALREADY(-6, "已退款");
				*/
				if(v['status']=='1'){
					sOperate='<button class="text_button verify_yes">通过</button> <button class="text_button verify_no">拒绝</button>';	
				}else{
					sOperate='';					
				}
				
				s+='<tr data-id="'+v['id']+'"><td>'+v['applicantName']+'</td><td>'+v['applicantCompany']+'</td><td>'+v['applicantPosition']+'</td><td>'+v['applicantMobile']+'</td><td class="td_cardpic"><a target="_blank" href="'+v['applicantCardPic']+'"><img src="'+v['applicantCardPic']+'"></a></td><td>'+parseString.MSToYMDHMS(v['createTime'])+'</td><td>'+v['userId']+'</td><td>'+v['username']+'</td><td class="td_vita">'+v['userVita']+'</td><td>'+userType[v['userType']]+'</td><td>'+v['orgName']+'</td><td>'+v['statusDesc']+'</td><td class="td_nowrap">'+sOperate+'</td></tr>';
			});
			table_body_lsit.append(s);
			myPaging.refreshDom(data['pages']);
		});
	}

	//requestListFn();

	table_body_lsit.on('click','.verify_yes',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		AJAXMY.send('/event/order/check',{id:tthis.parent().parent().attr("data-id"),isPass:true,desc:'',force:isForcePass},function(d){
			if(d['result']){
				POPUPWINDOW.alert('操作成功');
				tthis.parent().empty().text('已通过');
			}else{
				POPUPWINDOW.alert('操作失败');	
			}
		},function(){
			tthis.prop('disabled',false);
		},[
			'510',
			function(){
				POPUPWINDOW.confirm('一匡后台','是否强制执行通过操作.在之后的操作中将执行强制通过.',function(){
					isForcePass=true;
				});
			}
		]);
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
			},function(){
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

