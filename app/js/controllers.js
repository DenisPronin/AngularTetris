'use strict';

/* Controllers */

var ctrls = angular.module('AppTetris.controllers', []);

ctrls.controller('BoardCtrl', [
    '$scope',
    '$filter',
    '$interval',
    'Fields',
    'Figures',
    function($scope, $filter, $interval, $fields, $figures) {
        $scope.rows = null;
        $scope.gameOver = false;

        var board_width = 14;
        var board_height = 24;
        var BORDER_WIDTH = 2;

        var initBoard = function(){
            $fields.initBoard(board_height, board_width, BORDER_WIDTH);
            $scope.rows = $fields.getFields();
        };
        initBoard();

        $scope.movingFigure = {};

        $scope.addFigureForMove = function(){
            if(!$scope.gameOver){
                var figure = $figures.getRandomFigure();
                figure.setPosition(null);

                var empty_rows = figure.getEmptyRowsFromAbove();

                var start_row = BORDER_WIDTH - empty_rows;
                var start_col = 6;

                var changedZone = $fields.setZone(figure, start_row, start_col);
                if(changedZone){
                    $fields.fillZone(figure);
                    $scope.movingFigure = {
                        start_row: start_row,
                        start_col: start_col,
                        figure: figure
                    };

                    $scope.movingFigure.process = $interval($scope.moveDown, 500);
                }
                else{
                    if(start_row > 0){
                        endProcess();
                        // show only part of figure which can entering on board
                        for (var i = start_row-1; i >= 0; i--) {
                            var hasEndZone = $fields.setZone(figure, i, start_col, true);
                            if(hasEndZone){
                                $fields.fillZone(figure);
                            }
                        }
                    }
                    $scope.gameOver = true;
                    console.log('Game end!');
                }
            }
        };

        $scope.launch_new_game = function(){
            endProcess();
            $scope.gameOver = false;
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

        $scope.moveFallDown = function(){
            endProcess();
            $scope.movingFigure.process = $interval($scope.moveDown, 50);
            move('start_row', true, 'down');
        };

        var move = function(coord_changed, added, mode){
            if(!$scope.gameOver){
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
                        endMovingFigure(figure);
                    }
                }
            }
        };

        $scope.rotate = function(){
            if(!$scope.gameOver){
                var mf = $scope.movingFigure;
                var figure = mf.figure;
                var saving = saveFigure();

                figure.setNextPosition();

                var exceed = $fields.getExceedCount();
                if(exceed.left_exceed){
                    mf.start_col += exceed.left_exceed;
                }
                if(exceed.right_exceed){
                    mf.start_col -= exceed.right_exceed;
                }
                if(exceed.bottom_exceed){
                    mf.start_row += exceed.bottom_exceed;
                }

                $fields.clearZone();


                var zoneChanged = $fields.setZone(figure, mf.start_row, mf.start_col);
                if(zoneChanged){    // can figure rotating?
                    $fields.fillZone(figure);
                }
                else{
                    // return previous position
                    figure.setPosition(saving.position_num);
                    mf.figure = figure;
                    mf.start_row = saving.start_row;
                    mf.start_col = saving.start_col;
                    $fields.setZone(figure, mf.start_row, mf.start_col);

                    // can figure Moving down?
                    var canMovingDown = false;
                    zoneChanged = $fields.setZone(figure, mf.start_row + 1, mf.start_col);
                    if(zoneChanged){
                        canMovingDown = true;
                    }

                    // return previous position
                    $fields.setZone(figure, mf.start_row, saving.start_col);

                    $fields.fillZone(figure);
                    var empty_rows = figure.getEmptyRowsFromBelow(); // figure position has empty rows?
                    if(empty_rows == 0 && !canMovingDown){
                        endMovingFigure(figure);
                    }
                }
            }
        };

        var saveFigure = function(){
            var mf = $scope.movingFigure;
            var figure = mf.figure;

            return {
                position_num: figure.getPositionCurrentNum(),
                start_col: mf.start_col,
                start_row: mf.start_row
            }
        };

        var endMovingFigure = function(figure){
            endProcess();
            $fields.fillHeap(figure);

            $fields.removeFullRows();

            $scope.addFigureForMove();
        };

        $scope.getClassFor = function(cell){
            return  'cell_' + cell.row + '_' + cell.col + ' block_' + cell.type_figure;
        };

        var endProcess = function(){
            $interval.cancel($scope.movingFigure.process);
        };
    }
]);

