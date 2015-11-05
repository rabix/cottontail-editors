/**
 * @ngdoc controller
 * @name registryApp.cliche.controller:ToolSettingsCtrl
 *
 * @description
 * Ctrl for editing tool settings
 *
 * @requires $scope
 * */


angular.module('registryApp.cliche')
    .controller('ToolSettingsCtrl', ['$scope', '$modalInstance', 'data', 'HelpMessages', 'lodash', function ($scope, $modalInstance, data, HelpMessages, _) {
        $scope.help = HelpMessages;

        $scope.view = {};
        $scope.view.type = data.type || 'Workflow';
        $scope.view.requireSBGMetadata = data.requireSBGMetadata;

        $scope.view.hints = data.hints || [];

        $scope.addMetadata = function () {
            $scope.view.hints.push({
                class: '',
                value: ''
            });
        };

        /**
         * Remove meta data from the output
         *
         * @param {integer} index
         */
        $scope.removeMetadata = function (index) {
            $scope.view.hints.splice(index, 1);
        };

        function _stripEmptyHints() {
            _.remove($scope.view.hints, function (meta) {
                return meta.class === '';
            });
        }

        $scope.ok = function () {

            _stripEmptyHints();

            $modalInstance.close({
                requireSBGMetadata: $scope.view.requireSBGMetadata,
                hints: $scope.view.hints
            });

        };
        /**
         * Close the modal window
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
