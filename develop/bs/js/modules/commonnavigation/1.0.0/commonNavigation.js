define(function(require) {

	var $ = require('jquery');
	
	var directoryObj=[
		[
			"内容管理",
			[
				
				[
					"资讯管理",
					[{"资讯列表":'information_list.html'},{"新闻抓取列表":'fetched_news_list.html'},{"添加抓取源":'add_fetch_source.html'},{"上传/编辑早报":'morningpost_edit.html'},{"上传/编辑要闻":'news_edit.html'}]
				],
				[
					"文章管理",
					[{"文章分类":'class_article.html'},{"添加编辑分类":'class_edit.html'},{"文章列表":'article_list.html'},{"添加/编辑文章":'article_edit.html'}]
				],
				[
					"专题管理",
					[{"专题列表":'subject_list.html'},{"新建/编辑专题":'subject_edit.html'}]
				],
				[
					"话题管理",
					[{"话题列表":'topic_list.html'},{"新增/编辑话题":'topic_edit.html'}]
				],
				[
					"匿名八卦管理",
					[{"匿名八卦列表":'anonymousjuicy_list.html'},{"花名、头像列表":'anonymousname_list.html'},{"添加花名":'anonymousname_add.html'}]
				],
				[
					{"Q&A管理（尚未收到，待定）":'#'},
					[]
				]
			]
		],
		[
			"推荐页管理",
			[
				[
					{"推荐tab列表":'recommendtab_list.html'},
					[]
				]	
			]
		],
		[
			"banner位管理",
			[
				[
					{"banner列表":'banner_list.html'},
					[]
				],
				[
					{"添加/编辑banner":'banner_edit.html'},
					[]
				]
			]
		],
		[
			"评论管理",
			[
				[
					{"评论列表":'comment_list.html'},
					[]
				],
				[
					{"评论详情":'comment_details.html'},
					[]
				]
			]
		],
		[
			"推送管理",
			[
				[
					{"系统消息推送列表":'sys_push_list.html'},
					[]
				],
				[
					{"新增/编辑系统推送":'sys_push_edit.html'},
					[]
				],
				[
					{"APP内消息推送":'app_push_list.html'},
					[]
				],
				[
					{"新增/编辑APP内推送":'app_push_edit.html'},
					[]
				]
			]
		],
		[
			"用户管理",
			[
				[
					{"用户列表":'user_list.html'},
					[]
				],
				[
					{"添加/编辑用户":'user_edit.html'},
					[]
				],
				[
					{"用户反馈列表":'user_feed_list.html'},
					[]
				],
				[
					{"反馈详情":'user_feed_details.html'},
					[]
				]
			]
		],
		[
			"权限管理",
			[
				[
					{"角色管理":'role_list.html'},
					[]
				],
				[
					{"添加/编辑角色":'role_edit.html'},
					[]
				],
				[
					{"管理员列表":'administrator_list.html'},
					[]
				],
				[
					{"添加/编辑管理员":'administrator_edit.html'},
					[]
				]
			]
		]
	];


	var navigationMultiLevelUl = require('navigationMultiLevelUl');
	var my_navigationMultiLevelUl = new navigationMultiLevelUl("#left",directoryObj);



	//获取当前页面的 目录位置  

	var getGet = require('getGet');
	var getDi=getGet('di');
	if(getDi){
		var a=getDi.split("_");
		if(a.length==4){
			$(".navigation-multi-level-ul>li:eq("+a[1]+")>ul>li:eq("+a[2]+")>ul a:eq("+a[3]+")").css("color","rgb(0, 162, 202)");
			$("#navigation-crumb>span:eq(0)").text(directoryObj[a[1]][0]+"-");
			$("#navigation-crumb>span:eq(1)").text(directoryObj[a[1]][1][a[2]][0]+"-");
			$("#navigation-crumb>span:eq(2)").text(Object.keys(directoryObj[a[1]][1][a[2]][1][a[3]])[0]);
		}else{
			$(".navigation-multi-level-ul>li:eq("+a[1]+")>ul a:eq("+a[2]+")").css("color","rgb(0, 162, 202)");
			$("#navigation-crumb>span:eq(0)").text(directoryObj[a[1]][0]+"-");
			$("#navigation-crumb>span:eq(1)").text(Object.keys(directoryObj[a[1]][1][a[2]][0])[0]);
		}
	}
	



});

