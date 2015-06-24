/**
 * Author: Milica Kadic
 * Date: 10/21/14
 * Time: 2:18 PM
 */

'use strict';

angular.module('registryApp.dyole', ['registryApp.app', 'ui.bootstrap', 'ui.sortable','registryApp.common', 'registryApp.util', 'registryApp.repo', 'ngPrettyJson', 'markdown', 'ngTagsInput'])
	.constant('Const', {
		exposedSeparator: '$',
        generalSeparator: '.'
	})
	.config([function() {
	}]);
