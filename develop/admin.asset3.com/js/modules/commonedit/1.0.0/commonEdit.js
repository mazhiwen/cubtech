/*
commenedit  以bs 为主    ueditor lib也以bs为主
*/
define(function(require) {

	ue = UE.getEditor('edit',{
		toolbars:[[
		'justifyleft','justifycenter','|','bold','italic','underline','fontsize','forecolor','|','insertorderedlist',
		'insertunorderedlist','|','blockquote','simpleupload','link','customstyle','|','autotypeset','pasteplain','preview','source',
		'fullscreen'
		]],
		initialFrameWidth:600,
		autoHeightEnabled: true,
		autoFloatEnabled: true,
		initialFrameHeight:1000,
		elementPathEnabled:false,
		retainOnlyLabelPasted:false,
		maximumWords:100000,
		topOffset:UEDITORTOPOFFSET,
		autoClearEmptyNode:true,
		pasteplain:true,
		zIndex:50,
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
		//removeFormatTags:'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var',
		filterTxtRules :
			//默认值：
			function() {
			    function transP(node) {
			        node.tagName = 'p';
			        node.setStyle();
			    }
			    function removeAttr(node) {
			        console.log(node);
			        node.attrs.class="";
			        //node.tagName = 'p';
			        //node.setStyle();
			    }
			    return {
			        'p': {
			        	'$':{}
			        },
			        'img': {
			            'src': {}
			        },
			        'blockquote':{
			        	'$':{}
			        },
			        'strong':{
			        	'$':{}
			        },
			        'b':{
			        	'$':{}
			        },
			        'h1':{
			        	'$':{}
			        },
			        'h2':{
			        	'$':{}
			        },
			        'h3':{
			        	'$':{}
			        },
			        'h4':{
			        	'$':{}
			        },
			        'h5':{
			        	'$':{}
			        },
			        'h6':{
			        	'$':{}
			        }
			        /*'a': removeAttr,
					
			        blockquote: removeAttr,
		            h1:     removeAttr,
		            h2:     removeAttr,
		            h3:     removeAttr,
		            h4:     removeAttr,
		            h5:     removeAttr,
		            h6:     removeAttr,
		            ul:     removeAttr,
		            li:     removeAttr,
		            ol:     removeAttr,
		            p:      removeAttr,
		            strong: removeAttr,
		            em: removeAttr,
		            span: removeAttr,
		            table:{
		            }, 
		            tbody:{
		            },
		            td:{
		            },
		            tfoot:{
		            },
		            th:{
		            },
		            tr:{
		            }*/
			        /*'caption': transP,
			        'th': transP,
			        'tr': transP,
			        'h1': transP,
			        'h2': transP,
			        'h3': transP,
			        'h4': transP,
			        'h5': transP,
			        'h6': transP,
			        'section':transP,
			        'strong':transP,*/
			        /*'td': function(node) {
			            //没有内容的td直接删掉
			            var txt = !! node.innerText();
			            if (txt) {
			                node.parentNode.insertAfter(UE.uNode.createText('    '), node);
			            }
			            node.parentNode.removeChild(node, node.innerText())
			        }*/
			    }
			}(),
		customstyle:
		//默认值：
		[	
			{
		        tag: 'h1', //tag 使用的标签名字
		        name: '', //
		        label: '早报一级标题', //label 显示的名字也是用来标识不同类型的标识符，注意这个值每个要不同
		        style: 'box-sizing:border-box;margin-left: 0;margin-right: 0;padding: 22px 0 0 3.5%;font-size: 15px;background:url("https://admin.e-quanta.com/images/morning_title.png") 0 0/100% 100% no-repeat;width:100%;height:48px;' //style 添加的样式
		    }, //每一个对象就是一个自定义的样式
		    {
		        tag: 'p',
		        name: '',
		        label: '早报段落',
		        style: 'background:url("https://admin.e-quanta.com/images/morning_t2.png") 0 6px /15px 15px no-repeat;padding-left:20px;'
		    },
		    {
		        tag: 'h1', 
		        name: '', 
		        label: '标题一', 
		        style: 'font-size: 2.1em;'
		    },
		    {
		        tag: 'h2', 
		        name: '', 
		        label: '标题二', 
		        style: 'font-size: 1.9em;'
		    },
		    {
		        tag: 'h3', 
		        name: '', 
		        label: '标题三', 
		        style: 'font-size: 1.6em;'
		    },
		    {
		        tag: 'h4', 
		        name: '', 
		        label: '标题四', 
		        style: 'font-size: 1.3em;'
		    },
		    {
		        tag: 'h5', 
		        name: '', 
		        label: '标题五', 
		        style: 'font-size: 1em;'
		    },
		    {
		        tag: 'h6', 
		        name: '', 
		        label: '标题六', 
		        style: 'font-size: 0.7em;'
		    },
		    {
		        tag: 'p',
		        name: '',
		        label: '正文段落',
		        style: ''
		    }
		]	
		

	});

});



