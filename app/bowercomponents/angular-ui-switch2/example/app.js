angular
  .module( 'app', ['uiSwitch'] )
  .controller( 'MyController', function( $scope ) {
    $scope.enabled       = true;
    $scope.onOff         = true;
    $scope.yesNo         = true;
    $scope.disabledTrue  = true;
    $scope.disabledFalse = false;

    $scope.changeCallback = function() {
      console.log( 'This is the state of my model: ' + $scope.enabled );
    };
  } );
