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
		subjectId,
		coverImgUrl='',
		ImageId=null;
	subjectId=getGet('id');
	if(subjectId){
		ajaxMy('/subject/edit',{subject_id:subjectId},function(d){
			var o=d['result'];
			subjectNameDom.val(o['name']);
			subjectDescriptionDom.val(o['description']);
			coverImgUrl=o['bgPic'];
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
					bgpic:coverImgUrl,
					priority:subjectListSn.val()
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
	}else{
		$("#confirm-button").click(function(){
			$(this).prop("disabled",true);
			var that=$(this);
			ajaxMy(
				'/subject/save',
				{
				name:subjectNameDom.val(),
				desc:subjectDescriptionDom.val(),
				bgpic:coverImgUrl,
				priority:subjectListSn.val()
				},
				function(d){
					if(d['result']){
						alert('添加成功');
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
	//获取专题包含文章列表 
	//is_article_list_outer.empty();
	//is_article_list_outer.append('');

	//删除关联文章 监听事件
	is_article_list_outer.on('click','div>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		new ajaxMy('/ /status',{id:$(this).parent().attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().remove();
			}else{
				alert('删除失败');
			}
			that.prop('disabled',false);
		});
	});



	search_button.click(function(){

		//发送  search_input.val
		//获取结果
		/*
		function request(getPaging){
			new ajaxMy('/subject/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
				subject_list_tbody.empty();
				var s;
				$.each(d['result'],function(key,value){	
					s+='<tr data-id="'+value['id']+'"><td>'+value['id']+'</td><td>'+value['name']+'</td><td>'+value['articleNum']+'</td><td>'+transformTime.MSTo(value['createTime'])+'</td><td>/</td><td contenteditable="true">'+value['priority']+'</td>';
					if(value['name']){
						s+='<td><input type="checkbox"></td>';
					}else{
						s+='<td><input type="checkbox"></td>';
					}
					s+='<td><a href="subject_edit.html?id='+value['id']+'"><button class="s">编辑</button></a> <button class="s">删除</button></td></tr>'; 
				});
				subject_list_tbody.append(s);
				myPaging=new paging("#search_paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
				});
				myPaging._init();
			});
		}
		request(1);
		*/
	});


	//添加关联文章监听事件
	no_article_list_outer.on('click','div>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		//new ajaxMy('/ /status',{id:$(this).parent().attr("data-id")},function(d){
			//if(d['result']){
				alert('添加成功');
				//that.parent().remove();
				console.log(that.parent());
				that.text('删除');
				is_article_list_outer.append(that.parent());
			//}else{
			//	alert('添加失败');
			//}
			that.prop('disabled',false);
		//});
	});

	
});

