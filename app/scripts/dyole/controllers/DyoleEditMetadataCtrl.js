/**
 * @ngdoc controller
 * @name registryApp.dyole.controller:DyoleEditMetadataCtrl
 *
 * @description
 * Ctrl for editing workflow metadata
 *
 * @requires $scope
 * */


angular.module('registryApp.dyole')
    .controller('DyoleEditMetadataCtrl', ['$scope', '$modalInstance', 'data', 'HelpMessages', 'lodash', function($scope, $modalInstance, data, HelpMessages, _){
        $scope.help = HelpMessages;
        $scope.view = {};

        $scope.view.tool = angular.copy(data.tool);
        $scope.view.categories = [];

        $scope.view.categories = _.map($scope.view.tool['sbg:categories'], function(cat) {
            return {text: cat};
        });

        /**
         * Toggle markdown preview
         */
        $scope.togglePreview = function() {
            $scope.view.preview = !$scope.view.preview;
        };

        /**
         * Updates $scope.view.tool.categories
         */
        $scope.updateCategories = function() {
            $scope.view.tool['sbg:categories'] = _.pluck($scope.view.categories, 'text');
        };


        /**
         * Close the modal window
         */
        $scope.edit = function () {
            $modalInstance.close($scope.view.tool);
        };

        /**
         * Close the modal window
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
