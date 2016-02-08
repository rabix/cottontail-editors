angular.module('registryApp.cliche')
    .directive('clicheEditor', ['Cliche', '$timeout', '$templateCache', function(Cliche, $timeout, $templateCache) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                app: '='
            },
            controller: 'ClicheCtrl',
            template:   '<div class="cliche-editor">' +
                            '<ng-include class="main" src="\'views/cliche/cliche.html\'"></ng-include>' +
                        '</div>',
            //template: $templateCache.get('views/cliche/cliche.html'),
            link: function(scope) {
                $timeout(function () {
                    Cliche.setTool(JSON.parse(scope.app));
                }, 500);

            }
        }
    }]);

