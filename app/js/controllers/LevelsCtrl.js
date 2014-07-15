ctrls.controller('LevelsCtrl', [
    '$scope',
    '$location',
    'Levels',
    function($scope, $location, $levels) {
        $scope.levels = $levels.getLevels();

        $scope.setLevel = function(num){
            $levels.setCurrentLevel(num);
            $location.path('/play')
        };
    }
]);
