'use strict';

/* Controllers */

var ctrls = angular.module('AppTetris.controllers', []);

ctrls.controller('BoardCtrl', ['$scope', 'Fields', 'Figures', function($scope, $fields, $figures) {
    $scope.board_width = 10;
    $scope.board_height = 20;
    $scope.rows = null;

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
        var start_row = 0;
        var start_col = 0;

        var figure = $figures.getRandomFigure();
        figure.setPosition(null);
        $fields.setZone(figure, start_row, start_col);
        $fields.fillZone(figure);
        $scope.movingFigure = {
            start_row: start_row,
            start_col: start_col,
            figure: figure
        };
    };

    $scope.launch_new_game = function(){
        $fields.clearFields();
        $scope.addFigureForMove();
    };

    $scope.moveRight = function(){
        var mf = $scope.movingFigure;
        var figure = mf.figure;

        if(mf.start_col + 1 + figure.getWidth() <= $scope.board_width){
            mf.start_col++;
            $fields.setZone(figure, mf.start_row, mf.start_col);
            $fields.fillZone(figure);
        }
        else{
            console.log('End of field!');
        }
    };

    $scope.moveLeft = function(){
        var mf = $scope.movingFigure;
        var figure = mf.figure;

        if(mf.start_col -1 >= 0){
            mf.start_col--;
            $fields.setZone(figure, mf.start_row, mf.start_col);
            $fields.fillZone(figure);
        }
        else{
            console.log('End of field!');
        }
    };

    $scope.moveDown = function(){
        var mf = $scope.movingFigure;
        var figure = mf.figure;

        if(mf.start_row + figure.getHeight() + 1 <= $scope.board_height){
            mf.start_row++;
            $fields.setZone(figure, mf.start_row, mf.start_col);
            $fields.fillZone(figure);
        }
        else{
            console.log('End of field!');
        }
    };

    $scope.getClassFor = function(figure){
        return  'block_' + figure;
    };

}]);

