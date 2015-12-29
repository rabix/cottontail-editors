angular.module('registryApp.common')
    .filter('loc', [function () {
        'use strict';

        return function (id, configObj) {
            return document.l10n.getSync(id, configObj || {});
        };
    }]);