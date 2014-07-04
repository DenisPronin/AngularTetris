'use strict';

/* Directives */


var directives = angular.module('AppTetris.directives', []);

directives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
