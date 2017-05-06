'use strict';

angular.module('com.module.catagory')
    .controller('CatagoryCtrl', CatagoryCtrl);

CatagoryCtrl.$inject = ["$scope", "CatagoryService", "CoreService"];

function CatagoryCtrl($scope, CatagoryService, CoreService) {
  var catagory = this;

  catagory.sno = 0;

  catagory.info =  {};
  catagory.info.name = "";
  catagory.info.description = "";

  catagory.groupingAndSeq = {};
  catagory.groupingAndSeq.ids = [];
  catagory.groupingAndSeq.groupName = "";

  catagory.catagoryList = {};

  catagory.editInfo =  {};

  catagory.currentpage = 1;

  catagory.get = get;
  catagory.add = add;
  catagory.clear = clear;
  catagory.edit = edit;
  catagory.getEditcatagory = getEditcatagory;
  catagory.SearchTag = SearchTag;
  catagory.deletecatagory = deletecatagory;
  catagory.getAllCatagory = getAllCatagory;
  catagory.showGroupAndSeq = showGroupAndSeq;
  catagory.doneGroupingAndSequencing = doneGroupingAndSequencing;
  catagory.getGroupingId = getGroupingId;
  catagory.clearGroupingAndSeq = clearGroupingAndSeq;

  catagory.get(catagory.currentpage);
  //catagory.getAllCatagory();



$scope.optionsList = [];



  function add() {
        CatagoryService.add(catagory.info).success(function (data, status, headers) {
            toastr.success("catagory successfully added.", '', {timeOut: 5000});
            catagory.get(catagory.currentpage);
            catagory.clear();
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function get(pageno) {
        $scope.paggination = [];
        CatagoryService.getCatagoryList(pageno).success(function (data, status, headers) {
            console.log(data.cmsCatagoryBeanList);
            catagory.catagoryList = data.cmsCatagoryBeanList;
            $scope.paggination = data.count;
            
         if(catagory.catagoryList.length >= 1){
            $('#pagination-demo').twbsPagination({
                totalPages: $scope.paggination,
                visiblePages: $scope.paggination,
                onPageClick: function (event, page) {
                    catagory.get(page);
                    catagory.currentpage = page;
                    catagory.sno = catagory.currentpage * 10 - 10;
                }
            });
           } 

        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };

    function edit () {
        CatagoryService.edit(catagory.editInfo).success(function (data, status, headers) {
            catagory.get(catagory.currentpage);
            toastr.success("User successfully updated.", '', {timeOut: 5000});
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    };


   function deletecatagory(id) {

        CoreService.confirmation('Are you sure?', 'Delete cannot be undone.', function () {
            CatagoryService.delete(id).success(function (data, status, headers) {
                if(status==200){
                  catagory.get(catagory.currentpage);
                  toastr.success("User successfully deleted."+status, '', {timeOut: 5000});
                }else{
                  if(status==206){
                     CoreService.alertError("Could not delete","Catagory mapped with menus.");
                  }
                }
            }).error(function (error) {
                    console.log("user:" + error.message);
                });
        }, function () {
            return false;
        });
    };



  function getEditcatagory(id) {
        var obj = angular.copy(catagory.SearchTag(id));
        catagory.editInfo = obj;
    };

  function SearchTag(id) {
        var i = null;
        var catagorys =   catagory.catagoryList;

        for (i = 0; catagorys.length > i; i += 1) {
            if (catagorys[i].id === id) {
                return catagorys[i];
            }
        }

        return null;
    };


 function clear() {
      catagory.info =  {};
      catagory.info.name = "";
      catagory.info.description = "";
    };


    function getAllCatagory(){
      CatagoryService.getAllCatagory().success(function (data, status, headers) {
          $scope.optionsList = data;
          catagory.showGroupAndSeq(data);
        }).error(function (error) {
                console.log("user:" + error.message);
            });
    }


   function showGroupAndSeq(catagories){
     angular.forEach(catagories, function(value, key) {
          if(value.groupName!=null)  {
             value.name = value.name +" [Group-> "+value.groupName+", Seq-> "+value.sequence+"]";  
          }
      });
   }

   function doneGroupingAndSequencing(){
      catagory.groupingAndSeq.ids = catagory.getGroupingId($scope.selectedList);
      //console.log(catagory.groupingAndSeq);
      
       CatagoryService.groupingAndSeq(catagory.groupingAndSeq).success(function (data, status, headers) {
            catagory.getAllCatagory();
        }).error(function (error) {
                console.log("doneGroupingAndSequencing:" + error.message);
            });

      catagory.clearGroupingAndSeq();
   }

   function getGroupingId(data){
     var ids = [];
     angular.forEach(data, function(value, key) {
         ids.push(value.id);
      });

     return ids;
   }

   function clearGroupingAndSeq(){
       catagory.groupingAndSeq = {};
       catagory.groupingAndSeq.ids = [];
       catagory.groupingAndSeq.groupName = "";
       $scope.selectedList=[];
   }
}