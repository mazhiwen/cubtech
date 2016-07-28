seajs.use("../js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		uploadFile=require('uploadFile'),
		id=getGet('id'),
		title=$("#title"),
		author=$("#author"),
		cover_img=$('#cover_img'),
		if_show=$("#if_show"),
		other_outer=$("#other_outer"),
		article_class=$("#article_class"),
		summary=$("#summary"),
		edit_article_outer=$("#edit_article_outer"),
		ImageId=null;	
	ue.ready(function(){
		if(id){
			new ajaxMy('/article/edit',{id:id},function(data){
				var d=data['result'];
				title.val(d['title']);
				summary.val(d['summary']);
				ue.setContent(d['content']);
				author.val(d['nickName']);
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
				new ajaxMy(
					'/article/update',
					{
						id:id,
						title:title.val(),
						summary:summary.val(),
						sys_image_id:ImageId,
						cover_pic:cover_img.attr("src"),
						nick_name:author.val(),
						content:ue.getContent(),
						category_code:article_class.val()
					},
					function(d){
						if(d['result']) alert('编辑成功');
						else alert('编辑失败');
						that.prop('disabled',false);
					}
				);
			});
		}else{
			new ajaxMy('/category/select_list',null,function(d){
				var s='';
				$.each(d['result'],function(k,v){
					s+='<option value="'+k+'">'+v+'</option>';
				});
				article_class.append(s);
				$("#commit-button").click(function(){
					$(this).prop('disabled',true);
					var that=$(this);
					new ajaxMy(
						'/article/save',
						{
							title:title.val(),
							summary:summary.val(),
							sys_image_id:ImageId,
							cover_pic:cover_img.attr("src"),
							nick_name:author.val(),
							content:ue.getContent(),
							category_code:article_class.val()
						},
						function(d){
							if(d['result']) alert('添加成功');
							else alert('添加失败');
							that.prop('disabled',false);
						}
					);
				});	
			});
		}
	});
	uploadFile('cover_image_input',1,function(responseUrl,sysImageId){
		cover_img.attr("src",responseUrl);
		ImageId=sysImageId;
	});
	other_outer.hide();
	$("#navigation-article").click(function(){
		edit_article_outer.show();
		other_outer.hide();
	});
	$("#navigation-other").click(function(){
		edit_article_outer.hide();
		other_outer.show();
	});

});

