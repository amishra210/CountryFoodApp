'use strict';

var app = angular.module('com.module.user', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 $urlRouterProvider.otherwise('/');

   $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'module/user/views/login.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    });

}]);
