'use strict';


describe('directives', function() {
    var $scope;
    var element;
    var timeout;

    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var SPACE_KEY = 32;


    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngRoute'));
    beforeEach(module('LocalStorageModule'));

    beforeEach(module('AppTetris.controllers'));
    beforeEach(module('AppTetris.services'));
    beforeEach(module('AppTetris.filters'));
    beforeEach(module('AppTetris.controllers'));
    beforeEach(module('AppTetris.directives'));

    describe('Key events', function() {
        beforeEach(function () {
            inject(function ($compile, $rootScope, $controller, $interval, $modal, _Fields_, _Figures_, _Score_, _Levels_, _Speed_, $timeout){
                timeout = $timeout;
                $scope = $rootScope.$new();

                var Board = $controller('BoardCtrl', {$scope: $scope, $interval: $interval, $modal: $modal, Fields: _Fields_, Figures: _Figures_ , Score: _Score_, Levels: _Levels_ , Speed: _Speed_ });
                element = angular.element("<div data-game-controls></div>");
                $compile(element)($scope);
                $scope.$digest();
            });
        });

        it('SPACE event', function() {
            spyOn($scope, "moveFallDown");
            startKeyEvent(SPACE_KEY);
            expect($scope.moveFallDown).toHaveBeenCalled();
        });

        it('Up event', function() {
            spyOn($scope, "rotate");
            startKeyEvent(UP_KEY);
            expect($scope.rotate).toHaveBeenCalled();
        });

        it('Down event', function() {
            spyOn($scope, "moveDown");
            startKeyEvent(DOWN_KEY);
            expect($scope.moveDown).toHaveBeenCalled();
        });

        it('Left event', function() {
            spyOn($scope, "moveLeft");
            startKeyEvent(LEFT_KEY);
            expect($scope.moveLeft).toHaveBeenCalled();
        });

        it('Right event', function() {
            spyOn($scope, "moveRight");
            startKeyEvent(RIGHT_KEY);
            expect($scope.moveRight).toHaveBeenCalled();
        });

        var startKeyEvent = function(key){
            var e = jQuery.Event("keydown");
            e.keyCode = key;
            $(window).trigger(e);

        };
    });

/*
    describe('Score Directive', function() {
        var $httpBackend;
        beforeEach(module('partials'));
        beforeEach(function () {
            inject(function ($compile, $rootScope, $controller, _Fields_, _Figures_){
                $scope = $rootScope.$new();
                var Board = $controller('BoardCtrl', { $scope: $scope, $interval: {}, Fields: _Fields_, Figures: _Figures_ });
                element = angular.element('<div score="{{ score }}"></div>');
                $compile(element)($scope);
                $scope.$digest();
            });
        });

        it('Score', function() {
            expect($scope.score).toEqual(0);
        });

    });
*/
});

