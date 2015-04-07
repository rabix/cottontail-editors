/**
 * Author: Milica Kadic
 * Date: 12/22/14
 * Time: 6:18 PM
 */

'use strict';

angular.module('registryApp.common', ['LocalForageModule'])
	.config(['$localForageProvider', function($localForageProvider) {
		$localForageProvider.config({
			name: 'sbgApp',
			version: 1.0,
			storeName: 'sbgDB'
		});
	}]);

