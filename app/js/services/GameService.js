'use strict';

services.factory('GameIntervals', [
    '$interval',
    function($interval){
        var me = this;

        var process_interval = null;
        var speed_interval = null;

        me.setProcessInterval = function(callback, length_interval){
            endInterval(process_interval);
            process_interval = $interval(callback, length_interval);
        };

        me.endProcessInterval = function(){
            endInterval(process_interval);
        };

        me.getProcessInterval = function(){
            return process_interval;
        };

        me.setSpeedInterval = function(callback, length_interval){
            endInterval(speed_interval);
            speed_interval = $interval(callback, length_interval);
        };

        me.endSpeedInterval = function(){
            endInterval(speed_interval);
        };

        var endInterval = function(_interval){
            if(_interval){
                $interval.cancel(_interval);
            }
        };

        return me;
    }
]);
