ctrls.controller('SpeedCtrl', [
    '$scope',
    '$timeout',
    'Speed',
    function($scope, $timeout, $speed) {
        $scope.speed = $speed.getNumOfSpeed();

        $scope.speedChanged = false;

        $scope.$watch(function() {
            return $speed.getNumOfSpeed();
        }, function(newValue, oldValue) {
            $scope.speed = $speed.getNumOfSpeed();
            $scope.speedChanged = true;
            $timeout(function(){
                $scope.speedChanged = false;
            }, 400)
        });
    }
]);
