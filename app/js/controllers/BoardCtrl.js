'use strict';

ctrls.controller('BoardCtrl', [
    '$rootScope',
    '$scope',
    '$interval',
    'Fields',
    'Figures',
    'Score',
    'Levels',
    function($rootScope, $scope, $interval, $fields, $figures, $score, $levels) {
        $scope.rows = null;
        $scope.gameOver = false;
        $scope.pause = false;
        $scope.onShadow = true;

        var board_width = 14;
        var board_height = 24;
        var BORDER_WIDTH = 2;
        var speed = 500;
        var fallen_speed = 50;

        var Fields = new $fields();
        $scope.fields = Fields;

        var initBoard = function(){
            var level = $levels.getCurrentLevel();
            if(level){
                Fields.initLevelBoard(level);
            }
            else{ // classic game
                Fields.initBoard(board_height, board_width, BORDER_WIDTH);
            }
            $scope.rows = Fields.getFields();
        };
        initBoard();
        $score.setScore(0);

        $scope.movingFigure = {};

        $scope.addFigureForMove = function(){
            if(!$scope.gameOver && !$scope.pause){
                var figure = $figures.getFigureFromQueue(0);

                var empty_rows = figure.getEmptyRowsFromAbove();

                var start_row = BORDER_WIDTH - empty_rows;
                var start_col = 6;

                var changedZone = Fields.setZone(figure, start_row, start_col);
                if(changedZone){
                    setShadow(figure, start_row, start_col);
                    Fields.fillZone(figure);
                    $scope.movingFigure = {
                        start_row: start_row,
                        start_col: start_col,
                        figure: figure
                    };

                    startProcess(speed);
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
        };

        $scope.launch_new_game = function(){
            endProcess();
            $scope.gameOver = false;
            $scope.pause = false;
            initBoard();
            $scope.addFigureForMove();
        };

        $scope.pause_game = function(){
            $scope.pause = true;
            endProcess();
        };

        $scope.play_game = function(){
            $scope.pause = false;
            startProcess(speed);
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
            startProcess(fallen_speed);
            move('start_row', true, 'down');
        };

        var move = function(coord_changed, added, mode){
            if(!$scope.gameOver && !$scope.pause){
                var mf = $scope.movingFigure;
                if($.isEmptyObject(mf)) return null;

                var figure = mf.figure;

                (added) ? mf[coord_changed]++ : mf[coord_changed]--;
                Fields.clearZone();
                var zoneChanged = Fields.setZone(figure, mf.start_row, mf.start_col);
                if(zoneChanged){ // shifting of zone is occured
                    setShadow(figure, mf.start_row, mf.start_col);
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
            if(!$scope.gameOver  && !$scope.pause){
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
                    setShadow(figure, mf.start_row, mf.start_col);
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
            $score.updateScore(full_rows_nums.length);
        };

        var startProcess = function(_speed){
            $scope.movingFigure.process = $interval($scope.moveDown, _speed);
        };

        var endProcess = function(){
            $interval.cancel($scope.movingFigure.process);
        };

        var setShadow = function(figure, start_row, start_col){
            if($scope.onShadow){
                Fields.setShadowZone(figure, start_row, start_col);
            }
        };

        $rootScope.$on('$locationChangeSuccess', function () {
            $scope.gameOver = true;
            endProcess();
        });
    }
]);

