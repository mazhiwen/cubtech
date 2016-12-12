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
		add_tag_wrap=$('.add_tag_wrap');

	function generateTagWrapHtml(txt,className,keywordObj){
		var keyWordHtml='',html='';
		$.each(keywordObj,function(k,v){
			keyWordHtml+='<span class="keyword">'+v+'<span class="glyphicon"></span></span>';
		});
		html='<div class="form-input tag_wrap '+className+'"><span>'+txt+'</span><div>'+keyWordHtml+'<div class="add_tag_wrap"><input type="text" class="add_tag_input"><span class="add_tag_btn" class="glyphicon"></span></div></div></div>';
		upload_preview.before(html);
	}	


	if(id){
		AJAXMY.send('/user/edit',{id:id},function(d){
			var d=d['result'];
			user_type.val(d['applyType']);
			nick_name.val(d['nickName']);
			summary.val(d['vita']);
			organization.val(d['organization']);
			position.val(d['position']);
			gender.val(d['gender']);
			area_code.val(d['areaCode']);
			phone.val(d['mobile']);
			cover_img.attr('src',d['headPic']);

			switch(d['applyType']){
				case 0:
				generateTagWrapHtml('擅长领域','tag_wrap_expert',d['tag_expert']);
				generateTagWrapHtml('关注领域','tag_wrap_focus',d['tag_focus']);
				generateTagWrapHtml('偏好领域','tag_wrap_preference',d['tag_preference']);
				break;
				case 1:
				generateTagWrapHtml('擅长领域','tag_wrap_expert',d['tag_expert']);
				generateTagWrapHtml('关注领域','tag_wrap_focus',d['tag_focus']);	
				break;
				case 2:
				generateTagWrapHtml('偏好领域','tag_wrap_preference',d['tag_preference']);
				break;
				case 3:
				generateTagWrapHtml('偏好领域','tag_wrap_preference',d['tag_preference']);
				break;
			}
			
			confirm_button.click(function(){
				AJAXMY.send('/user/update',{
					user_id:id,
					nick_name:nick_name.val(),
					//////////////auth_v:user_type.val(),
					//area_code:area_code.val(),
					//mobile:phone.val(),
					//head_pic:cover_img.attr('src'),
					//organization:organization.val(),
					//position:position.val(),
					//email:'',
					vita:summary.val(),
					//gender:gender.val(),
					//status:1,
					//flag:1

				},function(d){
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
	}/*else{
		confirm_button.click(function(){
			AJAXMY.send('/user/save',{
				nick_name:nick_name.val(),
				auth_v:user_type.val(),
				area_code:area_code.val(),
				mobile:phone.val(),
				head_pic:cover_img.attr('src'),
				organization:organization.val(),
				position:position.val(),
				email:'',
				vita:summary.val(),
				gender:gender.val()
			},function(d){
				if(d['result']) alert('添加成功');
			});
		});
	}*/


	//关键字删除事件
	tag_wrap.on('click','.keyword>.glyphicon',function(){
		$(this).parent().remove();
	});
	//关键字添加
	add_tag_btn.click(function(){
		add_tag_wrap.before('<span class="keyword">'+add_tag_input.val()+'<span class="glyphicon"></span></span>');
	});
	
});

