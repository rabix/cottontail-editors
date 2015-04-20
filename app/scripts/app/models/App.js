'use strict';

angular.module('registryApp.app')
    .factory('App', ['$q', 'Api', 'SchemaValidator', 'lodash', 'Globals', function ($q, Api, SchemaValidator, _, Globals) {
        var self = {};
        var revision = parseInt(Globals.revision);

        /**
         * Get tools
         *
         * @returns {*}
         */
        self.getTools = function() {

            return Api.apps.get({}).$promise;

        };

        /**
         * Get script tools
         *
         * @returns {*}
         */
        self.getScripts = function() {

            return Api.apps.get({}).$promise;

        };

        /**
         * Get workflows
         *
         * @returns {*}
         */
        self.getWorkflows = function() {

            return Api.apps.get({}).$promise;
        };

        /**
         * Get tool
         *
         * @param revision
         * @returns {object} $promise
         */
        self.get = function() {

            return Api.apps.get({revision: revision}).$promise;
        };

        self.getApp = function(projectOwner, projectSlug, appName) {

            return Api.getApp.get({projectOwner: projectOwner, projectSlug: projectSlug, appName: appName}).$promise;
        };

        /**
         * Update the tool - create new revision
         *
         * @param app
         * @param type
         * @returns {*}
         */
        self.update = function(app, type) {

            return SchemaValidator.validate(type, app)
                .then(function() {
                    return Api.apps.get().$promise.then(function (latest) {
                        var rev = latest.message['sbg:revision'] + 1;
                        return Api.apps.update({revision: rev}, app).$promise;
                    });
                }, function(trace) {
                    return $q.reject(trace);
                });

        };

        self.validateJson = function (json) {
            return Api.validateApp.validate({}, json).$promise;
        };

        self.getAppUrl = function (json) {
            return Globals.urls.brood + 'apps' + Globals.appUrl;
        };

        self.flush = function (type) {
//            return $localForage.removeItem(type);
        };

        self.getPublicAppsByProject = function () {
            return Api.getPublicAppsByProject.get({}).$promise;
        };

        self.getMineAppsByProject = function () {
            return Api.getMineAppsByProject.get({}).$promise;
        };

        return self;

    }]);