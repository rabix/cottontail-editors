angular.module('registryApp.dyole')
    .directive('dyoleEditor', [function() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                app: '=',
                callbacks: '='
            },
            controller: 'WorkflowEditorCtrl',
            template:   '<div class="dyole-editor">' +
                            '<ng-include class="main" src="\'views/app/workflow-editor.html\'"></ng-include>' +
                        '</div>'
        }
    }]);