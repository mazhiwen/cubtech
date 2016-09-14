define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var commonMain=new(require('commonMain')),
		ajaxMy=new(require('ajaxMy')),
		mustLogin=(require('mustLogin'))(),
		transformTime=new(require('transformTime')),
		center=$("#center"),
		getPaging=1;

	function request(){
		ajaxMy.send('/article/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			center.empty();
			if(d['result'].length!=0){
				var s='';
				$.each(d['result'],function(k,v){
					var imgHtml;
					if(v['coverPic']){
						imgHtml='<div><img src="'+v['coverPic']+'"></div>';
					}else{
						imgHtml='';
					}	
					s+='<a href="article_details.html?id='+v['id']+'" class="article_block"><div><div><div><h2>'+v['title']+'</h2><p>'+v['summary']+'</p><div class="author_like"><span>'+v['nickName']+'/'+transformTime.MSToNow(v['createTime'])+'</span><div><img src="./images/comment_icon.png"><span>'+v['praiseNum']+'</span><img src="./images/praise_icon.png"><span>'+v['praiseNum']+'</span></div></div></div>'+imgHtml+'</div></div></a>';
				});
				center.append(s);
				getPaging++;	
			}else{
				center.append('<img src="./images/my_art_empty_bg.png" id="empty_img">');

			}
			
		});
		
	}
	request();
	$(window).scroll(function(){
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
       		request();
 		}
	});	

});

