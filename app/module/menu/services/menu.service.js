'use strict';

var app = angular.module('com.module.menu');

app.service('MenuService', ["$http", "$q", "AppService",function ($http, $q,AppService) {
    
    var menuURL = AppService.getWebUrl()+"/cms/menu";

   // var menuURL = "http://ec2-52-24-151-211.us-west-2.compute.amazonaws.com:8080/SpringRestSecurityOauth/cms/menu";

    this.getMenuUnit = function () {
        return $http.get(menuURL + '/getMenuUnit');
    };

    this.addMenu = function (menu) {
        return $http.post(menuURL + '/add',menu);
    };


    this.uploadFileWithMenu = function(file, menuId){
        var fd = new FormData();
        fd.append('file', file);
        fd.append("menuid", menuId);
        $http.post(menuURL+ '/fileupload', fd,{
          withCredentials : false,
          headers : {
          'Content-Type' : undefined
          },
          transformRequest : angular.identity
         })
        .success(function(){
        })
        .error(function(){
        });
    };
 

    this.getMenuList = function (pageno,cookId,catagoryId) {
        return $http.get(menuURL + '/menuList?pageno='+pageno+'&cookId='+cookId+'&catagoryId='+catagoryId);
    };

    this.updateMenu = function (menu) {
        return $http.post(menuURL + '/edit',menu);
    };

     this.delete = function (id) {
        return $http.post(menuURL + '/delete?id='+id);
    };

    this.getAllMenu = function (cookId,specialityId) {
        return $http.get(menuURL+ '/allmenu?cookId='+cookId+'&specialityId='+specialityId);
    };
 
   this.addSpeciality = function (specility) {
        return $http.post(menuURL + '/addSpeciality',specility);
    };

    this.getCookSpeciality = function (cookId,speciality) {
        return $http.get(menuURL+ '/getCookSpeciality?cookId='+cookId+'&speciality='+speciality);
    };

    this.deleteCookSpeciality = function (cookId,speciality) {
        return $http.post(menuURL+ '/deleteCookSpeciality?cookId='+cookId+'&speciality='+speciality);
    };
}]);
