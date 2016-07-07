define(function(require) {
	


	
	$ = require('jquery');

	var hrefArray=[
		'information-list.html','fetched-news-list.html','add-fetch-source.html','morningpost-edit.html','news-edit.html',
		'class-article.html',
		'class-edit.html',
		'article-list.html',
		'article-edit.html',
		'topic-list.html',
		'subject-edit.html'
	];
	
	



	var directoryObj=[
			[
				"内容管理",
				[
					
					[
						"资讯管理",
						["资讯列表","新闻抓取列表","添加抓取源","上传/编辑早报","上传/编辑要闻"]
					],
					[
						"文章管理",
						["文章分类","添加编辑分类","文章列表","添加/编辑文章"]
					],
					[
						"专题管理",
						["专题列表","新建/编辑专题"]
					],
					[
						"话题管理",
						["话题列表","新增/编辑话题"]
					],
					[
						"匿名八卦管理",
						["匿名八卦列表","花名、头像列表","添加花名"]
					],
					[
						"Q&A管理（尚未收到，待定）",
						[]
					]
				]
			],
			[
				"广告位管理",
				[
					[
						"广告列表",
						[]
					],
					[
						"添加/编辑广告",
						[]
					]
				]
			],
			[
				"评论管理",
				[
					[
						"评论列表",
						[]
					],
					[
						"评论详情",
						[]
					]
				]
			],
			[
				"推送管理",
				[
					[
						"系统消息推送列表",
						[]
					],
					[
						"新增/编辑系统推送",
						[]
					],
					[
						"APP内消息推送",
						[]
					],
					[
						"新增/编辑APP内推送",
						[]
					]
				]
			],
			[
				"用户管理",
				[
					[
						"用户列表",
						[]
					],
					[
						"添加/编辑用户",
						[]
					],
					[
						"用户反馈列表",
						[]
					],
					[
						"反馈详情",
						[]
					]
				]
			],
			[
				"权限管理",
				[
					[
						"角色管理",
						[]
					],
					[
						"添加/编辑角色",
						[]
					],
					[
						"管理员列表",
						[]
					],
					[
						"添加/编辑管理员",
						[]
					]
				]
			]
		];


	var navigationMultiLevelUl = require('navigationMultiLevelUl');
	var my_navigationMultiLevelUl = new navigationMultiLevelUl("#left",hrefArray,directoryObj);
	
	//获取当前页面的 目录位置  

	var getGet = require('getGet');
	var getDi=getGet('di');
	if(getDi){
		var a=getDi.split("_");
		if(a.length==4){
			$(".navigation-multi-level-ul>li:eq("+a[1]+")>ul>li:eq("+a[2]+")>ul a:eq("+a[3]+")").css("color","rgb(0, 162, 202)");
			$("#navigation-crumb>span:eq(0)").text(directoryObj[a[1]][0]+"-");
			$("#navigation-crumb>span:eq(1)").text(directoryObj[a[1]][1][a[2]][0]+"-");
			$("#navigation-crumb>span:eq(2)").text(directoryObj[a[1]][1][a[2]][1][a[3]]);

		}else{

			$(".navigation-multi-level-ul>li:eq("+a[1]+")>ul a:eq("+a[2]+")").css("color","rgb(0, 162, 202)");
			$("#navigation-crumb>span:eq(0)").text(directoryObj[a[1]][0]+"-");
			$("#navigation-crumb>span:eq(1)").text(directoryObj[a[1]][1][a[2]][0]);
		}

	}



});

