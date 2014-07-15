ctrls.controller('ScoreCtrl', [
    '$scope',
    'Score',
    function($scope, $score) {

        $scope.score = $score.getScore();
        $scope.$watch(function() {
            return $score.getScore();
        }, function(newValue, oldValue) {
            $scope.score = $score.getScore();
        });

    }
]);
