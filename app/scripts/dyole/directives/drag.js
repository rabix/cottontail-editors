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

                var images, preloadImgBase = Globals.base + 'img/rabix/';
                images = {};
                function NodeImage(src){
                    this.img = new Image();
                    this.img.src = src;
                    return this;
                }

                images.commandline = new NodeImage(preloadImgBase + 'commandlinenode.png');
                images.script = new NodeImage(preloadImgBase + 'scriptnode.png');
                images.workflow = new NodeImage(preloadImgBase + 'workflownode.png');

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
                    var data = JSON.stringify(scope.drag),
                        image = images[scope.drag.type.toLowerCase()].img;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', data);
                    e.dataTransfer.setDragImage(angular.element('<img " src="' + image.src + '" width="96">')[0], 48, 48);

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