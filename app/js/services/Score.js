services.factory('Score', [
    '$filter',
    function($filter){
        var me = this;
        var score = 0;
        var cost_line = 50;

        me.setScore = function(_score){
            score += _score * cost_line;
        };

        me.getScore = function(){
            return score;
        };

        return me;
    }
]);
