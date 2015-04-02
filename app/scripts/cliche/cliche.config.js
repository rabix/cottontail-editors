/**
 * Author: Milica Kadic
 * Date: 2/3/15
 * Time: 2:57 PM
 */

'use strict';

angular.module('registryApp.cliche', ['ui.bootstrap', 'registryApp.common', 'registryApp.repo', 'registryApp.app', 'registryApp.util', 'ngPrettyJson', 'hc.marked', 'ngTagsInput'])
    .constant('Const', {
        exposedSeparator: '$'
    })
    .config(['$stateProvider', function ($stateProvider) {


        $stateProvider
            .state('cliche-new', {
                url: '/cliche/:type',
                templateUrl: '/views/cliche/cliche.html',
                controller: 'ClicheCtrl'
            })
            .state('cliche-edit', {
                url: '/cliche/:type/:id/:revision',
                templateUrl: '/views/cliche/cliche.html',
                controller: 'ClicheCtrl'
            });
    }]);
