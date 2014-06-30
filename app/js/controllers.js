'use strict';

/* Controllers */

var ctrls = angular.module('AppTetris.controllers', []);

ctrls.controller('BoardCtrl', ['$scope', 'Fields', function($scope, $fields) {
    $scope.board_width = 10;
    $scope.board_height = 20;

    var initBoard = function(){
        for (var i = 0; i < $scope.board_height; i++) {
            for (var j = 0; j < $scope.board_width;j++){
                $fields.addField(i, j, false, '');
            }
        }
        $scope.rows = $fields.getFields();
    };
    initBoard();
    console.log($scope.rows);
    console.log($fields.getFieldByCoord(3,4));

    $scope.getClassFor = function(cell){
        return  'block_' + cell.row + '_' + cell.col;
    };
}]);

