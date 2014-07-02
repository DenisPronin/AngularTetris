'use strict';

services.factory('Figures', ['$filter', 'L_Left', 'L_Right', 'Line', function($filter, $l_left, $l_right, $line){
    var me = this;

    var figures = [];
    figures.push($l_left, $l_right, $line);

    me.getFigures = function(){
        return figures;
    };

    me.getRandomFigure = function(){
        var _random = $filter('randomNumber')(0, figures.length - 1);
        return (figures[_random]) ? figures[_random]: null;
    };

    return me;
}]);

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
            if(!num){ // is random position
                current_position_num =  $filter('randomNumber')(0, positions.length - 1);
            }
            else{
                current_position_num = num;
            }
        };

        me.getPosition = function(){
            return positions[current_position_num];
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

services.factory('L_Left', ['BaseFigure', function($baseFigure){
    var name = 'l_left';
    var width = 3;
    var height = 3;

    var positions = [
        [
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [1,1,0],
            [1,0,0],
            [1,0,0]
        ],
        [
            [1,1,1],
            [0,0,1],
            [0,0,0]
        ],
        [
            [0,0,1],
            [0,0,1],
            [0,1,1]
        ]
    ];

    var base =  new $baseFigure();
    base.initFigure(name,width,height,positions);

    return base;
}]);

services.factory('L_Right', ['BaseFigure', function($baseFigure){
    var name = 'l_right';
    var width = 3;
    var height = 3;

    var positions = [
        [
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ],
        [
            [1,0,0],
            [1,0,0],
            [1,1,0]
        ],
        [
            [1,1,1],
            [1,0,0],
            [0,0,0]
        ],
        [
            [0,1,1],
            [0,0,1],
            [0,0,1]
        ]
    ];

    var base =  new $baseFigure();
    base.initFigure(name,width,height,positions);

    return base;
}]);

services.factory('Line', ['BaseFigure', function($baseFigure){
    var name = 'line';
    var width = 4;
    var height = 4;

    var positions = [
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ]
    ];

    var base =  new $baseFigure();
    base.initFigure(name,width,height,positions);

    return base;
}]);

