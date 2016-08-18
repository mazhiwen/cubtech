define(function(require) {

	ue = UE.getEditor('edit',{
		toolbars:[[
		'justifycenter','|','bold','italic','underline','|','insertorderedlist',
		'insertunorderedlist','|','blockquote','simpleupload','|','pasteplain','preview','source',
		'fullscreen'
		]],
		autoHeightEnabled: true,
		autoFloatEnabled: true,
		initialFrameHeight:400,
		elementPathEnabled:false,
		retainOnlyLabelPasted:true,
		maximumWords:100000,
		topOffset:UEDITORTOPOFFSET,
		insertorderedlist:{
			'decimal': '' ,
		},
		insertunorderedlist:{
			'square': ''
		},
		autotypeset:{
			mergeEmptyline: true, //合并空行
			removeClass: true, //去掉冗余的class
			clearFontSize: true, //去掉所有的内嵌字号，使用编辑器默认的字号
			clearFontFamily: true, //去掉所有的内嵌字体，使用编辑器默认的字体
			removeEmptyNode: true// 去掉空节点
		}

	});

});

