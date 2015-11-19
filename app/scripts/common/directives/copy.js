/**
 * Author: Maja Nedeljkovic
 * Date: 11/18/15
 * Time: 13:16 PM
 */

/* globals Clipboard */

angular.module('registryApp.common')
    .directive('copy', ['$templateCache', '$timeout', function ($templateCache, $timeout) {
        'use strict';

        return {
            restrict: 'E',
            scope: {
                src: '@'
            },
            template: $templateCache.get('views/partials/copy.html'),
            link: function(scope, element) {

                scope.view = {};
                scope.view.text = 'Copy';
                scope.view.error = '';
                scope.view.tooltipMessage = '';

                var timeoutId;

                var $button = element.find('button');
                var clipboard = new Clipboard($button.get(0));

                clipboard.on('success', function(e) {
                    e.clearSelection();

                    scope.view.text = 'Copied';
                    scope.view.copying = true;
                    scope.$apply();

                    timeoutId = resetText();
                });

                clipboard.on('error', function(e) {

                    scope.view.tooltipMessage = fallbackMessage(e.action);
                    console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);

                    timeoutId = resetText();

                    scope.$apply();
                });

                function resetText () {
                    return $timeout(function() {
                        scope.view.text = 'Copy';
                        scope.view.copying = false;
                    }, 2000);
                }

                function fallbackMessage(action) {
                    var actionMsg = '';
                    var actionKey = (action === 'cut' ? 'X' : 'C');

                    if(/iPhone|iPad/i.test(navigator.userAgent)) {
                        actionMsg = 'No support :(';
                    }
                    else if (/Mac/i.test(navigator.userAgent)) {
                        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
                    }
                    else {
                        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
                    }

                    return actionMsg;
                }


                scope.cancelTimeout = function() {
                    if (angular.isDefined(timeoutId)) {
                        $timeout.cancel(timeoutId);
                        timeoutId = undefined;
                    }
                };

                scope.$on('$destroy', function() {
                    clipboard.destroy();
                    scope.cancelTimeout();
                });
            }
        };
    }]);