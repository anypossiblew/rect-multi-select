/**
 * Created by anypossiblew<anypossible.w@gmail.com> on 2014/7/4.
 */
'use strict';

angular.module('uiSelect', [])
  .directive('uiRectSelect',
  ['$log', '$parse',
    function ($log, $parse) {

      function safeApply($scope, fn) {
        var phase = $scope.$root && $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
          if (fn) {
            $scope.$eval(fn);
          }
        } else {
          if (fn) {
            $scope.$apply(fn);
          } else {
            $scope.$apply();
          }
        }
      }

      function checkMaxMinPos(a, b, aW, aH, bW, bH, maxX, minX, maxY, minY) {
        'use strict';

        if (a.left < b.left) {
          if (a.left < minX) {
            minX = a.left;
          }
        } else {
          if (b.left < minX) {
            minX = b.left;
          }
        }

        if (a.left + aW > b.left + bW) {
          if (a.left > maxX) {
            maxX = a.left + aW;
          }
        } else {
          if (b.left + bW > maxX) {
            maxX = b.left + bW;
          }
        }
        ////////////////////////////////
        if (a.top < b.top) {
          if (a.top < minY) {
            minY = a.top;
          }
        } else {
          if (b.top < minY) {
            minY = b.top;
          }
        }

        if (a.top + aH > b.top + bH) {
          if (a.top > maxY) {
            maxY = a.top + aH;
          }
        } else {
          if (b.top + bH > maxY) {
            maxY = b.top + bH;
          }
        }

        return {
          'maxX': maxX,
          'minX': minX,
          'maxY': maxY,
          'minY': minY
        };
      }

      var defaults = {
        selector: ".photo", // 框选的子元素选择符
        moveSelect: true // 移动实时选择
      };

      return {
        restrict: 'A',
        link: function (scope, element, attrs) {

          var options;
          var opt = scope.$eval(attrs.uiRectSelect || "{}");
          options = angular.extend({}, defaults, opt);

          attrs.$observe('uiMoveSelect', function(moveSelect) {
            options.moveSelect = moveSelect&&(moveSelect=='true');
          });

          var initialPositionX = 0,
            initialPositionY = 0,
            mousedown = false;

          var ghostSelect = angular.element("<div class='ghost-select' ng-show='ghostSelectShow'><span></span></div>");
          var ghostSelectGrid = angular.element('<div id="grid"></div>').append(ghostSelect);
          element.prepend(ghostSelectGrid);

          var bigGhost = angular.element("<div id='big-ghost' class='big-ghost' ng-show='bigGhostShow'></div>");

          element.append(bigGhost);

          var gridOffsetX = 0,
            gridOffsetY = 0;

          element.bind('mousedown', function (e) {

            gridOffsetX = ghostSelectGrid.offset().left;
            gridOffsetY = ghostSelectGrid.offset().top;

            var mouseX = e.pageX - gridOffsetX,
              mouseY = e.pageY - gridOffsetY;

            scope.bigGhostShow = false;
            scope.ghostSelectShow = true;
            ghostSelect.css({
              'left': mouseX,
              'top': mouseY
            });

            initialPositionX = mouseX;
            initialPositionY = mouseY;

            mousedown = true;
          });
          angular.element(document).bind("mousemove", openSelector);
          angular.element(document).bind("mouseup", function (e) {
            if (!mousedown) {
              return;
            }
            mousedown = false;

            var w = Math.abs(initialPositionX - e.pageX + gridOffsetX);
            var h = Math.abs(initialPositionY - e.pageY + gridOffsetY);

            if (w < 10 && h < 10) {
              return;
            }
            selectElements(e);

            scope.ghostSelectShow = false;
            ghostSelect.width(0).height(0);
          });

          function openSelector(e) {
            if (!mousedown) {
              return;
            }

            e.preventDefault();

            var mouseX = e.pageX - gridOffsetX,
              mouseY = e.pageY - gridOffsetY;

            var w = Math.abs(initialPositionX - mouseX);
            var h = Math.abs(initialPositionY - mouseY);

            if (w < 10 && h < 10) {
              return;
            }

            ghostSelect.css({
              'width': w,
              'height': h
            });
            if (mouseX <= initialPositionX && mouseY >= initialPositionY) {
              ghostSelect.css({
                'left': mouseX
              });
            } else if (mouseY <= initialPositionY && mouseX >= initialPositionX) {
              ghostSelect.css({
                'top': mouseY
              });
            } else if (mouseY < initialPositionY && mouseX < initialPositionX) {
              ghostSelect.css({
                'left': mouseX,
                "top": mouseY
              });
            }

            if (options.moveSelect) {
              selectElements(e);
            }
          }

          function selectElements(e) {

            var maxX = 0;
            var minX = 5000;
            var maxY = 0;
            var minY = 5000;
            var totalElements = 0;
            var elementArr = new Array();
            var setter = $parse(attrs.uiSelector || 'selected').assign;
            angular.forEach(element.find(options.selector),
              function (bElem, key) {

                bElem = angular.element(bElem);
                var scope = bElem.scope();
                var result = doObjectsCollide(ghostSelect, bElem);

                if (result == true) {
                  safeApply(scope, function () {
                    setter(scope, true);
                  });
                  return;

                  var aElemPos = bElem.offset();
                  var bElemPos = bElem.offset();
                  var aW = bElem.width();
                  var aH = bElem.height();
                  var bW = bElem.width();
                  var bH = bElem.height();

                  var coords = checkMaxMinPos(aElemPos, bElemPos, aW, aH, bW, bH, maxX, minX, maxY, minY);
                  maxX = coords.maxX;
                  minX = coords.minX;
                  maxY = coords.maxY;
                  minY = coords.minY;
                  var parent = bElem.parent();

                  //console.log(aElem, bElem,maxX, minX, maxY,minY);
                  if (bElem.css("left") === "auto" && bElem.css("top") === "auto") {
                    bElem.css({
                      'left': parent.css('left'),
                      'top': parent.css('top')
                    });
                  }
                  scope.bigGhostShow = true;
                  bigGhost.addClass("ponm-show");
                  bigGhost.attr("x", Number(minX - 20));
                  bigGhost.attr("y", Number(minY - 10));

                  bigGhost.css({
                    'width': maxX + 40 - minX,
                    'height': maxY + 20 - minY,
                    'top': minY - 10,
                    'left': minX - 20
                  });


                } else if (!e.shiftKey) {
                  safeApply(scope, function () {
                    setter(scope, false);
                  });
                }
              });

          }

          function doObjectsCollide(a, b) { // a and b are your objects
            var aTop = a.offset().top;
            var aLeft = a.offset().left;
            var bTop = b.offset().top;
            var bLeft = b.offset().left;

            return !(
            ((aTop + a.outerHeight()) < (bTop)) ||
            (aTop > (bTop + b.outerHeight())) ||
            ((aLeft + a.outerWidth()) < bLeft) ||
            (aLeft > (bLeft + b.outerWidth()))
            );
          }
        }
      }
    }])
;
