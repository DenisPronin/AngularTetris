'use strict';
describe('fields', function() {

    beforeEach(module('AppTetris.services'));
    beforeEach(module('AppTetris.filters'));
    beforeEach(module('AppTetris.controllers'));

    describe('Check Fields service', function() {
        var $fields;
        var board_width = 8;
        var board_height = 10;
        var BORDER_WIDTH = 2;

        beforeEach(function(){
            inject(function(_Fields_) {
                $fields = new _Fields_();
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

            var res = $fields.addField(2, 2, false, '');
            expect(res).toBeFalsy();

        });

        it('getRowsLength', inject(function(Line){
            expect($fields.getRowsLength()).toEqual(board_height);
        }));

        it('getColsLength', inject(function(Line){
            expect($fields.getColsLength()).toEqual(board_width);
        }));

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

            // zone in border
            zoneChanged = $fields.setZone(Line, -1, 3);
            expect(zoneChanged).toBeFalsy();
            zoneChanged = $fields.setZone(Line, board_height + 1, 3);
            expect(zoneChanged).toBeFalsy();
            zoneChanged = $fields.setZone(Line, 2, -1);
            expect(zoneChanged).toBeFalsy();
            zoneChanged = $fields.setZone(Line, 2, board_width+1);
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
            var exceed = $fields.getExceedCount();
            expect(exceed).toBeNull();

            Line.setPosition(0);
            // normal
            $fields.setZone(Line, 2, 2);
            exceed = $fields.getExceedCount();
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

        it('removeHeapFromField', inject(function(Line){
            var _f = $fields.getFieldByCoord(3, 2);
            $fields.addFieldToHeap(3, 2);
            expect(_f.heap).toBeTruthy();
            $fields.removeHeapFromField(3, 2);
            expect(_f.heap).toBeFalsy();
        }));

        it('getRowByNum', inject(function(Line){
            var row_num = board_height - BORDER_WIDTH - 1;
            var row = $fields.getRowByNum(row_num);
            expect(row[0].row).toEqual(row_num);
        }));

        it('checkFullLines', inject(function(Line){
            var row_num = board_height - BORDER_WIDTH - 1;
            var row = $fields.getRowByNum(row_num);

            _.map(row, function(cell){
                $fields.addFieldToHeap(cell.row, cell.col);
            });

            var full_rows = $fields.checkFullLines();

            expect(full_rows[0]).toEqual(row_num);
        }));

        it('removeRowFromHeap', inject(function(Line){
            var row_num = board_height - BORDER_WIDTH - 1;
            var row = $fields.getRowByNum(row_num);

            _.map(row, function(cell){
                $fields.addFieldToHeap(cell.row, cell.col);
            });

            $fields.removeRowFromHeap(row);

            _.map(row, function(cell){
                expect(cell.heap).toBeFalsy();
            });
        }));

        it('moveHeapDown', inject(function(Line){
            var row_num = board_height - BORDER_WIDTH - 1;
            var row = $fields.getRowByNum(row_num);

            _.map(row, function(cell){
                $fields.addFieldToHeap(cell.row, cell.col);
            });

            $fields.addFillToField(row_num - 1, 4, 'line');
            $fields.addFieldToHeap(row_num - 1, 4);

            $fields.removeRowFromHeap(row);
            $fields.moveHeapDown(row_num);

            var fieldByCoord = $fields.getFieldByCoord(row_num, 4);

            expect(fieldByCoord.heap).toBeTruthy();
            expect(fieldByCoord.fill).toBeTruthy();
            expect(fieldByCoord.type_figure).toEqual('line');

        }));

        it('removeRowFromHeap', inject(function(Line){
            for (var i = 1; i < 3; i++) {
                var row_num = board_height - BORDER_WIDTH - i;
                var row = $fields.getRowByNum(row_num);
                _.map(row, function(cell){
                    $fields.addFieldToHeap(cell.row, cell.col);
                });
            }
            $fields.removeFullRows();
            var full_lines = $fields.checkFullLines();
            expect(full_lines.length).toEqual(0);
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
