define(function(require,exports,module) {
	module.exports=commonNavigation;
	function commonNavigation(){
		$("#top").append('<img src="../images/logo.png"><ul class="navigation-hori" id="navigation_ul"><li><a href="home.html">首页</a></li><li><a href="select.html">精选</a></li><li><a href="myarticle.html">我的文章</a></li></ul><div><span><a href="edit.html">写文章</a></span> <a href="login.html" id="top_login_button_outer"><button>登录</button></a></div>');
	}
});



