'use strict';


// Declare app level module which depends on filters, and services
angular.module('AppTetris', [
    'ui.bootstrap',
    'ngRoute',
    'AppTetris.filters',
    'AppTetris.services',
    'AppTetris.directives',
    'AppTetris.controllers'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/game.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);
