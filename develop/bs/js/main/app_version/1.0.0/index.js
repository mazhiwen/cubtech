define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		table_body=$("#table_body"),
		add_btn=$("#add_btn"),
		version_select=$("#version_select"),
		editBtnHtml='<button class="glyphicon-edit glyphicon onlyicon" title="编辑"></button>';

	function disEditableCss(removeTableNewRowDom,disEditDomArray){
		console.log(removeTableNewRowDom);
		removeTableNewRowDom.removeClass('table_new_row');
		$.each(disEditDomArray,function(index,value){
			value.attr("contenteditable","false").css("background-color","transparent");
		});
	}
		
	/////////////////////////////////////擅长领域
	var PagingObj=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/version/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s='',forced,status;
			$.each(d['result'],function(k,v){
				if(v['forced']){
					forced='<input type="checkbox" checked disabled>';
				}else{
					forced='<input type="checkbox" disabled>';
				}
				if(v['status']){
					status='<input class="checkbox" type="checkbox" checked>';
				}else{
					status='<input class="checkbox" type="checkbox">';
				}	
				s+='<tr data-id="'+v['id']+'"><td class="td_version_num">'+v['versionNum']+'</td><td class="td_version_desc"><textarea disabled>'+v['versionDesc']+'</textarea></td><td class="td_forced">'+forced+'</td><td class="td_status">'+status+'</td><td><button class="glyphicon-edit glyphicon onlyicon" title="编辑"></button> <button title="删除" class="glyphicon-trash glyphicon onlyicon"></button></td></tr>';
			});
			table_body.append(s);
			PagingObj.refreshDom(d['pages']);
		});
	});
	//添加操作
	add_btn.click(function(){
		table_body.append('<tr class="table_new_row"><td contenteditable="true" class="td_version_num"></td><td contenteditable="true" class="td_version_desc"><textarea></textarea></td><td class="td_forced"><input type="checkbox"></td><td>/</td><td><button class="glyphicon-ok_add glyphicon onlyicon" title="提交"></button> <button class="glyphicon-cancel_add glyphicon onlyicon" title="取消"></button></td></tr>');
	});
	//添加提交操作
	table_body.on('click','.glyphicon-ok_add',function(event){
		var tthis=$(this),
			dom=tthis.parent(),
			domTr=dom.parent(),
			DomVersion_num=dom.siblings('.td_version_num'),
			version_num=DomVersion_num.text(),
			DomVersion_desc=dom.siblings('.td_version_desc').children("textarea"),
			version_desc=DomVersion_desc.val(),
			domForced=dom.siblings('.td_forced').children("input");
		tthis.prop('disabled',true);	
		if(parseString.isEmpty(version_num)&&parseString.isEmpty(version_desc)){
			AJAXMY.send('/version/save',{version_num:version_num,version_desc:version_desc,forced:domForced.is(':checked')?1:0},function(data){
				tthis.prop('disabled',false);
				if(data['result']){
					POPUPWINDOW.confirm('提示','添加成功，是否刷新当前列表',function(btn){
						btn.prop('disabled',false);
						//刷新列表
						PagingObj.executePageFn(1);
						POPUPWINDOW.hide();
					},function(){
						domForced.prop('disabled',true);
						DomVersion_desc.prop("disabled",true);
						disEditableCss(domTr,[DomVersion_num]);
						tthis.next().remove();	
						tthis.replaceWith('提交成功');
					});
				}
			});
		}else{
			tthis.prop('disabled',false);
			POPUPWINDOW.alert('不能为空');
		}
	});
	//添加撤销操作
	table_body.on('click','.glyphicon-cancel_add',function(event){
		var domTr=$(this).parent().parent();
		domTr.remove();
	});
	//编辑操作
	table_body.on('click','.glyphicon-edit',function(event){
		var dom=$(this).parent();
		dom.siblings('.td_version_num').attr("contenteditable","true").css("background-color","white");
		dom.siblings('.td_version_desc').children("textarea").prop("disabled",false);
		dom.siblings('.td_forced').children('input').prop("disabled",false);
		dom.parent().addClass('table_new_row');
		$(this).replaceWith('<button class="glyphicon-ok glyphicon onlyicon" title="保存"></button> <button class="glyphicon-cancel glyphicon onlyicon" title="撤销"></button>');
	});
	//编辑保存操作
	table_body.on('click','.glyphicon-ok',function(event){
		var tthis=$(this),
			dom=tthis.parent(),
			domTr=dom.parent(),
			DomVersion_num=dom.siblings('.td_version_num'),
			version_num=DomVersion_num.text(),
			DomVersion_desc=dom.siblings('.td_version_desc').children("textarea"),
			version_desc=DomVersion_desc.val(),
			domForced=dom.siblings('.td_forced').children("input");
		tthis.prop('disabled',true);	
		if(parseString.isEmpty(version_num)&&parseString.isEmpty(version_desc)){
			AJAXMY.send('/version/update',{id:domTr.attr("data-id"),version_num:version_num,version_desc:version_desc,forced:domForced.is(':checked')?1:0},function(data){
				tthis.prop('disabled',false);
				if(data['result']){
					POPUPWINDOW.alert('编辑成功');
					tthis.next().remove();
					domForced.prop('disabled',true);
					DomVersion_desc.prop("disabled",true);
					disEditableCss(domTr,[DomVersion_num]);
					tthis.replaceWith(editBtnHtml);
				}
			});
		}else{
			tthis.prop('disabled',false);
			POPUPWINDOW.alert('不能为空');
		}
	});
	//编辑撤销操作
	table_body.on('click','.glyphicon-cancel',function(event){
		var tthis=$(this),
			dom=tthis.parent(),
			domTr=dom.parent();
		tthis.prop('disabled',true);	
		//根据id 获取详情，刷新dom
		AJAXMY.send('/version/edit',{id:domTr.attr("data-id")},function(data){
			tthis.prop('disabled',false);
			var dr=data['result'],
				DomVersion_num=dom.siblings('.td_version_num'),
				DomVersion_desc=dom.siblings('.td_version_desc').children("textarea"),
				domForced=dom.siblings('.td_forced').children("input");
			domForced.prop("disabled",true);
			DomVersion_desc.prop("disabled",true);		
			disEditableCss(domTr,[DomVersion_num]);
			DomVersion_num.text(dr['versionNum']);
			DomVersion_desc.val(dr['versionDesc']);
			dr['forced']?domForced.prop("checked",true):domForced.prop("checked",false);
			tthis.prev().remove();
			tthis.replaceWith(editBtnHtml);
		});
	});
	//删除操作
	table_body.on('click','.glyphicon-trash',function(event){

		var tthis=$(this),
			domTr=tthis.parent().parent();
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/version/delete',{id:domTr.attr("data-id")},function(d){
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
	table_body.on('change','.checkbox',function(event){
		var tthis=$(this),
			status=tthis.is(':checked')?1:0;
		tthis.prop('disabled',true);		
		AJAXMY.send('/version/status',{id:tthis.parent().parent().attr("data-id"),status:status},function(data){
			tthis.prop('disabled',false);
			if(data['result']){
				POPUPWINDOW.alert('编辑成功');
			}
		});
	});


	
});

