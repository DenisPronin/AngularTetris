'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('AppTetris.services', []);

services.value('version', '0.1');

services.factory('Fields', function(){
    var me = this;
    var fields = [];

    me.addField = function(row, col, fill, type_block){
        if(row && col){
            var _field = {
                row: row,
                col: col,
                fill: (fill) ? fill : false,
                type_block: (type_block) ? type_block : ''
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

    me.getFieldByCoord = function(row, col){
        return fields[row][col];
    };

    me.getFields = function(){
        return fields;
    };

    return me;

});
