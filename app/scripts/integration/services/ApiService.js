/**
 * @ngdoc service
 * @name clicheApp.ApiService
 * @description
 * Api override
 *
 * @requires $resource, $http, Globals
 *
 * */


angular.module('integration')
    .service('Api', ['$resource', '$http', 'Globals',function ($resource, $http, Globals) {

        var self = {};
        var sessionId = Globals.user.sessionId;
        var apiVersion = '/v1';
        var brood = Globals.brood;
        var broodAppUrl = Globals.brood + apiVersion + '/apps';
        var projectOwner = Globals.projectOwner;
        var projectSlug = Globals.projectSlug;
        var appName = Globals.appName;
        var revision = parseInt(Globals.revision, 10);
        var getAppsUrl = Globals.get_apps_url;
        var getAppsByProject = apiVersion + '/aggregate?group_by=project&func=array';
        var validateAppUrl =  Globals.brood + apiVersion + '/validate/app';
        var headers = {
            'Content-Type': 'application/json',
            'session-id': sessionId
        };

        self.apps = $resource(broodAppUrl + '/' + projectOwner + '/' + projectSlug + '/' + appName + '/:revision', {revision: '@revision'}, {
            'post': {method: 'POST', headers: headers},
            'update': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers, params: {'_role': 'default'}},
            'delete': {method: 'DELETE', headers: headers}
        });

        self.getAllApps = $resource(broodAppUrl + getAppsUrl, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.getAppsByProject = $resource(brood + getAppsByProject, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.validateApp = $resource(validateAppUrl, {}, {
            'validate': {method: 'POST', headers: headers}
        });

        self.getLatest = $resource(broodAppUrl  + '/' + projectOwner + '/' + projectSlug + '/' + appName, {}, {
            'get': {method: 'GET', headers: headers}
        });

        return self;


    }]);


