define(function(require, exports, module) {
	module.exports=parseString;
  	function parseString(){
		/*var b=new RegExp("\\S+\\/(\\S*?)\\.html","g");
		var c=b.exec(string);
		if(c)
		return c[1];
		else
		return false;
  		*/
  	}

  	parseString.prototype.getNoEmpty=function(str){
  		var s=$.trim(str);
  		if(s.length>0)return s;else return false; 
  	}

 
});

