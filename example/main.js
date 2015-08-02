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

		$scope.focused = false;

		$scope.lista = [];


		$scope.reorder = function(){
			// $scope.lista = $filter('orderBy')($scope.lista, ['_id'])
			// angular.copy($filter('orderBy')($scope.lista, ['_id']), $scope.lista);
			// $scope.lista = $scope.lista.slice().reverse();
			// angular.copy($scope.lista.slice().reverse(), $scope.lista);
		}

		var text = 'Frankness applauded by supported ye household. Collected favourite now for for and rapturous repulsive consulted. An seems green be wrote again. She add what own only like. Tolerably we as extremity exquisite do commanded. Doubtful offended do entrance of landlord moreover is mistress in. Nay was appear entire ladies. Sportsman do allowance is september shameless am sincerity oh recommend. Gate tell man day that who. Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket. Hand dear so we hour to. He we be hastily offence effects he service. Sympathize it projection ye insipidity celebrated my pianoforte indulgence. Point his truth put style. Elegance exercise as laughing proposal mistaken if. We up precaution an it solicitude acceptance invitation. Gave read use way make spot how nor. In daughter goodness an likewise oh consider at procured wandered. Songs words wrong by me hills heard timed. Happy eat may doors songs. Be ignorant so of suitable dissuade weddings together.'

		
		function getRandomText (){
			var start, end, length;
			length = Math.random() * 500;
			start = Math.random() * text.length;
			end = start + length;
			return text.slice(start, end);
		}

		console.log(text.length)


		$scope.lista = [

			{'_id': 1, 'height': '500px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			{'_id': 2,'height': '400px', 'content' : ' problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			{'_id': 3,'height': '520px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the '},
			{'_id': 4,'height': '420px', 'content': '. It’s a robust open-source pig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			{'_id': 5, 'height': '460px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			// {'_id': 6,'height': '580px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			// {'_id': 7,'height': '450px', 'content': 'The ui-bootstrap library is the best singular '},
			// {'_id': 8,'height': '500px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			// {'_id': 9,'height': '400px', 'content' : ' problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
			// {'_id': 10,'height': '520px', 'content': 'The ui-bootstrap library is the best singular resource on what a good directive should look like. They are solving multiple common problems in varied ways, with generally solid patterns and practices. It’s a robust open-source project, with a constant flurry of activity. When you start to dig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the '},
			// {'_id': 11,'height': '420px', 'content': '. It’s a robust open-source pig through the library’s src, you can see how many different styles and solutions have solved the various problem. Some are extremely complex, while some are relatively simple. While the solutions are varied, there are also some common traits the ui-boostrap directives share across the library.'},
		];

		var colors = [
			'#CCCCCC',
			'#f1a3c0', //rosa
			'#c7caeb', //viola
			'#999eff', //Deep blu 
			'#b3e1d6', //verde
			'#ffef99', //giallo
			'#ffda99', //arancione
			'#99d3ff', //blu
			'#ffc2c2', //rosso	
		];

		function setFields(el){
			console.log('entrato');
			el.content = getRandomText();
			el.color = colors[Math.floor(Math.random() * 8)];
		}

		$scope.lista.filter(setFields);

		

		

		var y = 6;

		$scope.addItem = function(){
			// $scope.lista.unshift({'_id': y=y+1, 'height' : '300px', 'content' : 'Ciao come stai'});
			var item = {'_id': y=y+1}
			item.content = getRandomText();
			item.color = colors[Math.floor(Math.random() * 8)];
			$scope.lista.splice($scope.lista.length, 0, item);
			$scope.reorder();
			// $scope.lista.push({'_id': y=y+1, 'height' : '300px', 'content' : 'Ciao come stai'});
			
		}

		$scope.render = function(){
			$rootScope.$broadcast('gridify.re-render');
		}

		$scope.removeItem = function(i){
			$scope.lista.splice(i,1);
		}

		// $scope.switchInputClass = function(){
		// 	if ($scope.focused) return 'show';
		// 	else return 'hide';
		// }

		$scope.setCols = function(v){
			console.log(v);
			$scope.fixedColumns = v;
		}


	}])

	

})();
