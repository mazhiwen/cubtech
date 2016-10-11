/*
commenedit  以bs 为主    ueditor lib也以bs为主
*/
define(function(require) {

	ue = UE.getEditor('edit',{
		toolbars:[[
		'justifycenter','|','bold','italic','underline','|','insertorderedlist',
		'insertunorderedlist','|','blockquote','simpleupload','link','customstyle','|','autotypeset','pasteplain','preview','source',
		'fullscreen'
		]],
		autoHeightEnabled: true,
		autoFloatEnabled: true,
		initialFrameHeight:400,
		elementPathEnabled:false,
		retainOnlyLabelPasted:true,
		maximumWords:100000,
		topOffset:UEDITORTOPOFFSET,
		autoClearEmptyNode:true,
		insertorderedlist:{
			'decimal': '' ,
		},
		insertunorderedlist:{
			'square': ''
		},
		autotypeset:{
			mergeEmptyline: true, //合并空行
			removeClass: true, //去掉冗余的class
			removeEmptyline:true,//去掉空行
			pasteFilter: false, //根据规则过滤没事粘贴进来的内容
			clearFontSize: true, //去掉所有的内嵌字号，使用编辑器默认的字号
			clearFontFamily: true, //去掉所有的内嵌字体，使用编辑器默认的字体
			removeEmptyNode: true,// 去掉空节点
			removeTagNames:{
			}
		},
		filterTxtRules :
			//默认值：
			function() {
			    function transP(node) {
			        node.tagName = 'p';
			        node.setStyle();
			    }
			    return {
			        //直接删除及其字节点内容
			        '-': 'script style object iframe embed input select',
			        'p': {
			            $: {}
			        },
			        'br': {
			            $: {}
			        },
			        'div': {
			            '$': {}
			        },
			        'li': {
			            '$': {}
			        },
			        'caption': transP,
			        'th': transP,
			        'tr': transP,
			        'h1': transP,
			        'h2': transP,
			        'h3': transP,
			        'h4': transP,
			        'h5': transP,
			        'h6': transP,
			        'section':transP,
			        'td': function(node) {
			            //没有内容的td直接删掉
			            var txt = !! node.innerText();
			            if (txt) {
			                node.parentNode.insertAfter(UE.uNode.createText('    '), node);
			            }
			            node.parentNode.removeChild(node, node.innerText())
			        }
			    }
			}(),
		customstyle:
		//默认值：
		[	
			{
		        tag: 'h1', //tag 使用的标签名字
		        name: '', //
		        label: '早报一级标题', //label 显示的名字也是用来标识不同类型的标识符，注意这个值每个要不同
		        style: 'padding: 50px 0 0 40px;font-size: 25px;background:url("../images/morning_title.png") 0 0/100% 100px no-repeat;width:100%;height:100px;' //style 添加的样式
		    }, //每一个对象就是一个自定义的样式
		    {
		        tag: 'h1',
		        name: 'tl',
		        label: '',
		        style: 'border-bottom:#ccc 2px solid;padding:0 4px 0 0;margin:0 0 10px 0;'
		    }, {
		        tag: 'span',
		        name: 'im',
		        label: '',
		        style: 'font-style:italic;font-weight:bold'
		    }, {
		        tag: 'span',
		        name: 'hi',
		        label: '',
		        style: 'font-style:italic;font-weight:bold;color:rgb(51, 153, 204)'
		    }
		]	
		

	});

});



