'use strict';

angular.module('com.module.menu')
    .controller('MenuCtrl', MenuCtrl);

MenuCtrl.$inject = ["$scope", "CookService", "CatagoryService", "MenuService","CoreService"];

function MenuCtrl($scope, CookService, CatagoryService,MenuService,CoreService,fileUpload) {


$scope.choices = [];
  
  $scope.addNewChoice = function(id1,unit1,amount1) {
  //  var newItemNo = $scope.choices.length+1;
    $scope.choices.push(
          {
             'id': id1,
             'unitName':unit1,
             'price':amount1
          });
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };

var menu = this;

menu.editLoadObj = {};

menu.sno = 0;

menu.editedMenu = {};

menu.cookInfo =  [];
menu.catagoryInfo = [];
menu.selectedCookId = "";
menu.selectedCatagoryId = "";

menu.searchCook = searchCook;
menu.cookSelect = cookSelect;

menu.searchCatagory = searchCatagory;
menu.catagorySelect = catagorySelect;
menu.getMenu = getMenu;
menu.add = add;
menu.editMenu = editMenu;
menu.update = update;
menu.deleteMenu = deleteMenu;
menu.cleanAddMenu = cleanAddMenu;
menu.getMenuUnit = getMenuUnit;
menu.getPriceAndUnit  = getPriceAndUnit;
menu.clearMenu = clearMenu;
menu.loadData = loadData;

menu.searchOption = {};
menu.searchOption.cookId = "";
menu.searchOption.catagoryId = "";

menu.addMenu = {};
menu.addMenu.cooksId = "";
menu.addMenu.menuCatagoryId = "";
menu.addMenu.itemName = "";
menu.addMenu.description = "";
menu.addMenu.cmsMenuPriceBeanList = [];
menu.addMenu.unit = "1";

menu.menuList = [];

menu.currentpage = 1;

menu.getMenuUnitList = [];

menu.getMenuUnit(); 

function loadData(){
  menu.editedMenu = menu.editLoadObj;
}

function clearMenu(){
  menu.selectedCookId  = "";
  menu.selectedCatagoryId = "";
  var elements = document.getElementsByName("autocomplete-type");
  try{
      angular.forEach(elements, function(element, key) {
          element.value = "";
      });
  }catch(err){
   console.log(err);
  }
}

function getPriceAndUnit(){

    var list = [];

    var obj = this;
    
     obj.unitPrice = {};
     obj.unitPrice.unitName = "";
     obj.unitPrice.price = "";

    var id = 0;
    var trigger = true;
            while(trigger){
                  try{
                  id++;
                  var ele = document.getElementById("choice"+id+"select");
                  var unitString = ele.options[ele.selectedIndex].value;

                  ele = document.getElementById('choice'+id+'input1');
                  var priceString = ele.value;
                
                    obj.unitPrice.unitName = unitString;
                    obj.unitPrice.price = priceString;
                              
                     var tempObj = angular.copy(obj.unitPrice);            
                    list.push(tempObj);
                  }catch(err){
                    trigger = false;
                }
            }
 return list;
}

function getMenuUnit(){
 MenuService.getMenuUnit().success(function (data, status, headers) {
           menu.getMenuUnitList =  data;
        }).error(function (error) {
                console.log("Unit:" + error.message);
            });
}

function cookSelect(cook){
  menu.selectedCookId = cook.id;
}

function searchCook(typed) {
  CookService.get(typed).success(function (data, status, headers) {
            menu.cookInfo =  data;
        }).error(function (error) {
                console.log("user:" + error.message);
            });
}

function catagorySelect(catagory){
  menu.selectedCatagoryId = catagory.id;
}

function searchCatagory(typed) {
  CatagoryService.get(typed).success(function (data, status, headers) {
            menu.catagoryInfo = data;
        }).error(function (error) {
                console.log("user:" + error.message);
            });
}

function getMenu(){
  console.log(menu.currentpage+","+menu.selectedCookId+","+menu.selectedCatagoryId);
  $scope.paggination = [];
   MenuService.getMenuList(menu.currentpage,menu.selectedCookId, menu.selectedCatagoryId).success(function (data, status, headers) {
            menu.menuList  = data.cmsMenuBeanList;
            $scope.paggination = data.count;

           $scope.paggination = data.count;
            console.log( menu.menuList );
         if(menu.menuList.length >= 1){
            $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    //menu.getMenu(page,menu.selectedCookId, menu.selectedCatagoryId);
                    menu.currentpage = page;
                    menu.sno = menu.currentpage * 10 - 10;
                    menu.getMenu();
                }
            });
           } 

        }).error(function (error) {
                console.log("user:" + error.message);
                menu.menuList = [];
            });
}

 function add() {
     menu.addMenu.cooksId = menu.selectedCookId;
     menu.addMenu.menuCatagoryId = menu.selectedCatagoryId;
   //  menu.addMenu.cmsMenuPriceBeanList = menu.getPriceAndUnit();
    menu.addMenu.cmsMenuPriceBeanList = $scope.choices;

        var file = $scope.myFile;
        MenuService.addMenu(menu.addMenu).success(function (data, status, headers) {
            toastr.success("Menu successfully added.", '', {timeOut: 5000});
            if (typeof file != 'undefined'){
              MenuService.uploadFileWithMenu(file,data);  
            }
            menu.getMenu();
            menu.cleanAddMenu();
        }).error(function (error) {
                console.log("user:" + error.message);
            });
         //console.info(menu.addMenu);
     
     /* angular.forEach($scope.choices, function(element, key) {
          console.log(element);
      });*/

   };


    function editMenu(tempMenu){

        menu.editedMenu = {};
        var obj = angular.copy(tempMenu);
        menu.editedMenu = obj;

        $scope.choices = [];  
 
       //$scope.choices = menu.editLoadObj.cmsMenuPriceBeanList;

       angular.forEach(menu.editedMenu.cmsMenuPriceBeanList, function(element, key) {
         $scope.addNewChoice(element.id,element.unitName,element.price);
      });

       // menu.loadData();
    }

     function update() {

    /* menu.editedMenu.cooksId = menu.selectedCookId;
     menu.editedMenu.menuCatagoryId = menu.selectedCatagoryId;*/
     menu.editedMenu.cmsMenuPriceBeanList = $scope.choices;

     console.info("----");
     console.log(menu.editedMenu);

        var file = $scope.myFile;

      MenuService.updateMenu(menu.editedMenu).success(function (data, status, headers) {
            toastr.success("Menu successfully updated.", '', {timeOut: 5000});
            if (typeof file != 'undefined'){
              MenuService.uploadFileWithMenu(file,data);  
            }
            menu.getMenu();
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

     function deleteMenu(id) {

        CoreService.confirmation('Are you sure?', 'Delete cannot be undone.', function () {
            MenuService.delete(id).success(function (data, status, headers) {
              if(status==200){
                   menu.getMenu();
                   toastr.success("Menu successfully deleted.", '', {timeOut: 5000});
                }else{
                  if(status==206){
                     CoreService.alertError("Could not delete","Menu mapped with cook speciality.");
                  }
                }
                
            }).error(function (error) {
                    console.log("user:" + error.message);
                });
        }, function () {
            return false;
        });
    };


   function cleanAddMenu(){
    menu.addMenu = {};
    menu.addMenu.cooksId = "";
    menu.addMenu.menuCatagoryId = "";
    menu.addMenu.itemName = "";
    menu.addMenu.description = "";
    menu.addMenu.cmsMenuPriceBeanList = [];
    menu.addMenu.unit = "1";

    $scope.choices = [];
   }

}