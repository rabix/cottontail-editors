'use strict';

/**
 * @ngdoc overview
 * @name registryApp
 * @description
 * # registryApp
 *
 * Main module of the application.
 */
angular
    .module('registryApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'ngPrettyJson',
        'LocalForageModule',
        'registryApp.app',
        'registryApp.cliche',
        'registryApp.dyole',
        'registryApp.repo',
        'registryApp.task',
        'registryApp.common',
        'registryApp.util'
    ])
    .constant('Const', {
        exposedSeparator: '$',
        generalSeparator: '.'
    })
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .state('builds', {
                url: '/builds',
                templateUrl: 'views/builds.html',
                controller: 'BuildsCtrl'
            })
            .state('build', {
                url: '/build/:id',
                templateUrl: 'views/build.html',
                controller: 'BuildCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'views/settings.html',
                controller: 'SettingsCtrl'
            });

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push('HTTPInterceptor');

    }]);
