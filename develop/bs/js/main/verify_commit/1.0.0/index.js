define(function(require) {
	
	var	commonMain=require('commonMain'),
		paging = require('paging'),
		parseString = new (require('parseString')),
		verify_type=$(".verify_type"),
		verify_name=$(".verify_name"),
		org_name=$(".org_name"),
		name_txt=$(".name_txt"),
		userId=parseString.getGet('id'),
		sys_image_ids=[];

	function personStyle(){
		getSelectList(1);
		$(".prefer_tag_box").hide();
		$(".introduce_box").hide();
		$(".org_name_box").show();	
		$(".org_type_box").show();
		$(".pos_box").show();
		$(".focus_tag_box").show();
		$(".goog_tag_box").show();
		name_txt.text('姓名');		
		getTag(1);
		getTag(2);
	}
	personStyle();
	
	$(".user_nick_name").text(parseString.getGet('name'));

	verify_type.change(function(){
		var type=$(this).val();
		if(type==1){
			personStyle();
		}else{
			$(".focus_tag_box").hide();
			$(".prefer_tag_box").show();
			$(".introduce_box").show();
			$(".pos_box").hide();
			$(".goog_tag_box").hide();
			$(".org_name_box").hide();
			if(type==2){
				name_txt.text('机构名称');
				$(".org_type_box").show();
				getSelectList(type);
				getTag(3);
			}else{
				name_txt.text('媒体名称');
				$(".org_type_box").hide();
				getTag(4);	
			}
		}
	});
	
	$(".content").on('input','.verify_name,.org_name',function(){
		var apply_type=verify_type.val(),
			verify_name_v=verify_name.val(),
			org_name_v=org_name.val();
		if(parseString.isEmpty([org_name_v,verify_name_v])){
			var sendData={
				user_id:userId,
				apply_type:apply_type,
				nick_name:verify_name_v
			};
			if(apply_type==1){
				sendData['org_name']=org_name_v;
			}
			AJAXMY.send('/certification/validate_name',sendData,function(data){
				if(!data['result']){
					POPUPWINDOW.alert('名称/所属机构不可用');
				}
			});

		}	
		
	});

	
	AJAXMY.upLoadVerify('imgfile',function(data){
		sys_image_ids=[];
		$.each(data,function(key,value){
			sys_image_ids.push(value['id']);
		});
	});


	function getSelectList(type){
		//类别
		AJAXMY.send('/certification/category/select_list',{type:type},function(data){
			var s='<option value=" "> </option>';
			$.each(data['result'],function(key,value){
				s+='<option value="'+value['name']+'">'+value['name']+'</option>';
			})
			$(".org_type").empty().append(s);
		});
	}


	function getTag(type){
		//tag
		AJAXMY.send('/certification/tag/select_list',{type:type},function(data){
			var s='',
				typeStr='';
			if(type==1){
				typeStr='good';
			}else if(type==2){
				typeStr='focus';
			}else{
				typeStr='prefer';
			}
			$.each(data['result'],function(key,value){
				s+='<label><input type="checkbox" value="'+value['name']+'" name="'+typeStr+'_tag">'+value['name']+'</label>';
			});
			$("."+typeStr+"_tag_txt").nextAll().remove();
			$("."+typeStr+"_tag_txt").after(s);
		});
	}
	


	$(".commit").click(function(){
		var apply_type=verify_type.val();
		var sendData={
			user_id:userId,
			apply_type:apply_type,
			nick_name:verify_name.val(),
			sys_image_ids:sys_image_ids.join(',')
		};
		if(apply_type==1){
			sendData['org_name']=org_name.val();
			sendData['category_user']=$(".org_type").val();
			sendData['position']=$(".pos").val();
			var arr=[];
			$("input[name='good_tag']:checked").each(function(key,value){
				arr.push($(this).val());
			});
			sendData['tag_expert']=arr.join('_');
			arr=[];
			$("input[name='focus_tag']:checked").each(function(key,value){
				arr.push($(this).val());
			});
			sendData['tag_focus']=arr.join('_');
		}else{
			sendData['introduce']=$(".introduce").val();
			var arr=[];
			$("input[name='prefer_tag']:checked").each(function(key,value){
				arr.push($(this).val());
			});
			sendData['tag_preference']=arr.join('_');
			if(apply_type==2){
				sendData['category_org']=$(".org_type").val();
			}
		}
		
		AJAXMY.send('/certification/save',sendData,function(data){
			if(data['result']){
				POPUPWINDOW.alert('成功',function(){
					window.location.href='user_list.html';
				});	
			}else{
				POPUPWINDOW.alert('失败');
			}
		});

	});



	
});

