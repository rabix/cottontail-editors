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
        var broodUrl = Globals.brood;
        var appUrl = Globals.app_url;
        var headers = {
            'Content-Type': 'application/json',
            'session-id': sessionId
        };

        self.apps = $resource(broodUrl + appUrl, {}, {
            'post': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers},
            'delete': {method: 'DELETE', headers: headers}
        });

        return self;


    }]);


