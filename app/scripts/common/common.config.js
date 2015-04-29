/**
 * Author: Milica Kadic
 * Date: 12/22/14
 * Time: 6:18 PM
 */

'use strict';

angular.module('registryApp.common', ['cfp.hotkeys', 'Chronicle'])
	.config(['$httpProvider', function($httpProvider) {

		$httpProvider.interceptors.push('HTTPInterceptor');

	}]);

