/**
 * Author: Milica Kadic
 * Date: 2/3/15
 * Time: 3:00 PM
 */
'use strict';

angular.module('registryApp.cliche')
    .controller('ClicheCtrl', ['$scope', '$q', '$uibModal', '$templateCache', '$rootScope', 'App', 'Cliche', 'Loading', 'SandBox', 'BeforeUnload', 'BeforeRedirect', 'Api', 'User', 'lodash', 'HelpMessages', 'Globals', 'HotkeyRegistry', 'Notification', 'rawTool', 'Helper', 'ClicheEvents', '$location', function($scope, $q, $modal, $templateCache, $rootScope, App, Cliche, Loading, SandBox, BeforeUnload, BeforeRedirect, Api, User, _, HelpMessages, Globals, HotkeyRegistry, Notification, rawTool, Helper, ClicheEvents, $location) {
        $scope.Loading = Loading;

        var cliAdapterWatchers = [],
            jobWatcher,
            resourceMap = {
                CPURequirement: 'cpu',
                MemRequirement: 'mem'
            },
            reqDefaults = {CPURequirement: 1, MemRequirement: 1024},
            onBeforeUnloadOff = BeforeUnload.register(
                function () {
                    return 'Please save your changes before leaving.';
                },
                function () {
                    return $scope.form.tool.$dirty;
                }),
            instances = [];

        // <editor-fold desc="Local $scope variables">

        $scope.view = {};
        $scope.form = {};


        /* temporary hack because base command cannot have expressions */
        $scope.disableCmdExpressions = true;

        /* variables gotten from camellia */
        $scope.view.globals = Globals;


        /* form holders, for validation only */
        $scope.form.tool = {};
        $scope.form.job = {};

        /* tool schema holder and job json for testing */
        /** @type CWLTool */
        $scope.view.tool = {};
        /** @type SBGJob */
        $scope.view.job = {};

        /* actual tool app from db */
        $scope.view.app = {
            is_script: Globals.appType === 'script'
        };

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

        /* current tab - available: general, inputs, outputs, metadata, test */
        $scope.view.tab = 'general';

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

        // </editor-fold>

        Loading.setClasses($scope.view.classes);

        Cliche.subscribe(function(cmd) {
            $scope.view.command = cmd;
        });

		/**
		 * Cliche events that can be broadcast by various components
		 */
		$scope.$on(ClicheEvents.EXPRESSION.CHANGED, function() {
			_checkExpressionRequirement();
		});

        $scope.$watch('Loading.classes', function(n, o) {
            if (n !== o) { $scope.view.classes = n; }
        });

        $q.all([
                App.get(),
                User.getUser(),
                App.getValidInstances()
            ])
            .then(function(result) {

                $scope.view.loading = false;

                if (result[0].message) {

                    var tool = _.assign(_.cloneDeep(rawTool), result[0].message);

                    /** @type CWLTool */
                    $scope.view.app = tool;
                    /** @type CWLTool */
                    $scope.view.tool = tool;

                    if (tool.class === 'ExpressionTool') {
                        tool.engine = Cliche.getTransformSchema().engine;
                        tool.script = tool.script || '';
                    }

                    tool.hints = tool.hints || [];

                    Cliche.setTool(tool);
                    var job = $scope.view.revision.job ? JSON.parse($scope.view.revision.job) : null;

                    if (!job && typeof tool['sbg:job'] === 'object') {
                        job = tool['sbg:job'];
                    }

                    Cliche.setJob(job);
                }

                $scope.view.user = result[1].user;

                instances = result[2];

                _setUpCliche();
                _readRequirementsAndResources();
                _prepareStatusCodes();
                _setUpCategories();
                groupByCategory();

                $scope.toggleConsole();
            });

        /**
         * Set up cliche form
         * @private
         */
        var _setUpCliche = function() {

            $scope.view.command = '';

            $scope.view.tool = Cliche.getTool();
            $scope.view.job = Cliche.getJob();

            if ($scope.view.user && $scope.view.mode === 'new') {
                $scope.view.tool.owner = [$scope.view.user.email];
            }
        };

        /**
         * Output error message if something was wrong with expressions evaluation
         * @private
         */
        var _outputError = function () {

            $scope.view.generatingCommand = false;
            $scope.view.command = '';
            $scope.view.cmdError = 'There are some errors in some of your expressions';

        };

        /**
         * Output command generated from the form
         *
         * @param {string} command
         * @private
         */
        var _outputCommand = function (command) {

            $scope.view.generatingCommand = false;
            $scope.view.command = command;
            $scope.view.cmdError = '';

        };

        /**
         * Turn on cliAdapter deep watch when console visible
         */
        var _turnOnCliAdapterDeepWatch = function() {

            if (Globals.appType === 'tool') {

                $scope.view.generatingCommand = true;
                debouncedGenerateCommand();

                var watch = [
                    'view.tool.baseCommand',
                    'view.tool.stdout',
                    'view.tool.stdin',
	                'view.reqMemRequirement.value',
	                'view.reqCPURequirement.value'
                ];

                _.each(watch, function(arg) {
                    var watcher = $scope.$watch(arg, function(n, o) {
                        if (n !== o) {
                            $scope.view.generatingCommand = true;
                            debouncedGenerateCommand();
                        }
                    }, true);
                    cliAdapterWatchers.push(watcher);
                });
            }

        };

        /**
         * Turn off cliAdapter deep watch when console tab is hidden
         */
        var _turnOffCliAdapterDeepWatch = function() {

            _.each(cliAdapterWatchers, function(watcher) {
                if (_.isFunction(watcher)) { watcher.call(); }
            });

            cliAdapterWatchers = [];
        };

        /**
         * Split requirements in separate objects in order to use them directly
         */
        var _readRequirementsAndResources = function() {

            // resources
            /** @type Hint */
            $scope.view.resCPURequirement = _.find($scope.view.tool.hints, {'class': 'sbg:CPURequirement'});
            /** @type Hint */
            $scope.view.resMemRequirement = _.find($scope.view.tool.hints, {'class': 'sbg:MemRequirement'});
            /** @type Hint */
            $scope.view.reqDockerRequirement = _.find($scope.view.tool.hints, {'class': 'DockerRequirement'});

            // requirements
            /** @type Requirement */
            $scope.view.reqCreateFileRequirement = _.find($scope.view.tool.requirements, {'class': 'CreateFileRequirement'});
            /** @type boolean */
            $scope.view.requireSBGMetadata = !!(_.find($scope.view.tool.requirements, {'class': 'sbg:Metadata'}));

	        if ($scope.view.reqCreateFileRequirement && $scope.view.reqCreateFileRequirement.fileDef.length === 0) {
		        _.remove($scope.view.tool.requirements, {'class': 'CreateFileRequirement'});
		        delete $scope.view.reqCreateFileRequirement;
	        }
        };

		/**
		 * Connects requirement object on $scope.view to object
		 * in $scope.view.tool.requirements array.
		 *
		 * If such a requirement does not exist, will copy req from
		 * rawTool and make view object a reference to object in array.
		 *
		 * @param {string} key
         * @private
		 */
        var _connectRequirement = function (key){
            var tempRequirement = _.find($scope.view.tool.requirements, {'class': key});
            if (!tempRequirement) {
                $scope.view.tool.requirements.push(_.clone(_.find(rawTool.requirements, {'class': key})));
                $scope.view['req'+key] = _.find($scope.view.tool.requirements, {'class': key});
            } else {
                $scope.view['req'+key] = tempRequirement;
            }
        };

        /**
         *
         * @param key One of ['MemRequirement', 'CPURequirement']
         * @private
         */
        var _connectResource = function (key) {
            var tempResource = _.find($scope.view.tool.hints, {'class': 'sbg:' + key});
            if (!tempResource) {
                $scope.view.tool.hints.push(_.clone(_.find(rawTool.hints, {'class': 'sbg:' + key})));
                $scope.view['res'+key] = _.find($scope.view.tool.hints, {'class': 'sbg:' + key});
            } else {
                $scope.view['res'+key] = tempResource;
            }
        };

        var _prepareStatusCodes = function () {
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
         *
         * @private
         */
        var _evaluateResources = function () {
            /** @type Hint */
            var resource;

            _.each(resourceMap, function (key, reqName) {
                resource = $scope.view['res' + reqName];

                if (resource && resource.value && _.isObject(resource.value) && _.contains(resource.value.value, '$job')) {
                    SandBox.evaluate(resource.value.script, {})
                        .then(function (result) {
                            $scope.view.job.allocatedResources[key] = result;
                        });
                }
            });
        };

        /**
         * Watch the job in order to evaluate
         * expression which include $job as context
         *
         * @private
         */
        var _turnOnJobDeepWatch = function() {

            _evaluateResources();

            if ($scope.view.isConsoleVisible) {
                $scope.view.generatingCommand = true;
                debouncedGenerateCommand();
            }

            jobWatcher = $scope.$watch('view.job.inputs', function(n, o) {
                if (n !== o) {
                    _evaluateResources();
                    $scope.updateResource($scope.view.resMemRequirement.value, 'MemRequirement');
                    $scope.updateResource($scope.view.resCPURequirement.value, 'CPURequirement');

                    if ($scope.view.isConsoleVisible) {
                        $scope.view.generatingCommand = true;
                        debouncedGenerateCommand();
                    }
                }
            }, true);
        };

        /**
         * Unwatch job's inputs
         *
         * @private
         */
        var _turnOffJobDeepWatch = function() {

            if (_.isFunction(jobWatcher)) {
                jobWatcher.call();
                jobWatcher = null;
            }

        };

        /**
         * Import external tool
         *
         * @param {string} json
         * @private
         */
        var _importTool = function(json) {

            /** @type CWLTool */
            var newTool = JSON.parse(json);

            var cachedName = $scope.view.tool.label;

            if (angular.isDefined(newTool) && angular.isString(newTool.baseCommand)) {
                newTool.baseCommand = [newTool.baseCommand];
            }

            if (!_.isUndefined(newTool.stdin) && _.isNull(newTool.stdin)) {
                newTool.stdin = '';
            }

            if (!_.isUndefined(newTool.stdout) && _.isNull(newTool.stdout)) {
                newTool.stdout = '';
            }

            if (Globals.appType === 'script') {
                newTool.engine = Cliche.getTransformSchema().engine;
                delete newTool.baseCommand;
                delete newTool.stdin;
                delete newTool.stdout;
                delete newTool.arguments;

                newTool.requirements.forEach(function(req, index) {
                    if (req.class !== 'ExpressionEngineRequirement') {
                        newTool.requirements.splice(index, 1);
                    }
                });

            } else {
                if (angular.isDefined(newTool.transform)) { delete newTool.transform; }
                if (angular.isDefined(newTool.engine)) { delete newTool.engine; }
                if (angular.isDefined(newTool.script)) { delete newTool.script; }
            }

            Cliche.setTool(newTool);
            $scope.view.tool = Cliche.getTool();
            $scope.form.tool.$setDirty();

            if ($scope.view.mode === 'edit') { $scope.view.tool.label = cachedName; }

	        if (!_.isUndefined(newTool['sbg:job'])) {
		        Cliche.setJob(newTool['sbg:job']);
	        } else {
		        Cliche.setJob(null);
	        }

            $scope.view.job = Cliche.getJob();

            _readRequirementsAndResources();
            _setUpCategories();

        };

        /**
         * Redirect to the other page
         *
         * @param revisionId
         * @private
         */
        var _redirectTo = function(revisionId) {
            window.location = '/u/' + Globals.projectOwner + '/' + Globals.projectSlug + '/apps/' + Globals.appName + '/edit?type=' + Globals.appType + '&rev=' + revisionId;
        };

        /**
         * Prepares categories for tagsInput directive
         */
        var _setUpCategories = function() {
            $scope.view.categories = _.map($scope.view.tool['sbg:categories'], function(cat) {

                return {text: cat};
            });
        };

		/**
		 * Checks if the app has any expressions.
		 *
		 * Apps with expressions require an expression engine. It adds an expression engine
		 * requirement to apps with any expressions.
         *
         * @private
		 */
		var _checkExpressionRequirement = function () {
			if (Helper.deepPropertyEquals($scope.view.tool, 'engine', '#cwl-js-engine')) {
				$scope.view.expReq = true;
				if (!_.find($scope.view.tool.requirements, {'class': 'ExpressionEngineRequirement'})) {
					$scope.view.tool.requirements.push(Cliche.getExpressionRequirement());
				}
			} else {
				$scope.view.expReq = false;
				_.remove($scope.view.tool.requirements, {'class': 'ExpressionEngineRequirement'});
			}
		};

        /**
         * Show tool settings modal (same modal appears in the workflow editor)
         */
        $scope.toolSettings = function() {
            var modalInstance = $modal.open({
                template: $templateCache.get('views/cliche/partials/settings-modal.html'),
                controller: 'ToolSettingsCtrl',
                resolve: { data: function () {
                    return {
                        instances: instances,
                        hints: $scope.view.tool.hints,
                        requireSBGMetadata: $scope.view.requireSBGMetadata,
                        type: 'Tool'
                    };
                }}
            });

            modalInstance.result.then(function (result) {
                $scope.view.tool.hints = result.hints;

                if (result.requireSBGMetadata && !$scope.view.requireSBGMetadata) {
                    $scope.view.tool.requirements.push({
                        'class': 'sbg:Metadata'
                    });
                } else if(!result.requireSBGMetadata) {
                    _.remove($scope.view.tool.requirements, {'class': 'sbg:Metadata'});
                }

                $scope.form.tool.$setDirty();
                $scope.view.requireSBGMetadata = result.requireSBGMetadata;
            });
        };


        /**
         * Switch the tab
         * @param {string} tab
         */
        $scope.switchTab = function(tab) {
            $scope.view.tab = tab;

            if (tab === 'test') {
                groupByCategory();
                _turnOnJobDeepWatch();
            } else {
                _turnOffJobDeepWatch();
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
                size: 'sm',
                template: $templateCache.get('views/partials/confirm-delete.html'),
                resolve: { data: function () {
                    return {
                        message: 'Start over with a clean template?'
                    }; }}
            });

            modalInstance.result.then(function () {
                $scope.view.loading = true;

                $scope.view.tab = 'general';

                var cachedName = $scope.view.tool.label;

                Cliche.flush($scope.view.type, cachedName)
                    .then(function() {

                        $scope.view.loading = false;

                        _setUpCliche();
                        _readRequirementsAndResources();
                        _setUpCategories();

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
                _importTool(json);
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
         * Will prompt for permission first if form is dirty
         */
        $scope.runApp = function () {

            function _createTask() {
                // create task and redirect to task page for that task
                App.createAppTask($scope.view.tool['sbg:revision']).then(function (task) {
                    BeforeRedirect.setReload(true);
                    $scope.view.saving = true;
                    $scope.view.loading = true;

                    App.redirectToTaskPage(task);
                });
            }

            if (!$scope.form.tool.$dirty) {
                _createTask();
            } else {
                var modalInstance = $modal.open({
                    controller: 'ModalCtrl',
                    template: $templateCache.get('views/partials/confirm-delete.html'),
                    resolve: {
                        data: function () {
                            return {
                                message: 'There are unsaved changes, running the app will discard them.' +
                                ' Are you sure you want to perform this action?'
                            };
                        }
                    }
                });

                modalInstance.result.then(function () {
                    $scope.form.tool.$dirty = false;
                    _createTask();
                }, function () {
                    return false;
                });
            }
        };


        /**
         * Toggle console visibility
         */
        $scope.toggleConsole = function() {

            $scope.view.isConsoleVisible = !$scope.view.isConsoleVisible;

            if ($scope.view.isConsoleVisible) {
                _turnOnCliAdapterDeepWatch();
            } else {
                _turnOffCliAdapterDeepWatch();
            }

        };

        /**
         * Initiate command generating
         *
         */
        $scope.generateCommand = function() {
            Cliche.generateCommand()
            .then(_outputCommand, _outputError);
        };

        var debouncedGenerateCommand = _.debounce($scope.generateCommand, 200);

        /**
         * Update tool resources and apply transformation on allocated resources if needed
         *
         * @param {Expression|string} expression
         * @param {string} key
         */
        $scope.updateResource = function (expression, key) {

            //in case field has not yet been defined
            _connectResource(key);

            var resource = $scope.view['res' + key];
            resource.value = expression;

            if (_.isObject(expression)) {

                SandBox.evaluate(expression.script, {})
                    .then(function (result) {
                        $scope.view.job.allocatedResources[resourceMap[key]] = result;
                    });

            } else {
                $scope.view.job.allocatedResources[resourceMap[key]] = expression;
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


		/**
		 * Add fileDef object to CreateFileRequirement.
		 *
		 * creates requirement if it fileDef was empty.
		 */
		$scope.addFileDef = function () {
			if (!$scope.view.reqCreateFileRequirement) {
				_connectRequirement('CreateFileRequirement');
			}

			$scope.view.reqCreateFileRequirement.fileDef.push({
				filename: '',
				fileContent: ''
			});
		};

		/**
		 * update fileDef in CreateFileRequirement by index.
		 * @param {string | expression} transform
		 * @param {number} index
		 * @param {string} key
		 */
		$scope.updateFileDef = function (transform, index, key) {
			$scope.view.reqCreateFileRequirement.fileDef[index][key] = transform;
		};

		/**
		 * Removes fileDef object from CreateFileRequirement by index.
		 *
		 * if fileDef is empty, then it will remove the whole CreateFileRequirement
		 * requirement form the tool.
		 *
		 * @param index
		 */
		$scope.removeFileDef = function(index) {
			$scope.view.reqCreateFileRequirement.fileDef.splice(index, 1);

			if (_.isEmpty($scope.view.reqCreateFileRequirement.fileDef)) {
				_.remove($scope.view.tool.requirements, {'class': 'CreateFileRequirement'});
				delete $scope.view.reqCreateFileRequirement;

			}
            _checkExpressionRequirement();
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
         * Remove item from the status codes
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
		 * Adds a new link field under 'sbg:links'
		 */
		$scope.addLink = function () {
			if (_.isUndefined($scope.view.tool['sbg:links'])) {
				$scope.view.tool['sbg:links'] = [];
			}

			$scope.view.tool['sbg:links'].push({
				label: '',
				id: ''
			});
		};

		/**
		 * Removes link by index from 'sbg:links'.
		 *
		 * if 'sbg:links' is empty, then it will remove the whole field from the tool
		 *
		 * @param index
		 */
		$scope.removeLink = function (index) {
			$scope.view.tool['sbg:links'].splice(index, 1);

			if (_.isEmpty($scope.view.tool['sbg:links'])) {
				delete $scope.view.tool['sbg:links'];
			}
		};

        /**
         * Groups inputs by category and sorts
         *
         */
        function groupByCategory () {
            $scope.view.inputCategories = _($scope.view.tool.inputs).groupBy(function (input) {
                var cat = input['sbg:category'];

                if (_.isUndefined(cat) || _.isEmpty(cat) || cat.toLowerCase().trim() === 'uncategorized') {
                    cat = 'Uncategorized';
                }

                return cat;
            }).map(function(value, key) {

                return {
                    name: key,
                    inputs: value,
                    show: true
                };
            }).value();
        }

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

            modalInstance.result.then(function() {
                $scope.view.loading = true;
            });

        };

		/**
		 * Removes the memory or cpu hints when value is set to null or is an empty string
		 *
		 * Sets default values in jobJson
		 */
        $scope.removeResourceHint = function(key) {
            _.remove($scope.view.tool.hints, {'class': 'sbg:' + key});
            delete $scope.view['res' + key];

	        $scope.view.job.allocatedResources[resourceMap[key]] = reqDefaults[key]; // set default value
			_checkExpressionRequirement();
        };

		/**
		 * Removes empty link and fileDef objects
		 * @param tool
		 */
		function removeEmptyFields(tool) {
			var createFileReq = _.find(tool.requirements, {'class': 'CreateFileRequirement'});
			if (!_.isUndefined(createFileReq)) {
				_.remove(createFileReq.fileDef, function(fileDef) {
					return fileDef.filename === '' && fileDef.fileContent === '';
				});
			}

			var links = tool['sbg:links'];
			if (!_.isUndefined(links)) {
				_.remove(links, function(link) {
					return link.id === '' && link.label === '';
				});
			}

            _.forEach(tool.inputs, function(input) {
                _deleteUndefinedInputBinding(input);
            });

            return tool;
        }

        function _deleteUndefinedInputBinding (input) {
            var type = Cliche.parseTypeObj(Cliche.getSchema('input', input, 'tool', true));
            if(type.type === 'record') {
                _.forEach(type.fields, function(field) {
                    _deleteUndefinedInputBinding(field);
                });
            }

            if (_.isUndefined(input.inputBinding)) {
                delete input.inputBinding;
            }
        }

        /**
         * Update current tool
         *
         * @returns {boolean}
         */
        $scope.updateTool = function() {
            var tool = Cliche.getTool(),
                deferred = $q.defer();

            if ($scope.view.loading) {
                return false;
            }


            $scope.view.loading = true;

            tool = removeEmptyFields(tool);

            tool['sbg:job'] = Cliche.getJob();

            debouncedGenerateCommand();

            Cliche.generatePreviewCommand().then(function(previewCommand) {
                tool['sbg:cmdPreview'] = previewCommand;

                App.update(tool, $scope.view.type)
                    .then(function(result) {
                        $scope.form.tool.$setPristine();
                        $scope.view.loading = false;

                        Notification.primary('Tool successfully updated');

                        Cliche.setTool(result.message);
                        $scope.view.tool = Cliche.getTool();

                        var newRevision = result.message['sbg:revision'];

                        // check if reload can be skipped while changing the URL
                        if (history.pushState) {
                            $location.search({ type: 'tool', rev: newRevision });
                        } else {
                            _redirectTo(newRevision);
                            $scope.view.loading = true;
                        }

                        deferred.resolve();

                    }, function (error) {
                        $scope.view.loading = false;
                        $rootScope.$broadcast('httpError', {message: error});
                        deferred.reject();
                    });
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
                    controller: ['$scope', '$uibModalInstance', 'data', function ($scope, $modalInstance, data) {

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
                    _redirectTo(revisionId);

                    // to indicate that something is happening while the page redirects
                    $scope.view.loading = true;
                });

                deferred.resolve(modalInstance);
            });


            return deferred.promise;

        };

        var unloadHotkeys = HotkeyRegistry.loadHotkeys([
            {name: 'save', callback: $scope.updateTool, preventDefault: true},
            {name: 'run', callback: $scope.runApp, preventDefault: true}
        ]);

        $scope.$on('$destroy', function() {
            onBeforeUnloadOff();
            onBeforeUnloadOff = undefined;
            unloadHotkeys();
        });

    }]);
