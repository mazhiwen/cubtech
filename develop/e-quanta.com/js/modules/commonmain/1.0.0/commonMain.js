define(function(require,exports,module) {
	module.exports=commonMain;
	function commonMain(){
		popUpWindow=new(require('popUpWindow'));
		docCookies=new(require('docCookies'));
		//var commonNavigation=(require('commonNavigation'))();
		
		/***********************************************
		顶部导航*/
		var getHtml=require('getHtml');
		var navigationHover={
			'home':0,
			'contact':0,
			'about':0,
			'select':1,
			'myarticle':2
		};
		var noLoginHtml='<a href="login.html" id="top_login_button_outer">登录</a>',
			initHtml='<div class="dp_tc"><a href="home.html"><img src="./images/home/logo.png"></a></div><button class="awesome_icon switch_nav_btn"></button><ul class="navigation-hori dp_tbtc" id="navigation_ul"><li><a href="home.html">首页</a></li><li><a href="select.html">精选</a></li><li><a href="myarticle.html">我的文章</a></li><li><a href="about.html">关于我们</a></li></ul><div class="dp_tc login_off_box"><a href="edit.html" id="write_btn_top">写文章</a>'+noLoginHtml+'<a href="login.html"></a></div>';
		$(".top").append(initHtml);
		$(".top").on('mouseenter',"#user_head_outer",function(){
			$("#quit_button").show();
		});
		$(".top").on('mouseleave',"#user_head_outer",function(){
			$("#quit_button").hide();
		});
		$(".top").on('click',"#quit_button",function(){
			docCookies.removeItem('loginName','/');
			docCookies.removeItem('loginPassword','/');
			$("#user_head_outer").replaceWith(noLoginHtml);
			window.location.reload();
		});
		if(docCookies.hasItem('loginName')){
			$("#top_login_button_outer").replaceWith('<div id="user_head_outer"><img id="user_head" onerror="this.src='+"'./images/default_head.png'"+'" src="'+docCookies.getItem('userHead')+'"><span id="quit_button">退出</span></div>');
			$("#quit_button").hide();
		}else{
			$("#user_head_outer").replaceWith(noLoginHtml);
			$(".top").on('click',"#write_btn_top,#navigation_ul>li:eq(2)>a",function(){
				popUpWindow.alert('您还没有登录',function(){window.location.href="login.html";});
				return false;
			});
		}
		var location=window.location.href;
		if(getHtml(location)=='article_details'){
			var h=getHtml(document.referrer);
			$('#navigation_ul>li:eq('+navigationHover[h]+')>a').addClass('navigation_hover');
		}
		$('#navigation_ul>li:eq('+navigationHover[getHtml(location)]+')>a').addClass('navigation_hover');

		/***********************************************
		右侧箭头+ 二维码*/
		$(".right_arrow").append('<div class="right_arrow_qrwrap"><img class="right_arrow_qrimg" src="./images/right_qrcode.png"><div class="r_qr_code" style="display:none;"><div>下载一匡App</div><div><div><img src="./images/qrcode_combine.png"></div></div></div></div><img src="./images/right_arrow.png">');
		$(".right_arrow .right_arrow_qrwrap").hover(function(){
			$(".r_qr_code").show();
		},function(){
			$(".r_qr_code").hide();
		});

		$("footer").append('<div><img src="./images/home/logo.png"></div><div><div><h3>资立方信息科技有限公司</h3><p><span>商务合作: 400 875 9002</span><span>邮箱: info@asset3.com</span></p><p>微信公众号: yk_news</p><p>地址: 北京市朝阳区曙光西里甲5号院凤凰置地广场A座写字楼26层2602室</p></div></div><div><img src="./images/home/qr_code.png"></div>');
	}

});

