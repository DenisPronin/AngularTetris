describe('filters', function() {
    beforeEach(module('AppTetris.filters'));


    describe('randomNumber', function() {

        for (var i = 0; i < 100; i++) {
            it('Get a random number between..', inject(function(randomNumberFilter) {
                var max = 3;
                var min = 0;
                var random_int = randomNumberFilter(min, max);

                expect(random_int).toBeLessThan(max + 1);
                expect(random_int).toBeGreaterThan(min - 1);
            }));
        }
    });

});
