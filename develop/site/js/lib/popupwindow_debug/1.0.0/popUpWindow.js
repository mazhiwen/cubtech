define(function(require,exports,module) {
	module.exports=popUpWindow;
	//var $ = require('jquery');
	function popUpWindow(){
		$('body').after('<div id="popupwindow" style="display: none;"></div>');
		$('html').on('click','#popupwindow_confirm>div:nth-child(1)>span',function(e){
			$("#popupwindow").hide();
		});
	}

	popUpWindow.prototype.confirm=function(title,content,yesFunction,noFunction){
		$('body').addClass('stop_scroll');
		$("#popupwindow").find("*").remove();
		$("#popupwindow").show();
		$('#popupwindow').append('<div id="popupwindow_confirm"><div>'+title+'<span style="display:none;"></span></div><div>'+content+'</div><div><button>取消</button><button>确认</button></div></div>');
		$('#popupwindow_confirm>div:nth-child(3)>button:nth-child(2)').click(function(e){
			yesFunction.call(this);
		});
		$('#popupwindow_confirm>div:nth-child(3)>button:nth-child(1)').click(function(e){
			$("#popupwindow").hide();
			$('body').removeClass('stop_scroll');
			noFunction.call(this);
		});
	}


	popUpWindow.prototype.alert=function(content,yesFunction){
		$('body').addClass('stop_scroll');
		$("#popupwindow").find("*").remove();
		$("#popupwindow").show();
		$('#popupwindow').append('<div id="popupwindow_confirm"><div>提示<span style="display:none;"></span></div><div>'+content+'</div><div><button>确认</button></div></div>');
		$('#popupwindow_confirm>div:nth-child(3)>button:nth-child(1)').click(function(){
			$("#popupwindow").hide();
			$('body').removeClass('stop_scroll');
			yesFunction.call(this);
		});
	}

});



