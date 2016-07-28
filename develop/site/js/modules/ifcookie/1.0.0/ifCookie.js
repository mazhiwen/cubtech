define(function(require,exports,module) {
	module.exports=ifCookie;
	function ifCookie(){
		if(docCookies.hasItem('loginName')){
			console.log(1);
			$("#top_login_button_outer").replaceWith('<img src="../images/comment_icon.png" id="user_head">');
			//$("#user_head").replaceWith('<a href="login.html" id="top_login_button_outer"><button>登录</button></a>');
		}else{
			$("#user_head").replaceWith('<a href="login.html" id="top_login_button_outer"><button>登录</button></a>');
			console.log(2);
		}
	}
	



	
});

