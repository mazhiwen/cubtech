
define(function(require) {
	new require('commonEdit');
	var commonMain=require('commonMain'),
		getGet=require('getGet'),
		id=getGet('id'),
		title=$("#title"),
		author=$("#author"),
		cover_img=$('#cover_img'),
		if_show=$("#if_show"),
		article_class=$("#article_class"),
		summary=$("#summary"),
		author_dl=$("#author_dl"),
		ImageId='';	
	ue.ready(function(){
		if(id){
			AJAXMY.send('/article/edit',{id:id},function(data){
				var d=data['result'];
				title.val(d['title']);
				summary.val(d['summary']);
				ue.setContent(d['content']);
				author.prop("disabled",true);
				author.val(d['nickName']);
				ImageId=d['sysImageId'];
				cover_img.attr('src',d['coverPic']);
				var s='';
				$.each(data['categoryList'],function(k,v){
					if(k==d['categoryCode'])	
					s+='<option value="'+k+'" selected>'+v+'</option>';
					else
					s+='<option value="'+k+'">'+v+'</option>';
				});
				article_class.append(s);
				d['status']?if_show.prop('checked',true):if_show.prop('checked',false);
			});
			$("#commit-button").click(function(){
				$(this).prop('disabled',true);
				var that=$(this);
				AJAXMY.send(
					'/article/update',
					{
						id:id,
						title:title.val(),
						summary:summary.val(),
						sys_image_id:ImageId,
						cover_pic:cover_img.attr("src"),
						content:ue.getContent(),
						category_code:article_class.val()
					},
					function(d){
						if(d['result']) {
							alert('编辑成功');
							window.location.href='article_list.html';
						}
						else alert('编辑失败');
						that.prop('disabled',false);
					}
				);
			});
		}else{
			AJAXMY.send('/category/select_list',null,function(d){
				var s='<option value=" "></option>';
				$.each(d['result'],function(k,v){
					s+='<option value="'+k+'">'+v+'</option>';
				});
				article_class.append(s);
				$("#commit-button").click(function(){
					if(article_class.val()!=' '){
						$(this).prop('disabled',true);
						var that=$(this);
						var user_id='';
						if(author.val().length!=0&&$.trim(author.val())&&author_dl.children('[value='+author.val()+']').attr('data-id')!=undefined){
							user_id=author_dl.children('[value='+author.val()+']').attr('data-id');
						}
						AJAXMY.send(
							'/article/save',
							{
								title:title.val(),
								summary:summary.val(),
								sys_image_id:ImageId,
								cover_pic:cover_img.attr("src"),
								user_id:user_id,
								content:ue.getContent(),
								category_code:article_class.val()
							},
							function(d){
								if(d['result']) {
									alert('添加成功');
									window.location.href='article_list.html';
								}
								else alert('添加失败');
								that.prop('disabled',false);
							}
						);
					}else{
						POPUPWINDOW.alert('需要选择分类',function(){});
					}				
					
				});	
			});
			
			author.on('input',function(){
				if($(this).val().length!=0&&$.trim($(this).val())){
					AJAXMY.send('/user/select_list',{nick_name:$(this).val()},function(d){
						author_dl.empty();
						d=d['result'];
						var s='';
						$.each(d,function(k,v){
							s+='<option value="'+v['nickName']+'" data-id="'+v['id']+'">';
						});
						author_dl.append(s);
					});
				}					
			});
		}
	});
	AJAXMY.upLoad('cover_image_input',function(responseUrl,sysImageId){
		cover_img.attr("src",responseUrl);
		ImageId=sysImageId;
	},1);
	

});

