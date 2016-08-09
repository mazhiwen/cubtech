define(function(require) {

	ue = UE.getEditor('edit',{

		toolbars:[[
		'bold','italic','underline','|','blockquote','insertorderedlist',
		'insertunorderedlist','simpleupload','source','pasteplain','preview',
		'justifycenter','fullscreen'

		]],
		autoHeightEnabled: false,
		autoFloatEnabled: true,
		initialFrameHeight:800,
		elementPathEnabled:false,
		retainOnlyLabelPasted:true
	});



	
});

