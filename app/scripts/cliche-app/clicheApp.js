'use strict';

angular.module('clicheApp', ['registryApp.cliche'])
    .controller('ClicheAppCtrl', ['$scope', function ($scope) {

        //$state.go('cliche-editor-new', {type: 'tool'});
    }])

    .config([function () {

        //
        //$stateProvider
        //    .state('cliche-editor-new', {
        //        url: '/:type',
        //        templateUrl: 'views/cliche/cliche.html',
        //        controller: 'ClicheCtrl'
        //    });
    }]);