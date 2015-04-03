'use strict';

angular.module('clicheApp', ['ui.router', 'registryApp.cliche'])
    .controller('ClicheAppCtrl', ['$scope', '$state', function ($scope, $state) {
        $state.go('cliche-editor-new', {type: 'tool'});
    }])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('cliche-editor-new', {
                url: '/:type',
                templateUrl: 'views/cliche/cliche.html',
                controller: 'ClicheCtrl'
            });
    }]);