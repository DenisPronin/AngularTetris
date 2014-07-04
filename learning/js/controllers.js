var ctrls = angular.module('App.controllers', []);

ctrls.controller('AppCtrl', ['$scope', function($scope) {
    $scope.firstName = 'Olen';
    $scope.lastName = 'Petrovich';
    $scope.preferences = {
        showDetails: true
    };

    $scope.onScroll = function(offest){
        console.log('Scroll ' + offest);
    };

}]);

