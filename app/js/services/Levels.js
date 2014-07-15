services.factory('Levels', [
    '$filter',
    'L1',
    'L2',
    function($filter, $l1, $l2){
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

        return me;
    }
]);

services.factory('BaseLevel', [function(){
    return function(){
        var me = this;

        var name = '';
        var map = null;
        var width = 0;
        var height = 0;
        var BORDER_WIDTH = 2;

        me.initLevel = function(_name, _map){
            name = _name;
            map = _map;
            height = _map.length;
            if(map.length > 0){
                width = map[0].length;
            }
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

        return me;
    };
}]);

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

        var base =  new $baseLevel();
        base.initLevel(name, map);

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

        var base =  new $baseLevel();
        base.initLevel(name, map);

        return base;
    }
]);

