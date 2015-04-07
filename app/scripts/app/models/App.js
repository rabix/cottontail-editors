'use strict';

angular.module('registryApp.app')
    .factory('App', ['$q', 'Api', 'SchemaValidator', 'lodash', function ($q, Api, SchemaValidator, _) {

        /**
         * Get tools
         *
         * @returns {*}
         */
        var getTools = function() {

            return Api.apps.get(params).$promise;

        };

        /**
         * Get script tools
         *
         * @returns {*}
         */
        var getScripts = function() {

            return Api.apps.get(params).$promise;

        };

        /**
         * Get workflows
         *
         * @returns {*}
         */
        var getWorkflows = function() {

            return Api.apps.get(params).$promise;
        };

        /**
         * Get tool
         *
         * @param revision
         * @returns {object} $promise
         */
        var get = function(revision) {

            return Api.apps.get().$promise;
        };

        /**
         * Update the tool - create new revision
         *
         * @param appId
         * @param tool
         * @param job
         * @param type
         * @returns {*}
         */
        var update = function(appId, tool, job, type) {

            return SchemaValidator.validate(type, tool)
                .then(function() {
                    return Api.apps.update({}, {tool: tool, job: job, app_id: appId}).$promise;
                }, function(trace) {
                    return $q.reject(trace);
                });

        };

        var validateJson = function (json) {
            return Api.validateApp.validate({}, json).$promise;
        };

        var flush = function (type) {
//            return $localForage.removeItem(type);
        };

        return {
            getTools: getTools,
            getScripts: getScripts,
            get: get,
            update: update,
            flush: flush,
            validateJson: validateJson
        };

    }]);