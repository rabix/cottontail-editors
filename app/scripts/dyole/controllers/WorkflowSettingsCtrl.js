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
    .controller('WorkflowSettingsCtrl', ['$scope', '$uibModalInstance', 'data', 'HelpMessages', 'lodash', function ($scope, $modalInstance, data, HelpMessages, _) {
        'use strict';

        $scope.help = HelpMessages;

        $scope.view = {};
        $scope.view.type = data.type || 'Workflow';
        $scope.view.requireSBGMetadata = _.clone(data.requireSBGMetadata);
        $scope.view.instanceHint = {
            class: 'sbg:sbg:AWSInstanceType',
            value: ''
        };

        /** @type Hint[] */
        $scope.view.hints = _.clone(data.hints) || [];

        // angular form
        $scope.view.appSettings = {};

        //$scope.view.instances = data.instances;

        //var hint = _.find(data.hints, function (hint) {
        //    return hint.class === $scope.view.instanceHint.class;
        //});
        //
        //if (hint && hint.value ) {
        //    $scope.view.instanceHint.value = hint.value;
        //}



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

            $scope.view.appSettings.$setDirty();
        };

        /**
         * Updates hint value when it is changed
         * @param {string|Expression} value
         * @param {number} index
         */
        $scope.updateHintValue = function (value, index) {
            $scope.view.hints[index].value = value;
        };



        var _stripEmptyHints = function() {
            _.remove($scope.view.hints, function (meta) {
                return meta.class === '';
            });
        };

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
