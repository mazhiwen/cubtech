define(function(require) {
	new require('commonEdit');
	require('json2');
	var commonMain=require('commonMain'),
		t=new(require('transformTime')),
		parseString=new(require('parseString')),
		a=require('dateTimePicker'),
		d=new a('#activedate','#filldate',function(d){}),
		c=new a('#activedate_c','#filldate_c',function(d){}),
		id=parseString.getGet('id'),
		title=$("#title"),
		author=$("#author"),
		cover_img=$('#cover_img'),
		if_show=$("#if_show"),
		article_class=$("#article_class"),
		summary=$("#summary"),
		author_dl=$("#author_dl"),
		kw_out=$("#kw_out"),
		add_kw_btn=$("#add_kw_btn"),
		add_kw_input=$("#add_kw_input"),
		add_kw_outer=$("#add_kw_outer"),
		keyword_label=$("#keyword_label"),
		check_time=$("#check_time"),
		activedate=$("#activedate"),
		comment_user_s=$("#comment_user_s"),
		comment_user_o=$("#comment_user_o"),
		comment_user_b=$("#comment_user_b"),
		f=$("#filldate"),
		dele_cov_img=$("#dele_cov_img"),
		add_file_btn=$("#add_file_btn"),
		commit_button=$("#commit-button"),
		ImageId='';	
	d._init();
	c._init();

	function commitFunction(id){
		var keyWordArr=[],
			attas=[],
			isId=parseString.isEmpty(id);
		commit_button.prop('disabled',true);
		$(".keyword").each(function(){
			keyWordArr.push($(this).text());
		});
		if(isId){
			$(".add_file_box").each(function(){
				var url=$(this).find(".add_file_box_link").val(),
					name=$(this).find(".add_file_box_file").val();
				if(parseString.isEmpty(url)&&parseString.isEmpty(name)){
					attas.push({id:$(this).attr("data-id"),url:url,name:name});
				}else{
					//alert('错误');
					//return;
				}
			});
		}else{
			$(".add_file_box").each(function(){
				var url=$(this).find(".add_file_box_link").val(),
					name=$(this).find(".add_file_box_file").val();
				if(parseString.isEmpty(url)&&parseString.isEmpty(name)){
					attas.push({url:url,name:name});
				}else{
				}
			});
		}
		attas=JSON.stringify(attas);
		var data={
			title:title.val(),
			summary:summary.val(),
			sys_image_id:ImageId,
			cover_pic:cover_img.attr("src"),
			content:ue.getContent(),
			category_code:article_class.val(),
			keyword:keyWordArr,
			attas:attas
		};
		if(isId){
			Object.assign(data,{id:id});
		}else{
			var user_id='';
			if(author.val().length!=0&&$.trim(author.val())&&author_dl.children('[value='+author.val()+']').attr('data-id')!=undefined){
				user_id=author_dl.children('[value='+author.val()+']').attr('data-id');
			}
			Object.assign(data,{user_id:user_id});
		}
		return data;
	}
	
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
				f.val(t.MSToYMDHMS(d['createTime']));
				var keyWordHtml='';
				$.each(d['keywords'],function(k,v){
					keyWordHtml+='<span class="keyword">'+v+'<span class="glyphicon"></span></span>';
				});
				add_kw_outer.before(keyWordHtml);
				var s='';
				$.each(data['categoryList'],function(k,v){
					if(k==d['categoryCode'])	
					s+='<option value="'+k+'" selected>'+v+'</option>';
					else
					s+='<option value="'+k+'">'+v+'</option>';
				});
				article_class.append(s);
				d['status']?if_show.prop('checked',true):if_show.prop('checked',false);
				
				$.each(JSON.parse(d['attas'])['result'],function(k,v){
					add_file_btn.before('<div class="add_file_box" data-id="'+v['id']+'"><div><button class="s glyphicon normal glyphicon-minus del_atta_btn">删除</button></div><div class="form-input"><span>链接</span><input type="text" class="add_file_box_link" value="'+v['url']+'" disabled></div><div class="form-input"><span>文件名</span><input type="text" class="add_file_box_file" value="'+v['name']+'" disabled></div></div>');
				});
			});
			$("#commit-button").click(function(){
				var d=commitFunction(id);
				var that=$(this);
				if(check_time.is(':checked')){
					Object.assign(d,{create_time:f.val()});
				}
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
						var d=commitFunction(false);
						var that=$(this);
						if(check_time.is(':checked')){
							Object.assign(d,{create_time:f.val()});
						}	
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
	/*
	关键字删除事件
	*/
	kw_out.on('click','.keyword>.glyphicon',function(){
		$(this).parent().remove();
	});
	/*
	关键字添加
	*/
	add_kw_btn.click(function(){
		add_kw_outer.before('<span class="keyword">'+add_kw_input.val()+'<span class="glyphicon"></span></span>');
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
	/*添加附件事件*/
	add_file_btn.click(function(){
		$(this).before('<div class="add_file_box"><div><button class="s glyphicon normal glyphicon-minus del_atta_btn">删除</button></div><div class="form-input"><span>链接</span><input type="text" class="add_file_box_link"></div><div class="form-input"><span>文件名</span><input type="text" class="add_file_box_file"></div></div>');
	});

	/*删除附件*/
	$("#add_file_outer").on('click','.del_atta_btn',function(e){
		$(this).parent().parent().remove();
	});

	/*选择用户方式*/
	$('input[name="way_comment"]').change(function(){
		if($(this).val()==1){
			comment_user_o.prop("disabled",false);
			comment_user_s.prop("disabled",true);
			comment_user_b.prop("disabled",true);
		}else{
			comment_user_o.prop("disabled",true);
			comment_user_s.prop("disabled",false);
			comment_user_b.prop("disabled",false);
		}
	});
});

