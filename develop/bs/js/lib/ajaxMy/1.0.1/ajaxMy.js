define(function(require, exports, module) {

  var $ = require('jquery');
  module.exports=ajaxMy;

  function ajaxMy(urlTail,sendData,successFunction){
	
  	var urlHead='//123.56.237.44:8091/admin';
    $.ajax({

		type:"POST",
		url:urlHead+urlTail,
		data:sendData,
		dataType:"json",
		success:successFunction
	});


		
  }
  
  
  ajaxMy.prototype._init=function(){
	
  }
  
  

  
  



});

