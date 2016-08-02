define(function(require) {
	$=require('jquery');
	var commonMain=require('commonMain'),
		ajaxMy=require('ajaxMy'),
		getGet=require('getGet'),
		uploadFile=require('uploadFile'),
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
		ImageId=null;
	if(id){
		new ajaxMy('/user/edit',{id:id},function(d){
			var d=d['result'];
			user_type.val(d['authV']);
			nick_name.val(d['nickName']);
			summary.val(d['vita']);
			organization.val(d['organization']);
			position.val(d['position']);
			gender.val(d['gender']);
			area_code.val(d['areaCode']);
			phone.val(d['mobile']);
			cover_img.attr('src',d['headPic']);
			confirm_button.click(function(){
				new ajaxMy('/user/update',{
					user_id:id,
					nick_name:nick_name.val(),
					auth_v:user_type.val(),
					area_code:area_code.val(),
					mobile:phone.val(),
					head_pic:cover_img.attr('src'),
					sys_image_id:ImageId,
					organization:organization.val(),
					position:position.val(),
					email:'',
					vita:summary.val(),
					gender:gender.val(),
					status:1,
					flag:1
				},function(d){
					if(d['result']){
						alert('修改成功');
					}else{
						
					}
				});
			});
		});
	}else{
		confirm_button.click(function(){
			new ajaxMy('/user/save',{
				nick_name:nick_name.val(),
				auth_v:user_type.val(),
				area_code:area_code.val(),
				mobile:phone.val(),
				head_pic:cover_img.attr('src'),
				sys_image_id:ImageId,
				organization:organization.val(),
				position:position.val(),
				email:'',
				vita:summary.val(),
				gender:gender.val()
			},function(d){
				if(d['result']) alert('添加成功');
				else alert('添加失败');
				//window.location.reload();
			});
		});
	}
	uploadFile('cover_image_input',1,function(responseUrl,sysImageId){
		cover_img.attr("src",responseUrl);
		ImageId=sysImageId;
	});
});

