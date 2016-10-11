define(function(require,exports,module) {
	module.exports=toTop;
	function toTop(){
		/*右侧回到顶部事件*/
	    $(".right_arrow>img:nth-child(2)").click(function(){
			window.scrollTo(0,0);	
		});
	}
});



