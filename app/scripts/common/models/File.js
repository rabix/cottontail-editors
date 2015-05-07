/**
 * Created by filip on 4.5.15..
 */

'use strict';

angular.module('registryApp.app')
    .factory('File', ['$q', 'Api', 'lodash', 'Globals', function ($q, Api, _, Globals) {

        var self = {};

        self.getFiles = function () {
            return Api.files.get({}).$promise;
        };

        self.getFilesInProject = function (nest) {
            var path = Globals.projectId;

            if (typeof nest !== 'undefined') {
                path += nest;
            }

            var query = {
                query: 'IN \"/Projects/' + path + '\" WHERE (type = \"DIRECTORY\" OR ((type = \"FILE\" AND attr(\"vis_details\") = \"\" AND (state = \"AVAILABLE\" OR (state = \"UPLOADING\" AND attr(\"produced_by_task\") = \"\"))))) ORDER BY type ASC, name ASC LIMIT 0, 50'
            };

            return Api.filesInProject.post(query).$promise;
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