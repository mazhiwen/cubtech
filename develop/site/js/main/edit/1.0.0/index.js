//seajs.use("./js/modules/commonedit/1.0.0/commonEdit");
define(function(require) {
	new require('commonEdit');
	var $=require('jquery');
	$=jQuery;
	var	commonMain=new(require('commonMain')),
		mustLogin=(require('mustLogin'))(),
		ajaxMy=new(require('ajaxMy')),
		getGet=require('getGet'),
		transformTime=new(require('transformTime')),
		id=getGet('id'),
		title=$("#title"),
		input_file_outer=$("#input_file_outer"),
		summary_text=$("#summary_text"),
		type=$("#type"),
		send_button=$("#send_button"),
		cover_img=$("#cover_img"),
		add_img_outer=$("#add_img_outer"),
		delete_img=$("#delete"),
		imageId='';
	add_img_outer.hide();	
	ue.ready(function(){
		if(id){
			ajaxMy.send('/article/edit',{id:id},function(d){
				var dr=d['result'];
				title.val(dr['title']);
				ue.setContent(dr['content']);
				if(dr['coverPic']){
					imageId=dr['sysImageId'];
					add_img_outer.show();
					cover_img.attr("src",dr['coverPic']);
				}else{
					add_img_outer.hide();
				}
				summary_text.val(dr['summary']);
				var s='';
				$.each(d['categoryList'],function(k,v){
					if(dr['categoryCode']==k)
					s+='<option value="'+k+'" selected>'+v+'</option>';
					else
					s+='<option value="'+k+'">'+v+'</option>';	
				});
				type.append(s);
			});
			send_button.click(function(){
				$(this).prop('disabled',true);var that=$(this);
				ajaxMy.send('/article/update',{
					id:id,
					title:title.val(),
					summary:summary_text.val(),
					sys_image_id:imageId,
					cover_pic:cover_img.attr("src"),
					content:ue.getContent(),
					category_code:type.val()
				},function(d){
					if(d['result']) popUpWindow.alert('编辑成功',function(){});
					else popUpWindow.alert('编辑失败',function(){});
					that.prop('disabled',false);
				});
			});
		}else{
			ajaxMy.send('/category/select_list',{},function(d){
				d=d['result'];
				var s='';
				$.each(d,function(k,v){
					s+='<option value="'+k+'">'+v+'</option>';
				});
				type.append(s);
			});
			send_button.click(function(){
				$(this).prop('disabled',true);var that=$(this);
				ajaxMy.send('/article/save',{
					title:title.val(),
					summary:summary_text.val(),
					sys_image_id:imageId,
					cover_pic:cover_img.attr("src"),
					content:ue.getContent(),
					category_code:type.val()
				},function(d){
					if(d['result']) popUpWindow.alert('添加成功',function(){});
					else popUpWindow.alert('添加失败',function(){});
					that.prop('disabled',false);
				});
			});
		}
	});


	ajaxMy.upLoad('input_file',function(responseUrl,sysImageId){
		add_img_outer.show();
		cover_img.attr("src",responseUrl);
		imageId=sysImageId;
	},1);
	delete_img.click(function(){
		cover_img.attr("src",'');
		add_img_outer.hide();
		imageId='';
	});	
});

