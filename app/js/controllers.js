'use strict';

/* Controllers */

var ctrls = angular.module('AppTetris.controllers', []);

ctrls.controller('BoardCtrl', ['$scope', '$filter', 'Fields', 'Figures', function($scope, $filter, $fields, $figures) {
    $scope.board_width = 14;
    $scope.board_height = 24;
    $scope.rows = null;
    var BORDER_WIDTH = 2;

    var initBoard = function(){
        $fields.initBoard($scope.board_height, $scope.board_width, BORDER_WIDTH);
        $scope.rows = $fields.getFields();
    };
    initBoard();

    $scope.movingFigure = {};

    $scope.addFigureForMove = function(){
        var figure = $figures.getRandomFigure();
        figure.setPosition(null);

        var empty_rows = figure.getEmptyRows();

        var start_row = BORDER_WIDTH - empty_rows;
        var start_col = $filter('randomNumber')(BORDER_WIDTH, $scope.board_width - BORDER_WIDTH - figure.getWidth());

        $fields.setZone(figure, start_row, start_col);
        $fields.fillZone(figure);
        $scope.movingFigure = {
            start_row: start_row,
            start_col: start_col,
            figure: figure
        };
    };

    $scope.launch_new_game = function(){
        initBoard();
        $fields.clearFields();
        $scope.addFigureForMove();
    };

    $scope.moveRight = function(){
        move('start_col', true, 'right');
    };

    $scope.moveLeft = function(){
        move('start_col', false, 'left');
    };

    $scope.moveDown = function(){
        move('start_row', true, 'down');
    };

    var move = function(coord_changed, added, mode){
        var mf = $scope.movingFigure;
        var figure = mf.figure;

        (added) ? mf[coord_changed]++ : mf[coord_changed]--;
        $fields.clearZone();
        var zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col);
        if(zoneChanged){ // shifting of zone is occured
            $fields.fillZone(figure);
        }
        else{
            $fields.fillZone(figure);
            (added) ? mf[coord_changed]-- : mf[coord_changed]++;
            console.log('On mode: ' + mode + ' - board is end!!!');
            if(mode == 'down'){
                $scope.addFigureForMove();
            }
        }
    };

    $scope.rotate = function(){
        var mf = $scope.movingFigure;
        var figure = mf.figure;
        figure.setNextPosition();
        $fields.clearZone();
        var exceed = $fields.getExceedCount();
        if(exceed.left_exceed){
            mf.start_col += exceed.left_exceed;
            var zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col);
        }
        if(exceed.right_exceed){
            mf.start_col -= exceed.right_exceed;
            zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col);
        }
        if(exceed.bottom_exceed){
            mf.start_row += exceed.bottom_exceed;
            zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col);
        }
        $fields.fillZone(figure);
    };

    $scope.getClassFor = function(cell){
        return  'cell_' + cell.row + '_' + cell.col + ' block_' + cell.type_figure;
    };

}]);

