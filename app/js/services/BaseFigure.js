services.factory('BaseFigure', ['$filter', function($filter){
    return function(){
        var me = this;

        var name = '';
        var width = 0;
        var height = 0;
        var positions = [];
        var current_position_num = 0;

        me.initFigure = function(_name, _width, _height, _positions){
            name = _name;
            width = _width;
            height = _height;
            positions = _positions;
        };

        me.setPosition = function(num){
            if(num == null){ // is random position
                current_position_num =  $filter('randomNumber')(0, positions.length - 1);
            }
            else{
                current_position_num = num;
            }
        };

        me.setNextPosition = function(){
            if(current_position_num + 1 >= positions.length){
                current_position_num = 0;
            }
            else{
                current_position_num++;
            }
            return me.getPosition();
        };

        me.getEmptyRowsFromAbove = function(){
            var position = me.getPosition();
            var empty_rows = 0;
            for (var i = 0; i < position.length; i++) {
                var row = position[i];
                var filling_cells = row.filter(function(cell){
                    return cell === 1;
                });
                if(filling_cells.length == 0){
                    empty_rows++;
                }
                else{
                    break;
                }
            }
            return empty_rows;
        };

        me.getEmptyRowsFromBelow = function(){
            var position = me.getPosition();
            var empty_rows = 0;

            for (var i = position.length - 1; i >= 0; i--) {
                var row = position[i];
                var filling_cells = row.filter(function(cell){
                    return cell === 1;
                });
                if(filling_cells.length == 0){
                    empty_rows++;
                }
                else{
                    break;
                }
            }
            return empty_rows;
        };

        me.getPosition = function(){
            return positions[current_position_num];
        };

        me.getPositionCurrentNum = function(){
            return current_position_num;
        };

        me.getPositions =  function(){
            return positions;
        };

        me.getName = function(){
            return name;
        };

        me.getWidth = function(){
            return width;
        };

        me.getHeight = function(){
            return height;
        };

        return me;
    };
}]);
