define(function(require) {
	$=require('jquery');
	var	ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		commonMain=require('commonMain'),
		uploadFile=require('uploadFile'),
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
		ajaxMy('/subject/edit',{subject_id:subjectId},function(d){
			var o=d['result'];
			subjectNameDom.val(o['name']);
			subjectDescriptionDom.val(o['description']);
			coverImgDom.attr("src",o['bgPic']);
			subjectListSn.val(o['priority']);
		});
		$("#confirm-button").click(function(){
			$(this).prop("disabled",true);
			var that=$(this);
			ajaxMy(
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
		function requestIs(getPaging){
			new ajaxMy('/subject/subject_article_list',
				{subject_id:subjectId,page:getPaging,size:PERPAGINGCOUNT
				},function(d){
					dr=d['result'];
					var s='';
					$.each(dr,function(k,v){
						s+='<div><span>'+v['title']+'</span><button class="s"  data-id="'+v['id']+'">删除</button></div>';
					});
					is_article_list_outer.append(s);
					var myPaging=new paging("#is_paging",d['pages'],MAXPAGING,getPaging,function(){
						requestIs(this.clickPaging);}
					);
					myPaging._init();
					}
				);
		}
		requestIs(1);
		is_article_list_outer.on('click','div>button:nth-child(2)',function(event){
			$(this).prop('disabled',true);
			that=$(this);
			new ajaxMy('/subject/delete_subject_article',{article_id:$(this).attr("data-id"),subject_id:subjectId},function(d){
					if(d['result']){
						alert('删除成功');
						that.parent().remove();
					}else{
					}
					that.prop('disabled',false);
				});
		});
		function requestAll(getPaging){
			new ajaxMy('/article/search_list',{title:search_input.val(),page:getPaging,size:PERPAGINGCOUNT},function(d){
				no_article_list_outer.empty();
				var s='';
				$.each(d['result'],function(key,v){	
					s+='<div><span>'+v['title']+'</span><button class="s" data-id="'+v['id']+'">添加</button></div>';
				});
				no_article_list_outer.append(s);
				var myPaging=new paging("#search_paging",d['pages'],MAXPAGING,getPaging,function(){requestAll(this.clickPaging);
				});
				myPaging._init();
			});
		}
		search_button.click(function(){
			requestAll(1);
		});
		no_article_list_outer.on('click','div>button:nth-child(2)',function(event){
			$(this).prop('disabled',true);
			that=$(this);
			new ajaxMy('/subject/save_subject_article',{article_id:$(this).attr("data-id"),subject_id:subjectId},function(d){
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
			ajaxMy(
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
	uploadFile('cover_image_input',1,function(responseUrl,sysImageId){
		coverImgDom.attr("src",responseUrl);
		ImageId=sysImageId;
	});
	
});

