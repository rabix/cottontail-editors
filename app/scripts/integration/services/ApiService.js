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
        var appUrl = Globals.app_url;
        var getAppsUrl = Globals.get_apps_url;
        var getMineAppsByProject = apiVersion + '/aggregate?group_by=project&func=array&visibility=mine';
        var getPublicAppsByProject = apiVersion + '/aggregate?group_by=project&func=array&visibility=public';
        var validateAppUrl =  Globals.brood + apiVersion + '/validate/app';
        var headers = {
            'Content-Type': 'application/json',
            'session-id': sessionId
        };

        self.apps = $resource(broodAppUrl + appUrl + '/:revision', {'revision':'@revision'}, {
            'post': {method: 'POST', headers: headers},
            'update': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers, params: {'_role': 'default'}},
            'delete': {method: 'DELETE', headers: headers}
        });

        self.getAllApps = $resource(broodAppUrl + getAppsUrl, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.getPublicAppsByProject = $resource(brood + getPublicAppsByProject, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.getMineAppsByProject = $resource(brood + getMineAppsByProject, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.validateApp = $resource(validateAppUrl, {}, {
            'validate': {method: 'POST', headers: headers}
        });

        return self;


    }]);


