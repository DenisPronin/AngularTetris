'use strict';

services.factory('Figures', [
    '$filter',
    'L_Left',
    'L_Right',
    'Line',
    'Square',
    'L_Zigzag',
    'R_Zigzag',
    'Ship',
    function($filter, $l_left, $l_right, $line, $square, $l_zigzag, $r_zigzag, $ship){
        var me = this;

        var figures = [];
        figures.push($l_left, $l_right, $line, $square, $l_zigzag, $r_zigzag, $ship);

        me.getFigures = function(){
            return figures;
        };

        me.getRandomFigure = function(){
            var _random = $filter('randomNumber')(0, figures.length - 1);
            return (figures[_random]) ? figures[_random]: null;
        };

        return me;
    }
]);

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

services.factory('Square', ['BaseFigure', function($baseFigure){
    var name = 'square';
    var width = 2;
    var height = 2;

    var positions = [
        [
            [1,1],
            [1,1]
        ]
    ];

    var base =  new $baseFigure();
    base.initFigure(name,width,height,positions);

    return base;
}]);

services.factory('L_Zigzag', ['BaseFigure', function($baseFigure){
    var name = 'l_zigzag';
    var width = 3;
    var height = 3;

    var positions = [
        [
            [0,1,1],
            [1,1,0],
            [0,0,0]
        ],
        [
            [0,1,0],
            [0,1,1],
            [0,0,1]
        ],
        [
            [0,0,0],
            [0,1,1],
            [1,1,0]
        ],
        [
            [1,0,0],
            [1,1,0],
            [0,1,0]
        ]
    ];

    var base =  new $baseFigure();
    base.initFigure(name,width,height,positions);

    return base;
}]);

services.factory('R_Zigzag', ['BaseFigure', function($baseFigure){
    var name = 'r_zigzag';
    var width = 3;
    var height = 3;

    var positions = [
        [
            [1,1,0],
            [0,1,1],
            [0,0,0]
        ],
        [
            [0,0,1],
            [0,1,1],
            [0,1,0]
        ],
        [
            [0,0,0],
            [1,1,0],
            [0,1,1]
        ],
        [
            [0,1,0],
            [1,1,0],
            [1,0,0]
        ]
    ];

    var base =  new $baseFigure();
    base.initFigure(name,width,height,positions);

    return base;
}]);

services.factory('Ship', ['BaseFigure', function($baseFigure){
    var name = 'ship';
    var width = 3;
    var height = 3;

    var positions = [
        [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ],
        [
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ]
    ];

    var base =  new $baseFigure();
    base.initFigure(name,width,height,positions);

    return base;
}]);

