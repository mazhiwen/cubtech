define(function(require,exports,module) {
	module.exports=popUpWindow;
	function popUpWindow(){
		$('body').after('<div id="popupwin_bac" style="display: none;"></div>');
		this.puwb=$("#popupwin_bac");
		/*
		盒子右上角 x 功能
		*/
		$('html').on('click','#popupwin_bac>div>div:nth-child(1)>span',function(e){
			$("#popupwin_bac").hide();
		});
	}
	popUpWindow.prototype.initPUW=function(){
		$('body').addClass('stop_scroll');
		this.puwb.find("*").remove();
		this.puwb.show();
	}
	popUpWindow.prototype.confirm=function(title,content,yesFunction,noFunction){
		var tthis=this;
		this.initPUW();
		this.puwb.append('<div id="popupwin"><div>'+title+'<span style="display:none;"></span></div><div>'+content+'</div><div><button>取消</button><button>确认</button></div></div>');
		$('#popupwin>div:nth-child(3)>button:nth-child(2)').click(function(e){
			console.log('确认');
			//var thisWindow=tthis.puwb; 
			//tthis.puwb.hide();
			//$('body').removeClass('stop_scroll');
			//hideWindow();

			yesFunction.call(this);
		});
		$('#popupwin>div:nth-child(3)>button:nth-child(1)').click(function(e){
			tthis.puwb.hide();
			$('body').removeClass('stop_scroll');
			noFunction.call(this);
		});
	}

	popUpWindow.prototype.hide=function(){
		this.puwb.hide();
		$('body').removeClass('stop_scroll');
	}

	popUpWindow.prototype.alert=function(content,yesFunction){
		var tthis=this;
		/*
		如果当前没有弹出层
		*/
		if(this.puwb.css("display")=='none'){
			this.initPUW();
			this.puwb.append('<div id="popupwin"><div>提示<span style="display:none;"></span></div><div>'+content+'</div><div><button>确认</button></div></div>');
			$('#popupwin>div:nth-child(3)>button:nth-child(1)').click(function(){
				tthis.puwb.hide();
				$('body').removeClass('stop_scroll');
				yesFunction&&yesFunction.call(this);
			});
		}
		/*
		当前有弹出层，给当前弹出层按钮 添加事件
		*/
		else{
			$('#popupwin>div:nth-child(3)>button:nth-child(1)').click(function(){
				tthis.initPUW();
				tthis.puwb.append('<div id="popupwin"><div>提示<span style="display:none;"></span></div><div>'+content+'</div><div><button>确认</button></div></div>');
				$('#popupwin>div:nth-child(3)>button:nth-child(1)').click(function(){
					tthis.puwb.hide();
					$('body').removeClass('stop_scroll');
					yesFunction&&yesFunction.call(this);
				});
			});
		}
	}
});


