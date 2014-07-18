services.factory('Score', [
    'localStorageService',
    function(localStorageService){
        var me = this;
        var score = 0;
        var cost_line = 50;

        me.setScore = function(_score){
            score = _score * cost_line;
            me.updateBestScore();
        };

        me.updateScore = function(_score){
            score += _score * cost_line;
            me.updateBestScore();
        };

        me.updateBestScore = function(){
            var best_score = localStorageService.get('bestScore');
            if(score > best_score){
                localStorageService.set('bestScore', score);
            }
        };

        me.getScore = function(){
            return score;
        };

        me.getBestScore = function(){
            var best_score = localStorageService.get('bestScore');
            return (best_score) ? best_score : 0;
        };

        return me;
    }
]);
