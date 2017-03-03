define(function(require) {
	require('zepto');
	POPUPWINDOW=new(require('popUpWindow'));
	AJAXMY=new(require('ajaxMy'))(REQUESTHEAD,['/admin','/app'],{});
});

