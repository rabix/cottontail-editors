/**
 * Author: Milica Kadic
 * Date: 10/14/14
 * Time: 2:18 PM
 */

'use strict';

angular.module('registryApp.cliche')
    .controller('JsonEditorCtrl', ['$scope', '$rootScope', '$modalInstance', '$timeout', '$document', 'options', 'SchemaValidator', '$http', function($scope, $rootScope, $modalInstance, $timeout, $document, options, SchemaValidator, $http) {

        $scope.view = {};
        $scope.view.user = options.user;

        $scope.view.urlImport = false;

        //$scope.mirror = null;

        // TODO: make this pretty, use directive which will serve as general purpose codemirror container
        var timeoutId = $timeout(function () {

            $scope.mirror = CodeMirror($document[0].querySelector('.codemirror-editor'), {
                lineNumbers: true,
                value: '',
                mode:  {name: 'javascript', json: true},
                theme: 'mbo',
                lineWrapping: true
            });

        }, 100);

        /**
         * Check if json is valid
         *
         * @param str
         * @returns {boolean}
         */
        var isJsonString = function (str) {

            try {
                JSON.parse(str);
                return true;
            } catch (e) {
                return false;
            }

        };

        /**
         * Do the app import
         */
        $scope.import = function() {

            var json = $scope.mirror.getValue();

            if ($scope.view.urlImport && $scope.view.url) {
                $http.get($scope.view.url).then(function (response) {

                    $scope.view.validating = false;

                    if (typeof response.data === 'object'){
                        validateJson(response.data);
                    } else {
                        try {
                            var data = JSON.parse(response.data);
                            validateJson(data);
                        } catch(e) {
                            $rootScope.$broadcast('httpError', {message: e});
                        }
                    }

                }, function (trace) {
                    $scope.view.validating = false;
                    $rootScope.$broadcast('httpError', {message: 'Response error: ' + trace.message});
                });

            } else {
                validateJson(json);
            }

        };

        function validateJson(data) {
            var json  = $scope.view.urlImport ? JSON.stringify(data): data;

            $scope.view.error = '';

            if (!$scope.view.urlImport && !isJsonString(json)) {
                $scope.view.error = 'You must provide valid json format';
                return false;
            }

            $scope.view.validating = true;

            SchemaValidator.validate(options.type, JSON.parse(json))
                .then(function() {

                    $scope.view.validating = false;

                    $modalInstance.close(json);

                }, function(trace) {
                    $scope.view.validating = false;
                    $rootScope.$broadcast('httpError', {message: trace});
                });

        }

        /**
         * Close the modal window
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.$on('$destroy', function () {
            if (angular.isDefined(timeoutId)) {
                $timeout.cancel(timeoutId);
                timeoutId = undefined;
            }
        });

    }]);
