/**
 * Author: Milica Kadic
 * Date: 10/14/14
 * Time: 2:18 PM
 */

'use strict';

angular.module('registryApp.cliche')
    .controller('InputFieldCtrl', ['$scope', '$modal', '$templateCache', 'Cliche', 'Const', 'lodash', function ($scope, $modal, $templateCache, Cliche, Const, _) {

        $scope.view = {};

        $scope.key = $scope.key || 'name';

        $scope.view.name = Cliche.parseName($scope.prop);
        $scope.view.property = $scope.prop || {};
        $scope.view.property.type = Cliche.getSchema('input', $scope.prop, $scope.type, true);
        $scope.view.property.inputBinding = Cliche.getAdapter($scope.prop, false, 'input');
        $scope.view.type = Cliche.parseType($scope.view.property.type);
        $scope.view.required = Cliche.isRequired($scope.view.property.type);
        $scope.view.items = Cliche.getItemsRef($scope.view.type, $scope.view.property.type);
        $scope.view.itemsType = Cliche.getItemsType($scope.view.items);

        $scope.view.tpl = 'views/cliche/inputs/input-' + $scope.view.type.toLowerCase()  + '.html';

        var keyName = $scope.appName + Const.exposedSeparator + $scope.view.name;

        var enumObj = Cliche.parseEnum($scope.view.property.type);

        $scope.view.symbols = enumObj.symbols;

        $scope.view.expose = $scope.exposed ? !_.isUndefined($scope.exposed[keyName]) : false;
        if ($scope.view.expose) { $scope.isDisabled = true; }

        $scope.view.exposible = !_.isUndefined($scope.exposed);



        $scope.view.ignore = $scope.ignoreFiles === 'true' && ($scope.view.type === 'File' || ($scope.view.items === 'File'));

        /**
         * Get default input scheme
         *
         * @param {*} value
         * @returns {*}
         */
        var getDefaultScheme = function (value) {

            if (_.isObject(value)) {
                return '';
            } else {
                return value;
            }

        };

        /**
         * Get file input scheme
         *
         * @param {*} value
         * @returns {*}
         */
        var getFileScheme = function (value) {

            var validFileKeys = ['path', 'size', 'secondaryFiles', 'metadata'];

            var intersection = _.intersection(validFileKeys, _.keys(value));

            if (intersection.length > 0) {
                return value;
            } else {
                return {path: value};
            }

        };

        /**
         * Get object input scheme
         *
         * @param {*} value
         * @returns {*}
         */
        var getObjectScheme = function (value) {

            if (_.isObject(value)) {
                return value;
            } else {
                return {};
            }

        };

        //var inputScheme = $scope.model;
        var inputScheme;

        /* type FILE */
        if ($scope.view.type === 'File') {

            inputScheme = getFileScheme($scope.model);

        /* type RECORD */
        } else if($scope.view.type === 'record') {

            inputScheme = getObjectScheme($scope.model);

        /* type ARRAY */
        } else if($scope.view.type === 'array') {
            inputScheme = [];

            $scope.view.items = $scope.view.items || 'string';

            switch($scope.view.itemsType) {
            case 'record':
                _.each($scope.model, function(value) {
                    var innerScheme = getObjectScheme(value);
                    delete innerScheme.path;
                    inputScheme.push(innerScheme);
                });
                break;
            case 'File' || 'file':
                _.each($scope.model, function(value) {
                    inputScheme.push(getFileScheme(value));
                });
                break;
            default:
                //Type checking to avoid an array of characters
                if (_.isArray($scope.model)) {
                    _.each($scope.model, function(value) {
                        inputScheme.push(getDefaultScheme(value));
                    });
                } else if (_.isString($scope.model)) {
                    inputScheme.push(getDefaultScheme($scope.model));
                }
                break;
            }
            /* type STRING, NUMBER, INTEGER, BOOLEAN */
        } else {
            inputScheme = getDefaultScheme($scope.model);
        }

        $scope.view.model = inputScheme;

        // TODO: Figure this out for complex props, try to avoid this deep watch
        var deepWatcher = $scope.$watch('view.model', function(n, o) {
            if (n !== o) { $scope.model = n; }
        }, true);


//        // TODO: Figure this out for complex props
//        if ($scope.view.type === 'File') {
//            $scope.$watch('view.model.path', function(n, o) {
//                if (n !== o) {
//                    if (typeof $scope.model !== 'undefined'){
//                        $scope.model.path = n;
//                    } else {
//                        $scope.model = $scope.view.model;
//                    }
//                }
//            });
//        }

        /**
         * Open modal to enter more parameters for the input file
         */
        $scope.more = function() {

            var modalInstance = $modal.open({
                template: $templateCache.get('views/cliche/partials/input-file-more.html'),
                controller: 'InputFileMoreCtrl',
                windowClass: 'modal-prop',
                resolve: {data: function () {return {schema: $scope.view.model, key: $scope.view.name};}}
            });

            modalInstance.result.then(function (schema) {
                $scope.view.model = angular.copy(schema);
            });

        };

        /**
         * Expose current parameter
         */
        $scope.exposeParams = function () {

            if ($scope.view.expose) {
                $scope.exposed[keyName] = $scope.prop;
                $scope.isDisabled = true;
                $scope.handleExpose({appName: $scope.appName, key: $scope.view.name});
            } else {
                delete $scope.exposed[keyName];

                if (typeof $scope.onUnExpose === 'function') {
                    $scope.onUnExpose({appName: $scope.appName, key: $scope.view.name, value: $scope.view.model});
                }

                $scope.isDisabled = false;
            }


        };

        $scope.$on('$destroy', function () {
            if (_.isFunction(deepWatcher)) {
                deepWatcher.call();
                deepWatcher = null;
            }
        })

    }])
    .directive('inputField', ['RecursionHelper', function (RecursionHelper) {
        return {
            restrict: 'E',
            template: '<ng-form name="inputForm" class="input-property" ng-if="!view.ignore"><ng-include class="include" src="view.tpl"></ng-include></ng-form>',
            scope: {
                model: '=ngModel',
                prop: '=',
                key: '@',
                ignoreFiles: '@',
                form: '=',
                appName: '@',
                exposed: '=?',
                isDisabled: '=?',
                handleExpose: '&',
                onUnExpose: '&'
            },
            controller: 'InputFieldCtrl',
            compile: function(element) {
                return RecursionHelper.compile(element, function() {});
            }
        };
    }]);