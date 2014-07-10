'use strict';

/* Controllers */

var ctrls = angular.module('AppTetris.controllers', []);

ctrls.controller('BoardCtrl', [
    '$scope',
    '$filter',
    'Fields',
    'Figures',
    function($scope, $filter, $fields, $figures) {
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
            }
            else{
                $fields.fillZone(figure);
                alert('Game end!');
            }
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
                    endMovingFigure(figure);
                }
            }
        };

        $scope.rotate = function(){
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
            $fields.fillHeap(figure);

            removeFullRows();

            $scope.addFigureForMove();
        };

        var removeFullRows = function(){
            var full_rows_nums = $fields.checkFullLines();
            if(full_rows_nums.length > 0){
                var _num = full_rows_nums[0];
                var heap_row = $fields.getRowByNum(_num);
                $fields.removeRowFromHeap(heap_row);
                $fields.moveHeapDown(_num);
                removeFullRows();
            }
        };

        $scope.getClassFor = function(cell){
            return  'cell_' + cell.row + '_' + cell.col + ' block_' + cell.type_figure;
        };

    }
]);

