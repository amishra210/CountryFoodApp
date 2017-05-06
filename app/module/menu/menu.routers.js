'use strict';

var app = angular.module('com.module.menu', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 /*$urlRouterProvider.otherwise('/');*/

    $stateProvider
    .state('menu', {
      url:'/menu',
      templateUrl: 'module/menu/views/menu.html',
      controller: 'MenuCtrl',
      controllerAs: 'menu'
    });

}]);
