angular
.module('myNgApp',['ui.router','mainContent'])
.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.when("", "/login");
	$stateProvider
	.state('login',{
		url:'/login',
		templateUrl:'views/login.html'
	})
	.state('main',{
		url:'/main',
		templateUrl:'views/main.html'
	})
	.state('main.information_list',{
		url:'/information_list',
		templateUrl:'views/information_list.html',
		controller:'informationListController'
	});

})

/*
angular
.module('commonMain',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/login',{
		template:''
	})
	.otherwise({
		templateUrl:'views/top_main.html'
	});

}]);*/
/*
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
		

})*/

angular
.module('mainContent',[])
.controller('informationListController',function($scope,$http){
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