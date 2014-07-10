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
                        expect(_field.heap).toBeFalsy();
                        expect(_field.type_figure).toEqual('border');
                    }
                    else{
                        expect(_field.row).toEqual(i);
                        expect(_field.col).toEqual(j);
                        expect(_field.fill).not.toBeTruthy();
                        expect(_field.heap).toBeFalsy();
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

            row = 1; col = 1;
            $fields.addFillToField(row, col, 'line');
            field = $fields.getFieldByCoord(row, col);
            expect(field.fill).toBeTruthy();
            expect(field.type_figure).toEqual('border');

            row = 3; col = 3;
            $fields.addFieldToHeap(row, col);
            $fields.addFillToField(row, col, 'line');
            field = $fields.getFieldByCoord(row, col);
            expect(field.fill).toBeFalsy();
            expect(field.type_figure).toEqual('');
            expect(field.heap).toBeTruthy();
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
            $fields.addFillToField(row, col, 'line');
            $fields.removeFillFromField(row, col);
            field = $fields.getFieldByCoord(row, col);
            expect(field.fill).toBeTruthy();
            expect(field.type_figure).toEqual('border');

            // in border of board
            row = 3; col = 3;
            $fields.addFillToField(row, col, 'line');
            $fields.addFieldToHeap(row, col);
            $fields.removeFillFromField(row, col);
            field = $fields.getFieldByCoord(row, col);

            expect(field.fill).toBeTruthy();
            expect(field.type_figure).toEqual('line');
            expect(field.heap).toBeTruthy();

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
            zoneChanged = $fields.setZone(Line, 3, 4);
            expect(zoneChanged).toBeTruthy();
            zoneChanged = $fields.setZone(Line, 3, 5);
            expect(zoneChanged).toBeFalsy();

            // check set zone to filling fields
            $fields.addFillToField(2,2);    // filling field miss a figure
            zoneChanged = $fields.setZone(Line, 2, 2);
            expect(zoneChanged).toBeTruthy();
            $fields.addFillToField(2,3); // filling field not miss a figure
            zoneChanged = $fields.setZone(Line, 2, 2);
            expect(zoneChanged).toBeFalsy();

            // check set zone to heap
            $fields.clearZone();
            $fields.addFieldToHeap(2,2);    // heap miss a figure
            zoneChanged = $fields.setZone(Line, 2, 2);
            expect(zoneChanged).toBeTruthy();
            $fields.addFieldToHeap(2,3); // heap not miss a figure
            zoneChanged = $fields.setZone(Line, 2, 2);
            expect(zoneChanged).toBeFalsy();

        }));

        it('fill and clear Zone', inject(function(Line){
            Line.setPosition(1);
            var zoneChanged = $fields.setZone(Line, 2, 2);
            $fields.fillZone(Line);

            var zone = $fields.getZone();
            var position = Line.getPosition();
            parseZone(zone, position, true, false);

            $fields.clearZone();
            parseZone(zone, position, false, false);

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

        it('fillHeap', inject(function(Line){
            Line.setPosition(1);
            var zoneChanged = $fields.setZone(Line, 2, 2);
            $fields.fillZone(Line);
            $fields.fillHeap(Line);
            parseZone($fields.getZone(), Line.getPosition(), false, true);
        }));

        function parseZone(zone, position, fillMode, heapMode){
            for (var i = 0; i < zone.length; i++) {
                var row = zone[i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    var _field = $fields.getFieldByCoord(cell.row, cell.col);
                    var fill = (_field.fill) ? 1 : 0;
                    if(!heapMode){
                        if(fillMode){
                            expect(fill).toEqual(position[i][j]);
                        }
                        else{
                            expect(fill).toEqual(0);
                        }
                    }
                    else{
                        var heap = (_field.heap) ? 1 : 0;
                        expect(fill).toEqual(position[i][j]);
                    }

                }
            }

        }
    });
});
