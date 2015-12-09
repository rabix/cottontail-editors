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
    .controller('ToolSettingsCtrl', ['$scope', '$uibModalInstance', 'data', 'HelpMessages', 'lodash', function ($scope, $modalInstance, data, HelpMessages, _) {
        'use strict';

        $scope.help = HelpMessages;

        $scope.view = {};
        $scope.view.type = data.type || 'Workflow';
        $scope.view.requireSBGMetadata = _.clone(data.requireSBGMetadata);

        /** @type Hint[] */
        $scope.view.hints = _.clone(data.hints) || [];

        // angular form
        $scope.view.appSettings = {};
        $scope.addMetadata = function () {
            $scope.view.hints.push({
                class: '',
                value: ''
            });
        };

        /**
         * Updates hint value when it is changed
         * @param {string|Expression} value
         * @param {number} index
         */
        $scope.updateHintValue = function (value, index) {
          $scope.view.hints[index].value = value;
        };

        /**
         * Remove meta data from the output
         *
         * @param {number} index
         */
        $scope.removeMetadata = function (index) {
            $scope.view.hints.splice(index, 1);

            $scope.view.appSettings.$setDirty();
        };

        /**
         * Removes hints with blank class fields
         * @private
         */
        function _stripEmptyHints() {
            _.remove($scope.view.hints, function (meta) {
                return meta.class === '';
            });
        }

        /**
         * Close modal and apply changes
         */
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
