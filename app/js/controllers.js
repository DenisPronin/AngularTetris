'use strict';

/* Controllers */

var ctrls = angular.module('AppTetris.controllers', []);

ctrls.controller('BoardCtrl', ['$scope', 'Fields', 'Figures', function($scope, $fields, $figures) {
    $scope.board_width = 14;
    $scope.board_height = 20;
    $scope.rows = null;

    var initBoard = function(){
        for (var i = 0; i < $scope.board_height; i++) {
            for (var j = 0; j < $scope.board_width;j++){
                if(j < 2 || j >= $scope.board_width -2){
                    $fields.addField(i, j, true, 'border');
                }
                else{
                    $fields.addField(i, j, false, '');
                }
            }
        }
        $scope.rows = $fields.getFields();
    };
    initBoard();

    $scope.movingFigure = {};

    $scope.addFigureForMove = function(){
        var start_row = 0;
        var start_col = 2;

        var figure = $figures.getRandomFigure();
        figure.setPosition(null);
        $fields.setZone(figure, start_row, start_col, $scope.board_width, $scope.board_height);
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
        move('start_col', true);
    };

    $scope.moveLeft = function(){
        move('start_col', false);
    };

    $scope.moveDown = function(){
        move('start_row', true);
    };

    var move = function(coord_changed, added){
        var mf = $scope.movingFigure;
        var figure = mf.figure;

        (added) ? mf[coord_changed]++ : mf[coord_changed]--;
        $fields.clearZone();
        var zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col, $scope.board_width, $scope.board_height);
        if(zoneChanged){ // shifting of zone is occured
            $fields.fillZone(figure);
        }
        else{
            $fields.fillZone(figure);
            (added) ? mf[coord_changed]-- : mf[coord_changed]++;
        }
    };

    $scope.rotate = function(){
        var mf = $scope.movingFigure;
        var figure = mf.figure;
        figure.setNextPosition();
        $fields.clearZone();
        var exceed = $fields.getExceedCount($scope.board_width, $scope.board_height);
        if(exceed.left_exceed){
            mf.start_col += exceed.left_exceed;
            var zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col, $scope.board_width, $scope.board_height);
        }
        if(exceed.right_exceed){
            mf.start_col -= exceed.right_exceed;
            zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col, $scope.board_width, $scope.board_height);
        }
        $fields.fillZone(figure);
    };

    $scope.getClassFor = function(cell){
        return  'cell_' + cell.row + '_' + cell.col + ' block_' + cell.type_figure;
    };

}]);

