services.factory('Speed', [
    function(){
        var me = this;
        var speeds = [];
        var current_speed = 0;
        var fallen_speed = 50;

        var speed_count = 7;
        var first_speed = speed_count * 100;
        for (var i = 0; i < speed_count; i++) {
            speeds.push(first_speed - 100*i);
        }

        me.setNextSpeed = function(){
            if(current_speed + 1 < speed_count){
                current_speed++;
            }
        };

        me.setCurrentSpeed = function(_current_speed){
            current_speed = _current_speed;
        };

        me.getCurrentSpeed = function(){
            return speeds[current_speed];
        };

        me.getFallenSpeed = function(){
            return fallen_speed;
        };

        me.getNumOfSpeed = function(){
            return current_speed;
        };

        me.getSpeeds = function(){
            return speeds;
        };

        me.getSpeedsCount = function(){
            return speed_count;
        };

        return me;
    }
]);
