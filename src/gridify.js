/*
 * Gridify - Cascading grid for masonry/staggered layout (edo.io, Google Keep, Pinterest style) for ng-repeat in angularjs-based application
 * https://github.com/kyashan
 * (c) 2015 MIT License
 */

 (function () {
  'use strict';

  angular.module('jj.gridify', [])

	.directive('gridify', ['$timeout', function($timeout){
		return {
			controller: ['$scope', function($scope) {

				var $element;
				this.lastElementRendered = false;
				
				this.init = function(element){
					$element = element;
				}

				this.colsNum = 0;

				$scope.dimSet = false;

				$scope.itemWidth = 0;

				$scope.gridifiedList = [];

				this.calculateCols = function(parentWidth, childWidth){
					return Math.floor(parentWidth /childWidth);
				};

				this.getPrevElementOffset = function(i){
					var offsetTop,
						child = $element.children().eq(i - this.colsNum);
					if (i < this.colsNum) {
						offsetTop = 0;
					}
					else {
						offsetTop = parseInt(child[0].style.top.replace('px','')) + child.outerHeight(true);
					}
					console.log(i, offsetTop);
					return offsetTop;
				}

				this.firstLoaded = function(dim){
					$scope.dimSet = true;
					this.colsNum = $scope.options.columns || this.calculateCols($element.width(), dim.width);
					$scope.itemWidth = dim.width;
					$($element).css('width', $scope.itemWidth * this.colsNum);
				}

				$scope.$watch('gridifiedList', function(nv, ov){
					$timeout(function(){ //This timeout is to allow new element to position properly
						for (var i = 0; i < nv.length; i++) {
								if (nv[i].position) nv[i].position();
							
						};
					}, 0);
				}, true);


			}],
			restrict: 'AE',
			link: {
				pre: function($scope, element, attrs) {

					var opts = $scope.$eval(attrs.gridify);
					$scope.options = angular.extend({
						columns : null,
						responsive : true,
						newItemClass: null,
						containerId: null,
						firstElementIsStatic: false
					}, opts || {});

					if ($scope.options.firstElementIsStatic) element.children().eq(0).css('top', element.children().eq(0).css('top'));

					$scope.staticElementNum = 0;
					if ($scope.options.firstElementIsStatic) $scope.staticElementNum = 1;

				},

				post: function($scope, element, attrs, gridifyCtrl) {

					gridifyCtrl.init(element);

					if ($scope.options.responsive || $scope.options.columns) $(window).on('resize', function(){
						if (gridifyCtrl.calculateCols($(container).width(), $scope.itemWidth) == gridifyCtrl.colsNum) return;
						positionAllElms();
					});

					var container = $scope.options.containerId ? $('#' + $scope.options.containerId) : window

					function positionAllElms(position) {
						function placeElm(i) {
							if (position){

								if (i % gridifyCtrl.colsNum == 0){ //Re-render olny the column

									$scope.gridifiedList[i].position();
								}

							} else {

								$scope.gridifiedList[i].position();

							}
						}

						gridifyCtrl.colsNum = $scope.options.columns || gridifyCtrl.calculateCols($(container).width(), $scope.itemWidth);
						$(element).css('width', $scope.itemWidth * gridifyCtrl.colsNum);
						
						for (var i = 0; i < $scope.gridifiedList.length; i++) {
							placeElm(i);
						}
					};

					$scope.$on('gridify.re-render', function(e, args){
						var i = args ? args.index : null;
						positionAllElms(i);
					});
				}
			}
		};
	}])

	.directive('gridifyItem', ['$rootScope', '$timeout', '$window', function($rootScope, $timeout, $window){
		return {
			require: '^gridify',
			restrict: 'AE',
			link: {

				pre: function ($scope, element, attrs, gridifyCtrl) {


					var $elm = $(element);

					//Assign item
					var item = $scope.$eval(attrs.gridifyItem);
					
					var loaded = false;

					//Auto run on link function
					function positionElement(){
						if($scope.options.newItemClass && !loaded && gridifyCtrl.lastElementRendered) $elm.addClass($scope.options.newItemClass);
						if(!loaded && gridifyCtrl.lastElementRendered && $scope.staticElementNum == 0 && $scope.$index == 0) $elm.css('top', 0);
						$timeout(function(){
							var index = $scope.$index;
							var left, top;

							//Set left
							$elm.css('left', element.outerWidth(true) * ((index + $scope.staticElementNum) % gridifyCtrl.colsNum));

							// Set top
							$elm.css('top', gridifyCtrl.getPrevElementOffset(index + $scope.staticElementNum));
							loaded = true;
						}, 0);
					};

					//Initialize
					(function init(){
						gridifyCtrl.firstLoaded({
											width: element.outerWidth(true),
											height: element.outerHeight(true)
										});
						item.position = positionElement;
						// positionElement();
					})();

					$(element).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd webkitAnimationEnd oanimationend msAnimationEnd animationend', 
					function() {
						if ($scope.options.newItemClass) $(element).removeClass($scope.options.newItemClass)
					});

				}, post: function($scope, element, attrs, gridifyCtrl){
					$timeout(function(){
						if ($scope.$last) {
							gridifyCtrl.lastElementRendered = true;
							$rootScope.$broadcast('gridify.list-loaded');
						}
					}, 20)
				}
			}
		};
	}]);
}());