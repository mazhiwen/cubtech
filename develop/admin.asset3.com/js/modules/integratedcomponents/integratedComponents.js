define(function(require, exports, module) {
	module.exports=integratedComponents;

	function integratedComponents(){

	}


	integratedComponents.prototype.click=function(dom,clickFn){
		//var tthis=$(domSelector);
		dom.click(function(event){
			dom.prop('disabled',true);
			clickFn.call(this,event);
		});
  	}


  	integratedComponents.prototype.enabledDom=function(dom){
  		dom.prop('disabled',false);
  		//3+4*9
  		//3 4 9
  		//+ *
  		//9 4 * 3 + 
  		//(3+4)*9
  		//(3  4)  9
  		//+ *
  		// 4 3+ 9 * 
  	}

	
});

