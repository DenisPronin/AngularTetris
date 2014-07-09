'use strict';

/* jasmine specs for services go here */

describe('figures', function() {

    beforeEach(module('AppTetris.services'));

    describe('Check base figures parameters', function() {
        var name = 'test_name';
        var w = 4, h = 4;
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
        var test_figure;

        beforeEach(function(){
            inject(function(_BaseFigure_) {
                test_figure = new _BaseFigure_();
                test_figure.initFigure(name ,w ,h, positions);
            });
        });

        it('check name', function() {
            expect(test_figure.getName()).toEqual(name);
        });

        it('check width', function() {
            var first_position = positions[0];
            expect(test_figure.getWidth()).toEqual(w);
            expect(test_figure.getWidth()).toEqual(first_position[0].length);

        });

        it('check height', function() {
            var first_position = positions[0];
            expect(test_figure.getHeight()).toEqual(h);
            expect(test_figure.getHeight()).toEqual(first_position.length);
        });

        it('check position', function() {
            expect(test_figure.getPosition()).not.toBeUndefined();

            var _p = test_figure.getPosition();
            var i = 0;
            _p.filter(function(row){
                var j=0;
                row.filter(function(cell){
                    expect(positions[0][i][j] == cell).toBeTruthy();
                    j++;
                });
                i++;
            });
        });

        it('check setting next positions', function() {
            for (var j = 0; j < positions.length; j++) {
                test_figure.setNextPosition();
                expect(test_figure.getPosition()).not.toBeUndefined();
            }
        });

        it('check empty rows', function() {
            test_figure.setPosition(1);
            expect(test_figure.getEmptyRows()).toEqual(1);

            test_figure.setPosition(3);
            expect(test_figure.getEmptyRows()).toEqual(2);
        });

    });

    describe('Check initializing figures parameters', function(){
        var figures;
        beforeEach(function(){
            inject(function(_Figures_) {
                figures = _Figures_.getFigures();
            });
        });

        it('check figures Params', function() {
            for (var i = 0; i < figures.length; i++) {
                var figure = figures[i];
                var position = figure.getPosition();

                if(figure.getWidth() != position[0].length){
                    console.log('Error in width in this figure: ' + figure.getName());
                }
                expect(figure.getWidth()).toEqual(position[0].length);

                if(figure.getHeight() != position.length){
                    console.log('Error in height in this figure: ' + figure.getName());
                }
                expect(figure.getHeight()).toEqual(position.length);

            }
        });

    });
});
