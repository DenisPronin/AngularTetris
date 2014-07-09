'use strict';

services.factory('Fields', ['$filter', 'Figures', function($filter, $figures){
    var me = this;
    var fields = [];
    var zone = [];

    var board_height, board_width, BORDER_WIDTH;

    me.initBoard = function(_board_height, _board_width, _border_width){
        initBoardParams(_board_height, _board_width, _border_width);
        fields = [];
        for (var i = 0; i < board_height; i++) {
            for (var j = 0; j < board_width;j++){
                if((i < 2 || i >= board_height - BORDER_WIDTH) || (j < BORDER_WIDTH || j >= board_width -BORDER_WIDTH)){
                    me.addField(i, j, true, 'border');
                }
                else{
                    me.addField(i, j, false, '');
                }
            }
        }
    };

    var initBoardParams = function(_board_height, _board_width, _border_width){
        board_height = _board_height;
        board_width = _board_width;
        BORDER_WIDTH = _border_width;
    };

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
        var random_row = $filter('randomNumber')(BORDER_WIDTH, count_rows - BORDER_WIDTH - 1);
        var random_col = $filter('randomNumber')(BORDER_WIDTH, count_cols - BORDER_WIDTH - 1);
        return me.getFieldByCoord(random_row, random_col);
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
        if(_field.type_figure != 'border'){
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
        var _zone = [];
        var position = figure.getPosition();
        var width = figure.getWidth();
        var height = figure.getHeight();
        var upLimit = false;
        for (var i = 0; i < width; i++) {
            var row = [];
            if(start_row >= 0 && start_row + i  < board_height){
                for (var j = 0; j < height; j++) {
                    if(start_col >= 0 && start_col + j < board_width){
                        var field = me.getFieldByCoord(start_row + i, start_col + j);
                        if(field){
                            if(field.fill == true && position[i][j] == 1){
                                upLimit = true;
                                break;
                            }
                            else{
                                row.push({row: field.row, col: field.col});
                            }
                        }
                    }
                    else{
                        upLimit = true;
                        break;
                    }
                }
                _zone.push(row);
            }
            else{
                upLimit = true;
                break;
            }
        }
        if(!upLimit){
            zone = _zone;
            return true;
        }
        else return false;
    };

    me.clearZone = function(){
        for (var i = 0; i < zone.length; i++) {
            var row = zone[i];
            for (var j = 0; j < row.length; j++) {
                var coords = zone[i][j];
                if(coords){
                    me.removeFillFromField(coords.row, coords.col);
                }
            }
        }
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

    me.getExceedCount = function(){
        var border_width = 2;
        var left_exceed = 0, right_exceed = 0, bottom_exceed = 0, top_exceed = 0;
        if(zone.length > 0){
            var first_row = zone[0];
            var first_cell = first_row[0];
            var isTopExceed = true;

            zone.filter(function(_row){
                if(_row[0].row < border_width){
                    bottom_exceed++;
                }
            });

            if(first_cell != null && first_cell.col < border_width){
                left_exceed = border_width - first_cell.col;
            }

            var last_row = zone[zone.length - 1];
            var last_cell = last_row[last_row.length - 1];
            if(last_cell  != null && last_cell.col >= board_width - border_width){
                right_exceed = last_cell.col -  (board_width - 1 - border_width);
            }

            return {
                left_exceed: left_exceed,
                right_exceed: right_exceed,
                bottom_exceed: bottom_exceed
            }
        }
        return null;
    };

    return me;

}]);