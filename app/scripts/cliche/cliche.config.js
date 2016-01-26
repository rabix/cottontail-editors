/**
 * Author: Milica Kadic
 * Date: 2/3/15
 * Time: 2:57 PM
 */

'use strict';

angular.module('registryApp.cliche', [
    'ui.bootstrap',
    'registryApp.common',
    'registryApp.app',
    'registryApp.util',
    'registryApp.repo',
    'ngPrettyJson',
    'markdown',
    'ngTagsInput',
    'ngAnimate'])
    .constant('Const', {
        exposedSeparator: '$',
        generalSeparator: '.'
    })
    .config([
        '$locationProvider',
        '$uibModalProvider',
        'NotificationProvider',
        function($locationProvider, $uibModalProvider, NotificationProvider) {
            if (history.pushState) {
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
            }

            $uibModalProvider.options = {
                backdrop: 'static'
            };

            NotificationProvider.setOptions({
                delay: 6000
            });
        }
    ]);
