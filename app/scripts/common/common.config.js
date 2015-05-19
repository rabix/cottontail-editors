/**
 * Author: Milica Kadic
 * Date: 12/22/14
 * Time: 6:18 PM
 */

'use strict';

angular.module('registryApp.common', ['ngSanitize', 'cfp.hotkeys', 'Chronicle', 'ui-notification', 'markdown'])
	.config(['$httpProvider', 'markdownConfig', function($httpProvider, markdownConfig) {

        markdownConfig.escapeHtml = true;

		$httpProvider.interceptors.push('HTTPInterceptor');

	}]);

