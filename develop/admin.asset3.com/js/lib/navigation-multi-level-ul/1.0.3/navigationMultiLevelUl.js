define(function(require,exports,module) {
	module.exports=navigationMultiLevelUl;
	function navigationMultiLevelUl(outerId){
		this.navigationIndexArray={
			comment_details:19,
			user_feed_details:22,
			role_permission:28,
			jobs_edit:4,
			cooperation_edit:5
		};
		this.curInd=0;
		var that=this;		
		var directoryObj={
		    '内容':{
		        '文章':{
		        	'文章列表':['article_list',1],
		            '添加/编辑文章':['article_edit',3],
		            '分类列表':['class_article',1],
		            '添加/编辑分类':['class_edit',1]
		        },
		        '职位':['jobs_list',1],
		        '合作机构':['cooperation_list',1]     
		    },
		    '用户管理':{
		        '用户列表':['user_list',1],
		        '添加/编辑用户':['user_edit',1]
		    },
		    '权限':{
		        '角色管理':['role_list',5],
		        '添加/编辑角色':['role_edit',5],
		        '用户角色管理':['user_role',5]
		    }
		};
		//写死操作
		//this.navigationIndexArray={comment_details:19,user_feed_details:22,role_permission:28,information_list:0,morningpost_edit:1,news_edit:2,fetched_news_list:3,add_fetch_source:4,article_list:5,article_edit:6,class_article:7,class_edit:8,subject_list:9,subject_edit:10,top_tab:11,recommendtab_list:12,banner_list:13,banner_edit:14,ad_list:15,ad_edit:16,sys_push_list:17,sys_push_edit:18,comment_list:19,user_list:20,user_edit:21,user_feed_list:22,verify:23,verify_personal:24,verify_org:25,verify_media:26,app_version:27,role_list:28,role_edit:29,user_role:30,bs_version:31,bs_help:32};
		//$(outerId).append('<ul class="navigation-multi-level-ul"><li><div>内容</div><ul><li><div>资讯</div><ul><li><a href="information_list.html">资讯列表</a></li><li><a href="morningpost_edit.html">添加/编辑早报</a></li><li><a href="news_edit.html">添加/编辑要闻</a></li><li><a href="fetched_news_list.html">新闻抓取列表</a></li><li><a href="add_fetch_source.html">添加抓取源</a></li></ul></li><li><div>文章</div><ul><li><a href="article_list.html">文章列表</a></li><li><a href="article_edit.html">添加/编辑文章</a></li><li><a href="class_article.html">分类列表</a></li><li><a href="class_edit.html">添加/编辑分类</a></li></ul></li><li><div>专题</div><ul><li><a href="subject_list.html">专题列表</a></li><li><a href="subject_edit.html">添加/编辑专题</a></li></ul></li></ul></li><li><div>排序/广告</div><ul><li><a href="top_tab.html">顶栏TAB</a></li><li><a href="recommendtab_list.html">推荐页</a></li><li><div>BANNER</div><ul><li><a href="banner_list.html">BANNER列表</a></li><li><a href="banner_edit.html">添加/编辑BANNER</a></li></ul></li><li><div>广告位</div><ul><li><a href="ad_list.html">广告位列表</a></li><li><a href="ad_edit.html">添加/编辑广告位</a></li></ul></li></ul></li><li><div>推送</div><ul><li><a href="sys_push_list.html">系统消息推送列表</a></li><li><a href="sys_push_edit.html">新增/编辑系统推送</a></li></ul></li><li><a href="comment_list.html">评论</a></li><li><div>用户管理</div><ul><li><a href="user_list.html">用户列表</a></li><li><a href="user_edit.html">添加/编辑用户</a></li><li><a href="user_feed_list.html">用户反馈</a></li><li><div>认证审核</div><ul><li><a href="verify.html">审核</a></li><li><a href="verify_personal.html">个人认证配置</a></li><li><a href="verify_org.html">机构认证配置</a></li><li><a href="verify_media.html">媒体认证配置</a></li></ul></li></ul></li><li><a href="app_version.html">APP版本控制</a></li><li><div>权限</div><ul><li><a href="role_list.html">角色管理</a></li><li><a href="role_edit.html">添加/编辑角色</a></li><li><a href="user_role.html">用户角色管理</a></li></ul></li><li><div>帮助</div><ul><li><a href="bs_version.html">版本更新</a></li><li><a href="bs_help.html">常见问题</a></li></ul></li></ul></li>');
		//console.log(this.generateHtml(directoryObj));
		//活动操作
		$(outerId).append(this.generateHtml(directoryObj));
		$(".navigation-multi-level-ul ul").hide();
		$(".navigation-multi-level-ul div").click(function(){
			$(this).next().css("display")=="block"?$(this).next().hide():$(this).next().show();				
		});
	}

	navigationMultiLevelUl.prototype.generateHtml=function(o){
		var s='<ul class="navigation-multi-level-ul">',
			that=this,
			navIndex=0;
		function iteraDirObj(o){
		    for(var k in o){
		        if(o[k].constructor==Object){
		            s+='<li><div>'+k+'</div><ul>';
		            iteraDirObj(o[k]);
		        }
		        else{
		            s+='<li><a href="'+o[k][0]+'.html">'+k+'</a></li>';
		        	that.navigationIndexArray[o[k][0]]=navIndex;
		        	navIndex++;
		        }
		    }
		    s+='</ul></li>';
		}
		iteraDirObj(o);
		//console.log(that.navigationIndexArray);
		return s;
	}

	navigationMultiLevelUl.prototype.getCurrentIndex=function(){
		var h=window.location.href;
		//需要一个获得当前 html 的函数
		this.curInd=this.navigationIndexArray[h.split('/').reverse()[0].split('?')[0].split('.')[0]];
	}

	navigationMultiLevelUl.prototype.getCurDom=function(){
		this.getCurrentIndex();
		return $('.navigation-multi-level-ul a:eq('+this.curInd+')');
	}


	navigationMultiLevelUl.prototype.curLay=function(){
		var currentDom=this.getCurDom();
	}

	
});

