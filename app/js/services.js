'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('AppTetris.services', []);

services.factory('Fields', ['$filter', function($filter){
    var me = this;
    var fields = [];

    me.addField = function(row, col, fill, type_figure){
        if(row != undefined && col != undefined ){
            var _field = {
                row: row,
                col: col,
                fill: (fill) ? fill : false,
                type_figure: (type_figure) ? type_figure : ''
            };
            if(!fields[row]){
                fields.push([]);
            }
            if(!fields[row][col]){
                fields[row].push(_field);
            }
            else{
                console.log('Field already exists!');
            }
        }
    };

    me.getRandomField = function(){
        var count_rows = me.getRowsLength();
        var count_cols = me.getColsLength();
        var random_row = $filter('randomNumber')(0, count_rows - 1);
        var random_col = $filter('randomNumber')(0, count_cols - 1);
        return me.getFieldByCoord(random_row, random_col);
    };

    me.getRandomFieldInRow = function(row){
        var count_cols = me.getColsLength();
        var random_col = $filter('randomNumber')(0, count_cols - 1);
        return me.getFieldByCoord(row, random_col);
    };

    me.addFillToField = function(row, col, type_figure){
        var _field = me.getFieldByCoord(row, col);
        if(_field){
            _field.fill = true;
            _field.type_figure = type_figure;
        }
    };

    me.removeFillFromField = function(row, col){
        var _field = me.getFieldByCoord(row, col);
        if(_field){
            _field.fill = false;
            _field.type_figure = '';
        }
    };

    me.clearFields = function(){
        for (var i = 0; i < fields.length; i++) {
            var row = fields[i];
            for (var j = 0; j < row.length; j++) {
                var col = row[j];
                me.removeFillFromField(i, j);
            }
        }
    };

    me.getFieldByCoord = function(row, col){
        return fields[row][col];
    };

    me.getFields = function(){
        return fields;
    };

    me.getRowsLength = function(){
        return fields.length;
    };

    me.getColsLength = function(){
        var count_rows = me.getRowsLength();
        return (count_rows > 0) ? fields[0].length : 0;
    };

    return me;

}]);

services.factory('Figures', ['$filter', 'L_Left', 'L_Right', 'Line', function($filter, $l_left, $l_right, $line){
    var me = this;

    var figures = [];
    figures.push($l_left, $line);

    me.getFigures = function(){
        return figures;
    };

    me.getRandomFigure = function(){
        var _random = $filter('randomNumber')(0, figures.length - 1);
        return (figures[_random]) ? figures[_random]: null;
    };

    return me;
}]);

services.factory('L_Left', function(){
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

    var base =  new BaseFigure();
    base.initFigure(name,width,height,positions);

    return base;
});

services.factory('L_Right', function(){
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

    var base =  new BaseFigure();
    base.initFigure(name,width,height,positions);

    return base;
});

services.factory('Line', function(){
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

    var base =  new BaseFigure();
    base.initFigure(name,width,height,positions);

    return base;
});

var BaseFigure = (function(){
    return function(){
        var me = this;

        var name = '';
        var width = 0;
        var height = 0;
        var positions = [];

        me.initFigure = function(_name, _width, _height, _positions){
            name = _name;
            width = _width;
            height = _height;
            positions = _positions;
        };

        me.getRandomPosition = function(){
            return Math.round(Math.random()*3);
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
}());