define(function(require, exports, module) {

  var $ = require('jquery');
  module.exports=transformTime;

  function transformTime(millisecond){
	
  }
  
  transformTime.prototype.MSTo=function(millisecond){
  		var o=new Date(millisecond);
  		var y=o.getFullYear();
  		var m=o.getMonth()>9?o.getMonth():'0'+o.getMonth();
  		var d=o.getDate()>9?o.getDate():'0'+o.getDate();
  		var h=o.getHours()>9?o.getHours():'0'+o.getHours();
  		var min=o.getMinutes()>9?o.getMinutes():'0'+o.getMinutes();
  		var s=o.getSeconds()>9?o.getSeconds():'0'+o.getSeconds();
  		return y+'-'+m+'-'+d+' '+h+':'+min+':'+s;
  }

});

