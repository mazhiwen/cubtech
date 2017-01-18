define(function(require,exports,module) {
	module.exports=commonMain;
	function commonMain(){

		var 
		nav_active=$(".nav_active");
		//require('jquery');
		require('zepto');
		//$=jQuery;
		$=Zepto;
		//require('jqueryMobile');
		AJAXMY=new(require('ajaxMy'));
		popUpWindow=new(require('popUpWindow'));


		

		$(".banner").prepend('<div class="banner_top"><a href="home.html"><img src="images/logo.png"></a><div class="nav_box"><ul class="nav"><li><a href="home.html">首页</a></li><li><a href="http://www.e-quanta.com">立方社区</a></li><li><a href="dynamic.html">立方动态</a></li><li><a href="thinktank.html">立方智库</a></li><li><a href="product.html">立方产品</a></li><li><a href="aboutus.html">关于我们</a></li><li><a href="http://www.gaa100.org/">百人会</a></li><li><a href="http://en.asset3.com/">EN</a></li></ul><button class="awesome_icon nav_active"></button></div></div>');


		$(".footer_box").append('<div><div><div><h3>北京（总部）</h3><p class="wechat_phone">电话：+86 10 8455 4959</p><p>地址：北京市朝阳区曙光西里甲5号院凤凰置地广场A座写字楼26层2602室</p></div><div><h3>上海</h3><p class="wechat_phone">电话: +86 21 6056 2304</p><p>地址：上海市普陀区武宁路99号我格广场1173室</p></div><div><h3>纽约</h3><p></p><p>地址：纽约市花园大道375号2607室 10152</p></div><div><h3>加利福尼亚</h3><p></p><p>地址：纽波特海滩麦克阿瑟法院4695号430室 92660</p></div></div><div><span>邮件：info@asset3.com(咨询)</span><span>hr@asset3.com(招聘)</span><span>2015资立方@copyright</span><a href="http://www.miit.gov.cn/" class="to_beian">京ICP备15064570号</a><span>客服电话：400 875 9002</span></div></div><div><img src="./images/home/qrcode.jpg"></div>');
		var showNavFlag=false;

		$('body').on('click','.nav_active',function(){
			if(showNavFlag){
				$(".nav_box").addClass('color_transparent');
				$(".nav_box").removeClass('color_white navbox_width');
				$(".nav").hide();
				showNavFlag=false;
			}else{
				$(".nav_box").removeClass('color_transparent ');
				$(".nav_box").addClass('color_white navbox_width');
				$(".nav").show();
				showNavFlag=true;
			}
		});

		var bannerLeft=84;
		$(".banner").swipeLeft(function(){
			if(bannerLeft!=(-420)){
				bannerLeft-=84;
				$(".nav>li:nth-child(n+2)").css("left",bannerLeft+'px');
			}
			
		});

		$(".banner").swipeRight(function(){
			if(bannerLeft!=84){
				bannerLeft+=84;
				$(".nav>li:nth-child(n+2)").css("left",bannerLeft+'px');
			}
			
		});

	}
	



	
});

