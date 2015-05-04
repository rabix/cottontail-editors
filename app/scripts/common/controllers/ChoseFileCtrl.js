/**
 * Created by filip on 4.5.15..
 */

angular.module('registryApp.common')
    .controller('ChoseFileCtrl', ['$scope', '$modalInstance', 'data', 'lodash', function ($scope, $modalInstance, data, _) {

        var selectedFiles = [];

        $scope.files = data.files;

        $scope.onSelect = function (id) {
            selectedFiles.push(id)
        };

        $scope.onDeSelect = function (id) {
            _.remove(selectedFiles, function (i) {
                return i === id;
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.choose = function() {
            $modalInstance.close(selectedFiles);
        };

    }]);