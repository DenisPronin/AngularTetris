'use strict';

/* Filters */

var filters = angular.module('App.filters', []);

filters.filter('reverse', function() {
    return function(text) {
        return text.split('').reverse().join('');
    };
});
