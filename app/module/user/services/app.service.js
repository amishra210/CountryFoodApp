'use strict';

var app = angular.module('com.module.user');

app.service('AppService', function () {

 // var catagoryURL = "http://ec2-52-24-151-211.us-west-2.compute.amazonaws.com:8080/SpringRestSecurityOauth";

  var catagoryURL = "http://localhost:8080/SpringRestSecurityOauth";

    this.getWebUrl = function () {
      return catagoryURL;
    };

});





