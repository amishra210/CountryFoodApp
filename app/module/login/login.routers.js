'use strict';

var app = angular.module('com.module.cook', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 /*$urlRouterProvider.otherwise('/');*/

    $stateProvider
    .state('login', {
      url:'/',
      templateUrl: 'module/login/views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    });

}]);
