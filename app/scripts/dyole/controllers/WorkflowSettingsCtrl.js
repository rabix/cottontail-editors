/**
 * @ngdoc controller
 * @name registryApp.dyole.controller:WorkflowSettingsCtrl
 *
 * @description
 * Ctrl for editing workflow settings
 *
 * @requires $scope
 * */


angular.module('registryApp.dyole')
    .controller('WorkflowSettingsCtrl', ['$scope', '$modalInstance', 'data', 'HelpMessages', 'lodash', function ($scope, $modalInstance, data, HelpMessages, _) {
        $scope.help = HelpMessages;

        $scope.view = {};
        $scope.view.requireSBGMetadata = data.requireSBGMetadata;
        $scope.view.instanceHint = {
            class: 'sbg:sbg:AWSInstanceType',
            value: ''
        };

        $scope.view.instances = data.instances;

        var hint = _.find(data.hints, function (hint) {
            return hint.class === $scope.view.instanceHint.class;
        });

        if (hint && hint.value ) {
            $scope.view.instanceHint.value = hint.value;
        }

        $scope.ok = function () {
            var inst = _.clone($scope.view.instanceHint, true);
            $scope.view.instanceHint = '';

            $modalInstance.close({
                requireSBGMetadata: $scope.view.requireSBGMetadata,
                instance: inst
            });

        };
        /**
         * Close the modal window
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
