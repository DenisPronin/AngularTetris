services.factory('Fields', [
    function(){
        return function(){
            var me = this;
            var row = 0;
            var col = 0;
            var fill = false;
            var heap = false;
            var type_figure = '';

            me.setRow = function(_row){
                row = _row;
            };

            me.getRow = function(_row){
                return row;
            };

            me.setCol = function(_col){
                col = _col;
            };

            me.getCol = function(_col){
                return row;
            };
        }
    }
]);
