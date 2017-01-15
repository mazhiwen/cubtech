define(function(require) {
	
	var commonMain=require('commonMain'),
		
		getGet=require('getGet'),
		id=getGet('id'),
		user_type=$('#user_type'),
		nick_name=$('#nick_name'),
		cover_img=$("#cover_img"),
		summary=$('#summary'),
		phone=$('#phone'),
		confirm_button=$('#confirm_button'),
		area_code=$('#area_code'),
		organization=$('#organization'),
		position=$('#position'),
		gender=$('#gender'),
		tag_wrap=$('.tag_wrap'),
		add_tag_input=$('.add_tag_input'),
		add_tag_btn=$('.add_tag_btn'),
		upload_preview=$('.upload_preview'),
		add_tag_wrap=$('.add_tag_wrap');

	function generateTagWrapHtml(txt,className,keywordObj){
		var keyWordHtml='',html='';
		console.log(keywordObj);
		$.each(keywordObj,function(k,v){
			keyWordHtml+='<span class="keyword">'+v+'<span class="glyphicon"></span></span>';
		});
		html='<div class="form-input tag_wrap '+className+'"><span>'+txt+'</span><div>'+keyWordHtml+'<div class="add_tag_wrap"><input type="text" class="add_tag_input"><span class="add_tag_btn" class="glyphicon"></span></div></div></div>';
		console.log(html);
		upload_preview.before(html);
	}	


	if(id){
		AJAXMY.send('/user/edit',{id:id},function(d){
			var d=d['result'];
			user_type.val(d['applyType']);
			nick_name.val(d['nickName']);
			summary.val(d['vita']);
			organization.val(d['orgName']);
			position.val(d['position']);
			//gender.val(d['gender']);
			area_code.val(d['areaCode']);
			phone.val(d['mobile']);
			cover_img.attr('src',d['headPic']);

			switch(d['applyType']){
				case 0:
				generateTagWrapHtml('擅长领域','tag_wrap_expert',d['tagExpertInfo']);
				generateTagWrapHtml('关注领域','tag_wrap_focus',d['tagFocusInfo']);
				break;
				case 1:
				generateTagWrapHtml('擅长领域','tag_wrap_expert',d['tagExpertInfo']);
				generateTagWrapHtml('关注领域','tag_wrap_focus',d['tagFocusInfo']);	
				break;
				case 2:
				generateTagWrapHtml('偏好领域','tag_wrap_preference',d['tagPreferenceInfo']);
				break;
				case 3:
				generateTagWrapHtml('偏好领域','tag_wrap_preference',d['tagPreferenceInfo']);
				break;
			}
			
			confirm_button.click(function(){

				var data={
					user_id:id,
					nick_name:nick_name.val(),
					vita:summary.val()
				};
				function getTagArray(className,key){
					var arr=[];
					$(className+" .keyword").each(function(index,ele){
						arr.push($(this).text());
					});
					data[key]=arr.join('_');
				}
				switch(d['applyType']){
					case 0:
					getTagArray('.tag_wrap_expert','tag_expert');
					getTagArray('.tag_wrap_focus','tag_focus');
					break;
					case 1:
					getTagArray('.tag_wrap_expert','tag_expert');
					getTagArray('.tag_wrap_focus','tag_focus');	
					break;
					case 2:
					getTagArray('.tag_wrap_preference','tag_preference');	
					break;
					case 3:
					getTagArray('.tag_wrap_preference','tag_preference');
					break;
				}
				AJAXMY.send('/user/update',data,function(d){
					if(d['result']){
						alert('修改成功');
					}
				});
			});
		});
		AJAXMY.upLoadUserPic('cover_image_input',function(responseUrl){
			if(responseUrl){
				cover_img.attr("src",responseUrl);	
			}else{
				alert('失败');
			}
			
		},id);
	}else{
		POPUPWINDOW.alert("不支持添加用户，只支持编辑",function(){
			window.location.href='user_list.html';
		});
	}


	//关键字删除事件
	$('body').on('click','.tag_wrap .keyword>.glyphicon',function(){
		$(this).parent().remove();
	});
	//关键字添加
	$('body').on('click','.add_tag_btn',function(){

		$(this).parent().before('<span class="keyword">'+$(this).prev().val()+'<span class="glyphicon"></span></span>');

	});
	
});

