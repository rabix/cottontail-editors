'use strict';

angular.module('registryApp.app')
    .factory('App', ['$q', 'Api', 'SchemaValidator', 'lodash', 'Globals', function ($q, Api, SchemaValidator, _, Globals) {
        var self = {};
        /**
         * Get tools
         *
         * @returns {*}
         */
        self.getTools = function() {

            return Api.apps.get(params).$promise;

        };

        /**
         * Get script tools
         *
         * @returns {*}
         */
        self.getScripts = function() {

            return Api.apps.get(params).$promise;

        };

        /**
         * Get workflows
         *
         * @returns {*}
         */
        self.getWorkflows = function() {

            return Api.apps.get(params).$promise;
        };

        /**
         * Get tool
         *
         * @param revision
         * @returns {object} $promise
         */
        self.get = function(revision) {

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
        self.update = function(appId, tool, job, type) {

            return SchemaValidator.validate(type, tool)
                .then(function() {
                    return Api.apps.update({}, {tool: tool, job: job, app_id: appId}).$promise;
                }, function(trace) {
                    return $q.reject(trace);
                });

        };

        self.validateJson = function (json) {
            return Api.validateApp.validate({}, json).$promise;
        };

        self.getAppUrl = function (json) {
            return Globals.brood + '/v1/app' + Globals.app_url;
        };

        self.flush = function (type) {
//            return $localForage.removeItem(type);
        };

        return self;

    }]);