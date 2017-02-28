define(function(require) {
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		
		table_body=$(".table_body"),
		navigation_crumb=$(".navigation-crumb"),
		ifFinishEdit=false;

	
		

	var table=new MYUI.table('组件列表',['页面编码','组件编码','组件名字','是否显示','布局','是否多重组件','操作']);
	navigation_crumb.after(table.initHtml);

	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/component/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			//table_body.empty();
			var s='',is={
				true:'是',
				false:'否'
			},isChecked={
				true:'checked',
				false:''
			};
			$.each(d['result'],function(k,v){	
				s+=table.trHtml('data-id="'+v['id']+'"',[
					v['pageCode'],
					v['componentCode'],
					v['componentName'],
					{
						'text':[{'type':'checkbox','attributes':'class="is_show" '+isChecked[v['display']],'text':''}]
					},
					v['layout'],
					is[!v['single']],
					{
						'text':[
							{'type':'a','attributes':'href="appcomponents_edit.html?id='+v['id']+'"','text':'编辑'},
							{'type':'button','attributes':'class="text_button delete"','text':'删除'}				
						]
					}
				]);
			});
			table.tableBody().html(s);
			myPaging.refreshDom(d['pages']);
		});
	});	



	table.tableBody().on('click','.delete',function(event){
		var tthis=$(this);
		tthis.prop('disabled',true);
		POPUPWINDOW.confirm("一匡后台","确认执行删除操作吗？再想想？",function(){
			AJAXMY.send('/component/delete',{id:tthis.parent().parent().attr("data-id")},function(d){
				if(d['result']){
					POPUPWINDOW.alert('删除成功');
					tthis.parent().parent().remove();
				}else{
					POPUPWINDOW.alert('删除失败');	
				}
			},function(){
				tthis.prop('disabled',false);
			});
		},function(){
			tthis.prop('disabled',false);
		});
	});

	

	//选中事件
	table.tableBody().on('change','.is_show',function(event){
		var tthis=$(this),
			display=tthis.prop('checked');
		tthis.prop('disabled',true);		
		AJAXMY.send('/component/display',{id:tthis.parent().parent().attr("data-id"),display:display},function(data){
			tthis.prop('disabled',false);
			if(data['result']){
				POPUPWINDOW.alert('编辑成功');
			}
		});
	});





});

