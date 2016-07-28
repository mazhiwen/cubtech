define(function(require, exports, module) {
  module.exports=ajaxMy;

  function ajaxMy(urlTail,sendData,successFunction){
  	var urlHead='//123.56.237.44:8091';
    $.ajax({

		type:"POST",
		url:urlHead+urlTail,
		data:sendData,
		dataType:"json",
		success:function(d){
			if(d['sys']==200){
				if(d['code']==0){
					successFunction.call(this,d['data']);
				}
				else{
					//alert('操作失败：'+d['desc']);
					successFunction.call(this,false);
				}
			}else{
				alert('操作失败：Nancy今天不开心，拒绝操作');

			}

		}
	});


		
  }
  
});

