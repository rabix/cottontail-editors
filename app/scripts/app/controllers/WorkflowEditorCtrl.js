/**
 * Created by filip on 9.10.14..
 */
'use strict';

angular.module('registryApp.app')
    .controller('WorkflowEditorCtrl', ['$scope', '$rootScope', '$q', '$modal', '$templateCache', 'Loading', 'App', 'User', 'Repo', 'BeforeRedirect', 'Helper', 'PipelineService', 'lodash', 'Globals', 'BeforeUnload', function ($scope, $rootScope, $q, $modal, $templateCache, Loading, App, User, Repo, BeforeRedirect, Helper, PipelineService, _, Globals, BeforeUnload) {
        var PipelineInstance = null;
            //onBeforeUnloadOff = BeforeUnload.register(function() { return 'Please save your changes before leaving.'; });

        $scope.view = {};

        /* workflow mode: new or edit */
        $scope.view.mode = 'edit';

        /* loading state of the page */
        $scope.view.loading = true;

        /* current tab for the right sidebar */
        $scope.view.tab = 'apps';

        /* current workflow */
        $scope.view.workflow = {};

        /* group visibility flags for repos */
        $scope.view.groups = {
            myRepositories: false,
            otherRepositories: false
        };

        /* visibility flags for repo groups that hold apps */
        $scope.view.repoGroups = {};

        $scope.view.repoTypes = {
            MyApps: {},
            PublicApps: {}
        };

        /* list of my repos */
        $scope.view.MyApps = {};

        /* list of other repos */
        $scope.view.PublicApps = {};

        /* list of user repos*/
        $scope.view.userRepos= [];

        /* flag if something is changed: params or workflow */
        $scope.view.isChanged = false;

        /* flag when save is clicked */
        $scope.view.saving = false;

        /* flag for sidebar visibility */
        $scope.view.showSidebar = true;

        $scope.view.classes = ['page', 'workflow-edit'];
        Loading.setClasses($scope.view.classes);

        $scope.Loading = Loading;

        $scope.view.searchTerm = '';

        $scope.view.searchTerm = '';

//        $scope.view.appRevisions = {};

        /**
         * Set controller id for pipeline Service to use it
         *
         * @type {string}
         */
        $scope.view.id = 'workflowEditorCtrl';

        $scope.$watch('Loading.classes', function (n, o) {
            if (n !== o) {
                $scope.view.classes = n;
            }
        });

        PipelineService.register($scope.view.id, function () {
            PipelineInstance = PipelineService.getInstance($scope.view.id);

            console.log('Pipeline Instance cached', PipelineInstance);
        });

        $q.all([
                User.getUser()
//                Repo.getRepos(0, '', true)
            ]).then(function(result) {
                $scope.view.user = result[0].user;
//                $scope.view.userRepos = result[1].list;
            });

        if ($scope.view.mode === 'edit') {
            App.get()
                .then(function (result) {
                    $scope.view.workflow = result.message;
                    $scope.view.loading = false;
                });
        }

        var toggleState = true;

        var toggleAll = function () {

            _.forEach($scope.view.repoTypes.MyApps, function (obj, repo) {
                $scope.view.repoGroups[repo] = toggleState;
            });

            _.forEach($scope.view.repoTypes.PublicApps, function (obj, repo) {
                $scope.view.repoGroups[repo] = toggleState;
            });

            $scope.view.groups.MyApps = toggleState;
            $scope.view.groups.PublicApps = toggleState;

            toggleState = !toggleState;

        };

        $scope.resetSearch = function () {
            $scope.view.searchTerm = '';
            toggleState = false;
            toggleAll();
        };

        $scope.$watch('view.searchTerm', function (newVal,oldVal) {

            if (oldVal !== newVal) {

                if (newVal === '') {
                    $scope.resetSearch();
                } else {
                    toggleState = true;
                    toggleAll();
                }
            }

        });

        /**
         * Callback when apps are loaded
         *
         * @param {Object} result
         */
        var appsLoaded = function (result) {
            $scope.view.filtering = false;
            $scope.view.message = result[0].status;

            $scope.view.repoTypes.MyApps = result[0].message;
            $scope.view.repoTypes.PublicApps = result[1].message;

            $scope.view.loading = false;
        };

//        $scope.toggleAppRevisions = function (rev) {
//            $scope.view.appRevisions[rev].toggled = !$scope.view.appRevisions[rev].toggled;
//        };

        /* load tools/workflows grouped by repositories */
        $q.all([
            App.getMineAppsByProject(),
            App.getPublicAppsByProject()
        ]).then(appsLoaded);

        /**
         * Switch tab on the right side
         *
         * @param {string} tab
         */
        $scope.switchTab = function (tab) {
            $scope.view.tab = tab;
        };

        /**
         * Toggle top level groups
         * @param group
         */
        $scope.toggleGroup = function (group) {
            $scope.view.groups[group] = !$scope.view.groups[group];
        };

        /**
         * Toggle repo list visibility
         *
         * @param repo
         */
        $scope.toggleRepo = function (repo) {
            if (_.isUndefined($scope.view.repoGroups[repo])) {
                $scope.view.repoGroups[repo] = false;
            }
            $scope.view.repoGroups[repo] = !$scope.view.repoGroups[repo];
        };

        /**
         * Callback when workflow is changed
         */
        $scope.onWorkflowChange = function (value) {

            $scope.view.isChanged = value;

            if (!value) {
                $scope.view.saving = false;
                $scope.view.loading = false;

                $scope.view.currentAppId = null;
                $scope.view.json = {};
            }

        };

        /**
         * Initiate workflow save
         */
        $scope.save = function () {
            BeforeRedirect.setReload(true);
            $scope.view.saving = true;
            $scope.view.loading = true;


            var workflow = PipelineInstance.format();
            App.update(workflow, 'workflow').then(function(data) {

                var rev = data.message['sbg:revision'];
                var url, arr = window.location.href.split('/');

                if (arr[arr.length-1] === '') {
                    arr.pop()
                }

                arr.pop();
                arr.push(rev.toString());

                url = arr.join('/');

                $scope.view.loading = false;

                var modalInstance = $modal.open({
                    template: $templateCache.get('views/cliche/partials/app-save-response.html'),
                    controller: 'ModalCtrl',
                    backdrop: 'static',
                    resolve: { data: function () { return { trace: {message: 'Workflow successfully saved.'} }; }}
                });

                modalInstance.result.then(function() {
                    window.location.href = url;
                });

            });
        };

        $scope.toggleSidebar = function() {

            $scope.view.showSidebar = !$scope.view.showSidebar;
//            $rootScope.$broadcast('sidebar:toggle', $scope.view.showSidebar);
            PipelineInstance.adjustSize();

        };

        /**
         * Check if particular property is not exposed anymore and remove it from values schema list
         *
         * @param {string} appName
         * @param {string} key
         */
        $scope.onExpose = function (appName, key) {

            if (!_.isUndefined($scope.view.values[appName]) && !_.isUndefined($scope.view.values[appName][key])) {
                delete $scope.view.values[appName][key];
            }

            if (!_.isUndefined($scope.view.values[appName]) && _.isEmpty($scope.view.values[appName])) {
                delete $scope.view.values[appName];
            }

            console.log($scope.view.exposed);
            console.log($scope.view.values);

        };

        /**
         * Track node select
         */
        var onNodeSelect = function (e, model, exposed, values) {

            $scope.view.json = model;

            $scope.view.values = values;
            $scope.view.exposed = exposed;

            $scope.view.required = $scope.view.json.inputs.required;

            $scope.switchTab('params');
            $scope.$digest();
        };

        /**
         * Track node deselect
         */
        var onNodeDeselect = function () {

            $scope.view.json = {};

            $scope.switchTab('apps');
            $scope.$digest();
        };

        var onNodeSelectOff = $rootScope.$on('node:select', onNodeSelect);
        var onNodeDeselectOff = $rootScope.$on('node:deselect', onNodeDeselect);

        var onBeforeRedirectOff = BeforeRedirect.register(function () {

            var deferred = $q.defer();

            if ($scope.view.mode === 'new') {
                $scope.$broadcast('save-local', true);
            }

            deferred.resolve();

            return deferred.promise;

        });

        /**
         * Toggle dropdown menu
         */
        $scope.toggleMenu = function() {

            $scope.view.isMenuOpen = !$scope.view.isMenuOpen;

        };
        
        $scope.view.capitalize = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        /**
         * Load markdown modal for description edit
         */
        $scope.loadMarkdown = function() {

            var modalInstance = $modal.open({
                template: $templateCache.get('views/partials/markdown.html'),
                controller: 'MarkdownCtrl',
                windowClass: 'modal-markdown',
                size: 'lg',
                backdrop: 'static',
                resolve: {data: function () {return {markdown: $scope.view.workflow.description};}}
            });

            modalInstance.result.then(function(result) {
                $scope.view.workflow.description = result;
            });
        };

        $scope.editMetadata = function () {

            var modalInstance = $modal.open({
                template: $templateCache.get('views/dyole/edit-metadata.html'),
                controller: 'DyoleEditMetadataCtrl',
                windowClass: 'modal-markdown',
                size: 'lg',
                backdrop: 'static',
                resolve: {data: function () {return {tool: $scope.view.workflow};}}
            });

            modalInstance.result.then(function(result) {
                $scope.view.workflow.description = result;
            });

        };

        $scope.runWorkflow = function () {
            // create task and redirect to task page for that task
        };

        $scope.validateWorkflowJSON = function () {

            PipelineInstance.validate().then(function (workflow) {
                $modal.open({
                    template: $templateCache.get('views/dyole/json-modal.html'),
                    controller: 'ModalJSONCtrl',
                    resolve: {data: function () {
                        return {json: workflow.errors, url: false};
                    }}
                });
            });

        };

        $scope.workflowToJSON = function () {
            var workflow = PipelineInstance.format();

            var modal = $modal.open({
                template: $templateCache.get('views/dyole/json-modal.html'),
                controller: 'ModalJSONCtrl',
                resolve: {data: function () {
                    return {json: workflow};
                }}
            });

            modal.result.then(function () {
                PipelineInstance.getUrl({url: App.getAppUrl()});
            });
        };

        $scope.$on('$destroy', function () {
            onNodeSelectOff();
            onNodeDeselectOff();

            onBeforeRedirectOff();
            onBeforeRedirectOff = undefined;

            onBeforeUnloadOff();
            onBeforeUnloadOff = undefined;

            PipelineService.removeInstance($scope.view.id);

        });

    }]);
