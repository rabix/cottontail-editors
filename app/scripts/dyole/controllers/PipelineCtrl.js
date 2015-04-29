/**
 * Author: Milica Kadic
 * Date: 10/21/14
 * Time: 2:51 PM
 */
'use strict';

angular.module('registryApp.dyole')
    .controller('PipelineCtrl', ['$scope', '$rootScope', '$element', '$window', '$timeout', '$injector', 'pipeline', 'App', 'rawPipeline', '$modal', '$templateCache', 'PipelineService', 'lodash', function ($scope, $rootScope, $element, $window, $timeout, $injector, pipeline, App, rawPipeline, $modal, $templateCache, PipelineService, _) {

        var Pipeline;
        var selector = '.pipeline';
        var timeoutId;

        $scope.view = {};
        $scope.view.canFlush = true;

        /* show usage hints to user flag */
        $scope.view.explanation = false;

        /**
         * Initialize pipeline
         */
        var initPipeline = function (obj) {

            $scope.view.explanation = !obj || (obj.steps && obj.steps.length === 0) || (obj.relations && obj.relations.length === 0);

            Pipeline = pipeline.getInstance({
                model: typeof obj.steps !== 'undefined' ? obj || rawPipeline : rawPipeline,
                $parent: angular.element($element[0].querySelector(selector)),
                editMode: $scope.editMode
            });

            //TODO: Will be used to check if any of the buttons needs disabling
            Pipeline.initZoom();

        };

        if ($scope.pipeline){
            initPipeline($scope.pipeline);
        } else {
            initPipeline({});
        }

        if ($scope.previewNode) {

            var e = {
                clientX: 300,
                clientY: 150
            };

            Pipeline.addNode($scope.previewNode, e.clientX, e.clientY);

        }

        $scope.$watch('pipeline', function(n, o) {
            if (n !== o) {

                $scope.pipeline = n;

                if (angular.isDefined(Pipeline)) {
                    Pipeline.destroy();
                    Pipeline = null;
                }

                initPipeline(n);
            }
        });

        var fork = function (repoId, name) {
            $scope.pipeline.json = Pipeline.getJSON();

            $scope.pipeline.repo = repoId;

            if (name) {
                $scope.pipeline.name = name;
            }

//            Workflow.fork($scope.pipeline).then(function (pipeline) {
//                $state.go('workflow-editor', {id: pipeline.id, mode: 'edit'});
//            });
        };

        /**
         * Save pipeline locally
         */
        $scope.$on('save-local', function (e, value) {
            if (value) {
                //Workflow.saveLocal(Pipeline.getJSON());
            }
        });

        var format = function () {

            return Pipeline.getJSON();

        };

        var getUrl = function (url) {

            $modal.open({
                template: $templateCache.get('views/partials/job-url-response.html'),
                controller: ['$scope', '$modalInstance', 'data', function($scope, $modalInstance, data) {

                    $scope.view = {};
                    $scope.data = data;
//                        $scope.view.trace = data.trace;

                    /**
                     * Close the modal window
                     */
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                }],
                resolve: { data: function () { return {trace: {message: 'Workflow link:', url:  url.url}}; }}
            });


        };

        /**
         * Drop node on the canvas
         *
         * @param {MouseEvent} e
         * @param {String} app object
         */
         var dropNode = function(e, app) {

            $scope.view.loading = true;
            $scope.view.explanation = false;

            App.getApp(app.project, app.app_name).then(function(result) {

                $scope.view.loading = false;

                if (typeof result.message === 'object' && !_.isEmpty(result.message)) {
                    Pipeline.addNode(result.message, e.clientX, e.clientY);
                } else {
                    console.error('App does not exist: Message: %s, Status: %s', result.message, result.status);
                }

            });
        };

        var onNodeDroppedOff = $rootScope.$on('node:dropped', function (e, data) {
            dropNode(data.e, data.app);
        });

        /**
         * Cancel timeout
         */
        var cancelTimeout = function () {
            if (angular.isDefined(timeoutId)) {
                $timeout.cancel(timeoutId);
                timeoutId = undefined;
            }
        };

        /**
         * Adjust size of the canvas when window size changes
         */
        var changeWidth = function () {
            if (Pipeline) {
                Pipeline.adjustSize();
            }
        };

        var lazyChangeWidth = _.debounce(changeWidth, 150);

        angular.element($window).on('resize', lazyChangeWidth);

        /**
         * Track sidebar toggle in order to adjust canvas size
         */
        var adjustSize = function (showSidebar) {

            cancelTimeout();

            timeoutId = $timeout(function () {
                Pipeline.adjustSize(showSidebar);
            }, 300);

        };

        /**
         * Track pipeline change
         */
        var onPipelineChangeOff = $rootScope.$on('pipeline:change', function () {
            $scope.pipelineChangeFn({value: true});
        });

        /**
         * Set fresh canvas
         */
        $scope.flush = function() {
            if (!$scope.view.canFlush) { return false; }

            var modalInstance = $modal.open({
                controller: 'ModalCtrl',
                template: $templateCache.get('views/partials/confirm-delete.html'),
                resolve: { data: function () {
                    return {
                        message: 'Are you sure you want to delete this workflow?'
                    }; }}
            });

            modalInstance.result.then(function () {
                App.flush();

                if (angular.isDefined(Pipeline)) {
                    Pipeline.destroy();
                    Pipeline = null;
                    initPipeline({});
                }
            }, function () {
                return false;
            });

        };

        /**
         * Open modal with info for selected node
         *
         * @param e
         * @param model
         * @param schema
         */
        var onNodeInfo = function(e, model, schema) {

            var _getConnections = function () {
                var connections = Pipeline.getConnections();

                return _.filter(connections, function(connection){
                    return connection.end_node === model.id || connection.starrt_node === model.id
                });
            };

            var $modal = $injector.get('$modal');
            var $templateCache = $injector.get('$templateCache');

            var modalInstance = $modal.open({
                template: $templateCache.get('views/dyole/'+ ( schema ? 'io-' : '') +'node-info.html'),
                controller: 'ModalTabsCtrl',
                windowClass: 'modal-node',
                resolve: {data: function () { return {model: model, connections: _getConnections(), schema: schema};}}
            });

            modalInstance.result.then(function (scatter) {
                if (scatter) {
                    model.scatter = scatter;
                } else {
                    model.scatter = false;
                    delete model.scatter;
                }
            });

        };

        var onNodeLabelEdit = function(e, name, onEdit, onSave, scope) {

            var $modal = $injector.get('$modal');
            var $templateCache = $injector.get('$templateCache');

            $modal.open({
                template: $templateCache.get('views/dyole/node-label-edit.html'),
                controller: 'NodeEditCtrl',
                windowClass: 'modal-node',
                resolve: {data: function () { return {
                    name: name,
                    onEdit: onEdit,
                    onSave: onSave,
                    scope: scope
                }; }}
            });

        };


        var onNodeInfoOff = $rootScope.$on('node:info', onNodeInfo);
        var onNodeLabelEditOff = $rootScope.$on('node:label:edit', onNodeLabelEdit);

        $scope.$on('$destroy', function() {

            angular.element($window).off('resize', lazyChangeWidth);

            cancelTimeout();
            onPipelineChangeOff();
            onNodeDroppedOff();
            onNodeInfoOff();
            onNodeLabelEditOff();

            if (angular.isDefined(Pipeline)) {
                // not a single page app anymore
                //Pipeline.destroy();
                //Pipeline = null;
            }

        });

        var validate = function () {
            return App.validateJson(Pipeline.getJSON());
        };
        
        $scope.pipelineActions = {
            //TODO: Add disabling buttons logic
            zoomIn: function () {
                var zoom;

                if (Pipeline) {
                    Pipeline.zoomIn();
                }
            },
            zoomOut: function () {
                var zoom;

                if (Pipeline) {
                    Pipeline.zoomOut();
                }

            }
        };

        /**
         * If scope controller is set, expose pipeline methods to service
         */
        if ($scope.controllerId) {

            var methods = {
                flush: $scope.flush,
                dropNode: $scope.dropNode,
                getUrl: getUrl,
                fork: fork,
                format: format,
                validate: validate,
                adjustSize: adjustSize
            };

            PipelineService.setInstance($scope.controllerId, methods);

        }

    }]);
