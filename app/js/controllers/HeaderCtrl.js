ctrls.controller('HeaderCtrl', [
    '$scope',
    '$location',
    'Levels',
    function($scope, $location, $levels) {
        $scope.levels = $levels.getLevels();

        $scope.isClassic = function(){
            return $levels.getCurrentLevel() == null;
        };

        $scope.isAdventure = function(){
            return $levels.getCurrentLevel() != null;
        };

        $scope.setLevel = function(num){
            $levels.setCurrentLevel(num);
            $location.path('/play')
        };

        if($location.path() == '/levels'){
            $levels.setCurrentLevel(1);
        }

        $scope.isCompleteLevel = function(){
          return false;
        };
    }
]);
