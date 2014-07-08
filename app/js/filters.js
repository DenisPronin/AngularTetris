'use strict';

/* Filters */

var filters = angular.module('AppTetris.filters', []);

filters.filter('randomNumber', function(){
    return function(min, max) {
        return Math.round(min + Math.random()*(max-min));
    };
});