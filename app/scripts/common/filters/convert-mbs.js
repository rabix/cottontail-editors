/**
 * Created by filip on 4.5.15..
 */

angular.module('registryApp.common')
    .filter('convertMbs', [function() {
        return function(num) {
            var bites = parseInt(num),
                mb = 1024 * 1024;

            return Math.round(bites/mb * 100) / 100;
        };
    }]);