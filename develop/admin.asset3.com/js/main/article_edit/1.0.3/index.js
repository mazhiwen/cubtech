define(function(require) {
	new require('commonEdit');
	require('json2');
	var commonMain=require('commonMain'),
		paging = require('paging'),
		t=new(require('transformTime')),
		parseString=new(require('parseString')),
		a=require('dateTimePicker'),
		d=new a('#activedate','#filldate',function(d){}),
		id=parseString.getGet('id'),
		title=$("#title"),
		author=$("#author"),
		source=$('#source'),
		cover_img=$('#cover_img'),
		article_class=$("#article_class"),
		summary=$("#summary"),
		kw_out=$("#kw_out"),
		add_kw_btn=$("#add_kw_btn"),
		add_kw_input=$("#add_kw_input"),
		add_kw_outer=$("#add_kw_outer"),
		check_time=$("#check_time"),
		activedate=$("#activedate"),
		filldate=$("#filldate"),
		dele_cov_img=$("#dele_cov_img"),
		commit_button=$("#commit-button"),
		search_input=$("#search_input"),
		is_article_list_outer=$("#is_article_list_outer"),
		no_article_list_outer=$("#no_article_list_outer"),
		search_button=$("#search_button"),
		ImageId='';	
	d._init();
	var author_id='';
	function commitFunction(id){
		var keyWordArr=[],
			isId=parseString.isEmpty(id);
		commit_button.prop('disabled',true);
		$(".keyword").each(function(){
			keyWordArr.push($(this).text());
		});
		var create_time=parseString.MSToYMDHMS(new Date().getTime());
		if(check_time.is(':checked')){
			create_time=filldate.val();
		}
		var data={
			post_time:create_time,
			author_name:author.val(),
			title:title.val(),
			source:source.val(),
			summary:summary.val(),
			sys_image_id:ImageId,
			cover_pic:cover_img.attr("src"),
			content:ue.getContent(),
			category_code:article_class.val(),
			keyword:keyWordArr
		};
		if(isId){
			Object.assign(data,{id:id});
		}else{
			
			//if(author.val().length!=0&&$.trim(author.val())&&author_dl.children('[value='+author.val()+']').attr('data-id')!=undefined){
				//user_id=author_dl.children('[value='+author.val()+']').attr('data-id');
			//}
			//Object.assign(data,{user_id:author_id});
		}
		return data;
	}
	
	ue.ready(function(){
		if(id){
			AJAXMY.send('/article/edit',{id:id},function(data){
				var d=data['result'];
				author.val(d['authorName']);
				source.val(d['source']);
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
				var keyWordHtml='';
				$.each(d['keywords'],function(k,v){
					keyWordHtml+='<span class="keyword">'+v+'<span class="glyphicon"></span></span>';
				});
				add_kw_outer.before(keyWordHtml);
				filldate.val(parseString.MSToYMDHMS(d['postTime']));
				title.val(d['title']);
				summary.val(d['summary']);
				ue.setContent(d['content']);
				//d['status']?if_show.prop('checked',true):if_show.prop('checked',false);
				
			});
			$("#commit-button").click(function(){
				var d=commitFunction(id);
				var that=$(this);
				
				AJAXMY.send(
					'/article/update',
					d,
					function(d){
						if(d['result']) {
							alert('编辑成功');
							window.location.href='article_list.html';
						}
						that.prop('disabled',false);
					}
				);
			});

			//关联文章
			var isPaging=new paging("#is_paging",MAXPAGING,function(currentPage){
				AJAXMY.send('/article/related_article_list',
					{article_id:id,page:currentPage,size:PERPAGINGCOUNT
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
				AJAXMY.send('/article/delete_related_article',{related_id:$(this).attr("data-id"),article_id:id},function(d){
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
				AJAXMY.send('/article/save_related_article',{related_id:$(this).attr("data-id"),article_id:id},function(d){
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
			AJAXMY.send('/category/select_list',null,function(d){
				var s='<option value=" "></option>';
				$.each(d['result'],function(k,v){
					s+='<option value="'+k+'">'+v+'</option>';
				});
				article_class.append(s);
				$("#commit-button").click(function(){
					if(article_class.val()!=' '){
						//$(this).prop('disabled',true);
						var d=commitFunction('');
						var that=$(this);
						AJAXMY.send(
							'/article/save',
							d,
							function(d){
								if(d['result']) {
									alert('添加成功');
									window.location.href='article_list.html';
								}
								that.prop('disabled',false);
							}
						);
					}else{
						POPUPWINDOW.alert('需要选择分类',function(){});
					}					
				});	
			});
		}
	});
	AJAXMY.upLoad('cover_image_input',function(responseUrl,sysImageId){
		cover_img.attr("src",responseUrl);
		ImageId=sysImageId;
	},1);
	//关键字删除事件
	kw_out.on('click','.keyword>.glyphicon',function(){
		$(this).parent().remove();
	});
	//关键字添加

	add_kw_btn.click(function(){
		if(parseString.isEmpty(add_kw_input.val())){
			
			add_kw_outer.before('<span class="keyword">'+parseString.trimSpaces(add_kw_input.val())+'<span class="glyphicon"></span></span>');
		}		
	});
	/*选择时间*/
	check_time.click(function(){
		$(this).is(':checked')?activedate.prop("disabled",false):activedate.prop("disabled",true);
	});
	dele_cov_img.click(function(){
		$(this).prop('disabled',true);
		var that=$(this);
		AJAXMY.send(
			'/article/delete_pic',
			{sys_image_id:ImageId},
			function(d){
				if(d['result']) {
					ImageId='';
					cover_img.attr("src",'');
				}
				that.prop('disabled',false);
			}
		);
	});






	

});

