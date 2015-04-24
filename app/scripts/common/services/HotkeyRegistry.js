/**
 * Created by Maya on 24.4.15.
 */

angular.module('registryApp.common')
	.service('HotkeyRegistry', ['hotkeys', function (hotkeys) {

		var registry = [
			{
				name: 'save',
				shortcut: 'ctrl+s',
				desc: 'Save current work'
			},
			{
				name: 'undo',
				shortcut: 'ctrl+z',
				desc: 'Undo previous action'
			},
			{
				name: 'run',
				shortcut: 'ctrl+shift+r',
				desc: 'Run'
			}
		];

		/**
		 * Add hotkey
		 * @param shortcut {String}
		 * @param desc {String}
		 * @param callback {Function}
		 * @param [preventDefault] {Boolean}
		 * @param [allowIn] {Array}
		 */
		function addHotkey (shortcut, desc, callback, preventDefault, allowIn) {
			var config = {
				combo: shortcut,
				description: desc,
				callback: callback
			};

			if (!_.isUndefined(allowIn)) {
				config.allowIn = allowIn;
			}

 			if (typeof callback === 'function') {
			    config.callback = function(event) {
				    !preventDefault || event.preventDefault();

					callback.call();
			    }
		    } else {
			    config.callback = function () {};
		    }

			hotkeys.add(config);
		}

		/**
		 *
		 * @param config {Object | Object[]}
		 */
		function loadHotkeys(config) {

			/**
			 * formats key and sends to be added
			 * @param config
			 */
			function initKey(config) {
				var hotkey = _.find(registry, {name: config.name});
				addHotkey(hotkey.shortcut, hotkey.desc, config.callback, config.preventDefault || null);
			}

			if (_.isArray(config)) {
				_.forEach(config, function(c) {
					initKey(c);
				})
			} else {
				initKey(config);
			}
		}

		return {
			loadHotkeys: loadHotkeys
		}
	}]);