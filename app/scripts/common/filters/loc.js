angular.module('registryApp.common')
    .filter('loc', [function () {
        'use strict';

        return function (id, configObj) {
            var string = document.l10n.getSync(id, configObj || {});

            return string === id ? '' : string;
        };
    }]);