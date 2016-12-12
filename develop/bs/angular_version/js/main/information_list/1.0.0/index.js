//define(function(require) {
	
/*
	var commonMain=require('commonMain'),
		paging = require('paging'),
		transformTime=new(require('transformTime')),
		table_body=$("#table_body");
	var myPaging=new paging("#paging",MAXPAGING,function(currentPage){
		AJAXMY.send('/info/list',{page:currentPage,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){	
				var s1,s2,type='';
				v['type']==2?(s1='',s2='news_edit',type='要闻'):(s1=transformTime.MSToYMDHMS(v['postTime']),s2='morningpost_edit',type='早报');	
				s+='<tr><td>'+v['id']+'</td><td>'+type+'</td><td>'+v['title']+'</td><td>'+v['editorNickName']+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+s1+'</td><td>'+v['collectNum']+'</td><td>'+v['shareNum']+'</td><td><a href="'+s2+'.html?id='+v['id']+'" class="glyphicon-edit glyphicon"></a> <button class="glyphicon-trash glyphicon onlyicon" data-id="'+v['id']+'"></button></td></tr>';
			});
			table_body.append(s);
			myPaging.refreshDom(d['pages']);
		});
	});
	table_body.on('click','tr>td:nth-child(9)>button:nth-child(2)',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/article/delete',{id:$(this).attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}else{
				alert('删除失败');	
			}
			that.prop('disabled',false);
		});
	});	*/


	//var commonMain=require('commonMain');

	angular
	.module('myNgApp',['ngRoute'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/login',{template:'登陆'})
		.when('/information_list',{template:'信息列表'})
		.otherwise({redirectTo:'/login'});

	}])
	.controller('infoListController',function($scope,$http){
		$http({method:'GET',url:'//testadmin.e-quanta.com/admin/info/list',params:{page:1,size:20}}).success(function(data){
			$scope.objList=data['data']['result'];
			angular.forEach($scope.objList,function(value,key){
				//this['key']=value;
				console.log(value);
				switch(value['type']){
					case 2:
					value['type']='要闻';
					break;
					case 3:
					value['type']='早报';
					break;
				}
			});

		});	
			

	});











//});

