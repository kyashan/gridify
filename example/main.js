(function() {

	var app = angular.module('app', [
	'jj.gridify',
	]);

	app.controller('prova', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope,$timeout){

		$scope.focused = false;

		$scope.lista = [];

		var text = 'Frankness applauded by supported ye household. Collected favourite now for for and rapturous repulsive consulted. An seems green be wrote again. She add what own only like. Tolerably we as extremity exquisite do commanded. Doubtful offended do entrance of landlord moreover is mistress in. Nay was appear entire ladies. Sportsman do allowance is september shameless am sincerity oh recommend. Gate tell man day that who. Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket. Hand dear so we hour to. He we be hastily offence effects he service. Sympathize it projection ye insipidity celebrated my pianoforte indulgence. Point his truth put style. Elegance exercise as laughing proposal mistaken if. We up precaution an it solicitude acceptance invitation. Gave read use way make spot how nor. In daughter goodness an likewise oh consider at procured wandered. Songs words wrong by me hills heard timed. Happy eat may doors songs. Be ignorant so of suitable dissuade weddings together.'

		
		function getRandomText (){
			var start, end, length;
			length = Math.random() * (500 - 140) + 140;
			start = Math.random() * text.length;
			end = start + length;
			return text.slice(start, end);
		}



		$scope.lista = [

			{'_id': 1},
			{'_id': 2},
			{'_id': 3},
			{'_id': 4},
			{'_id': 5},
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

		$scope.removeRandom = function(){
			$scope.lista.splice(Math.random() * $scope.lista.length,1);
		}

		$scope.removeItem = function(i){
			$scope.lista.splice(i,1);
		}


	}])

	

})();
