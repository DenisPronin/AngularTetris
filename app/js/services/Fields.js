'use strict';

services.factory('Fields', ['$filter', 'Figures', function($filter, $figures){
    var me = this;
    var fields = [];
    var zone = [];

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

    // operations with figures
    me.setZone = function(figure, start_row, start_col){
        me.clearZone();
        var width = figure.getWidth();
        var height = figure.getHeight();
        for (var i = 0; i < width; i++) {
            var row = [];
//                if(start_row + i  < $scope.board_width){
            for (var j = 0; j < height; j++) {
                //if(start_col + j < $scope.board_height){
                var field = me.getFieldByCoord(start_row + i, start_col + j);
                if(field){
                    row.push({row: field.row, col: field.col});
                }
            }
            zone.push(row);
        }
    };

    me.clearZone = function(){
        for (var i = 0; i < zone.length; i++) {
            var row = zone[i];
            for (var j = 0; j < row.length; j++) {
                var col = row[j];
                var coords = zone[i][j];
                if(coords){
                    me.removeFillFromField(coords.row, coords.col);
                }
            }
        }
        zone = [];
    };

    me.fillZone = function(figure){
        var position = figure.getPosition();
        var name = figure.getName();
        for (var i = 0; i < position.length; i++) {
            for (var j = 0; j < position[i].length; j++) {
                var coords = zone[i][j];
                if(coords && position[i][j]){
                    me.addFillToField(coords.row, coords.col, name);
                }
            }
        }
    };

    me.getZone = function(){
        return zone;
    };

    return me;

}]);
