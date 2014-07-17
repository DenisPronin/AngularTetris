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
    $routeProvider.when('/', {templateUrl: 'app/partials/main_menu.html'});
    $routeProvider.when('/play', {templateUrl: 'app/partials/game.html'});
    $routeProvider.when('/levels', {templateUrl: 'app/partials/levels.html'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);

var ctrls = angular.module('AppTetris.controllers', []);
var services = angular.module('AppTetris.services', []);

