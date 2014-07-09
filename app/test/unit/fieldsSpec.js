'use strict';
describe('fields', function() {

    beforeEach(module('AppTetris.services'));

    describe('Check Fields service', function() {
        var $fields;
        var board_width = 8;
        var board_height = 10;
        var BORDER_WIDTH = 2;

        beforeEach(function(){
            inject(function(_Fields_) {
                $fields = _Fields_;
                $fields.initBoard(board_height, board_width, BORDER_WIDTH);
            });
        });

        it('Create board', function() {
            for (var i = 0; i < board_height; i++) {
                for (var j = 0; j < board_width;j++){
                    var _field = $fields.getFieldByCoord(i, j);
                    if((i < 2 || i >= board_height - BORDER_WIDTH) || (j < BORDER_WIDTH || j >= board_width -BORDER_WIDTH)){
                        expect(_field.row).toEqual(i);
                        expect(_field.col).toEqual(j);
                        expect(_field.fill).toBeTruthy();
                        expect(_field.type_figure).toEqual('border');
                    }
                    else{
                        expect(_field.row).toEqual(i);
                        expect(_field.col).toEqual(j);
                        expect(_field.fill).not.toBeTruthy();
                        expect(_field.type_figure).toEqual('');
                    }
                }
            }

        });

        it('addFillToField', function(){
            var row = 5, col = 5;
            $fields.addFillToField(row, col, 'line');
            var field = $fields.getFieldByCoord(row, col);
            expect(field.fill).toBeTruthy();
            expect(field.type_figure).toEqual('line');
        });

        it('removeFillFromField', function(){
            // in center of board
            var row = 5, col = 5;
            $fields.addFillToField(row, col, 'line');
            $fields.removeFillFromField(row, col);
            var field = $fields.getFieldByCoord(row, col);
            expect(field.fill).toBeFalsy();
            expect(field.type_figure).toEqual('');

            // in border of board
            row = 1; col = 1;
            $fields.removeFillFromField(row, col);
            field = $fields.getFieldByCoord(row, col);
            expect(field.fill).toBeTruthy();
            expect(field.type_figure).toEqual('border');

        });

        it('clearFields', function(){
            var _row = 5, _col = 5;
            $fields.addFillToField(_row, _col, 'line');
            $fields.addFillToField(_row+1, _col, 'line');
            $fields.addFillToField(_row+2, _col, 'line');
            $fields.clearFields();

            var fields = $fields.getFields();
            for (var i = 0; i < fields.length; i++) {
                var row = fields[i];
                for (var j = 0; j < row.length; j++) {
                    var field = $fields.getFieldByCoord(i, j);
                    if((i < 2 || i >= board_height - BORDER_WIDTH) || (j < BORDER_WIDTH || j >= board_width -BORDER_WIDTH)){
                        expect(field.fill).toBeTruthy();
                        expect(field.type_figure).toEqual('border');
                    }
                    else{
                        expect(field.fill).toBeFalsy();
                        expect(field.type_figure).toEqual('');
                    }
                }
            }

        });

        it('setZone', inject(function(Line){
            Line.setPosition(1);
            // zone in board
            var zoneChanged = $fields.setZone(Line, 2, 2);
            expect(zoneChanged).toBeTruthy();
            zoneChanged = $fields.setZone(Line, 3, 2);
            expect(zoneChanged).toBeTruthy();

            // zone in border
            zoneChanged = $fields.setZone(Line, 3, 3);  // right exceed
            expect(zoneChanged).toBeFalsy();
            zoneChanged = $fields.setZone(Line, 3, 1); // left exceed
            expect(zoneChanged).toBeFalsy();

            Line.setPosition(2);
            zoneChanged = $fields.setZone(Line, 3, 1);
            expect(zoneChanged).toBeTruthy();
            zoneChanged = $fields.setZone(Line, 3, 0);
            expect(zoneChanged).toBeTruthy();

            Line.setPosition(0);
            zoneChanged = $fields.setZone(Line, 3, 1);
            expect(zoneChanged).toBeTruthy();
            zoneChanged = $fields.setZone(Line, 3, 0);
            expect(zoneChanged).toBeFalsy();

        }));

        it('fill and clear Zone', inject(function(Line){
            Line.setPosition(1);
            var zoneChanged = $fields.setZone(Line, 2, 2);
            $fields.fillZone(Line);

            var zone = $fields.getZone();
            var position = Line.getPosition();
            parseZone(zone, position, true);

            $fields.clearZone();
            parseZone(zone, position, false);

        }));

        it('getExceedCount', inject(function(Line){
            Line.setPosition(0);
            // normal
            $fields.setZone(Line, 2, 2);
            var exceed = $fields.getExceedCount();
            expect(exceed.left_exceed).toEqual(0);
            expect(exceed.right_exceed).toEqual(0);
            expect(exceed.bottom_exceed).toEqual(0);

            // right_exceed
            $fields.setZone(Line, 2, 4);
            exceed = $fields.getExceedCount();
            expect(exceed.left_exceed).toEqual(0);
            expect(exceed.right_exceed).toEqual(2);
            expect(exceed.bottom_exceed).toEqual(0);

            $fields.setZone(Line, 2, 3);
            exceed = $fields.getExceedCount();
            expect(exceed.left_exceed).toEqual(0);
            expect(exceed.right_exceed).toEqual(1);
            expect(exceed.bottom_exceed).toEqual(0);

            // left_exceed
            Line.setPosition(2);
            $fields.setZone(Line, 2, 0);
            exceed = $fields.getExceedCount();
            expect(exceed.left_exceed).toEqual(2);
            expect(exceed.right_exceed).toEqual(0);
            expect(exceed.bottom_exceed).toEqual(0);

            $fields.setZone(Line, 2, 1);
            exceed = $fields.getExceedCount();
            expect(exceed.left_exceed).toEqual(1);
            expect(exceed.right_exceed).toEqual(0);
            expect(exceed.bottom_exceed).toEqual(0);

            // bottom_exceed
            Line.setPosition(3);
            $fields.setZone(Line, 0, 2);
            exceed = $fields.getExceedCount();
            expect(exceed.left_exceed).toEqual(0);
            expect(exceed.right_exceed).toEqual(0);
            expect(exceed.bottom_exceed).toEqual(2);

            $fields.setZone(Line, 1, 2);
            exceed = $fields.getExceedCount();
            expect(exceed.left_exceed).toEqual(0);
            expect(exceed.right_exceed).toEqual(0);
            expect(exceed.bottom_exceed).toEqual(1);

        }));

        function parseZone(zone, position, fillMode){
            for (var i = 0; i < zone.length; i++) {
                var row = zone[i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    var _field = $fields.getFieldByCoord(cell.row, cell.col);
                    var fill = (_field.fill) ? 1 : 0;
                    if(fillMode){
                        expect(fill).toEqual(position[i][j]);
                    }
                    else{
                        expect(fill).toEqual(0);

                    }
                }
            }

        }
    });
});
