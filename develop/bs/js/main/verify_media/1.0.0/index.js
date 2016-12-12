define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		table_body_good_tag=$("#table_body_good_tag"),
		add_goodtag_btn=$("#add_goodtag_btn"),
		perPagingCount=10,
		editBtnHtml='<button class="glyphicon-edit glyphicon onlyicon" title="编辑"></button>';
	
	function disEditableCss(removeTableNewRowDom,disEditDomArray){
		removeTableNewRowDom.removeClass('table_new_row');
		$.each(disEditDomArray,function(index,value){
			value.attr("contenteditable","false");
		});
	}


/////////////////////////////////////擅长领域
	var PagingGoodTag=new paging("#paging_good_tag",MAXPAGING,function(currentPage){
		AJAXMY.send('/certification/tag/list',{page:currentPage,size:perPagingCount,type:4},function(d){
			table_body_good_tag.empty();
			var s='',status;
			$.each(d['result'],function(k,v){
				if(v['status']){
					status='<input class="checkbox" type="checkbox" checked>';
				}else{
					status='<input class="checkbox" type="checkbox">';
				}	
				s+='<tr data-id="'+v['id']+'"><td class="td_name">'+v['name']+'</td><td class="td_status">'+status+'</td><td>'+v['hotCount']+'</td><td><button class="glyphicon-edit glyphicon onlyicon" title="编辑"></button> <button title="删除" class="glyphicon-trash glyphicon onlyicon"></button></td></tr>';
			});
			table_body_good_tag.append(s);
			PagingGoodTag.refreshDom(d['pages']);
		});
	});
	//添加操作
	add_goodtag_btn.click(function(){
		table_body_good_tag.append('<tr class="table_new_row"><td contenteditable="true" class="td_name"></td><td class="td_status"><input type="checkbox"></td><td>/</td><td><button class="glyphicon-ok_add glyphicon onlyicon" title="提交"></button> <button class="glyphicon-cancel_add glyphicon onlyicon" title="取消"></button></td></tr>');
	});
	//添加提交操作
	table_body_good_tag.on('click','.glyphicon-ok_add',function(event){
		var tthis=$(this),
			dom=tthis.parent(),
			domTr=dom.parent(),
			domName=dom.siblings('.td_name'),
			name=domName.text(),
			domStatus=dom.siblings('.td_status').children("input");
		tthis.prop('disabled',true);	
		if(parseString.isEmpty(name)){
			AJAXMY.send('/certification/tag/save',{type:4,name:name,status:domStatus.is(':checked')?1:0},function(data){
				tthis.prop('disabled',false);
				if(data['result']){
					POPUPWINDOW.confirm('提示','添加成功，刷新当前列表才能编辑新增项，是否刷新',function(btn){
						btn.prop('disabled',false);
						//刷新列表
						PagingGoodTag.executePageFn(1);
						POPUPWINDOW.hide();
					},function(){
						disEditableCss(domTr,[domName]);
						domStatus.prop("disabled",true);
						tthis.next().remove();	
						tthis.replaceWith('提交成功');
					});
				}
			});
		}else{
			tthis.prop('disabled',false);
			POPUPWINDOW.alert('名称不能为空');
		}
	});
	//添加撤销操作
	table_body_good_tag.on('click','.glyphicon-cancel_add',function(event){
		var domTr=$(this).parent().parent();
		domTr.remove();
	});
	//编辑操作
	table_body_good_tag.on('click','.glyphicon-edit',function(event){
		var dom=$(this).parent();
		dom.siblings('.td_name').attr("contenteditable","true");
		dom.siblings('.td_status').children('input').removeClass('checkbox');
		dom.parent().addClass('table_new_row');
		$(this).replaceWith('<button class="glyphicon-ok glyphicon onlyicon" title="保存"></button> <button class="glyphicon-cancel glyphicon onlyicon" title="撤销"></button>');
	});
	//编辑保存操作
	table_body_good_tag.on('click','.glyphicon-ok',function(event){
		$(this).prop('disabled',true);
		var tthis=$(this),
			dom=tthis.parent(),
			domTr=dom.parent(),
			domName=dom.siblings('.td_name'),
			name=domName.text(),
			domStatus=dom.siblings('.td_status').children("input");
		if(parseString.isEmpty(name)){
			AJAXMY.send('/certification/tag/update',{id:domTr.attr("data-id"),name:name,status:domStatus.is(':checked')?1:0},function(data){
				tthis.prop('disabled',false);
				if(data['result']){
					POPUPWINDOW.alert('编辑成功');
					tthis.next().remove();
					domStatus.addClass('checkbox');	
					disEditableCss(domTr,[domName]);
					tthis.replaceWith(editBtnHtml);
				}else{
					POPUPWINDOW.alert('编辑失败');	
				}
			});
		}else{
			tthis.prop('disabled',false);
			POPUPWINDOW.alert('名称不能为空');
		}
	});
	//编辑撤销操作
	table_body_good_tag.on('click','.glyphicon-cancel',function(event){
		var tthis=$(this),
			dom=tthis.parent(),
			domTr=dom.parent();
		tthis.prop('disabled',true);	
		//根据id 获取详情，刷新dom
		AJAXMY.send('/certification/tag/edit',{id:domTr.attr("data-id")},function(data){
			tthis.prop('disabled',false);
			var dr=data['result'],
				domName=dom.siblings('.td_name'),
				domStatus=dom.siblings('.td_status').children('input');
			domStatus.addClass('checkbox');	
			disEditableCss(domTr,[domName]);
			domName.text(dr['name']);
			dr['status']?domStatus.prop("checked",true):domStatus.prop("checked",false);
			tthis.prev().remove();
			tthis.replaceWith(editBtnHtml);
		});
	});
	//删除操作
	table_body_good_tag.on('click','.glyphicon-trash',function(event){
		var tthis=$(this),
			domTr=tthis.parent().parent();
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/certification/tag/delete',{id:domTr.attr("data-id")},function(d){
				if(d['result']){
					POPUPWINDOW.alert('删除成功');
					domTr.remove();
				}
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});	
	//选中事件
	table_body_good_tag.on('change','.checkbox',function(event){
		var tthis=$(this),
			status=tthis.is(':checked')?1:0;
		tthis.prop('disabled',true);		
		AJAXMY.send('/certification/tag/status',{id:tthis.parent().parent().attr("data-id"),status:status},function(data){
			tthis.prop('disabled',false);
			if(data['result']){
				POPUPWINDOW.alert('编辑成功');
			}else{
				POPUPWINDOW.alert('编辑失败');
			}
		});
	});







	
});

