'use strict';

angular.module('clicheApp', ['registryApp.cliche', 'integration'])
    .controller('ClicheAppCtrl', [function() {
        /* currently being used to bootstrap the Cliche editor
           found in camellia under cliche-content.html */
    }])
    .config(['$uibTooltipProvider', '$uibModalProvider', function($uibTooltipProvider, $uibModalProvider) {

        $uibTooltipProvider.options({
            popupDelay: 100,
            animation: true,
            appendToBody: true
        });

        $uibModalProvider.options.animation = true;
    }]);