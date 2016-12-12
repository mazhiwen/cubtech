define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		table_body_lsit=$("#table_body_lsit");

	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/organization/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body_lsit.empty();
			var s='',status,applyType,sOperate,disMessage,replayDom;
			$.each(d['result'],function(k,v){
				/*switch(v['applyType']){
					case 1:
					applyType='个人';
					break;
					case 2:
					applyType='机构';
					break;
					case 3:
					applyType='媒体';
					break;
				}
				switch(v['status']){
					case 1:
					status='待审核';
					sOperate='<button class="glyphicon-ok glyphicon onlyicon" title="通过"></button> <button class="glyphicon-cancel glyphicon onlyicon" title="拒绝"></button>';
					replayDom='<button class="glyphicon-edit glyphicon onlyicon edit_reply_btn" title="编辑回复语"></button>';
					break;
					case 2:
					status='通过';
					sOperate='';
					replayDom='<textarea disabled>'+v['message']+'</textarea>';
					break;
					case 3:
					status='未通过';
					sOperate='';
					replayDom='<textarea disabled>'+v['message']+'</textarea>';
					break;
					case 4:
					status='取消提交';
					sOperate='';
					replayDom='';
					break;
				}*/
				s+='<tr><td>'+v['type']+'</td><td>'+v['orgName']+'</td><td>'+v['telephone']+'</td><td>'+v['fax']+'</td><td>'+v['address']+'</td><td>'+parseString.MSToYMDHMS(v['createTime'])+'</td></tr>';
			});
			table_body_lsit.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});
/*
	//查看详情
	table_body_lsit.on('click','.glyphicon-details',function(event){
		var tthis=$(this),
			td=tthis.parent(),
			tr=td.parent(),
			trDetail=tr.next('.detail_wrap');
		if(trDetail.length!=0){
			if(trDetail.attr("data-isshow")==='true'){
				trDetail.hide();
				trDetail.attr("data-isshow",'false');
			}else{
				trDetail.show();
				trDetail.attr("data-isshow",'true');
			}
		}else{
			AJAXMY.send('/certification/info',{cert_id:td.attr("data-id")},function(data){
				tthis.prop('disabled',false);
				var dr=data['result'],s,sName,sOrgPos='',sCategory='',sTag,sFiles='',sIntroduce='';
				switch(dr['applyType']){
					case 1:
					sName='认证昵称';
					sOrgPos='<th>机构名称:</th><td>'+dr['orgName']+'</td><th>岗位:</th><td>'+dr['position']+'</td>';
					sCategory='<tr><th>分类:</th><td colspan="5">'+dr['categoryUser']+'</td></tr>';
					sTag='<tr><th>擅长领域:</th><td colspan="5">'+dr['tagExpert']+'</td></tr><tr><th>关注领域:</th><td colspan="5">'+dr['tagFocus']+'</td></tr>';
					break;
					case 2:
					sName='机构名称';
					sCategory='<tr><th>分类:</th><td>'+dr['categoryOrg']+'</td></tr>';
					sTag='<tr><th>擅长领域:</th><td>'+dr['tagPreference']+'</td></tr>';
					sIntroduce='<tr><th>简介:</th><td>'+dr['introduce']+'</td></tr>';
					break;
					case 3:
					sName='媒体名称';
					sTag='<tr><th>擅长领域:</th><td>'+dr['tagPreference']+'</td></tr>';
					sIntroduce='<tr><th>简介:</th><td>'+dr['introduce']+'</td></tr>';
					break;
				}
				$.each(dr['files'],function(key,value){
					sFiles+='<a class="detail_img" href="'+value+'" target="blank"><img src="'+value+'"></a>';
				});
				s='<tr class="detail_wrap" data-isshow="true"><td colspan="7"><table class="table"><tbody><tr><th>'+sName+':</th><td>'+dr['nickName']+'</td>'+sOrgPos+'</tr>'+sCategory+sTag+sIntroduce+'</tr><tr><th>认证材料:</th><td colspan="5">'+sFiles+'</td></tr></tbody></table></td>';
				tr.after(s);
			});
		}
		

	});
	//审核通过
	table_body_lsit.on('click','.glyphicon-ok',function(event){
		var tthis=$(this),
			td=tthis.parent(),
			domReason=td.siblings('.td_reason').children("textarea"),
			reason=domReason.val();
		tthis.prop('disabled',true);	
		if(parseString.isEmpty(reason)){
			AJAXMY.send('/certification/status',{id:td.attr("data-id"),status:2,message:reason},function(data){
				tthis.prop('disabled',false);
				if(data['result']){
					POPUPWINDOW.alert('操作成功');
					tthis.next().remove();
					tthis.replaceWith('已通过');
				}
			});
		}else{
			tthis.prop('disabled',false);
			POPUPWINDOW.alert('需要填写反馈信息');
		}
	});
	//审核拒绝
	table_body_lsit.on('click','.glyphicon-cancel',function(event){
		var tthis=$(this),
			td=tthis.parent(),
			domReason=td.siblings('.td_reason').children("textarea"),
			reason=domReason.val();
		tthis.prop('disabled',true);	
		if(parseString.isEmpty(reason)){
			AJAXMY.send('/certification/status',{id:td.attr("data-id"),status:3,message:reason},function(data){
				tthis.prop('disabled',false);
				if(data['result']){
					POPUPWINDOW.alert('操作成功');
					tthis.prev().remove();
					tthis.replaceWith('已拒绝');
				}
			});
		}else{
			tthis.prop('disabled',false);
			POPUPWINDOW.alert('需要填写反馈信息');
		}
	});
	//编辑回复语
	table_body_lsit.on('click','.edit_reply_btn',function(event){
		var tthis=$(this);
		tthis.replaceWith('<select class="reply_select"><option value="自己写">自己写</option></select><textarea></textarea>');
	});

	//选择回复语
	table_body_lsit.on('change','.reply_select',function(event){
		var tthis=$(this),
			ta=tthis.next();
		//console.log(tthis.val());
		//ta.val('2222');
	});*/
	
});

