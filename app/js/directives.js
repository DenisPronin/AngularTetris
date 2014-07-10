'use strict';

/* Directives */


var directives = angular.module('AppTetris.directives', []);

directives.directive('gameControls', function(){
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs) {
            var UP_KEY = 38;
            var DOWN_KEY = 40;
            var LEFT_KEY = 37;
            var RIGHT_KEY = 39;
            var SPACE_KEY = 32;

            $(window).bind('keydown', function(event){
                if(event.keyCode == UP_KEY){
                    scope.rotate();
                }
                else if(event.keyCode == LEFT_KEY){
                    scope.moveLeft();
                }
                else if(event.keyCode == RIGHT_KEY){
                    scope.moveRight();
                }
                else if(event.keyCode == DOWN_KEY){
                    scope.moveDown();
                }
                else if(event.keyCode == SPACE_KEY){
                    scope.moveFallDown();
                }
                scope.$digest();
            });
        }
    }
});
