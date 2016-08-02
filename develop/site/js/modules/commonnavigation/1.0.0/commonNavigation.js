define(function(require,exports,module) {
	module.exports=commonNavigation;
	function commonNavigation(){
		var getHtml=require('getHtml');
		var navigationHover={
			'home':0,
			'contact':0,
			'about':0,
			'select':1,
			'myarticle':2,
		};
		var noLoginHtml='<a href="login.html" id="top_login_button_outer"><button>登录</button></a>',
			initHtml='<a href="home.html"><img src="./images/logo.png"></a><ul class="navigation-hori" id="navigation_ul"><li><a href="home.html">首页</a></li><li><a href="select.html">精选</a></li><li><a href="myarticle.html">我的文章</a></li></ul><div><span><a href="edit.html">写文章</a></span>'+noLoginHtml+'</div>';
		$("#top").append(initHtml);
		$("#top").on('mouseenter',"#user_head_outer",function(){
			$("#quit_button").show();
		});
		$("#top").on('mouseleave',"#user_head_outer",function(){
			$("#quit_button").hide();
		});
		$("#top").on('click',"#quit_button",function(){
			docCookies.removeItem('loginName');
			docCookies.removeItem('loginPassword');
			$("#user_head_outer").replaceWith(noLoginHtml);
			window.location.reload();
		});
		if(docCookies.hasItem('loginName')){
			$("#top_login_button_outer").replaceWith('<div id="user_head_outer"><img id="user_head" onerror="this.src='+"'./images/default_head.png'"+'" src="'+docCookies.getItem('userHead')+'"><span id="quit_button">退出</span></div>');
			$("#quit_button").hide();
		}else{
			$("#user_head_outer").replaceWith(noLoginHtml);
		}
		var location=window.location.href;
		if(getHtml(location)=='article_details'){
			$('#navigation_ul>li:eq('+navigationHover[getHtml(document.referrer)]+')>a').addClass('navigation_hover');
		}
		$('#navigation_ul>li:eq('+navigationHover[getHtml(location)]+')>a').addClass('navigation_hover');
	}
});



