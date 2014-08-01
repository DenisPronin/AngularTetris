services.factory('Levels', [
    '$filter',
    'localStorageService',
    'L1',
    'L2',
    function($filter, localStorageService, $l1, $l2){
        var me = this;

        var levels = [];
        levels.push(null, $l1, $l2);

        var current_level = 0;

        me.getLevels = function(){
            return levels;
        };

        me.setCurrentLevel = function(_current_level){
            current_level = _current_level;
        };

        me.getCurrentLevel = function(){
            return levels[current_level];
        };

        me.setComplete = function(level){
            var name = level.getName();
            var complete_levels = localStorageService.get('completeLevels');
            if(complete_levels){
                var intersect =  complete_levels.filter(function(n){
                    return name == n;
                });
                if(intersect.length == 0){
                    complete_levels.push(name);
                    writeComplete(complete_levels);
                }
            }
            else{
                writeComplete([name]);
            }
        };

        me.isCompleteLevel = function(level){
            var name = level.getName();
            var complete_levels = localStorageService.get('completeLevels');
            if(complete_levels){
                var intersect =  complete_levels.filter(function(n){
                    return name == n;
                });
                return intersect.length > 0;
            }
            return false;
        };


        var writeComplete = function(_levels){
            localStorageService.set('completeLevels', _levels);
        };

        me.getComplete = function(){
            localStorageService.get('completeLevels');
        };

        return me;
    }
]);

services.factory('BaseLevel', [
    'Score',
    function($score){
        return function(){
            var me = this;

            var name = '';
            var map = null;
            var width = 0;
            var height = 0;
            var BORDER_WIDTH = 2;

    //        timeLimit, needScore
            var win_conditions = {};
            var description = '';

            var timeEnd = false;

            me.initLevel = function(_name, _map, _win_conditions, _description){
                name = _name;
                map = _map;
                height = _map.length;
                if(map.length > 0){
                    width = map[0].length;
                }
                win_conditions = _win_conditions;
                description = _description;
            };

            me.getName = function(){
                return name;
            };

            me.getMap = function(){
                return map;
            };

            me.getWidth = function(){
                return width;
            };

            me.getHeight = function(){
                return height;
            };

            me.getBorderWidth = function(){
                return BORDER_WIDTH;
            };

            me.getWinConditions = function(){
                return win_conditions;
            };

            me.getDescription = function(){
                return description;
            };

            me.setTimeEnd = function(isEnd){
                timeEnd = isEnd;
            };

            me.getTimeEnd = function(isEnd){
                return timeEnd;
            };

            me.checkScore = function(){
                var win = true;
                var conditions = me.getWinConditions();
                if(conditions.needScore){
                    win = ($score.getScore() >= conditions.needScore);
                }

                return win;
            };

            me.checkTimeLimit = function(){
                var win = true;
                var conditions = me.getWinConditions();
                if(conditions.timeLimit){
                    win = timeEnd;
                }

                return win;
            };

            return me;
        };
    }
]);

/*
* Border block: 1
* L_Left block: 2
* L_Right block: 3
* Line block: 4
* Square block: 5
* L_Zigzag block: 6
* R_Zigzag block: 7
* Ship block: 8
* */

 services.factory('L1', [ 'BaseLevel',
    function($baseLevel){
        var me = this;

        var name = 'level1';
        var map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 6, 6, 6, 0, 0, 0, 0, 5, 5, 5, 1, 1],
            [1, 1, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 1, 1],
            [1, 1, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        var _need_score = 150;
        var win_conditions = {
            needScore: _need_score
        };

        var description = 'Get ' + _need_score + ' points.';

        var base =  new $baseLevel();
        base.initLevel(name, map, win_conditions, description);

        return base;
    }
]);

 services.factory('L2', [ 'BaseLevel',
    function($baseLevel){
        var me = this;

        var name = 'level2';
        var map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 1, 1],
            [1, 1, 0, 3, 0, 4, 0, 2, 0, 5, 0, 6, 1, 1],
            [1, 1, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        var _need_score = 500;
        var _time_limit = 90;
        var win_conditions = {
            needScore: _need_score,
            timeLimit: _time_limit
        };

        var description = 'Get ' + _need_score + ' points in ' + _time_limit + ' seconds.';

        var base =  new $baseLevel();
        base.initLevel(name, map, win_conditions, description);

        return base;
    }
]);

