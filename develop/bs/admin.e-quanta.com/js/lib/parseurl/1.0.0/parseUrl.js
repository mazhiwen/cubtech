define(function(require, exports, module) {
	module.exports=parseUrl;
  	function parseUrl(location){
		//var a=window.location.href;
		var b=new RegExp("\\S+\\/(\\S*?)\\.html","g");
		var c=b.exec(location);
		if(c)
		return c[1];
		else
		return false;
  	}
 
});

