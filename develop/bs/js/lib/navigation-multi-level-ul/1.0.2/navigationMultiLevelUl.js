define(function(require,exports,module) {
	var $ = require('jquery');
	module.exports=navigationMultiLevelUl;
	function navigationMultiLevelUl(outerId,directoryObj){

		/*
			outerId
			directoryObj
		*/

		this.pageAndIndex={};
		var that=this;
		
		var navigationHtmlText='<ul class="navigation-multi-level-ul">';

		function iterationGenerateHtml(array,fatherDirIndex){
			$.each(array,function(index,value){
				if(value.constructor==Array) {
					if(!(value[1] instanceof Array)||value[1].length>0){
						navigationHtmlText+="<li><div>"+value[0]+"</div><ul>";
						iterationGenerateHtml(value[1],fatherDirIndex+"_"+index);
						navigationHtmlText+="</ul></li>";
					}else{
						navigationHtmlText+='<li><a href="'+value[0][Object.keys(value[0])[0]]+'?di='+fatherDirIndex+'_'+index+'">'+Object.keys(value[0])[0]+'</a></li>';
						that.pageAndIndex[value[0][Object.keys(value[0])[0]]]="?di="+fatherDirIndex+"_"+index;
					}
				}else{
					navigationHtmlText+='<li><a href="'+value[Object.keys(value)[0]]+'?di='+fatherDirIndex+'_'+index+'">'+Object.keys(value)[0]+'</a></li>';
					that.pageAndIndex[value[Object.keys(value)[0]]]="?di="+fatherDirIndex+"_"+index;
				}		
			});
		}
		
		iterationGenerateHtml(directoryObj,'');
		navigationHtmlText+='</ul>';
		//console.log(navigationHtmlText);
		navigationHtmlText='<ul class="navigation-multi-level-ul"><li><div>内容管理</div><ul><li><div>资讯管理</div><ul><li><a href="information_list.html?di=_0_0_0">资讯列表</a></li><li><a href="fetched_news_list.html?di=_0_0_1">新闻抓取列表</a></li><li><a href="add_fetch_source.html?di=_0_0_2">添加抓取源</a></li><li><a href="morningpost_edit.html?di=_0_0_3">上传/编辑早报</a></li><li><a href="news_edit.html?di=_0_0_4">上传/编辑要闻</a></li></ul></li><li><div>文章管理</div><ul><li><a href="class_article.html?di=_0_1_0">文章分类</a></li><li><a href="class_edit.html?di=_0_1_1">添加编辑分类</a></li><li><a href="article_list.html?di=_0_1_2">文章列表</a></li><li><a href="article_edit.html?di=_0_1_3">添加/编辑文章</a></li></ul></li><li><div>专题管理</div><ul><li><a href="subject_list.html?di=_0_2_0">专题列表</a></li><li><a href="subject_edit.html?di=_0_2_1">新建/编辑专题</a></li></ul></li><li><div>话题管理</div><ul><li><a href="topic_list.html?di=_0_3_0">话题列表</a></li><li><a href="topic_edit.html?di=_0_3_1">新增/编辑话题</a></li></ul></li><li><div>匿名八卦管理</div><ul><li><a href="anonymousjuicy_list.html?di=_0_4_0">匿名八卦列表</a></li><li><a href="anonymousname_list.html?di=_0_4_1">花名、头像列表</a></li><li><a href="anonymousname_add.html?di=_0_4_2">添加花名</a></li></ul></li><li><a href="#?di=_0_5">Q&A管理（尚未收到，待定）</a></li></ul></li><li><div>推荐页管理</div><ul><li><a href="recommendtab_list.html?di=_1_0">推荐tab列表</a></li></ul></li><li><div>banner位管理</div><ul><li><a href="banner_list.html?di=_2_0">banner列表</a></li><li><a href="banner_edit.html?di=_2_1">添加/编辑banner</a></li></ul></li><li><div>评论管理</div><ul><li><a href="comment_list.html?di=_3_0">评论列表</a></li><li><a href="comment_details.html?di=_3_1">评论详情</a></li></ul></li><li><div>推送管理</div><ul><li><a href="sys_push_list.html?di=_4_0">系统消息推送列表</a></li><li><a href="sys_push_edit.html?di=_4_1">新增/编辑系统推送</a></li><li><a href="app_push_list.html?di=_4_2">APP内消息推送</a></li><li><a href="app_push_edit.html?di=_4_3">新增/编辑APP内推送</a></li></ul></li><li><div>用户管理</div><ul><li><a href="user_list.html?di=_5_0">用户列表</a></li><li><a href="user_edit.html?di=_5_1">添加/编辑用户</a></li><li><a href="user_feed_list.html?di=_5_2">用户反馈列表</a></li><li><a href="user_feed_details.html?di=_5_3">反馈详情</a></li></ul></li><li><div>权限管理</div><ul><li><a href="role_list.html?di=_6_0">角色管理</a></li><li><a href="role_edit.html?di=_6_1">添加/编辑角色</a></li><li><a href="administrator_list.html?di=_6_2">管理员列表</a></li><li><a href="administrator_edit.html?di=_6_3">添加/编辑管理员</a></li></ul></li></ul>';
		$(outerId).append(navigationHtmlText);

		$(".navigation-multi-level-ul div").click(function(){
			$(this).next().css("display")=="block"?$(this).next().hide():$(this).next().show();				
		});

		//$("#navigation a").each(function(index,ele){
		//	$(this).attr("href",hrefArray[index]);
		//});

	}



	

	navigationMultiLevelUl.prototype._init=function(){

	}
	
});

