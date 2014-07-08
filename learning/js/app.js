'use strict';

// Declare app level module which depends on filters, and services
angular.module('App', [
        'ui.bootstrap',
        'ngRoute',
        'App.directives',
        'App.services',
        'App.filters',
        'App.controllers'
    ]);
var services = angular.module('App.services', []);

