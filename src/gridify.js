/*
 * Gridify - Responsive grid layout (edo.io, Google Keep, Pinterest style) for angularjs-based application
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

					return offsetTop;
				}

				this.firstLoaded = function(dim){
					$scope.dimSet = true;
					this.colsNum = $scope.options.maxColumns || this.calculateCols($element.width(), dim.width);
					$scope.itemWidth = dim.width;
					$($element).css('width', $scope.itemWidth * this.colsNum);
				}

			}],
			restrict: 'AE',
			link: {
				pre: function($scope, element, attrs) {

					var opts = $scope.$eval(attrs.gridify);
					$scope.options = angular.extend({
						listToWatch : null,
						maxColumns : null,
						responsive : true,
						newItemClass: null,
						containerId: null

					}, opts || {});

				},

				post: function($scope, element, attrs, gridifyCtrl) {

					//Assign list to watch
					$scope.toWatch = $scope.options.listToWatch || alert('Gridify: please choose a variable to watch');
					
					gridifyCtrl.init(element);

					if ($scope.options.responsive) $(window).on('resize', function(){
						positionAllElms();
					});

					var container = $scope.options.containerId ? $('#' + $scope.options.containerId) : window

					function positionAllElms(position){
						gridifyCtrl.colsNum = $scope.options.maxColumns || gridifyCtrl.calculateCols($(container).width(), $scope.itemWidth);
						$(element).css('width', $scope.itemWidth * gridifyCtrl.colsNum);
						for (var i = 0; i < $scope.toWatch.length; i++) {
							if (position){
								if (i % gridifyCtrl.colsNum == 0){ //Re-render olny the column
									$scope.toWatch[i].position();
								}
							} else {
								$scope.toWatch[i].position();
							}
						};
					}

					$scope.$on('gridify.re-render', function(e, args){
						console.log(args);
						var i = args ? args.index : null;
						positionAllElms(i);
					});

					$scope.$watchCollection('toWatch', function(nv, ov){
						for (var i = 0; i < nv.length; i++) {
							nv[i].position();
						};
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
						$timeout(function(){
							var index = $scope.$index;
							var left, top;
							//Set left
							$elm.css('left', element.outerWidth(true) * (index % gridifyCtrl.colsNum));
							// Set top
							$elm.css('top', gridifyCtrl.getPrevElementOffset(index));
							loaded = true;
						}, 0);
					};

					//Initialize
					(function init(){
						console.log('Initializing');
						gridifyCtrl.firstLoaded({
											width: element.outerWidth(true),
											height: element.outerHeight(true)
										});
						item.position = positionElement;
						positionElement();
					})();

					$(element).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd webkitAnimationEnd oanimationend msAnimationEnd animationend', 
					function() {
						if ($scope.options.newItemClass) $(element).removeClass($scope.options.newItemClass)
					});

				}, post: function($scope, element, attrs, gridifyCtrl){
					$timeout(function(){
						if ($scope.$last) gridifyCtrl.lastElementRendered = true;
					}, 20)
				}
			}
		};
	}]);
}());