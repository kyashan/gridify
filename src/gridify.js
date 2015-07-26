/*
 * Gridify - Grid layout supporting masonry angularjs based
 * http://github.com/
 * (c) 2015 MIT License
 */

 (function () {
  'use strict';

  angular.module('jj.gridify', [])


	//TODO MEttere l'on destroy sullo scope quando è creato
	//TODO Mettere il watch anche se cambia l'altezza di un elemento singolo.
	// es. se modifico una nota e questa cambia altezza anche l'element relativo deve cambiare posizione

	.directive('gridify', ['$timeout', function($timeout){
		return {
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: ['$scope', '$timeout', function($scope, $timeout) {

				var $element,
					$attrs;

				this.lastElementRendered = false;
				
				this.init = function(element, attrs){
					$element = element;
					$attrs = attrs;
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
						// console.log('Old', i, child.position().top);

					if (i < this.colsNum) {
						offsetTop = 0;
					}
					else {
						offsetTop = parseInt(child[0].style.top.replace('px','')) + child.outerHeight(true);
					}

					return offsetTop;
				}

				this.firstLoaded = function(dim){
					// if (this.colsNum != 0) {$($element).css('width', $scope.itemWidth * this.colsNum); console.log('entrato')}
					$scope.dimSet = true;
					this.colsNum = $scope.options.maxColumns || this.calculateCols($element.width(), dim.width);
					$scope.itemWidth = dim.width;
					$($element).css('width', $scope.itemWidth * this.colsNum);
				}


				

			}],
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			link: {
				pre: function($scope, element, attrs) {

					var opts = $scope.$eval(attrs.gridify);
					$scope.options = angular.extend({
						listToWatch : null,
						maxColumns : null,
						responsive : true,
						newItemClass: null,
						containerId: null,

					}, opts || {});

				},

				post: function($scope, element, attrs, gridifyCtrl) {

					//Assign list to watch
					$scope.toWatch = $scope.options.listToWatch || alert('Gridify: please choose a variable to watch');
					
					gridifyCtrl.init(element, attrs);

					if ($scope.options.responsive) $(window).on('resize', function(){
						// $rootScope.$broadcast('ask-width');
						// $rootScope.$broadcast('re-render');
						// reRender();
						positionAllElms();
					});

					var container = $scope.options.containerId ? $('#' + $scope.options.containerId) : window


					function positionAllElms(position){
						// $timeout(function(){
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
						// }, 0);
					}

					$scope.$on('gridify.re-render', function(e, args){
						console.log(args);
						var i = args ? args.index : null;
						// $timeout(function(){
							positionAllElms(i);
						// }, 0)
					});

					$scope.$watchCollection('toWatch', function(nv, ov){
							// $timeout(function(){
								for (var i = 0; i < nv.length; i++) {
									nv[i].position();
								};
							// }, 0);
					});



				}
			}
		};
	}])

	.directive('gridifyItem', ['$rootScope', '$timeout', '$window', function($rootScope, $timeout, $window){
		// Runs during compile
		return {
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			require: '^gridify', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
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
							// if(!loaded && this.lastElementRendered) $elm.css('opacity', 1);
							loaded = true;

						}, 0);
					};

					

					// $scope.$on('ask-width', function(){
					// 	gridifyCtrl.firstLoaded({
					// 						width: element.outerWidth(true),
					// 						height: element.outerHeight(true),
					// 					});
					// });

					//Initialize
					(function init(){
						console.log('Initializing');
						gridifyCtrl.firstLoaded({
											width: element.outerWidth(true),
											height: element.outerHeight(true),
										});
						item.position = positionElement;
						positionElement();
					})();

					$scope.$on('$destroy', function(){
						console.log('Distrutto');
					});

					$(element).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd webkitAnimationEnd oanimationend msAnimationEnd animationend', 
					function() {
					 //do something
					 // console.log('Rirenderizzato', $scope.$index);
					 // $timeout(function(){
					 if ($scope.options.newItemClass) $(element).removeClass($scope.options.newItemClass)
					 // }, 0);
					 // $timeout(function(){
					 // 	positionElement();
					 // }, 500);
					});

					// $scope.$watch(function(){
					// 	return $(element).outerHeight(true);
					// },	function(nv, ov){
					// 	console.log('cambia altezza');
					// 	if (nv != ov){
					// 		$timeout(function(){
					// 			$rootScope.$broadcast('re-render');
					// 		}, 8000);
							
					// 	}
					// });

				}, post: function($scope, element, attrs, gridifyCtrl){
					$timeout(function(){
						if ($scope.$last) gridifyCtrl.lastElementRendered = true;
						// gridifyCtrl.reRender();
					}, 20)
					// $timeout(function(){
					// 	$rootScope.$broadcast('re-render');
					// 	console.log('Creato');
					// }, 1000);
				}
			}
		};
	}]);
}());