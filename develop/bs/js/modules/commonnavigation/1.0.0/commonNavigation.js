define(function(require,exports,module) {
	var docCookies=new(require('docCookies')),
		navigationMultiLevelUl=require('navigationMultiLevelUl');	
	module.exports=commonNavigation;
	function commonNavigation(){
		var permissionObj={
		    '内容管理':{
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
		        },
		        '话题管理':{
		            '话题列表':['topic_list',1],
		            '新增/编辑话题':['topic_edit',1]
		        },
		        '匿名八卦管理':{
		            '匿名八卦列表':['anonymousjuicy_list',1],
		            '花名、头像列表':['anonymousname_list',1],
		            '添加花名':['anonymousname_add',1]
		        },
		        'Q&A管理（尚未收到，待定）':['',1]
		            
		    },
		    '排序管理':{
		            '顶栏tab管理':['top_tab'],
		            '推荐页管理':[],
		            'banner列表':['banner_list'],
		            '添加/编辑banner':['banner_edit']
		    },
		    '评论管理':{
		        '评论列表':['comment_list',1],
		        '评论详情':['comment_details',1]
		    },
		    '推送管理':{
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
		    '权限管理':{
		        '角色管理':['role_list',5],
		        '添加/编辑角色':['role_edit',5],
		        '管理员列表':['administrator_list',5],
		        '添加/编辑管理员':['administrator_edit',5]
		    }
		};
		var NavigationMultiLevelUlMy=new navigationMultiLevelUl('#left',permissionObj);
		var currentDom=$('.navigation-multi-level-ul a:eq('+NavigationMultiLevelUlMy.getCurrentIndex()+')');
		currentDom.css("color","rgb(0, 162, 202)");
		$("#navigation-crumb>span:eq(0)").text(currentDom.parent().parent().prev().parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(1)").text(currentDom.parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(2)").text(currentDom.text());
		$(".navigation-multi-level-ul a:eq(0),.navigation-multi-level-ul a:eq(1),.navigation-multi-level-ul a:eq(2),.navigation-multi-level-ul a:eq(3),.navigation-multi-level-ul a:eq(4),.navigation-multi-level-ul a:eq(16),.navigation-multi-level-ul a:eq(11),.navigation-multi-level-ul a:eq(12)").click(function(){
			alert('功能未开放');
			return false;
		});
	}
});



