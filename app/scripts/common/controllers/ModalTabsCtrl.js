'use strict';

angular.module('registryApp.common')
    .controller('ModalTabsCtrl', ['$scope', '$modalInstance', 'data', 'common', 'lodash', function ($scope, $modalInstance, data, Common, _) {

        $scope.data = data;
        $scope.view = {};

        $scope.view.tab = data.tabName || 'info';

        $scope.view.availablePorts = [];

        var inputRefs = data.inputs;

        inputRefs.sort(function (a, b) {
            if (a['@id'] < b['@id']) { return 1; }
            if (b['@id'] < a['@id']) { return -1; }
            return 0;
        });

        var _filterInputs = function () {
            var inputs = [],
                filter = ['file', 'directory'];

            _.each(inputRefs, function (input) {

                if (Common.checkTypeFile(input.schema[1] || input.schema[0])) {
                    input.required = input.schema.length === 1;
                    inputs.push(input);
                }

            });

            return inputs.length === 0 ? data.inputs : inputs;
        };

        $scope.view.inputs = _filterInputs();
        // placeholder for input values
        $scope.inputValues = {};

        if (typeof $scope.data.scatter !== 'undefiend' && typeof $scope.data.scatter === 'string') {
            $scope.inputValues[$scope.data.scatter] = true;
        }

        $scope.onScatterChange = function (id, value) {
            console.log(id, value);

            if (value) {
                _.forEach($scope.inputValues, function (val, inputId) {
                    if (inputId !== id) {
                        $scope.inputValues[inputId] = false;
                    }
                });
            }
        };

        /**
         * Switch tab on the right side
         *
         * @param {string} tab
         */
        $scope.switchTab = function (tab) {
            $scope.view.tab = tab;
        };

        /**
         * Close the modal
         */
        $scope.ok = function () {
            var scatter = false;
            _.forEach($scope.inputValues, function (val, inputId) {
                if (val) {
                    scatter = inputId;
                }
            });

            $modalInstance.close(scatter);
        };

        /**
         * Dismiss the modal
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
