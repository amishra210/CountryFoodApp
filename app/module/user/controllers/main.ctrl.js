'use strict';

angular.module('com.module.user')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ["$scope", "UserService", "CoreService"];

function MainCtrl($scope, UserService, CoreService) {

$scope.menuName = "menuSample";
$scope.defaultIcon = 'icons-medium empty';
$scope.rtl = false;
$scope.data = 
        [
           {id: 1,text: "Cooks",icon: "icons-medium library"},	
           {id: 2,text: "Menu Catagory",icon: "icons-medium library"},
           {id: 3,text: "Menu",icon: "icons-medium library"},
           {id: 4,text: "special Item",icon: "icons-medium library"}
        ];

}