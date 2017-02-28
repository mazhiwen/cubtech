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

		//专题编辑提交
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
						POPUPWINDOW.alert('修改成功');
					}else{
						POPUPWINDOW.alert('修改失败');
					}
					that.prop("disabled",false);
				}
			);
		});

		//已关联文章列表获取
		AJAXMY.send('/subject/subject_article_list',
			{subject_id:subjectId
				//,page:currentPage,size:PERPAGINGCOUNT
			},function(d){
				dr=d['result'];
				var s='';
				$.each(dr,function(k,v){
					s+='<div draggable="true" class="is_subject_article_box" data-id="'+v['id']+'"><span>'+v['title']+'</span><button class="s">删除</button></div>';
				});
				is_article_list_outer.append(s);
				//isPaging.refreshDom(d['pages']);
		});
		


		//拖动事件
		var activeDragDom=null;
		is_article_list_outer.on('dragstart','div',function(event){
			activeDragDom=$(event.target);
			activeDragDom.css("opacity","0.3");
		});
		is_article_list_outer.on('dragenter','div',function(event){
			event.preventDefault();
			$(event.target).parents(".is_subject_article_box").css("background-color","rgb(153, 153, 153)");
		});
		is_article_list_outer.on('dragover','div',function(event){
			event.preventDefault();
			$(event.target).parents(".is_subject_article_box").siblings().css("background-color","transparent");
			$(event.target).parents(".is_subject_article_box").css("background-color","rgb(153, 153, 153)");
			$(event.target).parents(".is_subject_article_box").next().css("background-color","rgb(204, 204, 204)");
		});
		is_article_list_outer.on('dragleave','div',function(event){
			$(event.target).parents(".is_subject_article_box").css("background-color","transparent");
		});
		is_article_list_outer.on('drop','div',function(event){
			event.preventDefault();
			//event.stopPropagation();
			$(event.target).parents(".is_subject_article_box").css("background-color","transparent");
			var dromDom=null;
			if($(event.target).hasClass(".is_subject_article_box")){
				dromDom=$(event.target);
			}else{
				dromDom=$(event.target).parents(".is_subject_article_box");
			}
			dromDom.after(activeDragDom);
		});
		is_article_list_outer.on('dragend','div',function(event){
			activeDragDom.css("opacity","1");
		});


		//提交已关联文章排序
		$(".commit_article_priority").click(function(e){
			var articles=[];
			$(".is_subject_article_box").each(function(key,value){
				articles.push({'article_id':$(this).attr("data-id"),'priority':key+1});
			});
			AJAXMY.send('/subject/update_article_priority',{
				subject_id:subjectId,
				articles:JSON.stringify(articles)
			},function(data){
				if(data['result']){
					POPUPWINDOW.alert('提交成功');
				}else{
					POPUPWINDOW.alert('提交失败');
				}
			});
		});


		//移除关联文章
		is_article_list_outer.on('click','div>button:nth-child(2)',function(event){
			$(this).prop('disabled',true);
			var that=$(this);
			AJAXMY.send('/subject/delete_subject_article',{article_id:$(this).parent().attr("data-id"),subject_id:subjectId},function(d){
				if(d['result']){
					POPUPWINDOW.alert('删除成功');
					that.parent().remove();
				}else{
				}
				
			},function(){
				that.prop('disabled',false);
			});
		});

		//未关联文章分页
		var myPaging=new paging("#search_paging",MAXPAGING,function(currentPage){
			AJAXMY.send('/article/search_list',{title:search_input.val(),page:currentPage,size:PERPAGINGCOUNT},function(d){
				no_article_list_outer.empty();
				var s='';
				$.each(d['result'],function(key,v){	
					s+='<div data-id="'+v['id']+'"><span>'+v['title']+'</span><button class="s">添加</button></div>';
				});
				no_article_list_outer.append(s);
				myPaging.refreshDom(d['pages']);
			});
		});
		//搜索未关联文章
		search_button.click(function(){
			myPaging.executePageFn(1);
		});
		
		//未关联文章  关联操作
		no_article_list_outer.on('click','div>button:nth-child(2)',function(event){
			var that=$(this);
			$(this).prop('disabled',true);
			AJAXMY.send('/subject/save_subject_article',{article_id:$(this).parent().attr("data-id"),subject_id:subjectId},function(d){
				if(d['result']){
					POPUPWINDOW.alert('添加成功');
					that.text('删除');
					that.parent().addClass("is_subject_article_box");
					that.parent().prop("draggable","true");
					is_article_list_outer.append(that.parent());
				}else{
					POPUPWINDOW.alert('添加失败');
				}
				
			},function(){
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
						POPUPWINDOW.alert('添加成功');
						window.location.href="subject_edit.html?id="+d['id'];
					}else{
						POPUPWINDOW.alert('添加失败');
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

