/**
 * Created by filip on 4.5.15..
 */

'use strict';

angular.module('registryApp.app')
    .factory('File', ['$q', 'Api', 'lodash', function ($q, Api, _) {

        var self = {};

        self.getFiles = function () {
            return Api.files.get({}).$promise;
        };

        /**
         * Get file stats
         *
         * @param file
         * @returns {$promise|*}
         */
        self.getStat = function (file) {
            return Api.fileStats.get({file: file}).$promise;
        };

        return self;
    }]);