seajs.use("../js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {
	var commonMain=require('commonMain'),
		paging = require('paging'),
		getGet=require('getGet'),
		parseString=new(require('parseString')),
		transformTime=new(require('transformTime')),
		commit_button=$("#commit-button"),
		title=$("#title"),
		summary=$("#summary"),
		original_url=$("#original_url"),
		table_body=$("#table_body"),
		id=getGet('id');
	ue.ready(function(){
		if(id){
			AJAXMY.send('/info/edit',{id:id},function(d){
				var d=d['result'];
				title.val(d['title']);
				summary.val(d['summary']);
				original_url.val(d['originalUrl']);
				ue.setContent(d['content']);
			});
			commit_button.click(function(){
				var original_url_v=original_url.val();
				if(parseString.isUrl(original_url_v)||!parseString.isEmpty(original_url_v)){
					$(this).prop('disabled',true);
					var that=$(this);
					AJAXMY.send(
						'/info/update_news',
						{
							id:id,
							title:title.val(),
							summary:summary.val(),
							content:ue.getContent(),
							original_url:original_url_v
						},
						function(d){
							if(d['result']) alert('编辑成功');
							else alert('编辑失败');
							that.prop('disabled',false);
						}
					);		
				}else{
					POPUPWINDOW.alert('链接输入错误，需要http 或者 https前缀');
				}
				
			});
		}else{
			commit_button.click(function(){
				$(this).prop('disabled',true);
				var that=$(this);
				var original_url_v=original_url.val();
				if(parseString.isUrl(original_url_v)||!parseString.isEmpty(original_url_v)){
					AJAXMY.send(
						'/info/save_news',
						{
							title:title.val(),
							summary:summary.val(),
							content:ue.getContent(),
							original_url:original_url.val()
						},
						function(d){
							if(d['result']) alert('添加成功');
							else alert('添加失败');
							that.prop('disabled',false);
						}
					);
				}else{
					POPUPWINDOW.alert('链接输入错误，需要http 或者 https前缀');
					that.prop('disabled',false);
				}
				
			});	
			
		}
	});	


});

