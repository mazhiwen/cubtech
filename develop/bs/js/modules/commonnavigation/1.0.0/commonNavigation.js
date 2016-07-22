define(function(require,exports,module) {
	var $ = require('jquery'),
		docCookies=new(require('docCookies'));
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
		            '顶栏tab管理':[],
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
		var permissionArray=[1,3,4];
		this.NAVIGATIONAARRAY=[];
		
		var that=this;
		var NAVIGATIONHTMLTEXT='<ul class="navigation-multi-level-ul">';
		function iteraPermissionObj(o){
		    for(var k in o){
		        if(o[k].constructor==Object){
		            NAVIGATIONHTMLTEXT+='<li><div>'+k+'</div><ul>';
		            iteraPermissionObj(o[k]);
		        }
		        else{
		    
		            NAVIGATIONHTMLTEXT+='<li><a href="'+o[k][0]+'.html">'+k+'</a></li>';
		            that.NAVIGATIONAARRAY.push(o[k][0]);
		            
		        }
		    }
		    NAVIGATIONHTMLTEXT+='</ul></li>';
		}
		iteraPermissionObj(permissionObj);

		$('#left').append(NAVIGATIONHTMLTEXT);
		var href=window.location.href;
		var nowlocation=$('.navigation-multi-level-ul a:eq('+that.NAVIGATIONAARRAY.indexOf(href.split('/').reverse()[0].split('?')[0].split('.')[0])+')');
		nowlocation.css("color","rgb(0, 162, 202)");
		$("#navigation-crumb>span:eq(0)").text(nowlocation.parent().parent().prev().parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(1)").text(nowlocation.parent().parent().prev().text()+'-');
		$("#navigation-crumb>span:eq(2)").text(nowlocation.text());
		//console.log(nowlocation.parent().parent().prev().text());
		//console.log(nowlocation.parent().parent().prev().parent().parent().prev().text());
		$(".navigation-multi-level-ul div").click(function(){
			$(this).next().css("display")=="block"?$(this).next().hide():$(this).next().show();				
		});
	
	}
});



