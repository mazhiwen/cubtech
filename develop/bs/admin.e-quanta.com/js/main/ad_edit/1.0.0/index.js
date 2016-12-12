define(function(require) {
	var	commonMain=require('commonMain'),
		getGet=require('getGet'),
		name=$("#name"),
		cover_img=$("#cover_img"),
		sn=$("#sn"),
		url=$("#url"),
		target_id=$("#target_id"),
		type=$("#type"),
		commit_button=$("#commit_button"),
		targetid_outer=$("#targetid_outer"),
		url_span=$("#url_span"),
		id=getGet('id'),
		ImageId=null;
	if(id){
		AJAXMY.send('/banner/get_banner',{banner_id:id},function(d){
			var d=d['result'];
			name.val(d['title']);
			url.val(d['actionUrl']);
			sn.val(d['priority']);
			cover_img.attr('src',d['bgPic']);
			type.val(d['action']);
			ImageId=d['sysImageId'];
			if (type.val()==3){
				url_span.text('链接:');
			}else{
				url_span.text('目标ID:');
			}
		});
		commit_button.click(function(){
			$(this).prop('disabled',true);
			var that=$(this);
			AJAXMY.send(
				'/banner/update',
				{
					id:id,
					title:name.val(),
					desc:'两两说不要描述',
					bg_pic:cover_img.attr('src'),
					sys_image_id:ImageId,
					priority:sn.val(),
					action:type.val(),
					action_url:url.val()	
				},
				function(d){
					if(d['result']) alert('编辑成功');
					that.prop('disabled',false);
				}
			);
		});
	}else{

		/*
		commit_button.click(function(){
			$(this).prop('disabled',true);
			var that=$(this);
			AJAXMY.send(
				'/banner/insert',
				{
					title:name.val(),
					desc:'两两说不要描述',
					bg_pic:cover_img.attr("src"),
					sys_image_id:ImageId,
					priority:sn.val(),
					action:type.val(),
					action_url:url.val()
				},
				function(d){
					if(d['result']) alert('添加成功');
					that.prop('disabled',false);
				}
			);
		});*/	
	}
	AJAXMY.upLoad('cover_image_input',function(responseUrl,sysImageId){
		cover_img.attr("src",responseUrl);
		ImageId=sysImageId;
	},3);
	type.change(function(){
		if (type.val()==3){
			url_span.text('链接:');
		}else{
			url_span.text('目标ID:');
		}
	});


	angular.module('ngApp',[]).controller('searchController',function($scope,$http){
		$scope.list=[
			{
				name:'1',
				city:'11'
			},
			{
				name:'2',
				city:'22'
			}
		];

		$scope.search=function(){
			//$http.get("./test.php").success(function (response) {$scope.names = response.sites;});
			$http({

				method:'POST',
				url:'./test.php',
				data:{key:'ssss'},
				headers:{
        			'Content-Type': 'application/x-www-form-urlencoded'
    			}
				//params:{'key':'ssss'}
				,responseType:'json'

			}).success(function(d){
				$scope.list=d;
			}).then(function(r){console.log(r);});
		};

	});

});

