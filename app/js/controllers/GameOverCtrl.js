ctrls.controller('GameOverCtrl', [
    '$scope',
    '$modalInstance',
    'Score',
    function($scope, $modalInstance, $score) {
        $scope.current_score = $score.getScore();

        $scope.replay = function () {
            $scope.launch_new_game();
            $scope.cancel();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);
