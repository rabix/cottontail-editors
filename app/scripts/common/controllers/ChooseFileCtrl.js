/**
 * Created by filip on 4.5.15..
 */

angular.module('registryApp.common')
    .controller('ChooseFileCtrl', ['$scope', '$modalInstance', 'lodash', function ($scope, $modalInstance, _) {

        $scope.selectedFiles = [];

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.choose = function() {
            $modalInstance.close($scope.selectedFiles);
        };

    }]);