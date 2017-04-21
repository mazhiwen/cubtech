define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		table_body=$("#table_body"),
		platform=$(".platform"),
		add_btn=$("#add_btn"),
		version_select=$("#version_select");


		
	var articleListPaging=new paging("#paging",MAXPAGING,function(currentPage){
		request_list(currentPage,'ios');
	});
	function request_list(getPaging,otherData){
		var data={page:getPaging,size:PERPAGINGCOUNT};
		
			data['platform']=otherData;
		
		AJAXMY.send('/version/list',data,function(d){
			var s;
			$.each(d['result'],function(k,v){
				var checkStatus={
					'true':'checked',
					'false':''
				};

				var isenable='';
				if(v['status']==1){
					isenable='checked';
				}
				var androidIos=['/','/','/'];
				if(otherData=='android'){
					androidIos=[v['versionStore'],v['versionCode'],v['versionUrl']];
				}
				s+='<tr data-id="'+v['id']+'"><td>'+v['id']+'</td><td>'+androidIos[0]+'</td><td>'+v['versionDesc']+'</td><td>'+v['versionNum']+'</td><td><input type="checkbox" class="isforced" '+checkStatus[v['forced']]+'></td><td>'+androidIos[1]+'</td><td>'+androidIos[2]+'</td><td><input class="isenable" type="checkbox" '+isenable+'></td><td><div class="btn_group"><a href="version_edit.html?id='+v['id']+'" class="button btn_xs">编辑</a><button class="button btn_xs deleteversion">删除</button></div></td></tr>';
			});
			table_body.html(s);
			articleListPaging.refreshDom(d['pages']);
		});
	}


	platform.change(function(){

		var platformV=$(this).val();
		articleListPaging.pageFn=function(currentPage){
			request_list(currentPage,platformV);
		};
		articleListPaging.executePageFn(1);
	});

	



	
	
	//删除操作
	table_body.on('click','.deleteversion',function(event){

		var tthis=$(this),
			domTr=tthis.parent().parent().parent();
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
	



	table_body.on('click','.isenable',function(event){
		$(this).prop('disabled',true);
		var that=$(this);
		AJAXMY.send('/version/status',{id:$(this).parent().parent().attr("data-id"),status:$(this).prop('checked')?1:0},function(d){
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

	table_body.on('click','.isforced',function(event){
		$(this).prop('disabled',true);
		var that=$(this);
		AJAXMY.send('/version/forced',{id:$(this).parent().parent().attr("data-id"),forced:$(this).prop('checked')},function(d){
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




	
});

