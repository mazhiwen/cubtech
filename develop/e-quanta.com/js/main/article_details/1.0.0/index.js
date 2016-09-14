define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var	commonMain=new(require('commonMain')),
		ajaxMy=new(require('ajaxMy')),
		getGet=require('getGet'),
		transformTime=new(require('transformTime')),
		id=getGet('id'),
		author=$('#author'),
		comment=$('#comment'),
		praise=$('#praise'),
		edit=$('#edit'),
		article_text_outer=$('#article_text_outer'),
		title=$("#title");

	if(id){
		ajaxMy.send('/article/detail',{id:id},function(d){
			var dr=d['result'];
			title.text(dr['title']);
			author.text(dr['nickName']+'/'+transformTime.MSToNow(dr['createTime']));
			comment.text(dr['commentNum']);
			praise.text(dr['praiseNum']);
			article_text_outer.append(dr['content']);
			edit.attr("href",'edit.html?id='+dr['id']);
			if(d['articleOwner']){
				$("#delete_span").click(function(){
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
});

