(function(){
    var app = angular.module('transport');

    app.controller('loggerCtrl', function($scope, $log)  {
        $scope.$log = $log;
        $scope.message = 'Hello World!';
    });

})();
