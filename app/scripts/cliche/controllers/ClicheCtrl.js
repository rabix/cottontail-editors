/**
 * Author: Milica Kadic
 * Date: 2/3/15
 * Time: 3:00 PM
 */
'use strict';

angular.module('registryApp.cliche')
    .controller('ClicheCtrl', ['$scope', '$q', '$modal', '$templateCache', '$rootScope', 'App', 'Cliche', 'Loading', 'SandBox', 'BeforeUnload', 'BeforeRedirect', 'Api', 'User', 'lodash', 'HelpMessages', 'Globals', 'HotkeyRegistry', 'Chronicle', 'Notification', 'rawTool', function($scope, $q, $modal, $templateCache, $rootScope, App, Cliche, Loading, SandBox, BeforeUnload, BeforeRedirect, Api, User, _, HelpMessages, Globals, HotkeyRegistry, Chronicle, Notification, rawTool) {
        $scope.Loading = Loading;

        var cliAdapterWatchers = [],
            jobWatcher,
            reqMap = {CPURequirement: 'cpu', MemRequirement: 'mem'},
            onBeforeUnloadOff = BeforeUnload.register(
                function() {
                    return 'Please save your changes before leaving.';
                },
                function() {
                    return $scope.form.tool.$dirty
                });

        $scope.view = {};
        $scope.form = {};

        /* globals gotten from camellia */
        $scope.view.globals = Globals;


        /* form holders, for validation only */
        $scope.form.tool = {};
        $scope.form.job = {};

        /* tool schema holder and job json for testing */
        $scope.view.tool = {};
        $scope.view.job = {};

        /* actual tool app from db */
        $scope.view.app = {is_script: Globals.appType === 'script'};
        /* actual tool app revision from db */
        $scope.view.revision = {};

        /* loading flag */
        $scope.view.loading = true;

        /* cliche mode: always 'edit' on SBG */
        $scope.view.mode = 'edit';

        /* menu visibility flag */
        $scope.view.isMenuVisible = false;

        /* console visibility flag */
        $scope.view.isConsoleVisible = false;

        /* tool type: tool or script */
        $scope.view.type = Globals.appType;

        /* current tab - available: general, inputs, outputs, metadata, test, script */
        $scope.view.tab = Globals.appType === 'script' ? 'script' : 'general';

        /* page classes */
        $scope.view.classes = ['page', 'cliche'];

        /* command line generator error */
        $scope.view.cmdError = '';

        /* generating command flag */
        $scope.view.generatingCommand = false;

        /* list of user repos */
        $scope.view.repos = [];

        /* current user */
        $scope.view.user = null;

        /* categories */
        $scope.view.categories = [];

        /* help messages */
        $scope.help = HelpMessages;

        Loading.setClasses($scope.view.classes);

        Cliche.subscribe(function(cmd) {
            $scope.view.command = cmd;
        });

        $scope.$watch('Loading.classes', function(n, o) {
            if (n !== o) { $scope.view.classes = n; }
        });

        $q.all([
                App.get(),
                User.getUser()
            ])
            .then(function(result) {

                $scope.view.loading = false;

                if (result[0].message) {

                    var tool = _.assign(rawTool, result[0].message);

                    $scope.view.app = tool;
                    $scope.view.tool = tool;

                    if (tool.class === 'ExpressionTool') {
                        tool.engine = Cliche.getTransformSchema().engine;
                        tool.script = tool.script || '';
                    }

                    Cliche.setTool(tool);
                    var job = $scope.view.revision.job ? JSON.parse($scope.view.revision.job) : null;

                    if (!job && typeof tool['sbg:job'] === 'object') {
                        job = tool['sbg:job'];
                    }

                    Cliche.setJob(job);
                }

                $scope.view.user = result[1].user;

                setUpCliche();
                prepareRequirements();
                prepareStatusCodes();
                setUpCategories();

                $scope.toggleConsole();
                
                console.log('reqCpuRequirement',$scope.view.reqCpuRequirement);

            });

        /**
         * Set up cliche form
         */
        var setUpCliche = function() {

            $scope.view.command = '';

            $scope.view.tool = Cliche.getTool();
            $scope.view.job = Cliche.getJob();

            if ($scope.view.user && $scope.view.mode === 'new') {
                $scope.view.tool.owner = [$scope.view.user.email];
            }
        };

        /**
         * Output error message if something was wrong with expressions evaluation
         */
        var outputError = function () {

            $scope.view.generatingCommand = false;
            $scope.view.command = '';
            $scope.view.cmdError = 'There are some errors in some of your expressions';

        };

        /**
         * Output command generated from the form
         *
         * @param {string} command
         */
        var outputCommand = function (command) {

            $scope.view.generatingCommand = false;
            $scope.view.command = command;
            $scope.view.cmdError = '';

        };

        /**
         * Turn on cliAdapter deep watch when console visible
         */
        var turnOnCliAdapterDeepWatch = function() {

            if (Globals.appType === 'tool') {

                $scope.view.generatingCommand = true;
                Cliche.generateCommand()
                    .then(outputCommand, outputError);

                var watch = [
                    'view.tool.baseCommand',
                    'view.tool.stdout',
                    'view.tool.stdin'
                ];

                _.each(watch, function(arg) {
                    var watcher = $scope.$watch(arg, function(n, o) {
                        if (n !== o) {
                            $scope.view.generatingCommand = true;
                            Cliche.generateCommand()
                                .then(outputCommand, outputError);
                        }
                    }, true);
                    cliAdapterWatchers.push(watcher);
                });
            }

        };

        /**
         * Turn off cliAdapter deep watch when console tab is hidden
         */
        var turnOffCliAdapterDeepWatch = function() {

            _.each(cliAdapterWatchers, function(watcher) {
                if (_.isFunction(watcher)) { watcher.call(); }
            });

            cliAdapterWatchers = [];
        };

        /**
         * Split requirements in separate objects in order to use them directly
         */
        var prepareRequirements = function() {

            $scope.view.reqDockerRequirement = _.find($scope.view.tool.requirements, {'class': 'DockerRequirement'});
            $scope.view.reqCpuRequirement = _.find($scope.view.tool.requirements, {'class': 'CPURequirement'});
            $scope.view.reqMemRequirement = _.find($scope.view.tool.requirements, {'class': 'MemRequirement'});

        };
        
        var prepareStatusCodes = function () {
            if (typeof $scope.view.tool.successCodes === 'undefined') {
                $scope.view.tool.successCodes = [];
            }

            if (typeof $scope.view.tool.temporaryFailCodes === 'undefined') {
                $scope.view.tool.temporaryFailCodes = [];
            }
        };

        /**
         * Check if there are expressions applied on cpu and mem requirements and evaluate
         * them in order to refresh result for the allocated resources
         */
        var checkRequirements = function () {

            var req;

            _.each(reqMap, function (key, reqName) {
                req = $scope.view['req' + reqName];
                if (req && req.value && _.isObject(req.value) && _.contains(req.value.value, '$job')) {
                    SandBox.evaluate(req.value.value, {})
                        .then(function (result) {
                            $scope.view.job.allocatedResources[key] = result;
                        });
                }
            });
        };

        /**
         * Watch the job's inputs in order to evaluate
         * expression which include $job as context
         */
        var turnOnJobDeepWatch = function() {

            if (Globals.appType === 'tool') {

                checkRequirements();

                if ($scope.view.isConsoleVisible) {
                    $scope.view.generatingCommand = true;
                    Cliche.generateCommand()
                        .then(outputCommand, outputError);
                }

                jobWatcher = $scope.$watch('view.job.inputs', function(n, o) {
                    if (n !== o) {
                        checkRequirements();
                        if ($scope.view.isConsoleVisible) {
                            $scope.view.generatingCommand = true;
                            Cliche.generateCommand()
                                .then(outputCommand, outputError);
                        }
                    }
                }, true);

            }

        };

        /**
         * Unwatch job's inputs
         */
        var turnOffJobDeepWatch = function() {

            if (_.isFunction(jobWatcher)) {
                jobWatcher.call();
                jobWatcher = null;
            }

        };

        /**
         * Import external tool
         *
         * @param {Object} json
         */
        var importTool = function(json) {

            json = JSON.parse(json);

            var preserve = $scope.view.mode === 'new';

            var cachedName = $scope.view.tool.label;

            if (angular.isDefined(json) && angular.isString(json.baseCommand)) {
                json.baseCommand = [json.baseCommand];
            }

            if (Globals.appType === 'script') {
                json.engine = Cliche.getTransformSchema().engine;
                delete json.baseCommand;
                delete json.stdin;
                delete json.stdout;
                delete json.arguments;
                delete json.requirements;
                delete json.transform;

            } else {
                if (angular.isDefined(json.transform)) { delete json.transform; }
                if (angular.isDefined(json.engine)) { delete json.engine; }
                if (angular.isDefined(json.script)) { delete json.script; }

            }

            Cliche.setTool(json, preserve);
            $scope.view.tool = Cliche.getTool();

            if ($scope.view.mode === 'edit') { $scope.view.tool.label = cachedName; }

            Cliche.setJob(null, preserve);
            $scope.view.job = Cliche.getJob();

            prepareRequirements();
            setUpCategories();

        };

        /**
         * Redirect to the other page
         *
         * @param revisionId
         */
        var redirectTo = function(revisionId) {
            window.location = '/u/' + Globals.projectOwner + '/' + Globals.projectSlug + '/apps/' + Globals.appName + '/edit?type=' + Globals.appType + '&rev=' + revisionId;
        };

        /**
         * Prepares categories for tagsInput directive
         */
        var setUpCategories = function() {
            $scope.view.categories = _.map($scope.view.tool['sbg:categories'], function(cat) {

                return {text: cat};
            });
        };

        /**
         * Switch the tab
         * @param tab
         */
        $scope.switchTab = function(tab) {
            $scope.view.tab = tab;

            if (tab === 'test') {
                turnOnJobDeepWatch();
            } else {
                turnOffJobDeepWatch();
            }

        };

        /**
         * Toggle markdown preview
         */
        $scope.togglePreview = function() {
            $scope.view.preview = !$scope.view.preview;
        };


        /**
         * Set fresh structure for the cliche playground
         */
        $scope.flush = function() {

            var modalInstance = $modal.open({
                controller: 'ModalCtrl',
                template: $templateCache.get('views/partials/confirm-delete.html'),
                resolve: { data: function () {
                    return {
                        message: 'Are you sure you want to delete this ' + $scope.view.type + '?'
                    }; }}
            });

            modalInstance.result.then(function () {
                var preserve = $scope.view.mode === 'new';

                $scope.view.loading = true;

                $scope.view.tab = 'general';

                var cachedName = $scope.view.tool.label;

                Cliche.flush(preserve, $scope.view.type, cachedName)
                    .then(function() {

                        $scope.view.loading = false;

                        setUpCliche();
                        prepareRequirements();
                        setUpCategories();

                    });

            }, function () {
                return false;
            });

        };

        /**
         * Load json editor
         */
        $scope.loadJsonEditor = function() {

            var modalInstance = $modal.open({
                template: $templateCache.get('views/cliche/partials/json-editor.html'),
                controller: 'JsonEditorCtrl',
                resolve: { options: function () { return {user: $scope.view.user, type: $scope.view.type}; }}
            });

            modalInstance.result.then(function (json) {
                importTool(json);
            });

            return modalInstance;

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
                resolve: {data: function () {return {markdown: $scope.view.tool.description};}}
            });

            modalInstance.result.then(function(result) {
                $scope.view.tool.description = result;
            });

            return modalInstance;
        };

        /**
         * Sorts inputs/args by position
         * @param item
         * @returns {*}
         */
        $scope.sortByPosition = function(item) {

            var position = item.inputBinding && item.inputBinding.position ? item.inputBinding.position : 0; //input
            position = item.position ? item.position : position; //args

            return position;
        };

        /**
         * Updates $scope.view.tool.categories
         */
        $scope.updateCategories = function() {
            $scope.view.tool['sbg:categories'] = _.pluck($scope.view.categories, 'text');
        };

        /**
         * Run app
         */
        $scope.runApp = function () {
            //todo: run app
            // create task and redirect to task page for that task
            App.createAppTask().then(function (task) {
                BeforeRedirect.setReload(true);
                $scope.view.saving = true;
                $scope.view.loading = true;

                App.redirectToTaskPage(task);
            });

        };


        /**
         * Toggle console visibility
         */
        $scope.toggleConsole = function() {

            $scope.view.isConsoleVisible = !$scope.view.isConsoleVisible;

            if ($scope.view.isConsoleVisible) {
                turnOnCliAdapterDeepWatch();
            } else {
                turnOffCliAdapterDeepWatch();
            }

        };

        /**
         * Initiate command generating
         */
        $scope.generateCommand = function() {
            Cliche.generateCommand();
        };

        /**
         * Update tool resources and apply transformation on allocated resources if needed
         *
         * @param {*} transform
         * @param {string} key
         */
        $scope.updateResource = function (transform, key) {

            //in case field has not yet been defined
            var req = $scope.view['req' + key] || { class: key };

            req.value = transform;

            if (_.isObject(transform)) {

                SandBox.evaluate(transform.script, {})
                    .then(function (result) {
                        $scope.view.job.allocatedResources[reqMap[key]] = result;
                    });

            } else {
                if ($scope.view.job.allocatedResources[reqMap[key]] < transform) {
                    $scope.view.job.allocatedResources[reqMap[key]] = transform;
                }
            }

        };

        /**
         * Update value from the cliAdapter
         * @param value
         * @param index
         * @param key
         */
        $scope.updateCliAdapter = function (value, index, key) {
            value = angular.copy(value);

            if (index) {
                $scope.view.tool[key][index] = value;
            } else {
                $scope.view.tool[key] = value;
            }

        };

        /**
         * Add item to the baseCommand
         */
        $scope.addBaseCmd = function () {

            $scope.view.tool.baseCommand.push('');

        };
        
        $scope.addStatusCode = function (codeType) {

            if ( _.isArray($scope.view.tool[codeType]) ) {
                $scope.view.tool[codeType].push(0);
            } else {
                console.error('Invalid status code key passed');
                return false;
            }

        };

        /**
         * Remove item from the successCodes
         *
         * @param {string} type
         * @param {integer} index
         * @returns {boolean}
         */
        $scope.removeStatusCode = function (type,  index) {

            if ( !_.isArray($scope.view.tool[type]) ) {
                console.error('Invalid status code key passed');
                return false;
            }

            if ($scope.view.tool[type].length === 1) { return false; }

            $scope.view.tool[type].splice(index, 1);
        };

        /**
         * Remove item from the baseCommand
         *
         * @param {integer} index
         * @returns {boolean}
         */
        $scope.removeBaseCmd = function (index) {

            if ($scope.view.tool.baseCommand.length === 1) { return false; }

            $scope.view.tool.baseCommand.splice(index, 1);
        };

        /**
         * Splits single base command into multiple
         *
         * @param value
         * @param index
         */
        $scope.splitBaseCmd = function (value, index) {
            value = value.replace(/\s+/g, ' ');

            var baseCommands = value.split(' ');
            var adapterBaseCmd = $scope.view.tool.baseCommand;

            if (baseCommands.length > 0) {
                adapterBaseCmd.splice(index, 1);

                _.forEach(baseCommands, function(cmd, key) {
                    adapterBaseCmd.splice(parseInt(index, 10) + key, 0, cmd);
                });

                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        };

        /**
         * Create new tool and default revision
         *
         * @returns {boolean}
         */
        $scope.createTool = function() {

            var modalInstance;

            if ($scope.form.tool.label.$invalid) {
                modalInstance = $modal.open({
                    template: $templateCache.get('views/partials/validation.html'),
                    size: 'sm',
                    controller: 'ModalCtrl',
                    windowClass: 'modal-validation',
                    resolve: {data: function () { return {messages: ['You must enter valid name (avoid characters \'$\' and \'.\')']}; }}
                });

                return modalInstance;
            }

            modalInstance = $modal.open({
                controller: 'PickRepoModalCtrl',
                template: $templateCache.get('views/repo/pick-repo-name.html'),
                windowClass: 'modal-confirm',
                resolve: {data: function () { return {repos: $scope.view.repos, type: 'save'};}}

            });

            modalInstance.result.then(function(data) {

                $scope.view.loading = true;

                var repoId = data.repoId,
                    tool = Cliche.getTool(),
                    job = Cliche.getJob();

            });

        };

        /**
         * Update current tool
         *
         * @returns {boolean}
         */
        $scope.updateTool = function() {
            var deferred = $q.defer();

            if ($scope.view.loading) {
                return false;
            }

            $scope.view.loading = true;

            var tool = Cliche.getTool();
            var job = Cliche.getJob();

            tool['sbg:job'] = job;

            App.update(tool, $scope.view.type)
                .then(function(result) {
                    $scope.view.loading = false;

                    var newRevision = result.message['sbg:revision'];
                    BeforeRedirect.setReload(true);
                    $scope.form.tool.$dirty = false;
                    Notification.primary('Tool successfully updated');

                    redirectTo(newRevision);
                    $scope.view.loading = true;

                    deferred.resolve();

                }, function (error) {
                    $scope.view.loading = false;
                    $rootScope.$broadcast('httpError', {message: error});
                    deferred.reject();
                });

            return deferred.promise;

        };

        /**
         * Switch to another revision of the app
         */
        $scope.changeRevision = function() {

            var deferred = $q.defer();


            Api.getLatest.get().$promise.then(function(result) {
                var latestRevision = result.message['sbg:revision'];
                var revisionsList = _.range(latestRevision + 1);

                var modalInstance = $modal.open({
                    template: $templateCache.get('views/cliche/partials/revisions.html'),
                    controller: ['$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {

                        $scope.view = data;

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                        $scope.choose = function(id) {
                            $modalInstance.close(id);
                        };

                    }],
                    size: 'sm',
                    windowClass: 'modal-revisions',
                    resolve: {data: function () {return {revisions: revisionsList, app: $scope.view.app, current: $scope.view.tool['sbg:revision']};}}
                });

                modalInstance.result.then(function (revisionId) {
                    redirectTo(revisionId);

                    // to indicate that something is happening while the page redirects
                    $scope.view.loading = true;
                });

                deferred.resolve(modalInstance);
            });


            return deferred.promise;

        };

        function reInitCliche() {
            Cliche.setTool($scope.view.tool);
            setUpCliche();
            prepareRequirements();
            prepareStatusCodes();
            setUpCategories();
            Cliche.generateCommand()
                .then(outputCommand, outputError);
        }

        /**
         * Undo previous action
         */
        $scope.undoAction = function () {
            if ($scope.view.canUndo()) {
                $scope.chron.undo();
                reInitCliche();
                Notification({message: 'Undoing', delay: 500});
            } else {
                Notification.warning({message: 'No more actions to undo. End of history queue.', delay: 1000});
            }
        };

        $scope.redoAction = function () {
            if ($scope.view.canRedo()) {
                $scope.chron.redo();
                reInitCliche();
                Notification({message: 'Redoing', delay: 500});
            } else {
                Notification.warning({message: 'No more actions to redo', delay: 1000});
            }
        };

        var unloadHotkeys = HotkeyRegistry.loadHotkeys([
            {name: 'save', callback: $scope.updateTool, preventDefault: true},
            {name: 'run', callback: $scope.runApp, preventDefault: true},
            {name: 'undo', callback: $scope.undoAction, preventDefault: true, allowIn: ['INPUT', 'SELECT', 'TEXTAREA']},
            {name: 'redo', callback: $scope.redoAction, preventDefault: true, allowIn: ['INPUT', 'SELECT', 'TEXTAREA']}
        ]);

        //TODO: Fix this - disabled chron for now, causing problems with sbg:fields
//        $scope.chron = Chronicle.record('view.tool', $scope, true);
        // todo: optimize this watch because it's the heaviest
        // maybe adding lazy binding?

        $scope.view.canUndo = function () {
            return $scope.chron ? $scope.chron.currArchivePos > 1 : false;
        };
        $scope.view.canRedo = function () {
            return $scope.chron ? $scope.chron.currArchivePos !== $scope.chron.archive.length - 1 : false;
        };

        $scope.$on('$destroy', function() {

            onBeforeUnloadOff();
            onBeforeUnloadOff = undefined;

            unloadHotkeys();
        });

    }]);
