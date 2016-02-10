angular.module('registryApp.cliche')
    .directive('clicheEditor', ['Cliche', '$timeout', '$templateCache', function(Cliche, $timeout, $templateCache) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                app: '=',
                callbacks: '='
            },
            controller: 'ClicheCtrl',
            template: '<div class="cliche-editor">' +
            '<ng-include class="main" src="\'views/cliche/cliche.html\'"></ng-include>' +
            '</div>',
        }
    }]);

