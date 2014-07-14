'use strict';

ctrls.controller('BoardCtrl', [
    '$scope',
    '$interval',
    'Fields',
    'Figures',
    function($scope, $interval, $fields, $figures) {
        $scope.rows = null;
        $scope.gameOver = false;
        $scope.score = 0;

        var board_width = 14;
        var board_height = 24;
        var BORDER_WIDTH = 2;
        var speed = 500;
        var fallen_speed = 50;
        var cost_line = 50;

        var Fields = new $fields();
        $scope.fields = Fields;

        var initBoard = function(){
            Fields.initBoard(board_height, board_width, BORDER_WIDTH);
            $scope.rows = Fields.getFields();
        };
        initBoard();

        $scope.movingFigure = {};

        $scope.addFigureForMove = function(){
            if(!$scope.gameOver){
                var figure = $figures.getFigureFromQueue(0);

                var empty_rows = figure.getEmptyRowsFromAbove();

                var start_row = BORDER_WIDTH - empty_rows;
                var start_col = 6;

                var changedZone = Fields.setZone(figure, start_row, start_col);
                if(changedZone){
                    Fields.fillZone(figure);
                    $scope.movingFigure = {
                        start_row: start_row,
                        start_col: start_col,
                        figure: figure
                    };

                    $scope.movingFigure.process = $interval($scope.moveDown, speed);
                }
                else{
                    endGame(figure, start_row, start_col);
                }
            }
        };

        var endGame = function(figure, start_row, start_col){
            if(start_row > 0){
                endProcess();
                // show only part of figure which can entering on board
                for (var i = start_row-1; i >= 0; i--) {
                    var hasEndZone = Fields.setZone(figure, i, start_col, true);
                    if(hasEndZone){
                        Fields.fillZone(figure);
                    }
                }
            }
            $scope.gameOver = true;
            alert('Game end!');
        };

        $scope.launch_new_game = function(){
            endProcess();
            $scope.gameOver = false;
            initBoard();
            Fields.clearFields();
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
            $scope.movingFigure.process = $interval($scope.moveDown, fallen_speed);
            move('start_row', true, 'down');
        };

        var move = function(coord_changed, added, mode){
            if(!$scope.gameOver){
                var mf = $scope.movingFigure;
                if($.isEmptyObject(mf)) return null;

                var figure = mf.figure;

                (added) ? mf[coord_changed]++ : mf[coord_changed]--;
                Fields.clearZone();
                var zoneChanged = Fields.setZone(figure, mf.start_row, mf.start_col);
                if(zoneChanged){ // shifting of zone is occured
                    Fields.fillZone(figure);
                }
                else{
                    Fields.fillZone(figure);
                    (added) ? mf[coord_changed]-- : mf[coord_changed]++;
                    console.log('On mode: ' + mode + ' - board is end!!!');
                    if(mode == 'down'){
                        endMovingFigure(figure);
                    }
                }
            }
            return null;
        };

        $scope.rotate = function(){
            if(!$scope.gameOver){
                var mf = $scope.movingFigure;
                if($.isEmptyObject(mf)) return null;
                var figure = mf.figure;
                var saving = saveFigure();

                figure.setNextPosition();

                var exceed = Fields.getExceedCount();
                if(exceed.left_exceed){
                    mf.start_col += exceed.left_exceed;
                }
                if(exceed.right_exceed){
                    mf.start_col -= exceed.right_exceed;
                }
                if(exceed.bottom_exceed){
                    mf.start_row += exceed.bottom_exceed;
                }

                Fields.clearZone();


                var zoneChanged = Fields.setZone(figure, mf.start_row, mf.start_col);
                if(zoneChanged){    // can figure rotating?
                    Fields.fillZone(figure);
                }
                else{
                    // return previous position
                    figure.setPosition(saving.position_num);
                    mf.figure = figure;
                    mf.start_row = saving.start_row;
                    mf.start_col = saving.start_col;
                    Fields.setZone(figure, mf.start_row, mf.start_col);

                    // can figure Moving down?
                    var canMovingDown = false;
                    zoneChanged = Fields.setZone(figure, mf.start_row + 1, mf.start_col);
                    if(zoneChanged){
                        canMovingDown = true;
                    }

                    // return previous position
                    Fields.setZone(figure, mf.start_row, saving.start_col);

                    Fields.fillZone(figure);
                    var empty_rows = figure.getEmptyRowsFromBelow(); // figure position has empty rows?
                    if(empty_rows == 0 && !canMovingDown){
                        endMovingFigure(figure);
                    }
                }
            }
            return null;
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
            Fields.fillHeap(figure);

            editScore();

            Fields.removeFullRows();
            $figures.pushFigure(); // set next figure to Queue
            $scope.addFigureForMove();
        };

        var editScore = function(){
            var full_rows_nums = Fields.checkFullLines();
            $scope.score += full_rows_nums.length * cost_line;
        };

        var endProcess = function(){
            $interval.cancel($scope.movingFigure.process);
        };
    }
]);

