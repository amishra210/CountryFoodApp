'use strict';

var app = angular.module('com.module.catagory');

app.service('CatagoryService', ["$http", "$q", "AppService",function ($http, $q,AppService) {

    //var catagoryURL = "http://ec2-52-24-151-211.us-west-2.compute.amazonaws.com:8080/SpringRestSecurityOauth/cms/menucatagory";

    var catagoryURL = AppService.getWebUrl()+"/cms/menucatagory"

    this.add = function (catagory) {
        return $http.post(catagoryURL + '/add',catagory);
    };

   this.getCatagoryList = function (pageno) {
        return $http.get(catagoryURL + '/catagorylist?pageno='+pageno);
    };

   this.edit = function (catagory) {
        return $http.post(catagoryURL + '/edit',catagory);
    };

    this.delete = function (id) {
        return $http.post(catagoryURL + '/delete?id='+id);
    };

    this.get = function (typed) {
        return $http.get(catagoryURL + '/catagory?catagoryname='+typed);
    };

     this.getAllCatagory = function (typed) {
        return $http.get(catagoryURL + '/allcatagory');
    };

     this.groupingAndSeq = function (obj) {
        return $http.post(catagoryURL + '/groupingAndSeq?ids='+obj.ids+"&groupName="+obj.groupName);
    };
}]);
