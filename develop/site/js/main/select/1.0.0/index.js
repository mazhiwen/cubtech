define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var commonMain=new(require('commonMain')),
		ajaxMy=require('ajaxMy'),
		paging = require('paging'),
		center=$("#center");

	function request(getPaging){
		new ajaxMy('/article/rec',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			center.empty();
			var s='';
			$.each(d['result'],function(k,v){
				var imgHtml;
				if(v['coverPic']){
					imgHtml='<div><img src="'+v['coverPic']+'"></div>';
				}else{
					imgHtml='';
				}	
				s+='<a href="article_details.html?id='+v['modelId']+'"><div class="article_block"><div><div><h2>'+v['title']+'</h2><p>'+v['summary']+'</p><div class="author_like"><span>'+v['nickName']+'/'+v['nickName']+'</span><div><img src="./images/comment_icon.png"><span>'+v['praiseNum']+'</span><img src="./images/praise_icon.png"><span>'+v['praiseNum']+'</span></div></div></div>'+imgHtml+'</div></div></a>';
			});
			center.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);});
			myPaging._init();
		});
	}
	request(1);
	//myPaging=new paging("#paging",1,MAXPAGING,1,function(){});
	//myPaging._init();
});

