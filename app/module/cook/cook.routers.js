'use strict';

var app = angular.module('com.module.cook', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 /*$urlRouterProvider.otherwise('/');*/

    $stateProvider
    .state('cook', {
      url:'/',
      templateUrl: 'module/cook/views/cook.html',
      controller: 'CookCtrl',
      controllerAs: 'cook'
    });

}]);
