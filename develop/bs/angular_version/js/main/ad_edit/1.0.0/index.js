define(function(require) {
	var	commonMain=require('commonMain'),
		getGet=require('getGet'),
		parseString=new(require('parseString')),
		paging = require('paging'),
		name=$("#name"),
		cover_img=$("#cover_img"),
		sn=$("#sn"),
		url=$("#url"),
		target_id=$("#target_id"),
		type=$("#type"),
		commit_button=$("#commit_button"),
		targetid_outer=$("#targetid_outer"),
		url_span=$("#url_span"),
		ad_pos_type=$("#ad_pos_type"),
		ad_pos_index=$("#ad_pos_index"),
		ad_type=$("#ad_type"),
		recommend_list=$('#recommend_list'),
		recommend_list_wrap=$('#recommend_list_wrap'),
		type_img_wrap=$('#type_img_wrap'),
		search_btn=$('#search_btn'),
		search_input=$('#search_input'),
		search_result_wrap=$('#search_result_wrap'),
		id=getGet('id');
	if(id){
		AJAXMY.send('/adslots/edit',{id:id},function(d){
			var da=d['result']['adSlots'],
				ad_typeV=da['type'];
			name.val(da['name']);
			ad_type.val(ad_typeV);
			switch(ad_typeV){
				case 1:
				var s='';
				$.each(da['celebrityObj'],function(k,v){	
					s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['vita']+'</td><td><button class="glyphicon-up glyphicon onlyicon" title="上移"></button><button class="glyphicon-down glyphicon onlyicon" title="下移"></button><button  class="glyphicon-trash glyphicon onlyicon" title="删除"></button></td></tr>';
				});
				recommend_list.append(s);
				break;
				case 2:
				var s='';
				$.each(da['articleObj'],function(k,v){
					s+='<tr><td>'+v['id']+'</td><td>'+v['title']+'</td><td><button class="glyphicon-up glyphicon onlyicon" title="上移"></button><button class="glyphicon-down glyphicon onlyicon" title="下移"></button><button  class="glyphicon-trash glyphicon onlyicon" title="删除"></button></td></tr>';
				});
				recommend_list.append(s);
				break;
				case 3:
				var s='';
				$.each(da['subjectObj'],function(k,v){
					s+='<tr><td>'+v['id']+'</td><td>'+v['name']+'</td><td><button class="glyphicon-up glyphicon onlyicon" title="上移"></button><button class="glyphicon-down glyphicon onlyicon" title="下移"></button><button  class="glyphicon-trash glyphicon onlyicon" title="删除"></button></td></tr>';
				});
				recommend_list.append(s);
				break;
				case 4:
				cover_img.attr('src',da['picUrl']);
				type.val(da['targetType']);
				url.val(da['target']);
				break;
			};
			adTypeShow(ad_typeV);
			var s='';
			$.each(d['result']['categoryList'],function(k,v){
				var se='';
				if(k==da['categoryCode'])se='selected';
				s+='<option value="'+k+'" '+se+'>'+v+'</option>';
			});
			da['categoryCode']=='all'?ad_pos_index.val(da['indexCategory']):ad_pos_index.val(da['indexArticle']);
			ad_pos_type.append(s);
			if (type.val()==3){
				url_span.text('链接:');
			}else{
				url_span.text('目标ID:');
			}
		});	
	}else{
		AJAXMY.send('/adslots/category_list',null,function(d){
			var s='<option value=" "></option>';
			$.each(d['result'],function(k,v){
				s+='<option value="'+k+'">'+v+'</option>';
			});
			ad_pos_type.append(s);
		});
	}
	AJAXMY.upLoadAdPic('cover_image_input',function(responseUrl){
		cover_img.attr("src",responseUrl);
	});
	type.change(function(){
		if (type.val()==3){
			url_span.text('链接:');
		}else{
			url_span.text('目标ID:');
		}
	});
	ad_type.change(function(){
		recommend_list.empty();
		var v=ad_type.val();
		adTypeShow(v);
	});

	function adTypeShow(adTypeValue){
		if (adTypeValue==4){
			type_img_wrap.show();
			recommend_list_wrap.hide();
		}else{
			type_img_wrap.hide();
			recommend_list_wrap.show();
		}
	}
	////////////////
	/*
	function request(getPaging,otherData){
		var data={page:getPaging,size:10};
		var url='';
		switch(parseInt(ad_type.val())){
			case 1:
			data.nick_name=otherData;
			url='/user/list';
			break;
			case 2:
			data.title=otherData;
			url='/article/search_list';
			break;
			case 3:
			data.name=otherData;
			url='/subject/search_list';
			break;
		};
		AJAXMY.send(url,data,function(d){
			search_result_wrap.empty();
			var s='';
			if(ad_type.val()==1){
				$.each(d['result'],function(k,v){				
					s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['vita']+'</td><td><button class="glyphicon-plus glyphicon onlyicon" title="添加"></button></td></tr>';	 
				});
			}else if(ad_type.val()==2){
				$.each(d['result'],function(k,v){				
					s+='<tr><td>'+v['id']+'</td><td>'+v['title']+'</td><td><button class="glyphicon-plus glyphicon onlyicon" title="添加"></button></td></tr>';	 
				});
			}else{
				$.each(d['result'],function(k,v){				
					s+='<tr><td>'+v['id']+'</td><td>'+v['name']+'</td><td><button class="glyphicon-plus glyphicon onlyicon" title="添加"></button></td></tr>';	 
				});
			}
			search_result_wrap.append(s);
			var myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,
				function(){
					request(this.clickPaging,otherData);
				}
			);
			myPaging._init();
		});
	}

	search_btn.click(function(){
		request(1,search_input.val());
	});
	*/
	///////////////
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
	});
	search_btn.click(function(){
		var data={};
		var url='';
		switch(parseInt(ad_type.val())){
			case 1:
			data.nick_name=search_input.val();
			url='/user/list';
			break;
			case 2:
			data.title=search_input.val();
			url='/article/search_list';
			break;
			case 3:
			data.name=search_input.val();
			url='/subject/search_list';
			break;
		};
		myPaging.pageFn=function(currentPage){
			AJAXMY.send(url,Object.assign({page:currentPage,size:10},data),function(d){
				search_result_wrap.empty();
				var s='';
				if(ad_type.val()==1){
					$.each(d['result'],function(k,v){				
						s+='<tr><td>'+v['id']+'</td><td>'+v['nickName']+'</td><td>'+v['vita']+'</td><td><button class="glyphicon-plus glyphicon onlyicon" title="添加"></button></td></tr>';	 
					});
				}else if(ad_type.val()==2){
					$.each(d['result'],function(k,v){				
						s+='<tr><td>'+v['id']+'</td><td>'+v['title']+'</td><td><button class="glyphicon-plus glyphicon onlyicon" title="添加"></button></td></tr>';	 
					});
				}else{
					$.each(d['result'],function(k,v){				
						s+='<tr><td>'+v['id']+'</td><td>'+v['name']+'</td><td><button class="glyphicon-plus glyphicon onlyicon" title="添加"></button></td></tr>';	 
					});
				}
				search_result_wrap.append(s);
				myPaging.refreshDom(d['pages']);
			});	
		};
		myPaging.executePageFn(1);

		
	});










	search_result_wrap.on('click','.glyphicon-plus',function(){
		recommend_list.append($(this).parent().parent());
		$(this).replaceWith('<button class="glyphicon-up glyphicon onlyicon" title="上移"></button><button class="glyphicon-down glyphicon onlyicon" title="下移"></button><button  class="glyphicon-trash glyphicon onlyicon" title="删除"></button>');
	});

	recommend_list.on('click','.glyphicon-trash',function(){
		$(this).parent().parent().remove();
	});

	recommend_list.on('click','.glyphicon-up',function(){
		var a=$(this).parent().parent();
		a.prev().before(a);
	});

	recommend_list.on('click','.glyphicon-down',function(){
		var a=$(this).parent().parent();
		a.next().after(a);
	});

	
	commit_button.click(function(){
		$(this).prop('disabled',true);
		var that=$(this),
			requestUrl='',
			category_code=ad_pos_type.val(),
			ad_pos_indexV=ad_pos_index.val(),
			ad_typeV=parseInt(ad_type.val()),
			data={
				name:name.val(),
				category_code:category_code,
				type:ad_typeV
			};
		if(!parseString.isEmpty(name.val())){
			POPUPWINDOW.alert('需要填写名称');
			that.prop('disabled',false);
			return;
		}	
		if(id)
		{	
			requestUrl='/adslots/update';
			data.id=id;
		}else{
			requestUrl='/adslots/save';
		}	
		if(category_code=='all'){
			data.index_category=ad_pos_indexV;
		}else{
			data.index_article=ad_pos_indexV;
		}
		if(ad_typeV==4){
			data.pic_url=cover_img.attr("src");
			data.target_type=type.val();
			data.target=url.val();
		}else{
			var keyArray=[];
			var recommendListArray=[];
			if(ad_typeV==1){
				keyArray=['id','nickName','vita'];
			}else if(ad_typeV==2){
				keyArray=['id','title'];
			}else{
				keyArray=['id','name'];
			}
			recommend_list.children('tr').each(function(index,ele){
				var o={};
				$(this).children('td:not(:last)').each(function(index,elx){
					o[keyArray[index]]=$(this).text();
				});
				recommendListArray.push(o);
			});
			if(recommendListArray.length==0){
				POPUPWINDOW.alert('推荐列表不能为空');
				that.prop('disabled',false);
				return;
			}
			recommendListArray=JSON.stringify(recommendListArray);
			if(!parseString.isNumber(ad_pos_indexV)){
				POPUPWINDOW.alert('位置索引需要是>=0的数字');
				that.prop('disabled',false);
				return;
			}
			if(!parseString.isEmpty(category_code)){
				POPUPWINDOW.alert('需要选择tab分类');
				that.prop('disabled',false);
				return;
			}
			switch(ad_typeV){
				case 1:
				data.celebrities=recommendListArray;
				break;
				case 2:
				data.articles=recommendListArray;
				break;
				case 3:
				data.subjects=recommendListArray;
				break;
			};
		}
		AJAXMY.send(
			requestUrl,
			data,
			function(d){
				if(d['result']) alert('添加成功');
				that.prop('disabled',false);
			}
		);
	});	
	
});

