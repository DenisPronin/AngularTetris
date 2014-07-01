'use strict';

/* Filters */

var filters = angular.module('AppTetris.filters', []);

filters.filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);

filters.filter('randomNumber', function(){
    return function(min, max) {
        return Math.round(min + Math.random()*(max-min));
    };
});