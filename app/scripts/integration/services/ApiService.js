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
        var broodUrl = Globals.brood + '/v1/app';
        var appUrl = Globals.app_url;
        var getAppsUrl = Globals.get_apps_url;
        var validateAppUrl =  Globals.brood + '/v1/validate/app';
        var headers = {
            'Content-Type': 'application/json',
            'session-id': sessionId
        };

        self.apps = $resource(broodUrl + appUrl, {'_role': 'default'}, {
            'post': {method: 'POST', headers: headers},
            'update': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers},
            'delete': {method: 'DELETE', headers: headers}
        });

        self.getAllApps = $resource(broodUrl + getAppsUrl, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.validateApp = $resource(validateAppUrl, {}, {
            'validate': {method: 'POST', headers: headers}
        });

        return self;


    }]);


