var directives = angular.module('App.directives', []);


directives.directive('helloWorld', function() {
    return {
        restrict: 'AE',
        replace: false,
        templateUrl: 'partials/hello.html',
        scope: {
            firstName: '@',
            lastName: '@'
        },

        link: function(scope, elem, attrs) {
            attrs.$observe('firstName', function(value) {
                elem.find('#firstN').text(value)
            });
            attrs.$observe('lastName', function(value) {
                elem.find('#lastN').text(value)
            });
        }
    };
});

directives.directive('toggle', function() {
    return {
        scope: {
            toggle: '='
        },
        link: function($scope, element, attrs) {
            $scope.$watch("toggle", function(value) {
                $(element).toggleClass('active', value);
                if(value){
                    $(element).text('Hide details');
                }
                else{
                    $(element).text('Show details');
                }
            });
            $(element).click(function() {
                $scope.$apply(function() {
                    $scope.toggle = !$scope.toggle
                })
            })
        }
    }
});

directives.directive('scroll', function(){
    return {
        scope: {
            scroll: '&'
        },
        link: function(scope, el, attrs){
            $(el).scroll(function(){
                var offset = $(el).scrollTop();
                scope.scroll({offset:offset})
            });
        }
    }
});

directives.directive('greet', function(){
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'partials/hello.html',
        link: function(scope, el, attrs){
            scope.firstName = 'recrut';
            scope.lastName = 'Pen';
        }
    }
});

directives.directive("dialog", function () {
    return {
        template: "<span class='dialog' ng-transclude></span>",
//        replace: true,
        transclude: true,
        scope: {}
    }
});

directives.directive('kid', function(){
    return {
        restrict: 'E',
        scope: {
            done: '&'
        },
        template: '<input type="text" data-ng-model="chore"/>' +
            '{{ chore }}' +
            '<input type="button" ng-click="done({chore:chore})" value="Done!">'
    }
});

directives.directive('drink', function(){
    return {
        restrict: 'A',
        scope: {
            flavor: '='
        },
        template: '<input type="text" ng-model="flavor">'
//        link: function (scope, element, attrs){
//            scope.flavor = attrs.flavor;
//        }
    }
});

directives.directive('phone', function(){
    return{
        restrict: 'E',
        scope: {
            dial: '&'
        },
        template: '<input type="text" ng-model="value"/>' +
            '<input type="button" ng-click="dial({message: value})" value="Call"/>'

    }
});

directives.directive("phone2", function() {
    return {
        restrict: "E",
        scope: {
            number: "@",
            network: "=",
            makeCall: "&"
        },
        template: '<div class="panel">Number: <input type="text" ng-model="number"/> Network:' +
            '<select ng-model="network" ng-options="net for net in networks">' +
            '<input type="text" ng-model="value">' +
            '<input type="button" ng-click="makeCall({number: number, message: value})" value="Call home!"/></div>',

        link: function(scope) {
            scope.networks = ["Verizon", "AT&T", "Sprint"];
            scope.network = scope.networks[0]
        }
    }
});

directives.directive('panel', function(){
    return {
        restrict: 'E',
        transclude: true,
        template: '<div class="panel">this is panel' +
            '<div ng-transclude=""></div>' +
            '</div>'
    }
});
