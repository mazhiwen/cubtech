define(function(require, exports, module) {

  var $ = require('jquery');
  module.exports=transformTime;

  function transformTime(millisecond){
	
  }
  
  transformTime.prototype.MSTo=function(millisecond){
 		//console.log(millisecond);
  		//console.log(new Date(millisecond).toDateString());
  		return new Date(millisecond).toLocaleString();
  }

});

