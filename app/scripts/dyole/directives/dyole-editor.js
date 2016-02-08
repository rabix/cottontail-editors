angular.module('registryApp.dyole')
    .directive('dyoleEditor', [function() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                app: '='
            },
            template: '<div class="dyole-editor">' +
                '<ng-include class="main" src="\'views/app/workflow-editor.html\'" ng-controller="WorkflowEditorCtrl"></ng-include>' +
            '</div>',
            link: function(scope) {
                console.log('opening workflow editor');
            }
        }
    }]);

console.log('opening file');