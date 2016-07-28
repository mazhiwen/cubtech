define(function(require,exports,module) {
	module.exports=popUpWindow;
	//var $ = require('jquery');
	function popUpWindow(){
		$('body').after('<div id="popupwindow" style="display: none;"></div>');
		$('html').on('click','#popupwindow_confirm>div:nth-child(1)>span',function(e){
			$("#popupwindow").hide();
		});


	}

	popUpWindow.prototype.confirm=function(title,content,yesFunction,Nofunction){
		
		$("#popupwindow").empty();
		$("#popupwindow").show();
		$('#popupwindow').append('<div id="popupwindow_confirm"><div>'+title+'<span></span></div><div>'+content+'</div><div><button>取消</button><button>确认</button></div></div>');
		$('html').on('click','#popupwindow_confirm>div:nth-child(3)>button:nth-child(2)',function(e){
			yesFunction.call(this);
		});
		$('html').on('click','#popupwindow_confirm>div:nth-child(3)>button:nth-child(1)',function(e){
			Nofunction.call(this);
		});

	}

});



