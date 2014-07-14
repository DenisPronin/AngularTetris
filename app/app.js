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
    $routeProvider.when('/', {templateUrl: 'partials/game.html'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);

var ctrls = angular.module('AppTetris.controllers', []);
var services = angular.module('AppTetris.services', []);

