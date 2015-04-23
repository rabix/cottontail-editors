/**
 * Author: Milica Kadic
 * Date: 10/20/14
 * Time: 12:34 PM
 */
'use strict';

angular.module('registryApp.dyole')
    .directive('drag', ['Globals', function (Globals) {
        return {
            scope: {
                drag: '='
            },
            link: function(scope, element) {

                var img, preloadImg = Globals.urls.base + 'img/rabix/node.png';
                img = new Image();
                img.src = preloadImg;

                var el = element[0];

                /**
                 * Callback when start dragging the element
                 *
                 * @param {Object} e
                 * @param {Object} e.dataTransfer
                 * @param {Object} e.dataTransfer.setData
                 * @param {Object} e.dataTransfer.setDragImage
                 * @returns {boolean}
                 */
                var handleDragStart = function(e) {
                    var data = JSON.stringify(scope.drag);
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', data);
                    e.dataTransfer.setDragImage(angular.element('<img " src="' + Globals.urls.base + 'img/rabix/node.png" width="96">')[0], 48, 48);

                    this.classList.add('drag');

                };

                /**
                 * Callback when stop dragging the element
                 */
                var handleDragEnd = function() {

                    this.classList.remove('drag');

                };

                el.addEventListener('dragstart', handleDragStart, false);
                el.addEventListener('dragend', handleDragEnd, false);

                scope.$on('$destroy', function() {
                    el.removeEventListener('dragstart', handleDragStart);
                    el.removeEventListener('dragend', handleDragEnd);
                });

            }
        };
    }]);