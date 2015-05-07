/**
 * Created by filip on 4.5.15..
 */

'use strict';

angular.module('registryApp.common')
    .controller('FilePickerCtrl', ['$scope', 'lodash', 'File', function ($scope, _, File) {

        $scope.view = {};

        $scope.view.classes = [];

        $scope.view.limit = 0;
        $scope.view.page = 1;
        $scope.view.total = 1;
        $scope.view.searchTerm = '';
        $scope.view.perPage = 5;

        angular.forEach($scope.view.files, function(file) {
            if (file && file.attrs && typeof file.attrs.metadata !== 'undefined' && typeof file.attrs.metadata.value === 'string') {
                file.attrs.metadata.value = JSON.parse(file.attrs.metadata.value);
            } else {
                file.attrs.metadata = {};
                file.attrs.metadata.value = {};
            }
        });

        $scope.breadcrumbs = [];

        var updateView = function(files) {
            $scope.view.page = files.start == 0 ? 1 : $scope.view.page;
            $scope.view.total = files.matching;
            $scope.view.files = files.resultSet;

            console.log('Updating view', $scope.selectedFiles);
            _.forEach(files.resultSet, function (file) {

                var exists = _.find($scope.selectedFiles, function (f) {
                    return f.id === file.id;
                });

                if (exists) {
                    file.selected = true;
                }
            });
        };

        $scope.goToBreadcrumb = function ($index) {
            var path = '';
            for(var i = 0; i <= $index; i++) {
                path += '/';
                path += $scope.breadcrumbs[i];
            }

            $scope.breadcrumbs.splice($index + 1);

            File.getFilesInProject({limit: $scope.view.limit, offset: $scope.view.perPage, path: path}).then(function(files) {
                updateView(files);
            });
        };

        $scope.goToRoot = function () {
            File.getFilesInProject({offset: $scope.view.perPage}).then(function (files) {
                updateView(files);
            });
            $scope.breadcrumbs = [];
        };

        $scope.getMoreFiles = function (limit) {
            File.getFilesInProject({limit: limit}).then(function (files) {
                updateView(files);
            });
        };

        $scope.goToFolder = function (folderName) {
            $scope.breadcrumbs.push(folderName);
            $scope.goToBreadcrumb($scope.breadcrumbs.length - 1);
        };


        /**
         * Goes to a folder/root and loads files
         * @param config {Object}
         */
        $scope.goTo = function (config) {
            var c = {};
            c.limit = config.limit || $scope.view.limit;
            c.offset = config.offset || $scope.view.perPage;
            c.path = config.path || '';

            File.getFilesInProject(c).then(function (files) {
                $scope.view.files = files.resultSet;
                $scope.view.total = files.matching
            });

        };

        $scope.onFileSelect = function (file) {
            var id = file.id;
            var selected = file.selected;

            if (selected) {
                console.log('Calling onSelect with file id: ', id);
                onSelect({id: id});
            } else {
                console.log('Calling onDeSelect with file id: ', id);
                onDeSelect({id: id});
            }
        };

        var onSelect = function (id) {
            var exists = _.find($scope.selectedFiles, function (f) {
                return f.id === id;
            });

            if (!exists) {
                $scope.selectedFiles.push(id)
            }
        };

        var onDeSelect = function (id) {
            _.remove($scope.selectedFiles, function (i) {
                return i === id;
            });
        };

        $scope.toggleSelect = function (file) {

            if (file.type === 'DIRECTORY') {
                $scope.goToFolder(file.name);
                return false;
            }

            file.selected = typeof file.selected === 'undefined' ? false : file.selected;
            file.selected = !file.selected;

            $scope.onFileSelect(file);
        };

        $scope.onKeyDown = function ($event) {
            if ($event.which === 27) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.view.searchTerm = '';
            }
        };

        $scope.goToRoot();
    }])
    .directive('filePicker', ['$templateCache', function ($templateCache) {
        return {
            restrict: 'E',
            template: $templateCache.get('views/partials/file-picker.html'),
            scope: {
                files: '=',
                selectedFiles: '='
            },
            controller: 'FilePickerCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }]);

