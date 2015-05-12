/**
 * Created by filip on 4.5.15..
 */

angular.module('registryApp.common')
    .controller('ChooseFileCtrl', ['$scope', '$modalInstance', 'data', 'lodash', function ($scope, $modalInstance, data, _) {

        $scope.selectedFiles = data.selectedFiles || [];

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.choose = function() {
            $modalInstance.close($scope.selectedFiles);
        };

    }]);