/**
 * Created by filip on 4.5.15..
 */

'use strict';

angular.module('registryApp.common')
    .controller('FilePickerCtrl', ['$scope', 'lodash',function ($scope, _) {

        $scope.view = {};
        $scope.view.files = _.clone($scope.files, true);

        angular.forEach($scope.view.files, function(file, index) {
            if (file && file.attrs && file.attrs.metadata !== 'undefined' && typeof file.attrs.metadata.value === 'string') {
                file.attrs.metadata.value = JSON.parse(file.attrs.metadata.value);
            } else {
                file.attrs.metadata = {};
                file.attrs.metadata.value = {};
            }
        });
        
        $scope.onFileSelect = function (id, selected) {
            console.log('File input click: ', id, selected);
            if (selected) {
                console.log('Calling onSelect with file id: ', id);
                $scope.onSelect({id: id});
            } else {
                console.log('Calling onDeSelect with file id: ', id);
                $scope.onDeSelect({id: id});
            }
        };

    }])
    .directive('filePicker', ['$templateCache', function ($templateCache) {
        return {
            restrict: 'E',
            template: $templateCache.get('views/partials/file-picker.html'),
            scope: {
                files: '=',
                selectedFiles: '=',
                onSelect: '&',
                onDeSelect: '&'
            },
            controller: 'FilePickerCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }]);

