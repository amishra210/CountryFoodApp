'use strict';

angular.module('com.module.cook')
    .controller('CookCtrl', CookCtrl);

CookCtrl.$inject = ["$scope", "CookService", "CoreService", "$rootScope","MenuService"];

function CookCtrl($scope, CookService, CoreService,$rootScope,MenuService) {

  var cook = this;

  cook.sno = 0;

  cook.myFile = {};

  cook.info =  {};
  cook.info.name = "";
  cook.info.description = "";
  cook.info.gender = "";
  cook.info.mobileno = "";
  cook.info.address = "";
  cook.info.specility = "";
  cook.info.availability = "";
  cook.info.cast = "";
  
  cook.cookSpecialityList = []; 

  cook.specialityList = [];

  cook.cookList = [];

  cook.editInfo =  {};

  cook.castList = [];

  cook.currentpage = 1;

  cook.autoCookList = [];

  cook.get = get;
  cook.add = add;
  cook.clear = clear;
  cook.edit = edit;
  cook.getEditCook = getEditCook;
  cook.SearchTag = SearchTag;
  cook.deleteCook = deleteCook;
  cook.getCast = getCast;
  cook.searchCook = searchCook;
  cook.cookSelect = cookSelect;
  cook.getAllSpeciality = getAllSpeciality;
  cook.getAllMenu = getAllMenu;
  cook.getMenuForSpeciality = getMenuForSpeciality; 
  cook.updateSpeciality = updateSpeciality;
  cook.getSelectedMenuIds = getSelectedMenuIds;
  cook.getCookSpeciality = getCookSpeciality;
  
  $scope.menuOptionsList = [];
  $scope.menuSelectedList = [];

  cook.get(cook.currentpage);
  cook.getCast();
  cook.getAllSpeciality();

  cook.specility = {};
  cook.specility.cookId = "";
  cook.specility.speciality = "";
  cook.specility.menuIds = [];

  function getCookSpeciality(cookId,speciality){
    MenuService.getCookSpeciality(cookId,speciality).success(function (data, status, headers) {
             cook.cookSpecialityList =  data;
             var tempSpeciality = [];
           
             angular.forEach($scope.menuOptionsList, function(value, key) {
                 for(var i=0;i<cook.cookSpecialityList.menuIds.length;i++){
                        if(value.id == cook.cookSpecialityList.menuIds[i]){
                          tempSpeciality.push(value);
                        }
                 }  
           });

           $scope.menuSelectedList = tempSpeciality;
      
        }).error(function (error) {
                console.log("getCookSpeciality:" + error.message);
            });
  }

  function getSelectedMenuIds(data){
     var ids = [];
     angular.forEach(data, function(value, key) {
         ids.push(value.id);
      });

     return ids;
   }

  function updateSpeciality(){
     cook.specility.menuIds = cook.getSelectedMenuIds($scope.menuSelectedList);
     //console.log(cook.specility);

    /* MenuService.deleteCookSpeciality(cook.specility.cookId,cook.specility.speciality).success(function (data, status, headers) {
             
            MenuService.addSpeciality(cook.specility).success(function (data1, status1, headers1) {
             
        }).error(function (error) {
                console.log("updateSpeciality:" + error.message);
            });

        }).error(function (error) {
                console.log("updateSpeciality:" + error.message);
            });*/

            MenuService.addSpeciality(cook.specility).success(function (data1, status1, headers1) {
                          toastr.success("Cook speciality updated.", '', {timeOut: 5000});   
        }).error(function (error) {
                console.log("updateSpeciality:" + error.message);
            });
  }

  function getMenuForSpeciality(){
     cook.getAllMenu(cook.specility.cookId,cook.specility.speciality);
     $scope.menuSelectedList = [];   
    $scope.menuOptionsList = [];  
     cook.getCookSpeciality(cook.specility.cookId,cook.specility.speciality);
  }

   function getAllMenu(cookId,speciality){
    $scope.menuOptionsList = [];
      MenuService.getAllMenu(cookId,0).success(function (data, status, headers) {
         var tempMenu = {};
         tempMenu.id = "";
         tempMenu.name = "";

          angular.forEach(data, function(value, key) {
               tempMenu = {}
               tempMenu.name = value.itemName;
               tempMenu.id = value.id;
               $scope.menuOptionsList.push(tempMenu);
           });
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    }

  function getAllSpeciality() {
  CookService.getAllSpeciality().success(function (data, status, headers) {
             cook.specialityList =  data;
        }).error(function (error) {
                console.log("getAllSpeciality:" + error.message);
            });
   }

  function cookSelect(selectedCook){
    cook.specility.cookId = selectedCook.id;
  }

  function searchCook(typed) {
  CookService.get(typed).success(function (data, status, headers) {
            cook.autoCookList =  data;
        }).error(function (error) {
                console.log("user:" + error.message);
            });
   }

  function add() {
    //var file = $scope.myFile;
     var file =  cook.myFile;
    if(cook.info.availability == true){
       cook.info.availability = 1;
    }else{
      cook.info.availability = 0;
    }

        CookService.add(cook.info).success(function (data, status, headers) {
            toastr.success("Cook successfully added.", '', {timeOut: 5000});
            if (typeof file != 'undefined'){
              CookService.uploadFileWithMenu(file,data);  
            }
            cook.get(cook.currentpage);
           cook.clear();
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function get(pageno) {
        $scope.paggination = [];
        CookService.getCookList(pageno).success(function (data, status, headers) {

            cook.cookList = data.cmsCooksBeanList;
            $scope.paggination = data.count;

            /*console.log(cook.cookList);  */ 
            if(cook.cookList.length >= 1){
              $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    cook.get(page);
                    cook.currentpage = page;
                    cook.sno = cook.currentpage * 10 - 10;
                }
            });
            }

        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

    function edit () {
       // var file = $scope.myFile;
       var file =  cook.myFile;
        if(cook.editInfo.availability == true){
           cook.editInfo.availability = 1;
        }else{
          cook.editInfo.availability = 0;
        }
        CookService.edit(cook.editInfo).success(function (data, status, headers) {
           if (typeof file != 'undefined'){
              CookService.uploadFileWithMenu(file,data);  
            }
            cook.get(cook.currentpage);
            toastr.success("User successfully updated.", '', {timeOut: 5000});
            cook.myFile = {};
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function deleteCook(id) {

        CoreService.confirmation('Are you sure?', 'Delete cannot be undone.', function () {
            CookService.delete(id).success(function (data, status, headers) {
              if(status==200){
                   cook.get(cook.currentpage);
                   toastr.success("User successfully deleted.", '', {timeOut: 5000});
                }else{
                  if(status==206){
                     CoreService.alertError("Could not delete","Cook mapped with menus.");
                  }
                }
            }).error(function (error) {
                    console.log("user:" + error.message);
                });
        }, function () {
            return false;
        });
    };



  function getEditCook(id) {
        var obj = angular.copy(cook.SearchTag(id));
        cook.editInfo = obj;
        cook.myFile = {};
    };

  function SearchTag(id) {
        var i = null;
        var cooks =   cook.cookList;

        for (i = 0; cooks.length > i; i += 1) {
            if (cooks[i].id === id) {
                return cooks[i];
            }
        }

        return null;
    };


 function clear() {
      cook.info =  {};
      cook.info.name = "";
      cook.info.description = "";
      cook.info.gender = "";
      cook.info.mobileno = "";
      cook.info.address = "";
      cook.info.specility = "";
    };

     function getCast() {
        CookService.getCast().success(function (data, status, headers) {
            cook.castList = data;
            /*console.log("cast");
            console.info(cook.castList);*/
        }).error(function (error) {
                console.log("cast:" + error.message);
            });
    };
}