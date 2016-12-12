define(function(require,exports,module) {
	module.exports=navigationMultiLevelUl;
	function navigationMultiLevelUl(outerId){
		this.navigationIndexArray=[];
		this.curInd=0;
		var that=this;		
		var directoryObj={
		    '内容':{
		        '资讯管理':{
		            '资讯列表':['information_list',1],
		            '新闻抓取列表':['fetched_news_list',1],
		            '添加抓取源':['add_fetch_source',1],
		            '上传/编辑早报':['morningpost_edit',1],
		            '上传/编辑要闻':['news_edit',1]
		        },
		        '文章管理':{
		            '文章分类':['class_article',1],
		            '添加编辑分类':['class_edit',1],
		            '文章列表':['article_list',1],
		            '添加/编辑文章':['article_edit',3]
		        },
		        '专题管理':{
		            '专题列表':['subject_list',3],
		            '新建/编辑专题':['subject_edit',4]
		        }/*,
		        '话题管理':{
		            '话题列表':['topic_list',1],
		            '新增/编辑话题':['topic_edit',1]
		        },
		        '匿名八卦管理':{
		            '匿名八卦列表':['anonymousjuicy_list',1],
		            '花名、头像列表':['anonymousname_list',1],
		            '添加花名':['anonymousname_add',1]
		        },
		        'Q&A管理（尚未收到，待定）':['',1]*/
		            
		    },
		    '排序/广告':{
		            '顶栏tab管理':['top_tab'],
		            '推荐页管理':['recommendtab_list'],
		            'banner':{
		            	'banner列表':['banner_list'],
		            	'添加/编辑banner':['banner_edit'],
		            	'分类首图列表':['banner_list'],
		            	'添加/编辑分类首图':['banner_list']
		            },
		            '广告位':{
		            	'广告位列表':['ad_list'],
		            	'添加/编辑广告位':['ad_edit']
		            }  
		    },
		    '评论':{
		        '评论列表':['comment_list',1],
		        '评论详情':['comment_details',1]
		    },
		    '推送':{
		        '系统消息推送列表':['sys_push_list',1],
		        '新增/编辑系统推送':['sys_push_edit',1],
		        'APP内消息推送':['app_push_list',1],
		        '新增/编辑APP内推送':['app_push_edit',1]
		    },
		    '用户管理':{
		        '用户列表':['user_list',1],
		        '添加/编辑用户':['user_edit',1],
		        '用户反馈列表':['user_feed_list',1],
		        '反馈详情':['user_feed_details',1]
		    },
		    '权限':{
		        '角色管理':['role_list',5],
		        '添加/编辑角色':['role_edit',5],
		        '角色权限':['role_permission',5],
		        '用户角色管理':['user_role',5]
		    }
		};
		//this.navigationIndexArray= ["information_list", "fetched_news_list", "add_fetch_source", "morningpost_edit", "news_edit", "class_article", "class_edit", "article_list", "article_edit", "subject_list", "subject_edit", "topic_list", "topic_edit", "anonymousjuicy_list", "anonymousname_list", "anonymousname_add", "", "top_tab", "recommendtab_list", "banner_list", "banner_edit", "comment_list", "comment_details", "sys_push_list", "sys_push_edit", "app_push_list", "app_push_edit", "user_list", "user_edit", "user_feed_list", "user_feed_details", "role_list", "role_edit", "role_permission", "user_role"];
		//$(outerId).append('<ul class="navigation-multi-level-ul"><li><div>内容管理</div><ul><li><div>资讯管理</div><ul><li><a href="information_list.html">资讯列表</a></li><li><a href="fetched_news_list.html">新闻抓取列表</a></li><li><a href="add_fetch_source.html">添加抓取源</a></li><li><a href="morningpost_edit.html">上传/编辑早报</a></li><li><a href="news_edit.html">上传/编辑要闻</a></li></ul></li><li><div>文章管理</div><ul><li><a href="class_article.html">文章分类</a></li><li><a href="class_edit.html">添加编辑分类</a></li><li><a href="article_list.html">文章列表</a></li><li><a href="article_edit.html">添加/编辑文章</a></li></ul></li><li><div>专题管理</div><ul><li><a href="subject_list.html">专题列表</a></li><li><a href="subject_edit.html">新建/编辑专题</a></li></ul></li><li><div>话题管理</div><ul><li><a href="topic_list.html">话题列表</a></li><li><a href="topic_edit.html">新增/编辑话题</a></li></ul></li><li><div>匿名八卦管理</div><ul><li><a href="anonymousjuicy_list.html">匿名八卦列表</a></li><li><a href="anonymousname_list.html">花名、头像列表</a></li><li><a href="anonymousname_add.html">添加花名</a></li></ul></li><li><a href=".html">Q&A管理（尚未收到，待定）</a></li></ul></li><li><div>排序管理</div><ul><li><a href="top_tab.html">顶栏tab管理</a></li><li><a href="recommendtab_list.html">推荐页管理</a></li><li><a href="banner_list.html">banner列表</a></li><li><a href="banner_edit.html">添加/编辑banner</a></li></ul></li><li><div>评论管理</div><ul><li><a href="comment_list.html">评论列表</a></li><li><a href="comment_details.html">评论详情</a></li></ul></li><li><div>推送管理</div><ul><li><a href="sys_push_list.html">系统消息推送列表</a></li><li><a href="sys_push_edit.html">新增/编辑系统推送</a></li><li><a href="app_push_list.html">APP内消息推送</a></li><li><a href="app_push_edit.html">新增/编辑APP内推送</a></li></ul></li><li><div>用户管理</div><ul><li><a href="user_list.html">用户列表</a></li><li><a href="user_edit.html">添加/编辑用户</a></li><li><a href="user_feed_list.html">用户反馈列表</a></li><li><a href="user_feed_details.html">反馈详情</a></li></ul></li><li><div>权限管理</div><ul><li><a href="role_list.html">角色管理</a></li><li><a href="role_edit.html">添加/编辑角色</a></li><li><a href="role_permission.html">角色权限</a></li><li><a href="user_role.html">用户角色管理</a></li></ul></li></ul></li>');
		$(outerId).append(this.generateHtml(directoryObj));
		//console.log(this.generateHtml(directoryObj));
		$(".navigation-multi-level-ul ul").hide();
		$(".navigation-multi-level-ul div").click(function(){
			$(this).next().css("display")=="block"?$(this).next().hide():$(this).next().show();				
		});
	}

	navigationMultiLevelUl.prototype.generateHtml=function(o){
		var s='<ul class="navigation-multi-level-ul">';
		var that=this;
		function iteraDirObj(o){
		    for(var k in o){
		        if(o[k].constructor==Object){
		            s+='<li><div>'+k+'</div><ul>';
		            iteraDirObj(o[k]);
		        }
		        else{
		            s+='<li><a href="'+o[k][0]+'.html">'+k+'</a></li>';
		            that.navigationIndexArray.push(o[k][0]);
		        }
		    }
		    s+='</ul></li>';
		}
		iteraDirObj(o);
		return s;
	}

	navigationMultiLevelUl.prototype.getCurrentIndex=function(){
		var h=window.location.href;
		/*需要一个获得当前 html 的函数*/
		this.curInd=this.navigationIndexArray.indexOf(h.split('/').reverse()[0].split('?')[0].split('.')[0]);
	}

	navigationMultiLevelUl.prototype.getCurDom=function(){
		this.getCurrentIndex();
		return $('.navigation-multi-level-ul a:eq('+this.curInd+')');
	}


	navigationMultiLevelUl.prototype.curLay=function(){
		var currentDom=this.getCurDom();
	}

	
});

