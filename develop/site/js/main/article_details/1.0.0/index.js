define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var	commonMain=new(require('commonMain')),
		ajaxMy=require('ajaxMy'),
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
		new ajaxMy('/article/detail',{id:id},function(d){
			var d=d['result'];
			title.text(d['title']);
			author.text(d['nickName']+'/'+transformTime.MSToNow(d['createTime']));
			comment.text(d['commentNum']);
			praise.text(d['praiseNum']);
			article_text_outer.append(d['content']);
			edit.attr("href",'edit.html?id='+d['id']);
		});

	}else{


	}
});

