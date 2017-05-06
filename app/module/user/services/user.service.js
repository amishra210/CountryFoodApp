'use strict';

var app = angular.module('com.module.user');

app.service('UserService', ["$http", "$q", function ($http, $q) {

    //var userURL = 'rest/user';
    var userURL = 'http://ec2-52-24-151-211.us-west-2.compute.amazonaws.com:8080/SpringRestSecurityOauth/rest/user';
    
    this.add = function (user) {
        return $http.post(userURL + '/add',user);
    };

     this.get = function (pageno) {
        return $http.get(userURL + '/userlist?pageno='+pageno);
    };

     this.edit = function (user) {
        return $http.post(userURL + '/edit',user);
    };

      this.delete = function (id) {
        return $http.post(userURL + '/delete?id='+id);
    };

}]);
