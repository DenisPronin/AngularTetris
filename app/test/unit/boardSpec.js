'use strict';

describe('Board', function() {
    var $scope;
    var $fields;
    var timeout;

    var board_width = 14;
    var board_height = 24;
    var BORDER_WIDTH = 2;


    beforeEach(module('AppTetris.services'));
    beforeEach(module('AppTetris.filters'));
    beforeEach(module('AppTetris.controllers'));

    beforeEach(function () {
        inject(function ($rootScope, $controller, $interval, _Fields_, _Figures_, $timeout){
            timeout = $timeout;
            $scope = $rootScope.$new();
            var Board = $controller('BoardCtrl', { $scope: $scope, $interval: $interval, Fields: _Fields_, Figures: _Figures_ });
            $fields = $scope.fields;
            $scope.$digest();
        });
    });

    it('addFigureForMove', function() {
        $scope.addFigureForMove();
        expect($.isEmptyObject($scope.movingFigure)).toBeFalsy();

        $fields.addFieldToHeap(3,6);
        $fields.addFieldToHeap(3,7);
        $fields.addFieldToHeap(3,8);
        $scope.addFigureForMove();
        expect($scope.gameOver).toBeTruthy();

    });

    it('launch_new_game', function() {
        $scope.launch_new_game();
        expect($scope.gameOver).toBeFalsy();
        expect($.isEmptyObject($scope.movingFigure)).toBeFalsy();
    });

    it('moveRight', function() {
        $scope.launch_new_game();
        var start_col = $scope.movingFigure.start_col;
        $scope.moveRight();
        expect($scope.movingFigure.start_col - 1).toEqual(start_col);
    });

    it('moveLeft', function() {
        $scope.launch_new_game();
        var start_col = $scope.movingFigure.start_col;
        $scope.moveLeft();
        expect($scope.movingFigure.start_col + 1).toEqual(start_col);
    });

    it('moveDown', function() {
        $scope.launch_new_game();
        var start_row = $scope.movingFigure.start_row;
        $scope.moveDown();
        expect($scope.movingFigure.start_row - 1).toEqual(start_row);

        spyOn($scope, "addFigureForMove");
        for(var i = 0; i < board_height - BORDER_WIDTH*2 - 1; i++){
            $scope.moveDown();
        }
        expect($scope.addFigureForMove).toHaveBeenCalled();
    });

    it('moveFallDown', function() {
        $scope.launch_new_game();
        $scope.moveFallDown();
        spyOn($scope, "addFigureForMove");

        timeout(function(){
            expect($scope.addFigureForMove).toHaveBeenCalled();
        }, 1000);
    });

    it('rotate', function() {
        $scope.launch_new_game();
        $scope.rotate();
    });

});
