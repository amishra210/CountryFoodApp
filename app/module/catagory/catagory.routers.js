'use strict';

var app = angular.module('com.module.catagory', []);

app.config(["$stateProvider",  "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	 /*$urlRouterProvider.otherwise('/');*/

    $stateProvider
    .state('catagory', {
      url:'/catagory',
      templateUrl: 'module/catagory/views/catagory.html',
      controller: 'CatagoryCtrl',
      controllerAs: 'catagory'
    })

}]);
