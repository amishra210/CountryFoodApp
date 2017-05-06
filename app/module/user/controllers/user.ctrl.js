'use strict';

angular.module('com.module.user')
    .controller('UserCtrl', UserCtrl);

UserCtrl.$inject = ["$scope", "UserService", "CoreService", "$rootScope"];

function UserCtrl($scope, UserService, CoreService,  $rootScope) {
   $rootScope.isUser = true;
}