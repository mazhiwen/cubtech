define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var	commonMain=new(require('commonMain')),
		ajaxMy=new(require('ajaxMy')),
		getGet=require('getGet'),
		toTop=(require('toTop'))(),
		transformTime=new(require('transformTime')),
		id=getGet('id'),
		author=$('#author'),
		comment=$('#comment'),
		vita=$('#vita'),
		praise=$('#praise'),
		headPic=$('#headPic'),
		article_time=$('#article_time'),
		edit=$('#edit'),
		article_text_outer=$('#article_text_outer'),
		title=$("#title");

	if(id){
		ajaxMy.send('/article/detail',{id:id},function(d){
			var dr=d['result'];
			headPic.attr("src",dr['headPic']);
			author.text(dr['nickName']);
			vita.text(dr['vita']);
			article_time.text(transformTime.MSToNow(dr['createTime']));
			//comment.text(dr['commentNum']);
			//praise.text(dr['praiseNum']);
			title.text(dr['title']);
			article_text_outer.append(dr['content']);
			edit.attr("href",'edit.html?id='+dr['id']);
			if(d['articleOwner']){
				$("#article_delete").click(function(){
					popUpWindow.confirm('确认删除该文章','该操作将导致内容被永远删除,请慎重',function(){
						ajaxMy.send('/article/delete',{id:id},function(d){
							if(d['result']){
								popUpWindow.alert('删除成功',function(){});	
							}else{
								popUpWindow.alert('删除失败',function(){});
							}
						});
					},function(){
					});
				});
			}else{
				$("#operate_outer").remove();
			}
		});
	}else{
	}
	
	$(".center").css("margin-top",$(".top").height());

});

