define(function(require, exports, module) {
  var $ = require('jquery');
  module.exports=ajaxMy;
  function ajaxMy(urlTail,sendData,successFunction){
    $.ajax({
		type:"POST",
		url:REQUESTDOMAIN+'/admin'+urlTail,
		data:sendData,
		dataType:"json",
		traditional:true,
		success:function(d){
			if(d['sys']==200){
				if(d['code']==0){
					successFunction.call(this,d['data']);
				}
				else{
					alert('操作失败：'+d['desc']);
					successFunction.call(this,false);
				}
			}else{
				alert('操作失败：Nancy今天不开心，拒绝操作');
			}
		}
	});	
  }
});

