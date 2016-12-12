define(function(require) {
	
	var	
		getGet=require('getGet'),
		commonMain=require('commonMain'),
		paging = require('paging'),
		subjectNameDom=$("#subject_name"),
		subjectDescriptionDom=$("#subject_description"),
		coverImgDom=$("#cover_img"),
		subjectListSn=$("#subject_list_sn"),
		is_article_list_outer=$("#is_article_list_outer"),
		no_article_list_outer=$("#no_article_list_outer"),
		search_input=$("#search_input"),
		search_button=$("#search_button"),
		add_recent=$("#add_recent"),
		subjectId=getGet('id'),
		ImageId=null;	
	if(subjectId){
		AJAXMY.send('/subject/edit',{subject_id:subjectId},function(d){
			var o=d['result'];
			subjectNameDom.val(o['name']);
			subjectDescriptionDom.val(o['description']);
			coverImgDom.attr("src",o['bgPic']);
			subjectListSn.val(o['priority']);
			ImageId=o['sysImageId'];
		});
		$("#confirm-button").click(function(){
			$(this).prop("disabled",true);
			var that=$(this);
			AJAXMY.send(
				'/subject/update',
				{
					subject_id:subjectId,
					name:subjectNameDom.val(),
					desc:subjectDescriptionDom.val(),
					bgpic:coverImgDom.attr("src"),
					priority:subjectListSn.val(),
					sys_image_id:ImageId
				},
				function(d){
					if(d['result']){
						alert('修改成功');
					}else{
						alert('修改失败');
					}
					that.prop("disabled",false);
				}
			);
		});

		var isPaging=new paging("#is_paging",MAXPAGING,function(currentPage){
			AJAXMY.send('/subject/subject_article_list',
				{subject_id:subjectId,page:currentPage,size:PERPAGINGCOUNT
				},function(d){
					dr=d['result'];
					var s='';
					$.each(dr,function(k,v){
						s+='<div><span>'+v['title']+'</span><button class="s"  data-id="'+v['id']+'">删除</button></div>';
					});
					is_article_list_outer.append(s);
					isPaging.refreshDom(d['pages']);
			});
		});	


		is_article_list_outer.on('click','div>button:nth-child(2)',function(event){
			$(this).prop('disabled',true);
			that=$(this);
			AJAXMY.send('/subject/delete_subject_article',{article_id:$(this).attr("data-id"),subject_id:subjectId},function(d){
					if(d['result']){
						alert('删除成功');
						that.parent().remove();
					}else{
					}
					that.prop('disabled',false);
				});
		});

		var myPaging=new paging("#search_paging",MAXPAGING,function(currentPage){
			AJAXMY.send('/article/search_list',{title:search_input.val(),page:currentPage,size:PERPAGINGCOUNT},function(d){
				no_article_list_outer.empty();
				var s='';
				$.each(d['result'],function(key,v){	
					s+='<div><span>'+v['title']+'</span><button class="s" data-id="'+v['id']+'">添加</button></div>';
				});
				no_article_list_outer.append(s);
				myPaging.refreshDom(d['pages']);
			});
		});
		search_button.click(function(){
			myPaging.executePageFn(1);
		});
		
		no_article_list_outer.on('click','div>button:nth-child(2)',function(event){
			$(this).prop('disabled',true);
			that=$(this);
			AJAXMY.send('/subject/save_subject_article',{article_id:$(this).attr("data-id"),subject_id:subjectId},function(d){
				if(d['result']){
					alert('添加成功');
					that.text('删除');
					is_article_list_outer.append(that.parent());
				}else{
					alert('添加失败');
				}
				that.prop('disabled',false);
			});
		});		
	}else{
		$("#confirm-button").click(function(){
			$(this).prop("disabled",true);
			var that=$(this);
			AJAXMY.send(
				'/subject/save',
				{
				name:subjectNameDom.val(),
				desc:subjectDescriptionDom.val(),
				bgpic:coverImgDom.attr("src"),
				priority:subjectListSn.val(),
				sys_image_id:ImageId
				},
				function(d){
					if(d['result']){
						alert('添加成功');
						window.location.href="subject_edit.html?id="+d['id'];
					}else{
						alert('添加失败');
					}
					that.prop("disabled",false);
				}
			);
		});
	}
	AJAXMY.upLoad('cover_image_input',function(responseUrl,sysImageId){
		console.log(responseUrl);
		console.log(sysImageId);
		coverImgDom.attr("src",responseUrl);
		ImageId=sysImageId;
	},2);
	
});

