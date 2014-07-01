'use strict';

/* Controllers */

var ctrls = angular.module('AppTetris.controllers', []);

ctrls.controller('BoardCtrl', ['$scope', 'Fields', 'Figures', function($scope, $fields, $figures) {
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

    $scope.movingFigure = {};

    $scope.addFigureForMove = function(){
        var figure = $figures.getRandomFigure();
        var figure_type = figure.getName();
        var figure_width = figure.getWidth();
        var figure_height = figure.getHeight();
        var random_position = figure.getRandomPosition();
        var positions = figure.getPositions();
        var position = positions[random_position];

        var start_row = 0, start_col = 0;
        if(start_col + figure_width < $scope.board_width){

            for (var i = 0; i < position.length; i++) {
                var pos_rows = position[i];
                for (var j = 0; j < pos_rows.length; j++) {
                    var pos_col = pos_rows[j];
                    if(pos_col){
                        $fields.addFillToField(start_row + i, start_col + j, figure_type);
                    }
                }
            }
        }
    };

    $scope.launch_new_game = function(){
        $fields.clearFields();
        $scope.addFigureForMove();
    };

    $scope.rotate = function(){

    };

    $scope.getClassFor = function(figure){
        return  'block_' + figure;
    };

}]);

