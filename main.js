/*
 * Gridify - Toast messages for web apps angularjs-based
 * http://github.com/
 * (c) 2013-2015 MIT License, https://likeastore.com
 */


(function() {

	var app = angular.module('app', [
	'jj.gridify',
	]);

	app.controller('prova', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope,$timeout){
		$scope.lista = [

			{'_id': 1, 'height': '500px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			{'_id': 2,'height': '400px', 'content' : ' problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			{'_id': 3,'height': '520px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the '},
			{'_id': 4,'height': '420px', 'content': '. It’s a robust open-source pig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			{'_id': 5, 'height': '460px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			{'_id': 6, 'height': '380px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to ui-boostrap directives share across the library.'},
			// {'_id': 6,'height': '580px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			// {'_id': 7,'height': '450px', 'content': 'The ui-bootstrap library is the best singular '},
			// {'_id': 8,'height': '500px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			// {'_id': 9,'height': '400px', 'content' : ' problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			// {'_id': 10,'height': '520px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the '},
			// {'_id': 11,'height': '420px', 'content': '. It’s a robust open-source pig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},

		];

		var y = 6;

		$scope.addItem = function(){
			// $scope.lista.unshift({'_id': y=y+1, 'height' : '300px', 'content' : 'Ciao come stai'});
			$scope.lista.splice(3, 0, {'_id': y=y+1, 'height' : '300px', 'content' : 'Ciao come stai'});
			// $scope.lista.push({'_id': y=y+1, 'height' : '300px', 'content' : 'Ciao come stai'});
			
		}

		$scope.render = function(){
			$rootScope.$broadcast('gridify.re-render');
		}

		$scope.removeItem = function(i){
			$scope.lista.splice(i,1);
		}

	}])

	

})();
