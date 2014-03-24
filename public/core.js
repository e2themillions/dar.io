// public/core.js (angular stuff)
var darioMod = angular.module('darioMod', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// landingpage, get all dars and show them (FOR TESTING ONLY)
	$http.get('/api/alldars')		
		.success(function(data) {
			alert("HEJ");
			$scope.dar = data;
			console.log("YOYOYOYOYO");
			console.log(data);
		})
		.error(function(data) {
			alert("HOV");
			console.log('Error: ' + data);
		});

	// when submitting the create form
	// send the text to the node API
	$scope.createDar = function() {
		alert('ok');
		$http.post('/api/dar', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.dar = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a dar 
	$scope.deleteDar = function(id) {
		alert("OK");
		$http.delete('/api/dardeletion/' + id)
			.success(function(data) {
				$scope.todos = data;
				alert("Yyeah!");
				console.log(data);
			})
			.error(function(data) {
				alert("Dar.io said no!");
				console.log('Error: ' + data);
			});
	};

}


