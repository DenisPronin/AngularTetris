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

