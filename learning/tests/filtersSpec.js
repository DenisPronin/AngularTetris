describe('filter', function(){
    beforeEach(module('App.filters'));

    describe('reverse', function(){
        it('Should reverse a string!', inject(function(reverseFilter){
            expect(reverseFilter('ABCD')).toEqual('DCBA');
        }))
    });
});