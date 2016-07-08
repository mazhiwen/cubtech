define(function(require) {

	$=require('jquery');

	var ue = UE.getEditor('edit',{

		toolbars:[['bold','italic','underline','|','blockquote','insertorderedlist','insertunorderedlist','simpleupload','source']],
		autoHeightEnabled: false,
		autoFloatEnabled: true,
		initialFrameHeight:500,
		elementPathEnabled:false
	});



	ue.ready(function(){

		//var html = ue.getContent();

		//console.log(ue);


	});


	$("#commit-button").click(function(){
		console.log(ue.getContent());
	});


});

