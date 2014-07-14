ctrls.controller('NextFigureBoardCtrl', [
    '$scope',
    'Fields',
    'Figures',
    function($scope, $fields, $figures) {
        var Fields = new $fields();
        $scope.rows = null;

        var board_width = 8;
        var board_height = 8;
        var BORDER_WIDTH = 2;

        var initBoard = function(){
            Fields.initBoard(board_height, board_width, BORDER_WIDTH);
            $scope.rows = Fields.getFields();
        }();

        $scope.addFigure = function(){
            var figure = getFigure();
            var start_row = 2;
            var start_col = 2;
            Fields.clearZone();
            var changedZone = Fields.setZone(figure, start_row, start_col);
            if(changedZone){
                Fields.fillZone(figure);
            }
        };

        // listener for change Queue of figures
        $scope.$watch(function() { // This is the listener function
            return getFigure();
        }, function(newValue, oldValue) { // This is the change handler
            $scope.addFigure();
        });

        var getFigure = function(){
            return $figures.getFigureFromQueue(1);
        };

    }
]);
